import { useState, type FocusEvent, type MouseEvent } from 'react';
import { motion, MotionConfig, useMotionValue, useSpring } from 'motion/react';

const NAV_LINKS = [
	{ id: 'home', label: 'Home', href: '#top' },
	{ id: 'lenders', label: 'For Lenders', href: '#lenders' },
	{ id: 'agencies', label: 'For Collection Agencies', href: '#agencies' },
];

// Slow, sticky slide: low stiffness + high mass makes the pill drag behind the cursor, then ease in with a gentle overshoot.
const PILL_SPRING = { type: 'spring', stiffness: 130, damping: 19, mass: 1.2 } as const;
// Soft, heavy spring for the horizontal magnetic pull toward the cursor.
const MAGNET_SPRING = { stiffness: 110, damping: 16, mass: 1 };

type NavLinkProps = {
	label: string;
	href: string;
	isPillHere: boolean;
	isActive: boolean;
	onHover: (el: HTMLElement) => void;
	onMove: (e: MouseEvent<HTMLAnchorElement>) => void;
	onSelect: () => void;
};

function NavLink({ label, href, isPillHere, isActive, onHover, onMove, onSelect }: NavLinkProps) {
	return (
		<a
			href={href}
			onClick={onSelect}
			onMouseEnter={(e) => onHover(e.currentTarget)}
			onFocus={(e) => onHover(e.currentTarget)}
			onMouseMove={onMove}
			className="relative rounded-full px-3.5 py-2 outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/40">
			{/* Label — hidden bold twin reserves width so text never shifts when the weight changes */}
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
	// Position of the hovered link inside the links container (the pill animates to this).
	const [rect, setRect] = useState({ left: 0, width: 0 });

	// Horizontal-only magnetic pull toward the cursor.
	const mx = useMotionValue(0);
	const magnetX = useSpring(mx, MAGNET_SPRING);

	const handleHover = (id: string, el: HTMLElement) => {
		setHovered(id);
		setRect({ left: el.offsetLeft, width: el.offsetWidth });
	};

	const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
		const r = e.currentTarget.getBoundingClientRect();
		mx.set((e.clientX - (r.left + r.width / 2)) * 0.12);
	};

	const handleLeave = () => {
		setHovered(null);
		mx.set(0);
	};

	const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
		if (!e.currentTarget.contains(e.relatedTarget)) handleLeave();
	};

	const scrollToContact = () => {
		const el = document.getElementById('contact') || document.querySelector('footer');
		el?.scrollIntoView({
			behavior: 'smooth',
		});
	};

	return (
		<MotionConfig reducedMotion="user">
			<div className="absolute left-1/2 top-5 z-50 -translate-x-1/2">
				{/* Outer bezel */}
				<div
					className="
          h-[60px] md:h-[75px] w-[calc(100vw-32px)] md:w-[774px] max-w-[774px]
          rounded-[32px] md:rounded-[36px]
          border border-[#d9e2e8]
          bg-[#eaf0f3]
          p-[3px] md:p-[5px]
          shadow-[0_8px_18px_rgba(45,94,132,0.09)]
        ">
					{/* Inner white frame */}
					<div className="h-full rounded-[32px] bg-white p-px">
						{/* Actual navbar */}
						<nav
							aria-label="Main navigation"
							className="
              relative flex h-full items-center
              rounded-[28px] md:rounded-[32px]
              bg-white
              px-3 md:px-5
              backdrop-blur-xl
            ">
							{/* Logo */}
							<a
								href="#top"
								aria-label="Collectedge home"
								className="
                flex shrink-0 items-center gap-1.5 md:gap-2
                text-[15px] md:text-[14px] font-medium
                text-[#14161a]
              ">
								<img src="/logo.svg" alt="" className="h-[20px] md:h-[22px] w-auto" />

								<span>Collectedge</span>
							</a>

							{/* Center navigation */}
							<div
								onMouseLeave={handleLeave}
								onBlur={handleBlur}
								className="
                absolute left-1/2
                hidden -translate-x-1/2
                items-center
                whitespace-nowrap
                lg:flex
                text-[14px]
                font-normal
              ">
								{/* One pill for the whole group: it only animates position/width, so it never cross-fades or distorts */}
								{hovered && (
									<motion.span
										aria-hidden="true"
										initial={false}
										animate={{ x: rect.left, width: rect.width }}
										transition={PILL_SPRING}
										style={{ borderRadius: 9999 }}
										className="pointer-events-none absolute inset-y-0 left-0 z-0">
										{/* Liquid glass: frosted white, bright top edge, soft rim and drop shadow. Sits behind the label so the text stays sharp */}
										<motion.span
											style={{ x: magnetX, borderRadius: 9999 }}
											className="
                        relative block h-full w-full overflow-hidden
                        border border-white/80
                        bg-[linear-gradient(180deg,rgba(255,255,255,0.85)_0%,rgba(226,232,240,0.35)_100%)]
                        shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_1px_rgba(15,23,42,0.08),0_6px_16px_rgba(15,23,42,0.10),0_1px_2px_rgba(15,23,42,0.08)]
                        ring-1 ring-slate-900/[0.06]
                      ">
											{/* Specular highlight along the top */}
											<span
												aria-hidden="true"
												className="pointer-events-none absolute inset-x-[10%] top-[2px] h-[45%] rounded-full bg-gradient-to-b from-white/90 to-white/0"
											/>
											{/* Soft inner rim glow along the bottom */}
											<span
												aria-hidden="true"
												className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_-6px_10px_-4px_rgba(255,255,255,0.9)]"
											/>
										</motion.span>
									</motion.span>
								)}

								{NAV_LINKS.map((link) => (
									<NavLink
										key={link.id}
										label={link.label}
										href={link.href}
										isPillHere={hovered === link.id}
										isActive={active === link.id}
										onHover={(el) => handleHover(link.id, el)}
										onMove={handleMove}
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
											boxSizing: 'border-box', // Forces the button to fit within the wrapper padding
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
