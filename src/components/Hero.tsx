import { motion } from 'motion/react';
import { PiArrowDownRightBold } from 'react-icons/pi';
import CTAButton from './CTAButton';
import blankCardImg from '../assets/blank-card.png';
import BajajImg from '../assets/Bajaj.svg';
import iciciImg from '../assets/icici.svg';
import YesBankImg from '../assets/YesBank.svg';
import udaanImg from '../assets/udaan.svg';
import InduslndBankImg from '../assets/InduslndBank.svg';
import HealthImg from '../assets/Health.png';
import AFLImg from '../assets/AFL.png';
import meterImg from '../assets/meter.svg';
import lightningImg from '../assets/lightning.svg';
import InteractionsImg from '../assets/Interactions.png';
import DollarImg from '../assets/Dollar.svg';
import RogerImg from '../assets/Roger.png';
import CheyenneImg from '../assets/Cheyenne.png';
import DialerImg from '../assets/Dialer.svg';

const avatars = [1, 2, 3];

// Bluer wash like the Figma: pale blue top-left, periwinkle glow on both side edges and along the
// bottom, lighter area behind the headline. Raise/lower the rgba alpha (last number) to tune strength.
const heroBg = {
	background: [
		'radial-gradient(ellipse 46% 40% at 50% 36%, rgba(255,255,255,0.85) 0%, transparent 75%)',
		'radial-gradient(ellipse 36% 55% at 0% 48%, rgba(170,194,250,0.62) 0%, transparent 72%)',
		'radial-gradient(ellipse 36% 58% at 100% 42%, rgba(166,188,248,0.62) 0%, transparent 72%)',
		'radial-gradient(ellipse 55% 36% at 0% 0%, rgba(196,216,255,0.8) 0%, transparent 72%)',
		'linear-gradient(180deg, #eef3ff 0%, #f5f8ff 38%, #fafcff 62%, #edf0fd 100%)',
	].join(', '),
};

// Blank frosted cards behind the real cards, placed from the Figma outline.
const BLANK_CARDS = [
	{ cx: 9.1, cy: 34.5, w: 357, rot: 0 },
	{ cx: 8.6, cy: 59.7, w: 289, rot: -12 },
	{ cx: 90.4, cy: 38.8, w: 357, rot: -8 },
];

const logoMask = {
	maskImage: 'linear-gradient(to right, transparent 0%, black 22%, black 78%, transparent 100%)',
	WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 22%, black 78%, transparent 100%)',
};

