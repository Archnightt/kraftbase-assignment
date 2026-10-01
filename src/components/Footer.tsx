import type { CSSProperties, ReactNode } from 'react';
import CTAButton from './CTAButton';
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { HiOutlineEnvelope, HiOutlineMapPin } from 'react-icons/hi2';

const gradientText = 'bg-gradient-to-r from-[#0a0d2c] to-[#1e3a9e] bg-clip-text text-transparent';

/*
 * Arches = two concentric TRUE semicircles (same radius on x and y), measured from the Figma overlay.
 * Everything is in a 1000-unit-wide space and scales uniformly with the footer width, so they never stretch.
 */
const VB_W = 1000;
const VB_H = 560;
const CX = VB_W / 2;
const OUTER_R = 535;
const INNER_R = 503; // gap between the arches = 32 units (~46px at 1440px)
const PEAK_Y = -(OUTER_R - INNER_R) / 2; // outer peak is 16 units above the logo centre, inner peak 16 below
const CY = PEAK_Y + OUTER_R; // shared centre of both circles

// Logo centre measured from the top of HeroBackdrop: -top-16 (64px) + pt-2 (8px) + half of the 80px logo (40px)
const LOGO_CENTER_PX = 112;

const ARCHES = [{ r: INNER_R }, { r: OUTER_R }];

// Soft fade of the lines as they approach the logo (the logo itself covers the very peak)
const LOGO_FADE = `radial-gradient(circle at 50% ${(-PEAK_Y / VB_H) * 100}%, transparent 40px, black 200px)`;

// Place a point on an arch by radius + angle from vertical (negative = left, positive = right)
const onArch = (r: number, deg: number): CSSProperties => {
	const rad = (deg * Math.PI) / 180;
	return {
		left: `${((CX + r * Math.sin(rad)) / VB_W) * 100}%`,
		top: `${((CY - r * Math.cos(rad) - PEAK_Y) / VB_H) * 100}%`,
	};
};

const socials = [
	{
		label: 'Instagram',
		href: 'https://www.instagram.com/',
		Icon: FaInstagram,
		className: 'text-[#f04b70]',
	},
	{
		label: 'Facebook',
		href: 'https://www.Facebook.com/',
		Icon: FaFacebook,
		className: 'text-[#1e74ed]',
	},
	{
		label: 'YouTube',
		href: 'https://www.youtube.com/',
		Icon: FaYoutube,
		className: 'text-[#ff1f14]',
	},
	{
		label: 'X',
		href: 'https://x.com/',
		Icon: FaXTwitter,
		className: 'text-black',
	},
];

export default function Footer() {
	return (
		<footer id="contact" className="relative overflow-hidden bg-white px-4 pt-8 text-[#111318] sm:px-6 md:pt-14 lg:px-8">
			<div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-t-[44px] bg-white px-5 pt-4 sm:rounded-t-[68px] sm:px-10 md:pt-24 lg:px-16 lg:pt-32">
				<div className="relative mx-auto mb-16 flex min-h-[400px] flex-col items-center justify-start pt-2">
					<HeroBackdrop />

					<div className="relative z-10 mx-auto w-full max-w-[860px] text-center">
						{/* Logo */}
						<div className="mx-auto mb-10 grid size-[64px] place-items-center rounded-full bg-white shadow-[0_12px_38px_rgba(69,101,174,0.10)] sm:mb-12 sm:size-[80px]">
							<img src="/logo.svg" alt="Collectedge" className="h-[28px] w-[28px] object-contain sm:h-[36px] sm:w-[36px]" />
						</div>

						{/* Eyebrow */}
						<p className="mb-4 text-[14px] sm:text-[16px] md:text-[20px] font-semibold bg-gradient-to-r from-[#1952F1] to-[#418DF8] bg-transparent bg-clip-text inline-block text-transparent">
							Contact us
						</p>
						<h2 className="mx-auto max-w-[800px] text-[28px] font-semibold leading-[1.13] tracking-[-0.055em] text-[#07133a] sm:text-[36px] md:text-[44px] lg:text-[48px]">
							We also need to <span className={gradientText}>have contact</span>
							<br />
							form on the <span className={gradientText}>website</span>
						</h2>
						<p className="mx-auto mt-6 max-w-[560px] text-[16px] leading-[1.55] tracking-[-0.02em] text-[#777b84] sm:text-[18px] md:mt-8 md:text-[20px]">
							Our tool is designed with agencies &amp; collection managers in mind, ensuring user-friendly experience tailored to their
							needs.
						</p>

						<div className="mt-7 md:mt-8">
							<CTAButton label="Get Started" size="default" />
						</div>
					</div>
				</div>

				<div className="relative z-10 mx-auto mt-16 grid w-full grid-cols-1 items-start gap-10 text-center lg:mt-24 lg:grid-cols-[1fr_minmax(0,560px)_1fr] lg:text-left">
					<section className="px-2 py-4 lg:py-7">
						<h3 className="text-[16px] font-semibold tracking-[-0.035em] sm:text-[18px]">Navigation</h3>
						<nav aria-label="Footer navigation" className="mt-5">
							<ul className="space-y-3 text-[14px] leading-none text-[#777b84] sm:text-[15px]">
								<li>
									<a href="#top" className="transition-colors hover:text-[#1d61e9]">
										Home
									</a>
								</li>
								<li>
									<a href="#lenders" className="transition-colors hover:text-[#1d61e9]">
										For Lenders
									</a>
								</li>
								<li>
									<a href="#agencies" className="transition-colors hover:text-[#1d61e9]">
										For Collection Agencies
									</a>
								</li>
							</ul>
						</nav>
					</section>

					<section className="flex flex-col items-center px-4 py-4 text-center lg:py-7">
						<a href="#top" className="inline-flex items-center gap-2 text-[20px] font-semibold tracking-[-0.045em] sm:text-[24px]">
							<img src="/logo.svg" alt="" className="size-[28px] object-contain" />
							Collectedge
						</a>
						<p className="mt-5 max-w-[500px] text-[15px] leading-[1.55] tracking-[-0.02em] text-[#777b84] sm:text-[16px]">
							Our tool is designed with agencies &amp; collection managers in mind, ensuring user-friendly experience tailored to their
							needs.
						</p>
					</section>

					<section className="px-2 py-4 lg:ml-auto lg:py-7 lg:text-left">
						<h3 className="text-[16px] font-semibold tracking-[-0.035em] sm:text-[18px]">Contact</h3>
						<ul className="mt-5 space-y-4 text-[14px] leading-[1.35] text-[#777b84] sm:text-[15px]">
							<li className="flex items-center justify-center gap-2.5 lg:justify-start">
								<HiOutlineEnvelope className="size-5 shrink-0 text-[#9da0a6]" aria-hidden="true" />
								<a href="mailto:info@letsdial.com" className="hover:text-[#1d61e9]">
									info@letsdial.com
								</a>
							</li>
							<li className="flex items-start justify-center gap-2.5 lg:justify-start">
								<HiOutlineMapPin className="mt-0.5 size-5 shrink-0 text-[#9da0a6]" aria-hidden="true" />
								<span className="text-center lg:text-left">
									Lorem Ipsum is simply dummy
									<br /> text of the printing
								</span>
							</li>
						</ul>
					</section>
				</div>
			</div>

			<div className="mx-auto w-full max-w-[1440px] border-t border-[#f4f4f4] py-8 text-center text-[14px] tracking-[-0.02em] text-[#9da0a6] md:py-10">
				© 2024, Lorem Ipsum is simply dummy
			</div>
		</footer>
	);
}

