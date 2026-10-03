import { useEffect, useRef, useState, type FocusEvent, type MouseEvent } from 'react';
import { motion, MotionConfig, useMotionValue, AnimatePresence } from 'motion/react';
import logoImg from '../assets/logo.svg';
import { useContactModal } from './ContactModal';

const NAV_LINKS = [
	{ id: 'home', label: 'Home', href: '#top' },
	{ id: 'lenders', label: 'For Lenders', href: '#lenders' },
	{ id: 'agencies', label: 'For Collection Agencies', href: '#agencies' },
];

/* ---------- Solid Glass Physics & Slingshot ---------- */
const HOLD = { k: 200, c: 20 };
const SNAP = { k: 220, c: 22 };
const SNAP_MS = 500;

const MAX_STRETCH = 12;
const RANGE = 50;
const RELEASE = 28;
const SLING_GAIN = 1000;
const LOCK_MS = 100;

type NavLinkProps = {
	label: string;
	href: string;
	isPillHere: boolean;
	isActive: boolean;
	setRef: (el: HTMLAnchorElement | null) => void;
	onFocusLink: () => void;
	onSelect: () => void;
};

function NavLink({ label, href, isPillHere, isActive, setRef, onFocusLink, onSelect }: NavLinkProps) {
	return (
		<a
			ref={setRef}
			href={href}
			onClick={onSelect}
			onFocus={onFocusLink}
			className="relative rounded-full px-4 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/40 select-none cursor-pointer">
			<span className="relative z-10 grid">
				<span aria-hidden="true" className="invisible col-start-1 row-start-1 font-semibold">
					{label}
				</span>
				<span
					className={`col-start-1 row-start-1 transition-colors duration-200 ${
						isActive ? 'font-semibold text-[#111318]' : isPillHere ? 'text-[#111318]' : 'text-[#8b8d91]'
					}`}>
					{label}
				</span>
			</span>
		</a>
	);
}

