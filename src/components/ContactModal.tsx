import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { HiOutlineXMark } from 'react-icons/hi2';

// Placeholder labels, edit freely
const SERVICES = ['DPD Resolution', 'Agency Management', 'Lender Solutions', 'Debt Collection'];

const ANIM_MS = 220;

type ContactPayload = {
	services: string[];
	name: string;
	email: string;
	company: string;
	message: string;
};

// TODO: replace with the real endpoint (Formspree, Resend, your own API route, ...)
async function sendContact(payload: ContactPayload) {
	console.log('contact form submitted', payload);
	await new Promise((resolve) => setTimeout(resolve, 700));
}

/* ---------- Context: open the modal from anywhere (footer CTA, navbar "Get in touch", ...) ---------- */

type ContactModalContextValue = { openContact: () => void; closeContact: () => void };

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function useContactModal() {
	const ctx = useContext(ContactModalContext);
	if (!ctx) throw new Error('useContactModal must be used inside <ContactModalProvider>');
	return ctx;
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
	const [open, setOpen] = useState(false);
	const openContact = useCallback(() => setOpen(true), []);
	const closeContact = useCallback(() => setOpen(false), []);
	const value = useMemo(() => ({ openContact, closeContact }), [openContact, closeContact]);

	return (
		<ContactModalContext.Provider value={value}>
			{children}
			<ContactModal open={open} onClose={closeContact} />
		</ContactModalContext.Provider>
	);
}

/* ---------- Modal shell ---------- */

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
	const [mounted, setMounted] = useState(false);
	const [visible, setVisible] = useState(false);
	const titleId = useId();
	const panelRef = useRef<HTMLDivElement>(null);
	const lastFocused = useRef<HTMLElement | null>(null);

	// Mount first, then flip `visible` on the next frames so the enter transition actually runs.
	// On close: flip `visible` off, unmount once the exit transition has finished.
	useEffect(() => {
		if (open) {
			lastFocused.current = document.activeElement as HTMLElement | null;
			setMounted(true);
			const id = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
			return () => cancelAnimationFrame(id);
		}
		setVisible(false);
		const t = setTimeout(() => {
			setMounted(false);
			lastFocused.current?.focus?.();
		}, ANIM_MS);
		return () => clearTimeout(t);
	}, [open]);

	// Scroll lock, Escape to close, Tab kept inside the dialog
	useEffect(() => {
		if (!mounted) return;
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
				return;
			}
			if (e.key !== 'Tab' || !panelRef.current) return;
			const focusable = panelRef.current.querySelectorAll<HTMLElement>(
				'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
			);
			if (!focusable.length) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (e.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		};

		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.body.style.overflow = prevOverflow;
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [mounted, onClose]);

	// Move focus into the dialog (the panel itself, so mobile keyboards don't pop up)
	useEffect(() => {
		if (visible) panelRef.current?.focus({ preventScroll: true });
	}, [visible]);

	if (!mounted) return null;

	return createPortal(
		<div
			className={`fixed inset-0 z-[100] overflow-y-auto transition duration-200 ease-out motion-reduce:transition-none ${
				visible ? 'bg-[#07133a]/30 backdrop-blur-[14px]' : 'bg-[#07133a]/0 backdrop-blur-[0px]'
			}`}
			onMouseDown={(e) => {
				if (e.target === e.currentTarget) onClose();
			}}>
			<div
				className="flex min-h-full items-center justify-center p-4 sm:p-6"
				onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
				<div
					ref={panelRef}
					role="dialog"
					aria-modal="true"
					aria-labelledby={titleId}
					tabIndex={-1}
					className={`relative w-full max-w-[720px] rounded-[28px] bg-white p-6 text-[#111318] shadow-[0_30px_80px_rgba(7,19,58,0.25)] outline-none transition duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:p-10 ${
						visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-[0.96] opacity-0'
					}`}>
					<button
						type="button"
						onClick={onClose}
						aria-label="Close contact form"
						className="absolute right-5 top-5 grid size-9 place-items-center rounded-full text-[#07133a] transition-colors hover:bg-[#f1f3f8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1952F1] sm:right-8 sm:top-8">
						<HiOutlineXMark className="size-6" aria-hidden="true" />
					</button>

					<ContactForm titleId={titleId} onDone={onClose} />
				</div>
			</div>
		</div>,
		document.body
	);
}

/* ---------- Form (unmounts with the modal, so it resets itself on close) ---------- */

const inputClass =
	'w-full border border-[#e6e8ee] bg-white px-6 py-4 text-[15px] text-[#07133a] outline-none transition placeholder:text-[#9da0a6] focus:border-[#1952F1] focus:ring-4 focus:ring-[#1952F1]/10';

