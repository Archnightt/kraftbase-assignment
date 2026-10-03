import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Agency from './components/Agency';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { ContactModalProvider } from './components/ContactModal';
import { MotionConfig } from 'motion/react';

export default function App() {
	return (
		<MotionConfig reducedMotion="user">
			<ContactModalProvider>
				<div className="min-h-screen font-sans selection:bg-blue-200">
					<Navbar />
					<main>
						<Hero />
						<Features />
						<Agency />
						<Testimonials />
					</main>
					<Footer />
				</div>
			</ContactModalProvider>
		</MotionConfig>
	);
}

