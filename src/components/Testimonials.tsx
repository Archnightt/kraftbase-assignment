import { useState, useRef, useEffect, useCallback } from 'react';
import CTAButton from './CTAButton';
import { Quotes, CaretLeft, CaretRight, Star } from '@phosphor-icons/react';
import { SiFacebook, SiX } from 'react-icons/si';

const gradientText = 'bg-gradient-to-r from-[#0a0d2c] to-[#1e3a9e] bg-clip-text text-transparent';

interface TestimonialItem {
	id: string;
	name: string;
	role: string;
	text: string;
	stars: number;
	avatar: string;
	badge: 'facebook' | 'x';
}

const testimonials: TestimonialItem[] = [
	{
		id: '1',
		name: 'Priya Nair',
		role: 'Head of Risk & Collections',
		text: "Since implementing the Collectedge platform, we've seen a 40% improvement in resolving delinquent payment disputes within the first 30 days. The automation and transparency it brings have transformed how our collections team operates — reducing manual overhead and improving customer trust. It's become an essential part of our risk management toolkit.",
		stars: 5,
		avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
		badge: 'facebook',
	},
	{
		id: '2',
		name: 'David Koroma',
		role: 'CEO, NeoBank Africa',
		text: 'We used to get a lot of complaints about dispute clarity. Since deploying Collectedge customer complaints related to payment disputes have dropped by over 50%. The self-service portal and clear communication flows have been game-changers.',
		stars: 5,
		avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
		badge: 'x',
	},
	{
		id: '5',
		name: 'Sarah Jenkins',
		role: 'Head of Credit Operations, Apex Financial',
		text: 'Regulatory compliance around debt resolution has always been complex, but DPD Resolution’s built-in audit trails and reporting tools made our last audit seamless. It gives us confidence that we’re always operating within the latest guidelines.',
		stars: 5,
		avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
		badge: 'x',
	},
];

// Card gradient
const CARD_BG = [
	// top-left: lavender
	'radial-gradient(ellipse 55% 50% at 0% 0%, rgba(140,143,255,0.31) 0%, rgba(206,213,249,0.35) 40%, rgba(255,255,255,0) 100%)',

	// bottom-right: soft blue
	'radial-gradient(ellipse 55% 50% at 100% 100%, rgba(140,143,255,0.28) 0%, rgba(175,213,234,0.35) 40%, rgba(255,255,255,0) 100%)',

	// top-right: cyan accent
	'radial-gradient(ellipse 35% 30% at 100% 0%, rgba(208,237,250,0.7) 0%, rgba(208,237,250,0) 100%)',

	// white base for legible text
	'#FFFFFF',
].join(', ');

// Repeat 5 times to provide a seamless infinite scroll loop
const REPEAT_COUNT = 5;
const LOOPED_ITEMS = Array.from({ length: REPEAT_COUNT }, (_, setIdx) =>
	testimonials.map((item, itemIdx) => ({
		...item,
		globalKey: `set-${setIdx}-item-${itemIdx}`,
		originalIndex: itemIdx,
	}))
).flat();

const INITIAL_INDEX = Math.floor(REPEAT_COUNT / 2) * testimonials.length; // Center set start (Priya Nair)