export default function Hero() {
	const LOGOS = [
		{ src: BajajImg, alt: 'Bajaj' },
		{ src: iciciImg, alt: 'ICICI' },
		{ src: YesBankImg, alt: 'Yes Bank' },
		{ src: udaanImg, alt: 'Udaan' },
		{ src: InduslndBankImg, alt: 'IndusInd Bank' },
	];

	function LogoGroup() {
		return (
			<div className="flex shrink-0 items-center gap-6 pr-6">
				{LOGOS.map((logo, index) => (
					<div
						key={`${logo.alt}-${index}`}
						className="
            flex h-[48px] shrink-0
            items-center justify-center
            rounded-[12px]
            border border-slate-200/80
            bg-white/20 px-[18px]
          ">
						<img src={logo.src} alt={logo.alt} className="h-5 w-auto" />
					</div>
				))}
			</div>
		);
	}

	return (
		<section
			id="top"
			// Flex layout ensures natural flow to prevent vertical overlaps
			className="relative isolate flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#fbfdff]">
			{/* =========================================================
				BACKGROUND
			========================================================= */}
			<div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20" style={heroBg} />

			{/* =========================================================
				BLANK FILLER CARDS
			========================================================= */}
			{BLANK_CARDS.map((card, i) => (
				<img
					key={i}
					src={blankCardImg}
					alt=""
					aria-hidden="true"
					draggable={false}
					className="pointer-events-none absolute -z-10 hidden max-w-none select-none lg:block"
					style={{
						left: `${card.cx}%`,
						top: `${card.cy}%`,
						// Responsive scaling for blank cards
						width: `min(30vw, ${card.w}px)`,
						transform: `translate(-50%, -50%) rotate(${card.rot}deg)`,
					}}
				/>
			))}

			{/* =========================================================
				MAIN CONTENT WRAPPER 
				(Groups floating elements & central text together)
			========================================================= */}
			<div className="relative flex flex-grow flex-col items-center justify-center pt-28 pb-12 lg:pt-32 lg:pb-24">
				{/* -- LEFT ASSETS -- */}
				<motion.div
					initial={{ opacity: 0, x: -50, y: 20 }}
					animate={{ opacity: 1, x: 0, y: 0 }}
					transition={{ duration: 0.8, delay: 0.3 }}
					className="pointer-events-none absolute left-[-10%] top-[5%] z-10 hidden rotate-[10deg] lg:block 2xl:left-[-13.2%]">
					<img
						src={HealthImg}
						alt="Operational Health"
						className="w-[min(38vw,643px)] max-w-none drop-shadow-[0_18px_30px_rgba(41,67,110,0.12)]"
					/>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: -50, y: 20 }}
					animate={{ opacity: 1, x: 0, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					className="pointer-events-none absolute left-[-2%] top-[45%] z-10 hidden -rotate-[8deg] lg:block 2xl:left-[-4.8%]">
					<img
						src={AFLImg}
						alt="AFL Services"
						className="w-[min(28vw,460px)] max-w-none drop-shadow-[0_18px_30px_rgba(41,67,110,0.12)]"
					/>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.6 }}
					className="pointer-events-none absolute left-[15%] top-[25%] z-20 hidden h-[60px] w-[60px] items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(61,93,153,0.12)] lg:flex">
					<img src={meterImg} alt="Meter" className="h-10 w-10" />
				</motion.div>

				<motion.div
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.7 }}
					className="pointer-events-none absolute left-[5%] top-[70%] z-20 hidden h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(61,93,153,0.12)] lg:flex">
					<img src={lightningImg} alt="Lightning" className="h-8 w-8" />
				</motion.div>

				{/* -- RIGHT ASSETS -- */}
				<motion.div
					initial={{ opacity: 0, x: 50, y: 20 }}
					animate={{ opacity: 1, x: 0, y: 0 }}
					transition={{ duration: 0.8, delay: 0.3 }}
					className="pointer-events-none absolute right-[-12%] top-[8%] z-10 hidden rotate-[8deg] lg:block 2xl:right-[-16.1%]">
					<img
						src={InteractionsImg}
						alt="Interactions"
						className="w-[min(40vw,655px)] max-w-none drop-shadow-[0_18px_30px_rgba(41,67,110,0.12)]"
					/>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.6 }}
					className="pointer-events-none absolute right-[6%] top-[15%] z-20 hidden h-[62px] w-[62px] items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(61,93,153,0.12)] lg:flex">
					<img src={DollarImg} alt="Dollar" className="h-10 w-10" />
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 35, y: 20 }}
					animate={{ opacity: 1, x: 0, y: 0 }}
					transition={{ duration: 0.75, delay: 0.55 }}
					className="pointer-events-none absolute right-[-5%] top-[65%] z-20 hidden rotate-[2deg] lg:block 2xl:right-[-6.7%]">
					<img
						src={RogerImg}
						alt="Roger Kenter"
						className="w-[min(25vw,396px)] max-w-none drop-shadow-[0_14px_24px_rgba(41,67,110,0.12)]"
					/>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 30, y: 20 }}
					animate={{ opacity: 1, x: 0, y: 0 }}
					transition={{ duration: 0.75, delay: 0.45 }}
					className="pointer-events-none absolute right-[-8%] top-[52%] z-20 hidden rotate-[1deg] lg:block 2xl:right-[-9.7%]">
					<img
						src={CheyenneImg}
						alt="Cheyenne Gouse"
						className="w-[min(35vw,561px)] max-w-none drop-shadow-[0_16px_28px_rgba(41,67,110,0.13)]"
					/>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.65 }}
					className="pointer-events-none absolute right-[12%] top-[58%] z-20 hidden h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(61,93,153,0.12)] lg:flex">
					<img src={DialerImg} alt="Dialer" className="h-9 w-9" />
				</motion.div>

				{/* -- CENTRAL TEXT -- */}
				<div className="relative z-30 mx-auto w-full max-w-[1160px] px-4 text-center sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="mb-7 inline-flex items-center gap-3 text-[14px] font-medium text-slate-500 sm:text-[16px]">
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
						// Smoothed out heading breakpoints to wrap gracefully on tablets
						className="mx-auto mb-7 max-w-[900px] text-[36px] font-semibold leading-[1.05] tracking-[-0.045em] text-[#080A1B] sm:text-[46px] md:text-[56px] lg:text-[70px] xl:text-[82px]">
						Unified Platform for Late-
						<br className="hidden sm:block" />
						<span className="sm:hidden"> </span>Stage <span className="mx-1 font-light text-blue-500 lg:mx-2">|</span>
						<span className="relative inline-block text-[#29468F]">DPD Resolution.</span>
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="mx-auto mb-10 max-w-[720px] text-[16px] font-medium leading-[1.55] text-slate-500 sm:text-[18px]">
						Our tool is designed with agencies &amp; collection managers in mind, ensuring user-friendly experience tailored to their needs
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="flex flex-col items-center justify-center gap-4 sm:flex-row">
						<div className="relative">
							<div
								aria-hidden="true"
								className="pointer-events-none absolute left-1/2 top-[70%] -z-10 h-[120px] w-[300px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_30%,rgba(76,118,255,0.42),transparent_68%)] blur-[18px]"
							/>
							<CTAButton label="Get free Trial" />
						</div>

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
												<PiArrowDownRightBold size={15} />
											</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>

			{/* =========================================================
				COMPANIES / LOGO MARQUEE
			========================================================= */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.4 }}
				// Placed naturally at the bottom of the flex container
				className="relative z-10 w-full pb-8">
				<div className="mb-7 flex items-center justify-center gap-2 text-[14px] text-[#7C8DA8] sm:gap-4 sm:text-[17px]">
					<div className="h-px w-8 border-t border-dashed border-[#CBD5E4] sm:w-16 md:w-24" />
					<p className="whitespace-nowrap font-medium">
						Join <span className="font-bold text-[#263554]">4,000+</span> Companies Already Growing
					</p>
					<div className="h-px w-8 border-t border-dashed border-[#CBD5E4] sm:w-16 md:w-24" />
				</div>

				<style>{`
					@keyframes marquee {
						from { transform: translateX(0); }
						to { transform: translateX(-50%); }
					}
					.animate-marquee {
						animation: marquee 30s linear infinite;
						will-change: transform;
					}
					.animate-marquee:hover {
						animation-play-state: paused;
					}
					@media (prefers-reduced-motion: reduce) {
						.animate-marquee { animation: none; }
					}
				`}</style>

				<div className="relative mx-auto max-w-[1450px] overflow-hidden" style={logoMask}>
					<div className="animate-marquee flex w-max">
						<LogoGroup />
						<LogoGroup />
						<LogoGroup />
						<LogoGroup />
					</div>
				</div>
			</motion.div>

			{/* =========================================================
				BOTTOM SECTION BLEND
			========================================================= */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-40"
				style={{ background: 'linear-gradient(to bottom, transparent 0%, #ffffff 100%)' }}
			/>
		</section>
	);
}
