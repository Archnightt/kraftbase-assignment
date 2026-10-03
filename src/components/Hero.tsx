import { motion } from 'motion/react';
import { PiArrowDownRightBold } from 'react-icons/pi';
import CTAButton from './CTAButton';
import blankCardImg from '../assets/blank.webp';
import BajajImg from '../assets/Bajaj.webp';
import iciciImg from '../assets/ICICI.webp';
import YesBankImg from '../assets/YesBank.webp';
import udaanImg from '../assets/udaan.webp';
import InduslndBankImg from '../assets/Induslnd.webp';
import HealthImg from '../assets/Health.webp';
import AFLImg from '../assets/AFL.webp';
import meterImg from '../assets/meter.svg';
import lightningImg from '../assets/lightning.svg';
import InteractionsImg from '../assets/Interactions.webp';
import DollarImg from '../assets/Dollar.svg';
import RogerImg from '../assets/Roger.webp';
import CheyenneImg from '../assets/Cheyenne.webp';
import DialerImg from '../assets/Dialer.svg';

const avatars = [1, 2, 3];

// Blue gradient glows
const heroBg = {
	background: [
		'radial-gradient(ellipse 46% 40% at 50% 36%, rgba(255,255,255,0.85) 0%, transparent 75%)',
		'radial-gradient(ellipse 36% 55% at 0% 48%, rgba(170,194,250,0.62) 0%, transparent 72%)',
		'radial-gradient(ellipse 36% 58% at 100% 42%, rgba(166,188,248,0.62) 0%, transparent 72%)',
		'radial-gradient(ellipse 55% 36% at 0% 0%, rgba(196,216,255,0.8) 0%, transparent 72%)',
		'linear-gradient(180deg, #eef3ff 0%, #f5f8ff 38%, #fafcff 62%, #edf0fd 100%)',
	].join(', '),
};

const BLANK_CARDS = [
	{ cx: 9.1, cy: 34.5, w: 357, rot: 0 },
	{ cx: 8.6, cy: 59.7, w: 289, rot: -12 },
	{ cx: 90.4, cy: 38.8, w: 357, rot: -8 },
];

// left/top are % of the SECTION, w is vw, rot is degrees.
const CARDS = [
	{
		img: HealthImg,
		alt: 'Operational Health',
		left: -8.73,
		top: 6.24,
		w: 37.62,
		rot: 9.38,
		z: 10,
		fromX: -50,
		delay: 0.3,
		dur: 0.8,
		shadow: 'drop-shadow-[0_18px_30px_rgba(41,67,110,0.12)]',
	},
	{
		img: AFLImg,
		alt: 'AFL Services',
		left: -3.65,
		top: 41.09,
		w: 32.48,
		rot: -5.25,
		z: 10,
		fromX: -50,
		delay: 0.4,
		dur: 0.8,
		shadow: 'drop-shadow-[0_18px_30px_rgba(41,67,110,0.12)]',
	},
	{
		img: InteractionsImg,
		alt: 'Interactions',
		left: 71.21,
		top: 8.86,
		w: 37.96,
		rot: 6.76,
		z: 10,
		fromX: 50,
		delay: 0.3,
		dur: 0.8,
		shadow: 'drop-shadow-[0_18px_30px_rgba(41,67,110,0.12)]',
	},
	{
		img: RogerImg,
		alt: 'Roger Kenter',
		left: 79.63,
		top: 58.59,
		w: 26.97,
		rot: 3.96,
		z: 20,
		fromX: 35,
		delay: 0.55,
		dur: 0.75,
		shadow: 'drop-shadow-[0_14px_24px_rgba(41,67,110,0.12)]',
	},
	{
		img: CheyenneImg,
		alt: 'Cheyenne Gouse',
		left: 71.46,
		top: 48.63,
		w: 37.91,
		rot: -5.49,
		z: 20,
		fromX: 30,
		delay: 0.45,
		dur: 0.75,
		shadow: 'drop-shadow-[0_16px_28px_rgba(41,67,110,0.13)]',
	},
];

// Round icon bubbles. left/top = CENTER of the bubble (% of section); size/glyph in vw.
const ICONS = [
	{ img: meterImg, alt: 'Meter', left: 19.25, top: 25.3, size: 3.9, glyph: 2.2, delay: 0.6 },
	{ img: lightningImg, alt: 'Lightning', left: 5.68, top: 72.4, size: 3.1, glyph: 2.65, delay: 0.7 },
	{ img: DollarImg, alt: 'Dollar', left: 93.8, top: 15.4, size: 4.1, glyph: 2.7, delay: 0.6 },
	{ img: DialerImg, alt: 'Dialer', left: 88.1, top: 56.4, size: 3.7, glyph: 2.6, delay: 0.65 },
];

const MASK =
	'linear-gradient(to right, transparent 0%, transparent 8%, rgba(0,0,0,0.5) 20%, black 34%, black 66%, rgba(0,0,0,0.5) 80%, transparent 92%, transparent 100%)';
