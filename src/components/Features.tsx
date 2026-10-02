import { PiUsersFill, PiToggleLeftFill, PiChartLineUpFill, PiMagnifyingGlassBold } from 'react-icons/pi';
import type { IconType } from 'react-icons';
import staffImg from '../assets/staff.webp';
import apiIntegrationImg from '../assets/API_Integration.webp';
import drivenByDataImg from '../assets/DrivenByData.webp';
import aflImg from '../assets/AFL-Enquiry.webp';

const gradientText = 'bg-gradient-to-r from-[#0a0d2c] to-[#1e3a9e] bg-clip-text text-transparent';

// Soft lavender glow on the edges of the section
const sectionBg = {
	background: [
		'radial-gradient(60% 45% at 0% 8%, #eaf1ff 0%, transparent 70%)',
		'radial-gradient(45% 55% at 100% 35%, #e4e6fb 0%, transparent 70%)',
		'radial-gradient(80% 35% at 50% 100%, #ebedfc 0%, transparent 70%)',
		'#ffffff',
	].join(', '),
};

type Feature = {
	title: string;
	description: string;
	Icon: IconType;
	img: string;
	alt: string;
	fit: { w: number; x: number; mt: number; mb: number };
	cell: string;
};

const features: Feature[] = [
	{
		title: 'Intuitive & Agent Focused',
		description:
			'Our tool is designed with agencies & collection managers in mind, ensuring user-friendly experience tailored to their needs',
		Icon: PiUsersFill,
		img: staffImg,
		alt: 'Staff',
		fit: { w: 107, x: -3.5, mt: 0, mb: -14 },
		cell: 'border-b md:border-r',
	},
	{
		title: 'Highly Customizable',
		description:
			'Our tool is designed with agencies & collection managers in mind, ensuring user-friendly experience tailored to their needs',
		Icon: PiToggleLeftFill,
		img: apiIntegrationImg,
		alt: 'API Integration',
		fit: { w: 101, x: -1.3, mt: -32, mb: 36 },
		cell: 'border-b md:pl-[54px]',
	},
	{
		title: 'Driven by Data',
		description: 'Our data-driven approach equips collection managers with insights to make informed & actionable decisions',
		Icon: PiChartLineUpFill,
		img: drivenByDataImg,
		alt: 'Driven by Data',
		fit: { w: 130, x: -17.6, mt: -64, mb: -89 },
		cell: 'border-b md:border-b-0 md:border-r',
	},
	{
		title: 'Discover Agency partners',
		description: 'Discover top-performing, tech-driven agencies designed to deliver results with minimal overhead.',
		Icon: PiMagnifyingGlassBold,
		img: aflImg,
		alt: 'Discover Agency Partners',
		fit: { w: 109, x: -5.5, mt: -51, mb: -20 },
		cell: 'md:pl-[54px]',
	},
];

export default function Features() {
	return (
		<section id="lenders" className="pt-14 pb-6 px-4 md:px-8 relative overflow-x-clip" style={sectionBg}>
			{/* Top fade */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute top-0 left-0 right-0 h-32 z-0"
				style={{ background: 'linear-gradient(to bottom, #ffffff 0%, transparent 100%)' }}
			/>
			{/* Bottom fade */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 z-0"
				style={{ background: 'linear-gradient(to bottom, transparent 0%, #ffffff 100%)' }}
			/>
			<div className="max-w-[1252px] mx-auto text-center mb-12 relative z-10">
				<p className="mb-4 text-[14px] sm:text-[16px] md:text-[20px] font-semibold bg-gradient-to-r from-[#1952F1] to-[#418DF8] bg-transparent bg-clip-text inline-block text-transparent">
					For Lenders
				</p>
				<h2 className="text-[32px] text-black md:text-[42px] font-semibold tracking-[-0.03em] max-w-[700px] mx-auto leading-[1.2] md:leading-[1.33]">
					We're changing the game with <span className={gradientText}>one complete agency management tool</span>
				</h2>
			</div>

			<div className="max-w-[1252px] mx-auto border-t border-[#e8eaf3] relative z-10">
				<div className="grid md:grid-cols-2">
					{features.map(({ title, description, Icon, img, alt, fit, cell }) => (
						<div key={title} className={`border-[#e8eaf3] flex flex-col ${cell}`}>
							<div className="pt-10 md:pt-12 md:max-w-[549px] box-content flow-root">
								<h3 className="relative z-10 text-[24px] md:text-[28px] font-semibold tracking-[-0.02em] mb-5 flex items-center justify-center md:justify-start text-center md:text-left gap-3">
									<Icon size={28} className="shrink-0" />
									<span className={gradientText}>{title}</span>
								</h3>
								<p className="relative z-0 text-[#6b6f7b] text-[16px] md:text-[19px] leading-[1.4] mb-8 text-center md:text-left">
									{description}
								</p>
								<img
									src={img}
									alt={alt}
									draggable={false}
									className="block h-auto max-w-none pointer-events-none select-none"
									style={{
										width: `${fit.w}%`,
										marginLeft: `${fit.x}%`,
										marginTop: `${fit.mt}px`,
										marginBottom: `${fit.mb}px`,
									}}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
