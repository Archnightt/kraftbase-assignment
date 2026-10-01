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
					<div className="flex justify-center border-b border-gray-200">
						<button
							onClick={() => setActiveTab('growth')}
							className={`px-8 py-4 text-[18px] md:text-[22px] transition-all relative ${
								activeTab === 'growth' ? 'text-[#07133a] font-semibold' : 'text-[#777b84] font-normal hover:text-[#07133a]'
							}`}>
							Accelerate Business Growth
							{activeTab === 'growth' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#1952F1]" />}
						</button>
						<button
							onClick={() => setActiveTab('tech')}
							className={`px-8 py-4 text-[18px] md:text-[22px] transition-all relative ${
								activeTab === 'tech' ? 'text-[#07133a] font-semibold' : 'text-[#777b84] font-normal hover:text-[#07133a]'
							}`}>
							Technology & Data driven operations
							{activeTab === 'tech' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#1952F1]" />}
						</button>
					</div>
				</div>

				{/* Content panel */}
				<div className="grid md:grid-cols-2 gap-10 items-center mt-8 bg-transparent max-w-5xl mx-auto">
					{/* Left – gauge */}
					<div className="relative h-[430px] overflow-hidden rounded-[32px] border border-[#DDE2EA] bg-gradient-to-br from-[#F8FAFF] via-[#F3FAFF] to-[#E7E8FF] p-[52px] shadow-[0_12px_40px_rgba(25,82,241,0.06)]">
						{/* Ambient gradient */}
						<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_15%,rgba(160,170,255,0.30),transparent_55%),radial-gradient(ellipse_at_20%_60%,rgba(210,242,255,0.45),transparent_60%)]" />

						{/* Inner card */}
						<div className="relative z-10 h-full w-full overflow-hidden rounded-[28px] border border-[#DDE2EA] bg-white px-[28px] pt-[25px]">
							<h3 className="text-left text-[17px] font-medium leading-[1.35] tracking-[-0.025em] text-[#07133A]">
								Unlock more business without increasing
								<br />
								operational overhead
							</h3>

							{/* Gauge */}
							<div className="relative mx-auto mt-2 h-[220px] w-[300px] flex justify-center">
								<img src={ChartSvg} alt="Gauge Chart" className="absolute inset-0 w-[300px] h-[220px] object-contain" />

								{/* Gauge content */}
								<div className="absolute left-1/2 top-[110px] flex -translate-x-1/2 flex-col items-center whitespace-nowrap text-center">
									<div className="text-[48px] font-bold leading-none tracking-[-0.04em] text-[#07133A]">70%</div>

									<div className="mt-2 text-[12px] font-medium leading-tight text-[#07133A]">Your DPD Resolution Rate is Good</div>

									<div className="mt-1 text-[10px] text-[#8F939A]">Last Check on 21 Apr</div>
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
