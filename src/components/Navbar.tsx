export default function Navbar() {
	const scrollToContact = () => {
		const el = document.getElementById('contact') || document.querySelector('footer');
		el?.scrollIntoView({
			behavior: 'smooth',
		});
	};

	return (
		<div className="absolute left-1/2 top-5 z-50 -translate-x-1/2">
			{/* Outer bezel */}
			<div
				className="
          h-[75px] w-[774px]
          rounded-[36px]
          border border-[#d9e2e8]
          bg-[#eaf0f3]
          p-[5px]
          shadow-[0_8px_18px_rgba(45,94,132,0.09)]
        ">
				{/* Inner white frame */}
				<div className="h-full rounded-[32px] bg-white p-px">
					{/* Actual navbar */}
					<nav
						aria-label="Main navigation"
						className="
              relative flex h-full items-center
              rounded-[32px]
              bg-white
              px-5
              backdrop-blur-xl
            ">
						{/* Logo */}
						<a
							href="#top"
							aria-label="Collectedge home"
							className="
                flex shrink-0 items-center gap-2
                text-[14px] font-medium
                text-[#14161a]
              ">
							<img src="/logo.png" alt="" className="h-[22px] w-auto" />

							<span>Collectedge</span>
						</a>

						{/* Center navigation */}
						<div
							className="
                absolute left-1/2
                hidden -translate-x-1/2
                items-center gap-7
                whitespace-nowrap
                lg:flex
                text-[14px]
                font-normal
                text-[#8b8d91]
              ">
							<a
								href="#top"
								className="
                  font-semibold
                  text-[#111318]
                  transition-colors
                  hover:text-[#2563eb]
                ">
								Home
							</a>

							<a href="#lenders" className="transition-colors hover:text-[#2563eb]">
								For Lenders
							</a>

							<a href="#agencies" className="transition-colors hover:text-[#2563eb]">
								For Collection Agencies
							</a>
						</div>

						{/* CTA */}
						<div className="ml-auto shrink-0">
							<div
								className="group inline-flex cursor-pointer transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
								style={{
									width: 132,
									height: 42,
									boxSizing: 'border-box',
									padding: '4px', // Outermost boundary remains exactly 142x48
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
									<span className="relative">Get in touch</span>
								</button>
							</div>
						</div>
					</nav>
				</div>
			</div>
		</div>
	);
}