export default function Navbar() {
	const { openContact } = useContactModal();
	const [active, setActive] = useState('');
	const [hovered, setHovered] = useState<string | null>(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);
	const linkEls = useRef<(HTMLAnchorElement | null)[]>([]);
	const current = useRef(-1);
	const cursorX = useRef(0);

	const pillX = useMotionValue(0);
	const pillW = useMotionValue(0);

	const pos = useRef({ x: 0, w: 0 });
	const vel = useRef({ x: 0, w: 0 });

	const snapUntil = useRef(0);
	const lockUntil = useRef(0);
	const raf = useRef<number | null>(null);
	const lastT = useRef(0);

	const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const dimensionsOf = (i: number) => {
		const el = linkEls.current[i];
		if (!el) return { x: 0, w: 0 };
		return { x: el.offsetLeft, w: el.offsetWidth };
	};

	const rubber = (d: number) => MAX_STRETCH * (1 - Math.exp(-Math.abs(d) / RANGE)) * Math.sign(d);

	const getTarget = (snapping: boolean) => {
		const { x, w } = dimensionsOf(current.current);
		if (snapping) return { x, w };
		const mid = x + w / 2;
		const delta = cursorX.current - mid;
		const shift = rubber(delta);
		return { x: x + shift, w };
	};

	const apply = () => {
		pillX.set(pos.current.x);
		pillW.set(Math.max(10, pos.current.w));
	};

	const tick = (t: number) => {
		const dt = Math.min((t - lastT.current) / 1000, 1 / 30);
		lastT.current = t;
		if (current.current < 0) {
			raf.current = null;
			return;
		}
		const snapping = t < snapUntil.current;
		const target = getTarget(snapping);
		const p = pos.current;
		const v = vel.current;
		const spring = snapping ? SNAP : HOLD;

		v.x += (spring.k * (target.x - p.x) - spring.c * v.x) * dt;
		v.w += (spring.k * (target.w - p.w) - spring.c * v.w) * dt;
		p.x += v.x * dt;
		p.w += v.w * dt;

		apply();

		const settled =
			!snapping && Math.abs(target.x - p.x) < 0.05 && Math.abs(target.w - p.w) < 0.05 && Math.abs(v.x) < 0.5 && Math.abs(v.w) < 0.5;

		if (settled) {
			p.x = target.x;
			p.w = target.w;
			v.x = 0;
			v.w = 0;
			apply();
			raf.current = null;
		} else {
			raf.current = requestAnimationFrame(tick);
		}
	};

	const wake = () => {
		if (raf.current === null) {
			lastT.current = performance.now();
			raf.current = requestAnimationFrame(tick);
		}
	};

	useEffect(() => {
		return () => {
			if (raf.current !== null) cancelAnimationFrame(raf.current);
		};
	}, []);

	// Lock body scroll when mobile menu is open
	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isMobileMenuOpen]);

	const appear = (i: number) => {
		current.current = i;
		pos.current = dimensionsOf(i);
		vel.current = { x: 0, w: 0 };
		snapUntil.current = 0;
		apply();
		setHovered(NAV_LINKS[i].id);
		wake();
	};

	const slingTo = (i: number) => {
		const from = dimensionsOf(current.current);
		const to = dimensionsOf(i);
		const dir = to.x > from.x ? 1 : -1;
		vel.current.x += dir * SLING_GAIN;
		const now = performance.now();
		snapUntil.current = now + SNAP_MS;
		lockUntil.current = now + LOCK_MS;
		current.current = i;
		setHovered(NAV_LINKS[i].id);
		wake();
	};

	const commit = (i: number) => {
		if (current.current === i) return;
		if (current.current < 0 || prefersReduced()) {
			appear(i);
			return;
		}
		slingTo(i);
	};

	const handleMove = (e: MouseEvent<HTMLDivElement>) => {
		if (!containerRef.current) return;
		const box = containerRef.current.getBoundingClientRect();
		const x = e.clientX - box.left;
		cursorX.current = x;

		if (current.current < 0) {
			const idx = linkEls.current.findIndex((el) => el && x >= el.offsetLeft && x <= el.offsetLeft + el.offsetWidth);
			if (idx >= 0) appear(idx);
			return;
		}

		if (performance.now() >= lockUntil.current) {
			const idx = linkEls.current.findIndex((el) => el && x >= el.offsetLeft && x <= el.offsetLeft + el.offsetWidth);
			if (idx >= 0 && idx !== current.current) {
				const el = linkEls.current[idx]!;
				const depth = idx > current.current ? x - el.offsetLeft : el.offsetLeft + el.offsetWidth - x;
				if (depth >= Math.min(RELEASE, el.offsetWidth / 2)) commit(idx);
			}
		}
		wake();
	};

	const handleFocusLink = (i: number) => {
		const { x, w } = dimensionsOf(i);
		cursorX.current = x + w / 2;
		commit(i);
	};

	const handleLeave = () => {
		current.current = -1;
		vel.current = { x: 0, w: 0 };
		setHovered(null);
	};

	const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
		if (!e.currentTarget.contains(e.relatedTarget)) handleLeave();
	};

	const scrollToContact = () => {
		openContact();
		setIsMobileMenuOpen(false);
	};

	const [isHidden, setIsHidden] = useState(false);
	const lastScrollY = useRef(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			// Hide on scroll down if scrolled past 50px, show on scroll up
			if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
				setIsHidden(true);
			} else {
				setIsHidden(false);
			}
			lastScrollY.current = currentScrollY;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<MotionConfig reducedMotion="user">
			{/* Mobile Blurred Backdrop */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 z-40 bg-gray-900/15 backdrop-blur-md lg:hidden"
						onClick={() => setIsMobileMenuOpen(false)}
					/>
				)}
			</AnimatePresence>

			<div
				className={`fixed left-1/2 top-5 z-[100] w-[90vw] md:w-[774px] max-w-[774px] h-fit transition-transform duration-300 ease-in-out -translate-x-1/2 ${
					isHidden ? 'translate-y-[-150%] lg:translate-y-0' : 'translate-y-0'
				}`}>
				{/* Main Container*/}
				<div className="w-full h-fit p-[4px] md:p-[6px] rounded-[32px] md:rounded-[36px] border border-[#d9e2e8] backdrop-blur-md transition-all duration-300">
					<div
						className={`bg-white/10 overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'rounded-[20px] shadow-lg' : 'rounded-[28px] md:rounded-[32px]'}`}>
						{/* Inner White Capsule */}
						<div
							className={`bg-white/60 border-1 border-white/40 overflow-hidden transition-all duration-300
									${isMobileMenuOpen ? 'rounded-[20px] shadow-lg' : 'rounded-[26px] md:rounded-[30px]'}`}>
							{/* Top Bar (Always Visible) */}
							<nav aria-label="Main navigation" className="relative flex h-[54px] md:h-[60px] items-center px-4 md:px-5">
								{/* Brand */}
								<a
									href="#top"
									aria-label="Collectedge home"
									className="flex shrink-0 items-center gap-1.5 md:gap-2 text-[14px] md:text-[15px] font-medium text-[#14161a] transition-opacity duration-200 hover:opacity-80">
									<img src={logoImg} alt="" className="h-[20px] md:h-[22px] w-auto" />
									<span>Collectedge</span>
								</a>

								{/* Desktop Physics Links */}
								<div
									ref={containerRef}
									onMouseMove={handleMove}
									onMouseLeave={handleLeave}
									onBlur={handleBlur}
									className="absolute left-1/2 hidden -translate-x-1/2 items-center whitespace-nowrap lg:flex text-[14px] font-normal">
									<motion.span
										aria-hidden="true"
										initial={false}
										animate={{ opacity: hovered ? 1 : 0 }}
										transition={{ duration: 0.18 }}
										style={{ x: pillX, width: pillW, borderRadius: 9999 }}
										className="pointer-events-none absolute inset-y-0 left-0 z-0 select-none">
										<span
											style={{ borderRadius: 9999 }}
											className="
														relative block h-full w-full overflow-hidden
														border border-white/80
														bg-[linear-gradient(180deg,rgba(255,255,255,0.85)_0%,rgba(226,232,240,0.35)_100%)]
														shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_1px_rgba(15,23,42,0.08),0_6px_16px_rgba(15,23,42,0.10),0_1px_2px_rgba(15,23,42,0.08)]
														ring-1 ring-slate-900/[0.06]
													">
											<span
												aria-hidden="true"
												className="pointer-events-none absolute inset-x-[10%] top-[2px] h-[45%] rounded-full bg-gradient-to-b from-white/90 to-white/0"
											/>
											<span
												aria-hidden="true"
												className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_-6px_10px_-4px_rgba(255,255,255,0.9)]"
											/>
										</span>
									</motion.span>

									{NAV_LINKS.map((link, i) => (
										<NavLink
											key={link.id}
											label={link.label}
											href={link.href}
											isPillHere={hovered === link.id}
											isActive={active === link.id}
											setRef={(el) => {
												linkEls.current[i] = el;
											}}
											onFocusLink={() => handleFocusLink(i)}
											onSelect={() => setActive(link.id)}
										/>
									))}
								</div>

								{/* Desktop Contact Button */}
								<div className="ml-auto shrink-0 hidden lg:block">
									<div
										className="group inline-flex cursor-pointer transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] w-[110px] h-[38px] md:w-[132px] md:h-[42px]"
										style={{
											boxSizing: 'border-box',
											padding: '3px',
											borderRadius: '20px',
											background: 'linear-gradient(135deg, #6095DB 0%, #1650EB 100%)',
										}}
										onClick={scrollToContact}>
										<button
											className="pointer-events-none relative flex h-full w-full items-center justify-center overflow-hidden border-none p-0 font-semibold tracking-wide text-white transition-all duration-300 text-[14px]"
											style={{
												boxSizing: 'border-box', // Forces the button to fit within the wrapper padding
												borderRadius: '18px',
												background: 'linear-gradient(135deg, #1952F1 0%, #418DF8 100%)',
												boxShadow: '0 2px 10px rgba(25,82,241,0.28)',
											}}>
											<span
												className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
												style={{
													background: 'linear-gradient(140deg, rgba(255,255,255,0.16) 0%, transparent 55%)',
													borderRadius: 'inherit',
												}}
											/>
											<span className="relative text-[13px] md:text-[14px]">Get in touch</span>
										</button>
									</div>
								</div>

								{/* Mobile Hamburger Toggle */}
								<div className="ml-auto flex shrink-0 items-center lg:hidden h-full">
									<div className="w-[1px] h-6 bg-[#f1f4f9] mr-2" />
									<button
										onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
										className="relative size-9 p-2 text-[#111318] transition-transform active:scale-95 outline-none"
										aria-expanded={isMobileMenuOpen}
										aria-label="Toggle mobile menu">
										<span
											className={`absolute left-2.5 right-2.5 top-[11px] h-[1.5px] origin-center rounded-full bg-current transition-transform duration-200 ${
												isMobileMenuOpen ? 'translate-y-[6px] rotate-45' : ''
											}`}
										/>
										<span
											className={`absolute left-2.5 right-2.5 top-[23px] h-[1.5px] origin-center rounded-full bg-current transition-transform duration-200 ${
												isMobileMenuOpen ? '-translate-y-[6px] -rotate-45' : ''
											}`}
										/>
									</button>
								</div>
							</nav>

							{/* Mobile Dropdown Links Area */}
							<AnimatePresence>
								{isMobileMenuOpen && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: 'auto', opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.3, ease: 'easeInOut' }}
										className="lg:hidden">
										<ul className="flex flex-col px-5 pb-4">
											{[...NAV_LINKS, { id: 'contact', label: 'Contact Us', href: '#contact' }].map((link) => (
												<li key={link.id} className="border-b border-gray-800/10 last:border-none">
													<a
														href={link.href}
														onClick={() => {
															setActive(link.id);
															if (link.id === 'contact') scrollToContact();
															else setIsMobileMenuOpen(false);
														}}
														className={`block py-4 text-[16px] transition-colors duration-200 hover:text-[#3c87f8] ${active === link.id ? 'font-medium text-[#3c87f8]' : 'font-medium text-[#4b5563]'}`}>
														{link.label}
													</a>
												</li>
											))}
										</ul>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>
				</div>
			</div>
		</MotionConfig>
	);
}
