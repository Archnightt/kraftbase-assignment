import { motion } from 'motion/react';
import { ArrowDownRight } from '@phosphor-icons/react';
import CTAButton from './CTAButton';

const avatars = [1, 2, 3];

export default function Hero() {
	const LOGOS = [
		{ src: '/Bajaj.svg', alt: 'Bajaj' },
		{ src: '/icici.svg', alt: 'ICICI' },
		{ src: '/YesBank.svg', alt: 'Yes Bank' },
		{ src: '/udaan.svg', alt: 'Udaan' },
		{ src: '/InduslndBank.svg', alt: 'IndusInd Bank' },
	];

	function LogoGroup() {
		return (
			<div className="flex shrink-0 items-center gap-5 px-2">
				{LOGOS.map((logo, index) => (
					<div
						key={`${logo.alt}-${index}`}
						className="
            flex h-[58px] w-[165px] shrink-0
            items-center justify-center
            rounded-[14px]
            border border-slate-200/80
            bg-white/20
          ">
						<img src={logo.src} alt={logo.alt} className="h-6 w-auto" />
					</div>
				))}
			</div>
		);
	}

	return (
		<section
			id="top"
			className="relative isolate min-h-screen overflow-hidden bg-[#fbfdff] px-4 pt-28 pb-8 sm:px-6 lg:h-screen lg:min-h-[900px] lg:px-8 lg:pt-0 lg:pb-0">
			{/* =========================================================
				BACKGROUND
			========================================================= */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_46%_44%_at_0%_35%,rgba(112,151,255,0.23),transparent_74%),radial-gradient(ellipse_46%_46%_at_100%_34%,rgba(106,145,255,0.22),transparent_74%),radial-gradient(ellipse_58%_34%_at_50%_100%,rgba(148,179,255,0.19),transparent_72%),linear-gradient(180deg,#edf5ff_0%,#f8fbff_29%,#ffffff_70%,#f4f8ff_100%)]"
			/>

			{/* =========================================================
				LARGE BACKGROUND FILLER SHAPES
			========================================================= */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -left-[11%] top-[12%] -z-10 hidden h-[650px] w-[440px] -rotate-[15deg] rounded-[48px] border border-white/70 bg-white/40 shadow-[0_8px_40px_rgba(54,88,148,0.05)] backdrop-blur-md lg:block"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -right-[11%] top-[15%] -z-10 hidden h-[570px] w-[470px] rotate-[15deg] rounded-[48px] border border-white/70 bg-white/40 shadow-[0_8px_40px_rgba(54,88,148,0.05)] backdrop-blur-md lg:block"
			/>

			{/* =========================================================
				LEFT — OPERATIONAL HEALTH
				Figma: larger, farther left, noticeably higher.
			========================================================= */}
			<motion.div
				initial={{ opacity: 0, x: -50, y: 20 }}
				animate={{ opacity: 1, x: 0, y: 0 }}
				transition={{ duration: 0.8, delay: 0.3 }}
				className="pointer-events-none absolute left-[-9.8%] top-[2%] z-10 hidden -rotate-[12deg] lg:block">
				<img src="/Health.png" alt="Operational Health" className="w-[510px] max-w-none drop-shadow-[0_18px_30px_rgba(41,67,110,0.12)]" />
			</motion.div>

			{/* LEFT — AFL SERVICES */}
			<motion.div
				initial={{ opacity: 0, x: -50, y: 20 }}
				animate={{ opacity: 1, x: 0, y: 0 }}
				transition={{ duration: 0.8, delay: 0.4 }}
				className="pointer-events-none absolute left-[-6.2%] top-[35%] z-10 hidden -rotate-[12deg] lg:block">
				<img src="/AFL.png" alt="AFL Services" className="w-[460px] max-w-none drop-shadow-[0_18px_30px_rgba(41,67,110,0.12)]" />
			</motion.div>

			{/* LEFT — METER ICON */}
			<motion.div
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, delay: 0.6 }}
				className="pointer-events-none absolute left-[16.6%] top-[16.5%] z-20 hidden h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(61,93,153,0.12)] lg:flex">
				<img src="/meter.svg" alt="Meter" className="h-8 w-8" />
			</motion.div>

			{/* LEFT — LIGHTNING ICON */}
			<motion.div
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, delay: 0.7 }}
				className="pointer-events-none absolute left-[2%] top-[66%] z-20 hidden h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(61,93,153,0.12)] lg:flex">
				<img src="/lightning.svg" alt="Lightning" className="h-8 w-8" />
			</motion.div>

			{/* =========================================================
				RIGHT — INTERACTIONS
				Figma: slightly larger and pushed a little farther in.
			========================================================= */}
			<motion.div
				initial={{ opacity: 0, x: 50, y: 20 }}
				animate={{ opacity: 1, x: 0, y: 0 }}
				transition={{ duration: 0.8, delay: 0.3 }}
				className="pointer-events-none absolute right-[-6.5%] top-[9%] z-10 hidden rotate-[12deg] lg:block">
				<img src="/Interactions.png" alt="Interactions" className="w-[475px] max-w-none drop-shadow-[0_18px_30px_rgba(41,67,110,0.12)]" />
			</motion.div>

			{/* RIGHT — DOLLAR ICON */}
			<motion.div
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, delay: 0.6 }}
				className="pointer-events-none absolute right-[4.8%] top-[10%] z-20 hidden h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(61,93,153,0.12)] lg:flex">
				<img src="/Dollar.svg" alt="Dollar" className="h-8 w-8" />
			</motion.div>

			{/* =========================================================
				RIGHT — STAFF PROFILE CARDS
				Cheyenne sits directly beneath the dialer icon, with Roger
				offset underneath to recreate the layered Figma composition.
			========================================================= */}
			<div className="pointer-events-none absolute right-[-1.5%] top-[42%] z-20 hidden h-[300px] w-[380px] lg:block">
				<motion.div
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.65 }}
					className="absolute left-[104px] top-0 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(61,93,153,0.12)]">
					<img src="/Dialer.svg" alt="Dialer" className="h-8 w-8" />
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 30, y: 20 }}
					animate={{ opacity: 1, x: 0, y: 0 }}
					transition={{ duration: 0.75, delay: 0.45 }}
					className="absolute left-0 top-[34px] rotate-[3deg]">
					<img src="/Cheyenne.png" alt="Cheyenne Gouse" className="w-[355px] max-w-none drop-shadow-[0_16px_28px_rgba(41,67,110,0.13)]" />
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 35, y: 20 }}
					animate={{ opacity: 1, x: 0, y: 0 }}
					transition={{ duration: 0.75, delay: 0.55 }}
					className="absolute left-[126px] top-[144px] rotate-[2deg]">
					<img src="/Roger.png" alt="Roger Kenter" className="w-[230px] max-w-none drop-shadow-[0_14px_24px_rgba(41,67,110,0.12)]" />
				</motion.div>
			</div>

			{/* =========================================================
				MAIN HERO CONTENT
				Anchored rather than vertically centered so the Figma
				spacing stays stable across tall desktop viewports.
			========================================================= */}
			<div className="relative z-30 mx-auto flex w-full max-w-[1160px] flex-col items-center text-center lg:absolute lg:left-1/2 lg:top-[17.5%] lg:-translate-x-1/2">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mb-7 inline-flex items-center gap-3 text-[15px] font-medium text-slate-500 sm:text-[16px]">
					<div className="flex -space-x-2">
						{avatars.map((i) => (
							<div key={i} className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-slate-200 shadow-sm">
								<img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="" className="h-full w-full object-cover" />
							</div>
						))}

						<div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#5A87F7] text-[11px] font-bold text-white shadow-sm">
							+5K
						</div>
					</div>

					<span>Businesses Rely On Collectedge</span>
				</motion.div>

				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="mb-7 text-[52px] font-bold leading-[1.03] tracking-[-0.045em] text-[#080A1B] sm:text-[62px] md:text-[70px] lg:text-[80px] xl:text-[82px]">
					Unified Platform for Late-
					<br />
					Stage <span className="mx-1 font-light text-blue-500 lg:mx-2">|</span>
					<span className="relative inline-block text-[#29468F]">
						DPD Resolution.
						<svg
							className="absolute -bottom-2 left-0 h-3 w-full opacity-80"
							viewBox="0 0 200 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							preserveAspectRatio="none">
							<path d="M2 9.5C50 3.5 150 2 198 8" stroke="#29468F" strokeWidth="2.5" strokeLinecap="round" />
						</svg>
					</span>
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mb-10 max-w-[720px] text-[17px] font-medium leading-[1.55] text-slate-500 sm:text-[18px]">
					Our tool is designed with agencies &amp; collection managers in mind, ensuring user-friendly experience tailored to their needs
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="flex flex-col items-center justify-center gap-4 sm:flex-row">
					<CTAButton label="Get free Trial" />

					<div className="group inline-flex transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]">
						<div
							className="rounded-[24px] p-1"
							style={{
								background: '#00000014',
								boxShadow: '0 2px 16px rgba(0,0,0,0.07), 0 0 0 0.5px rgba(0,0,0,0.04)',
							}}>
							<div className="rounded-[20px] bg-white p-1">
								<div
									className="rounded-[16px] p-px"
									style={{
										background: 'linear-gradient(135deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.03) 100%)',
									}}>
									<button
										type="button"
										className="relative flex cursor-pointer items-center justify-center gap-2 rounded-[15px] bg-white px-7 py-[13px] text-sm font-semibold tracking-wide text-slate-700 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all duration-300 hover:bg-slate-50">
										<span>How We work</span>
										<span className="inline-flex transition-transform duration-300 ease-out group-hover:translate-x-[2px] group-hover:translate-y-[2px]">
											<ArrowDownRight size={15} weight="bold" />
										</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</div>

			{/* =========================================================
				COMPANIES / LOGO MARQUEE
				Moved substantially upward and visually reduced to match Figma.
			========================================================= */}

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.4 }}
				className="
					relative z-10
					mt-16 w-full
					lg:absolute lg:bottom-[11vh] lg:left-0 lg:mt-0
				">
				{/* Heading */}
				<div className="mb-7 flex items-center justify-center gap-4 text-[17px] text-[#7C8DA8]">
					<div className="h-px w-16 border-t border-dashed border-[#CBD5E4] sm:w-24" />

					<p className="whitespace-nowrap font-medium">
						Join <span className="font-bold text-[#263554]">4,000+</span> Companies Already Growing
					</p>

					<div className="h-px w-16 border-t border-dashed border-[#CBD5E4] sm:w-24" />
				</div>

				<style>{`
					@keyframes marquee {
						from {
							transform: translateX(0);
						}

						to {
							transform: translateX(-50%);
						}
					}

					.animate-marquee {
						animation: marquee 30s linear infinite;
						will-change: transform;
					}

					.animate-marquee:hover {
						animation-play-state: paused;
					}

					@media (prefers-reduced-motion: reduce) {
						.animate-marquee {
							animation: none;
						}
					}
				`}</style>

				{/* Logo viewport */}
				<div className="relative mx-auto max-w-[1450px] overflow-hidden">
					{/* Scrolling logos */}
					<div className="animate-marquee flex w-max">
						<LogoGroup />
						<LogoGroup />
					</div>

					{/* Left white fade */}
					<div
						className="
							pointer-events-none
							absolute inset-y-0 left-0 z-10
							w-[400px]
							bg-gradient-to-r
							from-[#f8fbff]
							via-[#f8fbff]/80
							to-transparent
						"
					/>

					{/* Right white fade */}
					<div
						className="
							pointer-events-none
							absolute inset-y-0 right-0 z-10
							w-[400px]
							bg-gradient-to-l
							from-[#f8fbff]
							via-[#f8fbff]/80
							to-transparent
						"
					/>
				</div>
			</motion.div>
		</section>
	);
}
