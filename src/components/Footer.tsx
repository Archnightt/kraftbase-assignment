import CTAButton from "./CTAButton";
import {
  FaFacebookMessenger,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { HiOutlineEnvelope, HiOutlineMapPin } from "react-icons/hi2";

const CX = 500;
const BASE = 1000; // arches sit on the bottom edge of a 1000x1000 viewBox
// a = horizontal radius, b = vertical radius, w = stroke, o = opacity
const ARCHES = [
  { a: 465, b: 830, w: 10, o: 0.4 },  // inner
  { a: 490, b: 900, w: 10, o: 0.4 }, // outer
];


const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    Icon: FaInstagram,
    className: "text-[#f04b70]",
  },
  {
    label: "Messenger",
    href: "https://www.messenger.com/",
    Icon: FaFacebookMessenger,
    className: "text-[#1e74ed]",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    Icon: FaYoutube,
    className: "text-[#ff1f14]",
  },
  {
    label: "X",
    href: "https://x.com/",
    Icon: FaXTwitter,
    className: "text-black",
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-white px-4 pt-8 text-[#111318] sm:px-6 md:pt-14 lg:px-8">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-t-[44px] bg-white px-5 pt-16 sm:rounded-t-[68px] sm:px-10 md:pt-24 lg:px-16 lg:pt-32">

        <div className="relative mx-auto mb-16 flex min-h-[400px] flex-col items-center justify-start pt-10">
          <HeroBackdrop />

          <div className="relative z-10 mx-auto w-full max-w-[860px] text-center">
            <div className="mx-auto mb-10 grid size-[64px] place-items-center rounded-full bg-white shadow-[0_12px_38px_rgba(69,101,174,0.10)] sm:mb-12 sm:size-[80px]">
              <img src="/logo.png" alt="Collectedge" className="h-[28px] w-[28px] object-contain sm:h-[36px] sm:w-[36px]" />
            </div>

            <p className="mb-4 text-[14px] font-semibold tracking-[-0.03em] bg-gradient-to-r from-[#1952F1] to-[#418DF8] bg-clip-text text-transparent sm:text-[16px]">
              Contact Us
            </p>

            <h2 className="mx-auto max-w-[800px] text-[28px] font-semibold leading-[1.13] tracking-[-0.055em] text-[#07133a] sm:text-[36px] md:text-[44px] lg:text-[48px]">
              We also need to have contact <br /> form on the website
            </h2>
            <p className="mx-auto mt-6 max-w-[560px] text-[16px] leading-[1.55] tracking-[-0.02em] text-[#777b84] sm:text-[18px] md:mt-8 md:text-[20px]">
              Our tool is designed with agencies &amp; collection managers in mind,
              ensuring user-friendly experience tailored to their needs.
            </p>

            <div className="mt-7 md:mt-8">
              <CTAButton
                label="Get Started"
                href="#contact"
                size="default"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-16 grid w-full grid-cols-1 items-start gap-10 text-center lg:mt-24 lg:grid-cols-[1fr_minmax(0,560px)_1fr] lg:text-left">
          <section className="px-2 py-4 lg:py-7">
            <h3 className="text-[16px] font-semibold tracking-[-0.035em] sm:text-[18px]">Navigation</h3>
            <nav aria-label="Footer navigation" className="mt-5">
              <ul className="space-y-3 text-[14px] leading-none text-[#777b84] sm:text-[15px]">
                <li><a href="#top" className="transition-colors hover:text-[#1d61e9]">Home</a></li>
                <li><a href="#lenders" className="transition-colors hover:text-[#1d61e9]">For Lenders</a></li>
                <li><a href="#agencies" className="transition-colors hover:text-[#1d61e9]">For Collection Agencies</a></li>
              </ul>
            </nav>
          </section>

          <section className="flex flex-col items-center px-4 py-4 text-center lg:py-7">
            <a href="#top" className="inline-flex items-center gap-2 text-[20px] font-semibold tracking-[-0.045em] sm:text-[24px]">
              <img src="/logo.png" alt="" className="size-[28px] object-contain" />
              Collectedge
            </a>
            <p className="mt-5 max-w-[500px] text-[15px] leading-[1.55] tracking-[-0.02em] text-[#777b84] sm:text-[16px]">
              Our tool is designed with agencies &amp; collection managers in mind,
              ensuring user-friendly experience tailored to their needs.
            </p>
          </section>

          <section className="px-2 py-4 lg:ml-auto lg:py-7 lg:text-left">
            <h3 className="text-[16px] font-semibold tracking-[-0.035em] sm:text-[18px]">Contact</h3>
            <ul className="mt-5 space-y-4 text-[14px] leading-[1.35] text-[#777b84] sm:text-[15px]">
              <li className="flex items-center justify-center gap-2.5 lg:justify-start">
                <HiOutlineEnvelope className="size-5 shrink-0 text-[#9da0a6]" aria-hidden="true" />
                <a href="mailto:info@letsdial.com" className="hover:text-[#1d61e9]">info@letsdial.com</a>
              </li>
              <li className="flex items-start justify-center gap-2.5 lg:justify-start">
                <HiOutlineMapPin className="mt-0.5 size-5 shrink-0 text-[#9da0a6]" aria-hidden="true" />
                <span className="text-center lg:text-left">Lorem Ipsum is simply dummy<br /> text of the printing</span>
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
      className="pointer-events-none absolute -left-5 -right-5 -top-16 bottom-0 sm:-left-10 sm:-right-10 lg:-left-16 lg:-right-16"
    >
      {/* Glow: ends white well inside the box, fades out at the hero's bottom edge */}
      <div className="absolute inset-0 bg-[radial-gradient(50%_100%_at_50%_100%,#FFFFFF_25%,#CAEBFD_55%,#CED5F9_78%,#FFFFFF_98%)] opacity-60 blur-2xl [mask-image:linear-gradient(to_top,transparent_0%,black_35%)]" />

      <div className="absolute inset-0 hidden md:block">
        <svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full blur-[8px] [mask-image:linear-gradient(to_top,transparent_0%,black_40%)]"
          fill="none"
        >
          {ARCHES.map(({ a, b, w, o }) => (
            <path
              key={a}
              d={`M ${CX - a} ${BASE} A ${a} ${b} 0 0 1 ${CX + a} ${BASE}`}
              stroke="#D9D9D9"
              strokeWidth={w}
              strokeOpacity={o}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {/* Outer arch: Instagram (left), YouTube (right) */}
        <SocialBubble social={socials[0]} className="left-[14.6%] top-[51.6%]" />
        <SocialBubble social={socials[2]} className="left-[89.2%] top-[59.4%]" />

        {/* Inner arch: Messenger (left), X (right) */}
        <SocialBubble social={socials[1]} className="left-[7.6%] top-[79.1%]" />
        <SocialBubble social={socials[3]} className="left-[93.2%] top-[83.4%]" />
      </div>
    </div>
  );
}

function SocialBubble({
  social,
  className,
}: {
  social: (typeof socials)[number];
  className: string;
}) {
  const { Icon } = social;
  return (
    <span
      className={`absolute grid size-[48px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_8px_24px_rgba(94,106,134,0.12)] ${className}`}
    >
      <Icon className={`size-[20px] ${social.className}`} />
    </span>
  );
}
