import { ArrowUpRight } from '@phosphor-icons/react';

interface CTAButtonSize {
	width: number;
	height: number;
	radius: number;
	fontSize?: number;
}

interface CTAButtonProps {
	label?: string;
	href?: string;
	onClick?: () => void;
	className?: string;
	showIcon?: boolean;
	size?: 'default' | 'medium' | 'compact' | CTAButtonSize;
}

/**
 * Reusable primary CTA button.
 *
 * Structure (outer → inner):
 *   4. Gray bezel           — #000000 (weight 4) (opacity 8%)
 *   3. White border         — #FFFFFF (weight 4)
 *   2. Blue gradient stroke — #6095DB → #1650EB (weight 4)
 *   1. Fill gradient button — #1952F1 → #418DF8
 *
 * Hover: outer bezel scales up, shimmer washes in, arrow nudges ↗.
 */

export default function CTAButton({
	label = 'View All',
	href,
	onClick,
	className = '',
	showIcon = true,
	size = 'default',
}: CTAButtonProps) {
	const customSize = typeof size === 'object' ? size : undefined;
	const isCompact = size === 'compact';
	const isMedium = size === 'medium';

	const outerPadding = isCompact ? '2px' : isMedium ? '3px' : customSize ? '2.5px' : '4px';
	const whitePadding = isCompact ? '2px' : isMedium ? '3px' : customSize ? '2.5px' : '4px';
	const bluePadding = isCompact ? '1.5px' : isMedium ? '2.5px' : customSize ? '2px' : '4px';

	const outerRadius = isCompact ? '12px' : isMedium ? '18px' : (customSize?.radius ?? '24px');
	const whiteRadius = isCompact ? '10px' : isMedium ? '15px' : customSize ? customSize.radius - 2.5 : '20px';
	const blueRadius = isCompact ? '8px' : isMedium ? '12px' : customSize ? customSize.radius - 5 : '16px';
	const buttonRadius = isCompact ? '6.5px' : isMedium ? '9.5px' : customSize ? customSize.radius - 7 : '12px';

	const inner = (
		<div
			className={`group inline-flex transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] ${className}`}
			style={{
				/* 4. Solid gray bezel (outermost layer) */
				boxSizing: customSize ? 'border-box' : undefined,
				width: customSize?.width,
				height: customSize?.height,
				padding: outerPadding,
				borderRadius: outerRadius,
				background: '#00000014',
				boxShadow: '0 2px 16px rgba(0,0,0,0.07), 0 0 0 0.5px rgba(0,0,0,0.04)',
			}}>
			{/* 3. White border (weight 4) */}
			<div
				style={{
					boxSizing: customSize ? 'border-box' : undefined,
					width: customSize ? '100%' : undefined,
					height: customSize ? '100%' : undefined,
					padding: whitePadding,
					borderRadius: whiteRadius,
					background: '#FFFFFF',
				}}>
				{/* 2. Blue gradient border (weight 4) */}
				<div
					style={{
						boxSizing: customSize ? 'border-box' : undefined,
						width: customSize ? '100%' : undefined,
						height: customSize ? '100%' : undefined,
						padding: bluePadding,
						borderRadius: blueRadius,
						background: 'linear-gradient(135deg, #6095DB 0%, #1650EB 100%)',
					}}>
					{/* 1. Inner fill gradient button */}
					<button
						onClick={onClick}
						className={`relative flex cursor-pointer items-center overflow-hidden font-semibold tracking-wide text-white transition-all duration-300 ${
							customSize
								? 'h-full w-full justify-center text-[16px]'
								: isCompact
									? 'gap-[3px] px-4 py-[5px] text-[8px]'
									: isMedium
										? 'gap-[5px] px-7 py-[7px] text-[11px]'
										: 'gap-[7px] px-8 py-[10px] text-sm'
						}`}
						style={{
							borderRadius: buttonRadius,
							background: 'linear-gradient(135deg, #1952F1 0%, #418DF8 100%)',
							boxShadow: '0 2px 10px rgba(25,82,241,0.28)',
							fontSize: customSize?.fontSize,
						}}>
						{/* Shimmer highlight — fades in on hover */}
						<span
							className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
							style={{
								background: 'linear-gradient(140deg, rgba(255,255,255,0.16) 0%, transparent 55%)',
								borderRadius: 'inherit',
							}}
						/>

						<span className="relative">{label}</span>

						{/* Arrow nudges up-right on hover */}
						{showIcon && (
							<span className="relative inline-flex transition-transform duration-300 ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
								<ArrowUpRight size={isCompact ? 8 : isMedium ? 11 : 15} weight="bold" />
							</span>
						)}
					</button>
				</div>
			</div>
		</div>
	);

	if (href) {
		return (
			<a href={href} className="inline-flex">
				{inner}
			</a>
		);
	}

	return inner;
}
