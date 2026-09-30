import { Users, ToggleLeft, ChartLineUp, MagnifyingGlass } from '@phosphor-icons/react';
import staffImg from '../assets/staff.png';
import apiIntegrationImg from '../assets/API_Integration.png';
import drivenByDataImg from '../assets/DrivenByData.png';
import aflImg from '../assets/AFL.png';

export default function Features() {
	const featureImageClass = 'w-full h-full object-contain';

	return (
		<section id="lenders" className="py-24 px-4 md:px-8 bg-white relative">
			<div className="max-w-[1360px] mx-auto text-center mb-12 relative z-10">
				<p className="text-[14px] font-bold text-black mb-6">For Lenders</p>
				<h2 className="text-[32px] md:text-[42px] font-semibold text-black tracking-[-0.03em] max-w-[820px] mx-auto leading-[1.2]">
					We're changing the game with <span>one complete agency management tool</span>
				</h2>
			</div>

			<div className="max-w-[1360px] mx-auto border-t border-b border-[#f0f2f5] relative z-10">
				<div className="grid md:grid-cols-2">
					{/* Card 1 – Intuitive & Agent Focused */}
					<div className="border-b md:border-r border-[#f0f2f5] flex flex-col overflow-hidden">
						<div className="pt-10 px-10 md:pt-16 md:px-14 flex-1">
							<h3 className="text-[20px] font-semibold text-black mb-4 flex items-center gap-3">
								<Users weight="fill" className="text-black" />
								Intuitive & Agent Focused
							</h3>
							<p className="text-black text-[16px] leading-[1.6] mb-8 max-w-[480px]">
								Our tool is designed with agencies & collection managers in mind, ensuring user-friendly experience tailored to their needs
							</p>
						</div>
						<div className="mt-auto flex w-full aspect-[723/520] justify-center">
							<img src={staffImg} alt="Staff" className={featureImageClass} />
						</div>
					</div>

					{/* Card 2 – Highly Customizable */}
					<div className="border-b border-[#f0f2f5] flex flex-col overflow-hidden">
						<div className="pt-10 px-10 md:pt-16 md:px-14 flex-1">
							<h3 className="text-[20px] font-semibold text-black mb-4 flex items-center gap-3">
								<ToggleLeft weight="fill" className="text-black" />
								Highly Customizable
							</h3>
							<p className="text-black text-[16px] leading-[1.6] mb-8 max-w-[480px]">
								Our tool is designed with agencies & collection managers in mind, ensuring user-friendly experience tailored to their needs
							</p>
						</div>
						<div className="mt-auto flex w-full aspect-[723/520] justify-center">
							<img src={apiIntegrationImg} alt="API Integration" className={featureImageClass} />
						</div>
					</div>

					{/* Card 3 – Driven by Data */}
					<div className="border-b md:border-r md:border-b-0 border-[#f0f2f5] flex flex-col overflow-hidden">
						<div className="pt-10 px-10 md:pt-16 md:px-14 flex-1">
							<h3 className="text-[20px] font-semibold text-black mb-4 flex items-center gap-3">
								<ChartLineUp weight="fill" className="text-black" />
								Driven by Data
							</h3>
							<p className="text-black text-[16px] leading-[1.6] mb-8 max-w-[480px]">
								Our data-driven approach equips collection managers with insights to make informed & actionable decisions
							</p>
						</div>
						<div className="mt-auto flex w-full aspect-[723/520] justify-center">
							<img src={drivenByDataImg} alt="Driven by Data" className={featureImageClass} />
						</div>
					</div>

					{/* Card 4 – Discover Agency partners */}
					<div className="flex flex-col overflow-hidden">
						<div className="pt-10 px-10 md:pt-16 md:px-14 flex-1">
							<h3 className="text-[20px] font-semibold text-black mb-4 flex items-center gap-3">
								<MagnifyingGlass weight="bold" className="text-black" />
								Discover Agency partners
							</h3>
							<p className="text-black text-[16px] leading-[1.6] mb-8 max-w-[480px]">
								Discover top-performing, tech-driven agencies designed to deliver results with minimal overhead.
							</p>
						</div>
						<div className="mt-auto flex w-full aspect-[723/520] justify-center">
							<img src={aflImg} alt="Discover Agency Partners" className={featureImageClass} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