// Single-line fields are pills; the message box gets its own radius below
const pillInputClass = `${inputClass} rounded-full`;

function ContactForm({ titleId, onDone }: { titleId: string; onDone: () => void }) {
	const [services, setServices] = useState<string[]>([]);
	const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
	const [sentTo, setSentTo] = useState({ name: '', email: '' });

	const toggleService = (label: string) =>
		setServices((prev) => (prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]));

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const payload: ContactPayload = {
			services,
			name: String(data.get('name') ?? '').trim(),
			email: String(data.get('email') ?? '').trim(),
			company: String(data.get('company') ?? '').trim(),
			message: String(data.get('message') ?? '').trim(),
		};
		setStatus('sending');
		try {
			await sendContact(payload);
			setSentTo({ name: payload.name, email: payload.email });
			setStatus('sent');
		} catch {
			setStatus('error');
		}
	};

	if (status === 'sent') {
		return (
			<div className="flex min-h-[320px] flex-col items-start justify-center pr-10">
				<h2 id={titleId} className="text-[28px] font-semibold leading-[1.13] tracking-[-0.055em] text-[#07133a] sm:text-[40px]">
					Message sent
				</h2>
				<p className="mt-4 max-w-[480px] text-[16px] leading-[1.55] tracking-[-0.02em] text-[#777b84] sm:text-[18px]">
					Thanks{sentTo.name ? `, ${sentTo.name}` : ''}. We'll reply to {sentTo.email} soon.
				</p>
				<button
					type="button"
					onClick={onDone}
					className="mt-8 rounded-full bg-gradient-to-r from-[#1952F1] to-[#418DF8] px-8 py-3.5 text-[16px] font-semibold text-white transition hover:brightness-110">
					Close
				</button>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2 id={titleId} className="pr-12 text-[28px] font-semibold leading-[1.13] tracking-[-0.055em] text-[#07133a] sm:text-[40px]">
				Let's get started
			</h2>

			<fieldset className="mt-8 sm:mt-10">
				<legend className="text-[15px] tracking-[-0.02em] text-[#777b84] sm:text-[16px]">What services are you interested in?</legend>
				<div className="mt-4 flex flex-wrap gap-2.5">
					{SERVICES.map((label) => {
						const selected = services.includes(label);
						return (
							<button
								key={label}
								type="button"
								aria-pressed={selected}
								onClick={() => toggleService(label)}
								className={`rounded-full border px-4 py-2 text-[14px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1952F1] sm:text-[15px] ${
									selected
										? 'border-[#1952F1] bg-[#eef3ff] text-[#1952F1]'
										: 'border-[#e6e8ee] bg-white text-[#07133a] hover:border-[#c4cada]'
								}`}>
								{label}
							</button>
						);
					})}
				</div>
			</fieldset>

			<div className="mt-8 sm:mt-10">
				<p className="text-[15px] tracking-[-0.02em] text-[#777b84] sm:text-[16px]">More about you</p>
				<div className="mt-4 grid gap-3 sm:grid-cols-2">
					<input
						name="name"
						type="text"
						required
						autoComplete="name"
						placeholder="Your name"
						aria-label="Your name"
						className={pillInputClass}
					/>
					<input
						name="email"
						type="email"
						required
						autoComplete="email"
						placeholder="Your email"
						aria-label="Your email"
						className={pillInputClass}
					/>
				</div>
				<input
					name="company"
					type="text"
					autoComplete="organization"
					placeholder="Your company (optional)"
					aria-label="Your company (optional)"
					className={`${pillInputClass} mt-3`}
				/>
				<textarea
					name="message"
					required
					rows={5}
					placeholder="Tell about your project"
					aria-label="Tell about your project"
					className={`${inputClass} mt-3 min-h-[150px] resize-none rounded-[20px] py-4`}
				/>
			</div>

			<div className="mt-6 flex items-center justify-end gap-4">
				{status === 'error' && (
					<p role="alert" className="mr-auto text-[14px] text-[#d93025]">
						Couldn't send your message. Please try again.
					</p>
				)}
				<button
					type="submit"
					disabled={status === 'sending'}
					className="rounded-full bg-gradient-to-r from-[#1952F1] to-[#418DF8] px-8 py-3.5 text-[16px] font-semibold text-white shadow-[0_8px_24px_rgba(25,82,241,0.25)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70">
					{status === 'sending' ? 'Sending…' : 'Send'}
				</button>
			</div>
		</form>
	);
}
