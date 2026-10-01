import { useEffect, useRef, useState, type FocusEvent, type MouseEvent } from 'react';
import { motion, MotionConfig, useMotionValue } from 'motion/react';

const NAV_LINKS = [
	{ id: 'home', label: 'Home', href: '#top' },
	{ id: 'lenders', label: 'For Lenders', href: '#lenders' },
	{ id: 'agencies', label: 'For Collection Agencies', href: '#agencies' },
];

/* ---------- Solid Glass Physics & Slingshot ---------- */
const HOLD = { k: 200, c: 20 }; // Rigid and heavy while dragging inside a link
const SNAP = { k: 220, c: 22 }; // Clean, rigid spring for the flight to the new link
const SNAP_MS = 500;

const MAX_STRETCH = 12; // Maximum pixels the rigid block can be magnetically pulled off-center
const RANGE = 50; // Sensitivity of the magnetic pull
const RELEASE = 28; // Distance into the next link before breaking away
const SLING_GAIN = 1000; // Velocity injected into the X-axis upon release for the slingshot effect
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
	const [active, setActive] = useState('');
	const [hovered, setHovered] = useState<string | null>(null);

	const containerRef = useRef<HTMLDivElement>(null);
	const linkEls = useRef<(HTMLAnchorElement | null)[]>([]);
	const current = useRef(-1);
	const cursorX = useRef(0);

	const pillX = useMotionValue(0);
	const pillW = useMotionValue(0);

	// Track center position (x) and width (w) to keep shape completely rigid
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

		// The entire pill shifts off-center rigidly. The width 'w' never changes.
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

		// Apply spring physics to position (x) and width (w)
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

		// Inject a burst of velocity into the X axis to create the slingshot release
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
		const el = document.getElementById('contact') || document.querySelector('footer');
		el?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<MotionConfig reducedMotion="user">
			<div className="absolute left-1/2 top-5 z-50 -translate-x-1/2">
				<div className="h-[60px] md:h-[75px] w-[calc(100vw-32px)] md:w-[774px] max-w-[774px] rounded-[32px] md:rounded-[36px] border border-[#d9e2e8] bg-[#eaf0f3] p-[3px] md:p-[5px] shadow-[0_8px_18px_rgba(45,94,132,0.09)]">
					<div className="h-full rounded-[32px] bg-white p-px">
						<nav
							aria-label="Main navigation"
							className="relative flex h-full items-center rounded-[28px] md:rounded-[32px] bg-white px-3 md:px-5 backdrop-blur-xl">
							<a
								href="#top"
								aria-label="Collectedge home"
								className="flex shrink-0 items-center gap-1.5 md:gap-2 text-[15px] md:text-[14px] font-medium text-[#14161a]">
								<img src="/logo.svg" alt="" className="h-[20px] md:h-[22px] w-auto" />
								<span>Collectedge</span>
							</a>

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

							{/* CTA */}
							<div className="ml-auto shrink-0">
								<div
									className="group inline-flex cursor-pointer transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] w-[110px] h-[38px] md:w-[132px] md:h-[42px]"
									style={{
										boxSizing: 'border-box',
										padding: '3px', // Outermost boundary remains exactly 142x48
										borderRadius: '20px',
										background: 'linear-gradient(135deg, #6095DB 0%, #1650EB 100%)',
									}}
									onClick={scrollToContact}>
									<button
										className="pointer-events-none relative flex h-full w-full items-center justify-center overflow-hidden border-none p-0 font-semibold tracking-wide text-white transition-all duration-300 text-[14px]"
										style={{
											boxSizing: 'border-box', // 👈 Forces the button to fit within the wrapper padding
											borderRadius: '18px',
											background: 'linear-gradient(135deg, #1952F1 0%, #418DF8 100%)',
											boxShadow: '0 2px 10px rgba(25,82,241,0.28)',
										}}>
										{/* Shimmer highlight — fades in on hover */}
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
						</nav>
					</div>
				</div>
			</div>
		</MotionConfig>
	);
}