function HeroBackdrop() {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute -left-5 -right-5 -top-16 bottom-0 sm:-left-10 sm:-right-10 lg:-left-16 lg:-right-16">
			{/* Glow: ends white well inside the box, fades out at the hero's bottom edge */}
			<div className="absolute inset-0 bg-[radial-gradient(50%_100%_at_50%_100%,#FFFFFF_25%,#CAEBFD_55%,#CED5F9_78%,#FFFFFF_98%)] opacity-60 blur-2xl [mask-image:linear-gradient(to_top,transparent_0%,black_35%)]" />

			<div className="absolute inset-0 hidden md:block">
				{/* Arches: #D9D9D9 @ 40%, fading out towards the footer and around the logo */}
				<div className="absolute inset-0 [mask-image:linear-gradient(to_top,transparent_0%,black_40%)]">
					<ArchFrame style={{ maskImage: LOGO_FADE, WebkitMaskImage: LOGO_FADE }}>
						<svg viewBox={`0 ${PEAK_Y} ${VB_W} ${VB_H}`} className="size-full overflow-visible blur-[9px]" fill="none">
							{ARCHES.map(({ r }) => (
								<path
									key={r}
									d={`M ${CX - r} ${CY} A ${r} ${r} 0 0 1 ${CX + r} ${CY}`}
									stroke="#D9D9D9"
									strokeWidth={10}
									strokeOpacity={0.4}
									vectorEffect="non-scaling-stroke"
								/>
							))}
						</svg>
					</ArchFrame>
				</div>

				{/* Bubbles ride on the same frame, so they stay on the arches at every width */}
				<ArchFrame>
					{/* Outer arch: Instagram (left), YouTube (right) */}
					<SocialBubble social={socials[0]} style={{ ...onArch(OUTER_R, -40), transform: 'rotate(45deg)' }} />
					<SocialBubble social={socials[2]} style={{ ...onArch(OUTER_R, 46), transform: 'rotate(25deg)' }} />

					{/* Inner arch: Facebook (left), X (right) */}
					<SocialBubble social={socials[1]} style={{ ...onArch(INNER_R, -56), transform: 'rotate(45deg)' }} />
					<SocialBubble social={socials[3]} style={{ ...onArch(INNER_R, 59), transform: 'rotate(-45deg)' }} />
				</ArchFrame>
			</div>
		</div>
	);
}

// Square-scaling box (1000 x 560 units) whose arch-peak line passes through the centre of the logo
function ArchFrame({ children, style }: { children: ReactNode; style?: CSSProperties }) {
	return (
		<div
			className="absolute left-0 w-full"
			style={{
				top: LOGO_CENTER_PX,
				aspectRatio: `${VB_W} / ${VB_H}`,
				transform: `translateY(${(PEAK_Y / VB_H) * 100}%)`,
				...style,
			}}>
			{children}
		</div>
	);
}
function SocialBubble({ social, style }: { social: (typeof socials)[number]; style: CSSProperties }) {
	const { Icon } = social;
	return (
		<span
			style={style}
			className="absolute grid size-[48px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-gradient-to-b from-[#f3f4f7]/80 to-[#e5e8f0]/90 shadow-[0_12px_32px_rgba(150,155,170,0.15)] backdrop-blur-md">
			<Icon className={`size-[20px] ${social.className}`} />
		</span>
	);
}