const logoMask = { maskImage: MASK, WebkitMaskImage: MASK };

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
            transition-all duration-300
            hover:border-slate-300 hover:bg-white/55 hover:shadow-[0_6px_16px_rgba(41,67,110,0.08)]
          ">
						<img src={logo.src} alt={logo.alt} className="h-5 w-auto transition-transform duration-300 hover:scale-[1.04]" />
					</div>
				))}
			</div>
		);
	}

	return (
		<section
			id="top"
			// Flex layout to prevent vertical overlaps
			className="relative isolate flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#fbfdff]">
			{/* BACKGROUND */}
			<div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20" style={heroBg} />

			{BLANK_CARDS.map((card, i) => (
				<motion.img
					key={i}
					src={blankCardImg}
					alt=""
					aria-hidden="true"
					draggable={false}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.15 + i * 0.08 }}
					className="pointer-events-none absolute -z-10 hidden max-w-none select-none lg:block"
					style={{
						left: `${card.cx}%`,
						top: `${card.cy}%`,
						width: `min(30vw, ${card.w}px)`,
						transform: `translate(-50%, -50%) rotate(${card.rot}deg)`,
					}}
				/>
			))}

			<div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
				{CARDS.map((c) => (
					<div
						key={c.alt}
						className="absolute"
						style={{ left: `${c.left}%`, top: `${c.top}%`, width: `${c.w}vw`, transform: `rotate(${c.rot}deg)`, zIndex: c.z }}>
						<motion.div
							initial={{ opacity: 0, x: c.fromX, y: 20 }}
							animate={{ opacity: 1, x: 0, y: 0 }}
							transition={{ duration: c.dur, delay: c.delay, ease: [0.22, 1, 0.36, 1] }}>
							<div>
								<img src={c.img} alt={c.alt} draggable={false} className={`block w-full max-w-none ${c.shadow}`} />
							</div>
						</motion.div>
					</div>
				))}

				{ICONS.map((ic) => (
					<div
						key={ic.alt}
						className="absolute z-20"
						style={{ left: `${ic.left}%`, top: `${ic.top}%`, transform: 'translate(-50%, -50%)' }}>
						<motion.div
							initial={{ opacity: 0, scale: 0.7 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ type: 'spring', stiffness: 260, damping: 18, delay: ic.delay }}
							className="flex items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(61,93,153,0.12)]"
							style={{
								width: `${ic.size}vw`,
								height: `${ic.size}vw`,
								animationDelay: `${ic.delay + 0.2}s`,
								animationDuration: `${4.8 + ic.delay}s`,
							}}>
							<img src={ic.img} alt={ic.alt} style={{ width: `${ic.glyph}vw`, height: `${ic.glyph}vw` }} />
						</motion.div>
					</div>
				))}
			</div>

			<div className="relative flex flex-grow flex-col items-center justify-center pt-28 pb-12 lg:pt-32 lg:pb-24">
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
						<span className="sm:hidden"> </span>Stage{' '}
						{/* Figma "text selection" highlight: a flat pale-blue rectangle with a solid blue bar on the left */}
						<span className="inline-block border-l-[0.05em] border-[#4C76FF] bg-gradient-to-r from-[#4C76FF]/15 via-[#4C76FF]/[0.07] to-transparent px-[0.14em] py-[0.02em] align-baseline">
							{/* gradient lives on an inner span so it clips to the text only, not the box */}
							<span className="bg-gradient-to-r from-[#060A24] to-[#2A4694] bg-clip-text text-transparent">DPD Resolution.</span>
						</span>
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="mx-auto mb-10 max-w-[720px] text-[16px] font-regular leading-[1.55] text-[#5b5f68] sm:text-[18px] lg:max-w-[620px] lg:text-[19px] lg:leading-[1.45]">
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
											onClick={() => document.getElementById('lenders')?.scrollIntoView({ behavior: 'smooth' })}
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
				// Lifted ~66px from the bottom edge to match the Figma frame
				className="relative z-10 w-full pb-[98px]">
				<div className="mb-[43px] flex items-center justify-center gap-2 text-[14px] text-[#7C8DA8] sm:gap-4 sm:text-[17px]">
					<div className="h-px w-8 border-t border-dashed border-[#CBD5E4] sm:w-16 md:w-24" />
					<p className="whitespace-nowrap font-medium">
						Join <span className="font-bold text-[#263554]">4,000+</span> Companies Already Growing
					</p>
					<div className="h-px w-8 border-t border-dashed border-[#CBD5E4] sm:w-16 md:w-24" />
				</div>

				<div className="relative mx-auto w-full overflow-hidden" style={logoMask}>
					<div className="animate-marquee flex w-max">
						<LogoGroup />
						<LogoGroup />
						<LogoGroup />
						<LogoGroup />
					</div>
				</div>
			</motion.div>

			{/* =========================================================
				SECTION BLEND
			========================================================= */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-40"
				style={{ background: 'linear-gradient(to bottom, transparent 0%, #ffffff 100%)' }}
			/>
		</section>
	);
}
