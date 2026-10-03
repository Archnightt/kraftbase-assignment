import { motion, type HTMLMotionProps } from 'motion/react';

const ease = [0.22, 1, 0.36, 1] as const;

type RevealProps = HTMLMotionProps<'div'> & {
	delay?: number;
	amount?: number;
};

export default function Reveal({ children, delay = 0, amount = 0.28, className, ...props }: RevealProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount }}
			transition={{ duration: 0.55, delay, ease }}
			className={className}
			{...props}>
			{children}
		</motion.div>
	);
}
