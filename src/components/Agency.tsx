import { useState } from 'react';
import ChartSvg from '../assets/Chart.svg';
import icon1 from '../assets/icon1.svg';
import icon2 from '../assets/icon2.svg';
import icon3 from '../assets/icon3.svg';

const gradientText = 'bg-gradient-to-r from-[#0a0d2c] to-[#1e3a9e] bg-clip-text text-transparent';

export default function Agency() {
	const [activeTab, setActiveTab] = useState('growth');

	const items = [
		{
			title: 'Get more volume in your serviceable pincodes',
			icon: <img src={icon1} alt="Icon 1" className="w-8 h-8" />,
		},
		{
			title: 'Manage all allocations on a single tool allowing you to maximize resource utilization.',
			icon: <img src={icon2} alt="Icon 2" className="w-8 h-8" />,
		},
		{
			title: 'Discover pincodes with high potential to expand your serviceability',
			icon: <img src={icon3} alt="Icon 3" className="w-8 h-8" />,
		},
	];

	return (
		<section id="agencies" className="py-14 px-4 relative overflow-hidden bg-gradient-to-b from-white via-[#F0F8FF]/20 to-white">
			{/* Top fade */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute top-0 left-0 right-0 h-32 z-0"
				style={{ background: 'linear-gradient(to bottom, #ffffff 0%, transparent 100%)' }}
			/>

			{/* Bottom fade - FIXED: Added bottom-0 */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 z-0"
				style={{ background: 'linear-gradient(to bottom, transparent 0%, #ffffff 100%)' }}
			/>

			<div className="max-w-6xl mx-auto relative z-10">
				{/* Header */}
				<div className="text-center mb-10">
					<p className="mb-4 text-[14px] sm:text-[16px] md:text-[20px] font-semibold bg-gradient-to-r from-[#1952F1] to-[#418DF8] bg-transparent bg-clip-text inline-block text-transparent">
						For Agencies
					</p>
					<h2 className="text-[32px] md:text-[44px] font-semibold text-[#07133a] tracking-[-0.03em] max-w-5xl mx-auto leading-[1.2] mb-8">
						We fuel demand and empower agencies to execute with unmatched <span className={gradientText}> efficiency and reliability.</span>
					</h2>

					{/* Tab switcher */}
					<div className="flex flex-col sm:flex-row justify-center border-b border-gray-200">
						<button
							onClick={() => setActiveTab('growth')}
							className={`px-4 sm:px-8 py-3 sm:py-4 text-[16px] md:text-[22px] transition-all relative ${
								activeTab === 'growth' ? 'text-[#07133a] font-semibold' : 'text-[#777b84] font-normal hover:text-[#07133a]'
							}`}>
							Accelerate Business Growth
							{activeTab === 'growth' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#1952F1]" />}
						</button>
						<button
							onClick={() => setActiveTab('tech')}
							className={`px-4 sm:px-8 py-3 sm:py-4 text-[16px] md:text-[22px] transition-all relative ${
								activeTab === 'tech' ? 'text-[#07133a] font-semibold' : 'text-[#777b84] font-normal hover:text-[#07133a]'
							}`}>
							Technology & Data driven operations
							{activeTab === 'tech' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#1952F1]" />}
						</button>
					</div>
				</div>

				{/* Content panel */}
				<div className="grid gap-6 mt-8 items-center bg-transparent max-w-5xl mx-auto md:max-w-none md:mx-0 md:w-[min(1230px,calc(100vw-3rem))] md:relative md:left-1/2 md:-translate-x-1/2 md:grid-cols-[974fr_1041fr] md:gap-[30px]">
					{/* Left – gauge */}
					<div className="relative overflow-hidden rounded-[24px] md:rounded-[32px] border border-[#DDE2EA] bg-gradient-to-br from-[#F8FAFF] via-[#F3FAFF] to-[#E7E8FF] p-4 sm:p-6 md:p-[7.8%] md:pb-0 md:aspect-[974/590] shadow-[0_12px_40px_rgba(25,82,241,0.06)]">
						{/* Ambient gradient */}
						<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_15%,rgba(160,170,255,0.30),transparent_55%),radial-gradient(ellipse_at_20%_60%,rgba(210,242,255,0.45),transparent_60%)]" />

						{/* Inner card */}
						<div
							className="relative z-10 w-full md:h-full overflow-hidden rounded-[20px] md:rounded-[28px] md:rounded-b-none border border-[#DDE2EA] md:border-b-0 bg-white px-4 pt-5 pb-5 md:px-[5.6%] md:pt-[5.4%] md:pb-0"
							style={{ containerType: 'inline-size' }}>
							{/* Inner hairline ring (desktop only) */}
							<div
								aria-hidden="true"
								className="pointer-events-none absolute inset-x-[2%] top-[2.6%] bottom-0 hidden md:block rounded-t-[22px] border border-b-0 border-[#E6E9F0]"
							/>

							<h3
								className="relative text-left font-medium leading-[1.35] tracking-[-0.025em] text-[#07133A]"
								style={{ fontSize: 'clamp(14px, 4.5cqw, 18px)' }}>
								Unlock more business without increasing
								<br />
								operational overhead
							</h3>

							{/* Gauge */}
							<div
								className="relative mx-auto w-full max-w-[340px] md:max-w-none md:w-[77.4%] aspect-[300/220]"
								style={{ containerType: 'inline-size', marginTop: '-1.5cqw' }}>
								<img src={ChartSvg} alt="Gauge Chart" className="absolute inset-0 h-full w-full object-contain" />

								{/* Dotted tick ring from Figma */}
								<svg aria-hidden="true" viewBox="0 0 300 220" className="absolute inset-0 h-full w-full pointer-events-none">
									{Array.from({ length: 21 }).map((_, i) => {
										const a = (Math.PI * i) / 20;
										return <circle key={i} cx={150 + 120 * Math.cos(a)} cy={185 - 120 * Math.sin(a)} r="1.3" fill="#C9CDD6" />;
									})}
								</svg>

								{/* Gauge content */}
								<div
									className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center whitespace-nowrap text-center"
									style={{ top: '31cqw' }}>
									<div
										className="font-medium leading-none tracking-[-0.04em] text-[#07133A]"
										style={{ fontSize: 'clamp(28px, 11.45cqw, 56px)' }}>
										70%
									</div>
									<div
										className="font-medium leading-tight text-[#07133A]"
										style={{ fontSize: 'clamp(11px, 3.8cqw, 14px)', marginTop: '4.5cqw' }}>
										Your DPD Resolution Rate is Good
									</div>
									<div className="text-[#8F939A]" style={{ fontSize: 'clamp(9px, 2.87cqw, 12px)', marginTop: '2cqw' }}>
										Last Check on 21 Apr
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right – feature list */}
					<div className="flex flex-col gap-4">
						{items.map((item, i) => (
							<div
								key={i}
								className="flex items-center gap-5 p-5 bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#f0f2f5] transition-shadow hover:shadow-[0_8px_24px_rgba(25,82,241,0.06)]">
								<div className="w-12 h-12 flex items-center justify-center shrink-0">{item.icon}</div>
								<div>
									<h4 className="font-medium text-[#07133a] text-[15px] leading-[1.4]">{item.title}</h4>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