export default function Testimonials() {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
	const [activeIdx, setActiveIdx] = useState(INITIAL_INDEX);

	// Drag-to-scroll state
	const isDraggingRef = useRef(false);
	const startXRef = useRef(0);
	const scrollLeftRef = useRef(0);
	const hasMovedRef = useRef(false);
	const isAnimatingRef = useRef(false);
	const animTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const activeIdxRef = useRef(INITIAL_INDEX);

	const updateActive = useCallback((idx: number) => {
		activeIdxRef.current = idx;
		setActiveIdx(idx);
	}, []);

	// Center a specific card index
	const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
		const container = containerRef.current;
		const card = cardRefs.current[index];
		if (!container || !card) return;

		const cardCenter = card.offsetLeft + card.offsetWidth / 2;
		const containerCenter = container.clientWidth / 2;
		const targetScrollLeft = cardCenter - containerCenter;

		if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
		isAnimatingRef.current = behavior === 'smooth';

		container.scrollTo({ left: targetScrollLeft, behavior });

		if (behavior === 'smooth') {
			animTimeoutRef.current = setTimeout(() => {
				isAnimatingRef.current = false;
			}, 700);
		}
	}, []);

	// Initialize scroll position to center card on mount
	useEffect(() => {
		const timer = setTimeout(() => {
			scrollToIndex(INITIAL_INDEX, 'instant');
		}, 50);
		return () => clearTimeout(timer);
	}, [scrollToIndex]);

	// Handle continuous scroll & find closest card
	const handleScroll = useCallback(() => {
		const container = containerRef.current;
		if (!container) return;

		// While a button/click-driven animation is running, the target is already set
		if (isAnimatingRef.current) return;

		const containerCenter = container.scrollLeft + container.clientWidth / 2;

		let closestIndex = activeIdxRef.current;
		let minDiff = Infinity;

		cardRefs.current.forEach((card, i) => {
			if (!card) return;
			const cardCenter = card.offsetLeft + card.offsetWidth / 2;
			const diff = Math.abs(cardCenter - containerCenter);
			if (diff < minDiff) {
				minDiff = diff;
				closestIndex = i;
			}
		});

		if (closestIndex !== activeIdxRef.current) {
			updateActive(closestIndex);
		}

		// Wrap around for infinite loop if we wander too close to boundaries
		const totalItems = LOOPED_ITEMS.length;
		const setSize = testimonials.length;

		if (closestIndex < setSize) {
			const target = closestIndex + setSize * 2;
			const currentCard = cardRefs.current[closestIndex];
			const targetCard = cardRefs.current[target];
			if (currentCard && targetCard) {
				container.scrollLeft += targetCard.offsetLeft - currentCard.offsetLeft;
				updateActive(target);
			}
		} else if (closestIndex >= totalItems - setSize) {
			const target = closestIndex - setSize * 2;
			const currentCard = cardRefs.current[closestIndex];
			const targetCard = cardRefs.current[target];
			if (currentCard && targetCard) {
				container.scrollLeft -= currentCard.offsetLeft - targetCard.offsetLeft;
				updateActive(target);
			}
		}
	}, [updateActive]);

	// Snap to center when manual scroll ends
	const onScroll = () => {
		handleScroll();

		if (isAnimatingRef.current) return;

		if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
		scrollTimeoutRef.current = setTimeout(() => {
			if (!isDraggingRef.current && !isAnimatingRef.current) {
				scrollToIndex(activeIdxRef.current, 'smooth');
			}
		}, 150);
	};

	const goTo = (target: number) => {
		if (target < 0 || target >= LOOPED_ITEMS.length) return;
		if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
		updateActive(target);
		scrollToIndex(target, 'smooth');
	};

	const handlePrev = () => goTo(activeIdxRef.current - 1);
	const handleNext = () => goTo(activeIdxRef.current + 1);

	// Mouse drag handlers
	const handleMouseDown = (e: React.MouseEvent) => {
		if (!containerRef.current) return;
		// Don't start a drag when pressing the nav buttons
		if ((e.target as HTMLElement).closest('button')) return;
		isDraggingRef.current = true;
		hasMovedRef.current = false;
		startXRef.current = e.pageX - containerRef.current.offsetLeft;
		scrollLeftRef.current = containerRef.current.scrollLeft;
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDraggingRef.current || !containerRef.current) return;
		e.preventDefault();
		const x = e.pageX - containerRef.current.offsetLeft;
		const walk = (x - startXRef.current) * 1.2;
		if (Math.abs(walk) > 4) {
			hasMovedRef.current = true;
		}
		containerRef.current.scrollLeft = scrollLeftRef.current - walk;
	};

	const handleMouseUp = () => {
		if (!isDraggingRef.current) return;
		isDraggingRef.current = false;
		// Only snap if the user actually dragged
		if (hasMovedRef.current) {
			setTimeout(() => {
				scrollToIndex(activeIdxRef.current, 'smooth');
			}, 50);
		}
	};

	return (
		<section className="py-12 md:py-16 bg-white relative overflow-hidden select-none">
			{/* Top fade — blends into the section above */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute top-0 left-0 right-0 h-28 z-[1]"
				style={{ background: 'linear-gradient(to bottom, #ffffff 0%, transparent 100%)' }}
			/>
			{/* Bottom fade — blends into the footer */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 z-[1]"
				style={{ background: 'linear-gradient(to bottom, transparent 0%, #ffffff 100%)' }}
			/>
			{/* ── Ambient section-wide gradient blobs ── */}
			{/* Lavender bloom — upper-left */}
			<div
				className="pointer-events-none absolute"
				style={{
					top: '-10%',
					left: '-8%',
					width: '65%',
					height: '80%',
					background: 'radial-gradient(ellipse at 35% 40%, rgba(167,139,250,0.18) 0%, transparent 65%)',
					filter: 'blur(40px)',
					zIndex: 0,
				}}
			/>
			{/* Cyan bloom — upper-right */}
			<div
				className="pointer-events-none absolute"
				style={{
					top: '-15%',
					right: '-10%',
					width: '60%',
					height: '75%',
					background: 'radial-gradient(ellipse at 60% 35%, rgba(147,210,255,0.20) 0%, transparent 60%)',
					filter: 'blur(50px)',
					zIndex: 0,
				}}
			/>
			{/* Soft blue glow — lower-right */}
			<div
				className="pointer-events-none absolute"
				style={{
					bottom: '-5%',
					right: '5%',
					width: '50%',
					height: '55%',
					background: 'radial-gradient(ellipse at 65% 70%, rgba(99,155,255,0.12) 0%, transparent 65%)',
					filter: 'blur(45px)',
					zIndex: 0,
				}}
			/>
			{/* Periwinkle centre wash */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					background: 'radial-gradient(ellipse at 50% 55%, rgba(190,200,255,0.10) 0%, transparent 55%)',
					filter: 'blur(30px)',
					zIndex: 0,
				}}
			/>
			{/* Header */}
			<div className="relative z-10 max-w-4xl mx-auto text-center mb-6 md:mb-10 px-4">
				<p className="mb-4 text-[14px] sm:text-[16px] md:text-[20px] font-semibold bg-gradient-to-r from-[#1952F1] to-[#418DF8] bg-transparent bg-clip-text inline-block text-transparent">
					Testimonial
				</p>
				<h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0B132B] tracking-tight">
					Trusted by <span className={gradientText}>Professionals</span>
				</h2>
			</div>

			{/* Carousel Container with Edge Gradients */}
			<div className="relative w-full z-10">
				{/* Left Fade Gradient */}
				<div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-44 md:w-64 lg:w-80 bg-gradient-to-r from-white via-white/85 to-transparent z-20" />

				{/* Right Fade Gradient */}
				<div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-44 md:w-64 lg:w-80 bg-gradient-to-l from-white via-white/85 to-transparent z-20" />

				{/* Scroll Track */}
				<div
					ref={containerRef}
					onScroll={onScroll}
					onMouseDown={handleMouseDown}
					onMouseMove={handleMouseMove}
					onMouseUp={handleMouseUp}
					onMouseLeave={handleMouseUp}
					className="flex gap-4 sm:gap-6 overflow-x-auto py-6 px-[15vw] sm:px-[25vw] md:px-[30vw] cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden items-stretch">
					{LOOPED_ITEMS.map((item, index) => {
						const isCenter = index === activeIdx;

						return (
							<div
								key={item.globalKey}
								ref={(el) => {
									cardRefs.current[index] = el;
								}}
								onClick={() => {
									if (!hasMovedRef.current && !isCenter) goTo(index);
								}}
								className={`w-[320px] sm:w-[420px] md:w-[480px] lg:w-[500px] flex-shrink-0 transition-all duration-300 flex flex-col justify-between ${
									isCenter
										? 'bg-white rounded-[32px] p-3 sm:p-3.5 pb-5 border border-slate-100 shadow-[0_12px_45px_-12px_rgba(20,50,90,0.08)] opacity-100 scale-100 z-10'
										: 'bg-transparent rounded-[32px] p-3 sm:p-3.5 pb-5 border border-transparent opacity-65 hover:opacity-85 scale-[0.98] cursor-pointer'
								}`}>
								{/* Inner Card */}
								<div
									className="rounded-[24px] p-6 sm:p-7 md:p-8 flex-1 flex flex-col justify-between"
									style={{
										background: CARD_BG,
										border: '1px solid rgba(190,200,250,0.7)',
									}}>
									{/* Top: Avatar + Name + Quotes */}
									<div>
										<div className="flex items-center justify-between gap-4 mb-4">
											<div className="flex items-center gap-3 sm:gap-3.5">
												<img
													src={item.avatar}
													alt={item.name}
													className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border border-white/80 shadow-xs"
													draggable={false}
												/>
												<div>
													<h4 className="font-bold text-slate-900 text-[15px] sm:text-[16px] leading-tight">{item.name}</h4>
													<p className="text-[12px] sm:text-[13px] font-regular text-slate-500 mt-0.5">{item.role}</p>
												</div>
											</div>
											<Quotes weight="fill" className="text-blue-200/80 text-3xl sm:text-4xl flex-shrink-0" />
										</div>

										{/* Testimonial Quote */}
										<p className="text-slate-700 italic font-normal text-[13.5px] sm:text-[14.5px] leading-relaxed my-4 sm:my-5">
											{item.text}
										</p>
									</div>

									{/* Bottom: Stars + Badge */}
									<div className="flex items-center justify-between pt-2">
										<div className="flex items-center gap-1 text-[#FBBF24]">
											{Array.from({ length: item.stars }).map((_, s) => (
												<Star key={s} weight="fill" className="h-4 w-4 sm:h-5 sm:w-5" />
											))}
										</div>

										{item.badge === 'facebook' ? (
											<div className="flex h-9 w-9 shrink-0 items-center justify-center">
												<SiFacebook size={34} color="#6D6D6D" />
											</div>
										) : (
											<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6D6D6D]">
												<SiX size={17} color="#FFFFFF" />
											</div>
										)}
									</div>
								</div>

								{/* Bottom Navigation Buttons (Only visible on focused center card) */}
								<div
									className={`flex justify-center items-center gap-2.5 pt-4 transition-opacity duration-300 ${
										isCenter ? 'opacity-100' : 'opacity-0 pointer-events-none'
									}`}>
									<button
										onClick={(e) => {
											e.stopPropagation();
											handlePrev();
										}}
										className="w-10 h-10 rounded-full bg-white flex items-center justify-center active:scale-95 transition-all cursor-pointer"
										style={{
											border: '2px solid transparent',
											backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #1952F1, #418DF8)',
											backgroundOrigin: 'border-box',
											backgroundClip: 'padding-box, border-box',
										}}
										aria-label="Previous testimonial">
										<CaretLeft size={18} weight="bold" color="#6D6D6D" />
									</button>
									<button
										onClick={(e) => {
											e.stopPropagation();
											handleNext();
										}}
										className="w-10 h-10 rounded-full flex items-center justify-center text-white active:scale-95 transition-all cursor-pointer"
										style={{ background: 'linear-gradient(135deg, #1952F1, #418DF8)' }}
										aria-label="Next testimonial">
										<CaretRight size={18} weight="bold" />
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Bottom CTA Button */}
			<div className="flex justify-center mt-4 md:mt-6 relative z-10">
				<CTAButton label="View All" />
			</div>
		</section>
	);
}
