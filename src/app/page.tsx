"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Scroll-reveal hook                                                 */
/* ------------------------------------------------------------------ */
function useReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .stagger-children"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
}

/* ------------------------------------------------------------------ */
/*  Before / After slider                                              */
/* ------------------------------------------------------------------ */
function BeforeAfter({
  before,
  after,
  alt,
}: {
  before: string;
  after: string;
  alt: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !dragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, x)));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden cursor-ew-resize select-none group"
      onMouseDown={() => (dragging.current = true)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchStart={() => (dragging.current = true)}
      onTouchEnd={() => (dragging.current = false)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* After (full background) */}
      <Image
        src={after}
        alt={`${alt} - After`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {/* Before (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <Image
          src={before}
          alt={`${alt} - Before`}
          fill
          className="object-cover"
          style={{ minWidth: containerRef.current?.offsetWidth || "100%" }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-[3px] bg-white/90 z-10 shadow-lg"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-espresso"
          >
            <path
              d="M6 10L2 10M2 10L4.5 7.5M2 10L4.5 12.5M14 10L18 10M18 10L15.5 7.5M18 10L15.5 12.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {/* Labels */}
      <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] font-semibold text-white bg-espresso/70 backdrop-blur-sm px-3 py-1 rounded-full z-10">
        Before
      </span>
      <span className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.2em] font-semibold text-white bg-gold-500/80 backdrop-blur-sm px-3 py-1 rounded-full z-10">
        After
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Our Work", href: "#gallery" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          scrolled
            ? "nav-glass shadow-[0_4px_30px_rgba(0,0,0,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-espresso flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105">
              <span className="text-cream font-display font-bold text-lg leading-none">
                F
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-lg tracking-tight leading-tight">
                Fortis Brothers
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-warm-500 font-medium leading-tight">
                Construction
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-warm-700 hover:text-espresso transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-gold-500 after:transition-all after:duration-500 after:ease-[cubic-bezier(0.32,0.72,0,1)] hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
            <a
              href="tel:+17865551234"
              className="inline-flex items-center gap-2.5 bg-espresso text-cream text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-warm-800 active:scale-[0.97]"
            >
              Free Estimate
              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs transition-transform duration-500 group-hover:translate-x-0.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative z-50"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[1.5px] bg-espresso transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-center ${
                open ? "rotate-45 translate-y-[4.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-espresso transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-center ${
                open ? "-rotate-45 -translate-y-[4.5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-30 bg-cream/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {links.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="font-display text-4xl font-semibold text-espresso transition-all duration-500"
            style={{
              transitionDelay: open ? `${i * 80 + 100}ms` : "0ms",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(20px)",
            }}
          >
            {l.label}
          </a>
        ))}
        <a
          href="tel:+17865551234"
          onClick={() => setOpen(false)}
          className="mt-4 inline-flex items-center gap-2.5 bg-espresso text-cream text-lg font-semibold px-8 py-3.5 rounded-full"
          style={{
            transitionDelay: open ? `${links.length * 80 + 100}ms` : "0ms",
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(20px)",
            transition:
              "opacity 0.5s cubic-bezier(0.32,0.72,0,1), transform 0.5s cubic-bezier(0.32,0.72,0,1)",
          }}
        >
          Call for Free Estimate
        </a>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Service Card                                                       */
/* ------------------------------------------------------------------ */
function ServiceCard({
  title,
  description,
  image,
  features,
  reversed,
}: {
  title: string;
  description: string;
  image: string;
  features: string[];
  reversed?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        reversed ? "lg:direction-rtl" : ""
      }`}
    >
      <div className={`${reversed ? "lg:order-2 lg:direction-ltr" : ""} reveal-left`}>
        <div className="p-1.5 bg-warm-100/60 rounded-[2rem] ring-1 ring-warm-200/40">
          <div className="rounded-[calc(2rem-0.375rem)] overflow-hidden img-zoom">
            <Image
              src={image}
              alt={`${title} services by Fortis Brothers in Miami`}
              width={800}
              height={600}
              className="w-full aspect-[4/3] object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
      <div className={`${reversed ? "lg:order-1 lg:direction-ltr" : ""} reveal-right`}>
        <span className="inline-block text-[10px] uppercase tracking-[0.2em] font-semibold text-gold-500 bg-gold-400/10 px-3 py-1.5 rounded-full mb-5">
          Our Service
        </span>
        <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-5 leading-tight">
          {title}
        </h3>
        <p className="text-warm-600 text-base leading-relaxed mb-8 max-w-[55ch]">
          {description}
        </p>
        <div className="flex flex-wrap gap-2.5">
          {features.map((f) => (
            <span
              key={f}
              className="text-xs font-medium text-warm-700 bg-warm-100 px-3.5 py-2 rounded-full ring-1 ring-warm-200/50"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Gallery Image                                                      */
/* ------------------------------------------------------------------ */
function GalleryImage({
  src,
  alt,
  span,
}: {
  src: string;
  alt: string;
  span?: string;
}) {
  return (
    <div
      className={`p-1.5 bg-warm-100/60 rounded-[1.5rem] ring-1 ring-warm-200/30 ${
        span || ""
      }`}
    >
      <div className="rounded-[calc(1.5rem-0.375rem)] overflow-hidden img-zoom h-full">
        <Image
          src={src}
          alt={alt}
          width={800}
          height={600}
          className="w-full h-full object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat Counter                                                       */
/* ------------------------------------------------------------------ */
function StatCounter({
  value,
  suffix,
  label,
}: {
  value: string;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold tracking-tighter text-espresso">
        {value}
        {suffix && <span className="text-gold-500">{suffix}</span>}
      </div>
      <div className="text-sm text-warm-500 mt-2 font-medium">{label}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */
export default function Home() {
  useReveal();

  const services = [
    {
      title: "Framing",
      image: "/images/interior-room.jpg",
      description:
        "Every great structure begins with a solid frame. Our experienced framing crew handles residential and commercial projects across Miami-Dade and Broward counties, from new construction wood and metal stud framing to load-bearing wall modifications and structural reinforcements. We work closely with engineers and architects to deliver frames that meet Florida building code, pass inspections the first time, and set the stage for flawless finishing work. Whether you are building a single-family home in Miami Beach or framing out a new restaurant in Wynwood, Fortis Brothers delivers precision, speed, and structural integrity on every job.",
      features: [
        "Wood & Metal Stud",
        "Load-Bearing Walls",
        "New Construction",
        "Code Compliant",
        "Commercial & Residential",
        "Structural Reinforcement",
      ],
    },
    {
      title: "Drywall",
      image: "/images/drywall-room.jpg",
      description:
        "Smooth walls and clean ceilings are the foundation of any beautiful interior. Fortis Brothers provides end-to-end drywall services in Miami, including installation, taping, mudding, and finishing to Level 5 standards. We handle everything from small residential repair patches and water-damaged ceiling replacements to large-scale commercial drywall installations for offices, retail spaces, and restaurants. Our crews are trained to work efficiently without sacrificing quality, ensuring straight seams, invisible joints, and surfaces ready for paint. We also install moisture-resistant drywall for bathrooms and kitchens throughout South Florida.",
      features: [
        "Level 5 Finish",
        "Tape & Mud",
        "Moisture-Resistant",
        "Ceiling Work",
        "Patch & Repair",
        "Commercial Scale",
      ],
    },
    {
      title: "Interior Finishes",
      image: "/images/living-space.jpg",
      description:
        "The details define the space. Our interior finishing services cover trim carpentry, crown molding, baseboards, door and window casing, shiplap accent walls, wainscoting, built-in shelving, and custom millwork. We turn bare drywall rooms into polished, move-in-ready interiors that feel intentional and refined. Fortis Brothers works with designers and homeowners across Miami Beach, Coral Gables, Coconut Grove, and beyond to deliver finishes that match the vision, whether that is a coastal contemporary look, modern minimalism, or classic elegance. Every joint is tight, every line is straight, every detail is considered.",
      features: [
        "Crown Molding",
        "Baseboards & Trim",
        "Shiplap Walls",
        "Custom Millwork",
        "Wainscoting",
        "Built-In Shelving",
      ],
    },
    {
      title: "Bathroom Renovations",
      image: "/images/bathroom-luxury.jpg",
      description:
        "A bathroom renovation is one of the highest-return investments you can make in a Miami property. Fortis Brothers handles complete bathroom remodels from demolition through final inspection, including plumbing rough-in coordination, waterproofing, tile installation, vanity and fixture mounting, glass shower enclosure installation, and luxury freestanding tub placement. We have renovated master bathrooms in Miami Beach waterfront homes, guest baths in Brickell condominiums, and commercial restrooms in hospitality venues. Our attention to waterproofing and proper drainage slope is meticulous, because a beautiful bathroom must also be a bathroom that lasts.",
      features: [
        "Full Remodels",
        "Tile Installation",
        "Freestanding Tubs",
        "Glass Showers",
        "Waterproofing",
        "Vanity & Fixtures",
      ],
    },
    {
      title: "Stucco",
      image: "/images/accent-wall.jpg",
      description:
        "In South Florida, stucco is more than a finish material; it is your first line of defense against hurricane-force winds, tropical moisture, and relentless UV exposure. Fortis Brothers applies traditional three-coat stucco systems and modern EIFS (Exterior Insulation and Finish Systems) on residential and commercial exteriors throughout Miami-Dade County. We handle new stucco application on fresh construction, stucco patching and crack repair on older buildings, and full re-stucco projects that restore curb appeal and weather resistance. Our crews understand the specific challenges of coastal Florida construction and apply systems engineered for this climate.",
      features: [
        "Three-Coat System",
        "EIFS Application",
        "Crack Repair",
        "Weather Resistant",
        "Exterior Coating",
        "Hurricane Ready",
      ],
    },
    {
      title: "Flooring",
      image: "/images/flooring-after.jpg",
      description:
        "The floor sets the tone for the entire space. Fortis Brothers installs all major flooring types across Miami and South Florida, including luxury vinyl plank (LVP), engineered hardwood, porcelain and ceramic tile, natural stone such as marble and travertine, and large-format tiles that require precision leveling. We handle subfloor preparation, moisture testing, leveling compound application, and underlayment installation to make sure every floor is flat, stable, and built to last in Florida's humid climate. From a sleek modern condo in South Beach to a warm hardwood-floored family home in Pinecrest, we install floors that look stunning and perform for years.",
      features: [
        "Luxury Vinyl Plank",
        "Hardwood & Engineered",
        "Porcelain & Ceramic",
        "Natural Stone",
        "Subfloor Prep",
        "Large Format Tile",
      ],
    },
  ];

  return (
    <>
      <Navbar />

      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/kitchen.jpg"
            alt="Luxury kitchen renovation by Fortis Brothers in Miami Beach"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso/80 via-espresso/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-espresso/20" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 w-full pt-28 pb-20">
          <div className="max-w-2xl">
            <span
              className="inline-block text-[10px] uppercase tracking-[0.25em] font-semibold text-gold-400 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              Miami Beach, FL - Licensed & Insured
            </span>
            <h1
              className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white tracking-tighter leading-[0.92] mb-7 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.35s" }}
            >
              Building
              <br />
              <span className="text-gold-400">Spaces</span> That
              <br />
              Stand Strong
            </h1>
            <p
              className="text-warm-200 text-lg md:text-xl leading-relaxed max-w-[48ch] mb-10 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.5s" }}
            >
              Full-service construction and remodeling for residential and
              commercial properties. Everything under one roof -- from framing to
              final finishes.
            </p>
            <div
              className="flex flex-wrap items-center gap-4 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.65s" }}
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-3 bg-white text-espresso text-base font-semibold pl-7 pr-2 py-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-cream active:scale-[0.97] group"
              >
                Get a Free Estimate
                <span className="w-10 h-10 rounded-full bg-espresso/5 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M2 7H12M12 7L8 3M12 7L8 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 text-white/80 text-base font-medium hover:text-white transition-colors duration-300"
              >
                View Our Services
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 2V12M7 12L3 8M7 12L11 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
      </section>

      {/* ============================================================ */}
      {/*  TRUST BAR / STATS                                            */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 border-b border-warm-200/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 reveal stagger-children">
            <StatCounter value="150" suffix="+" label="Projects Completed" />
            <StatCounter value="8" suffix="+" label="Years in Miami" />
            <StatCounter value="100" suffix="%" label="Licensed & Insured" />
            <StatCounter value="6" label="Services Under One Roof" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SERVICES                                                     */}
      {/* ============================================================ */}
      <section id="services" className="py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* Section header */}
          <div className="max-w-2xl mb-20 reveal">
            <span className="inline-block text-[10px] uppercase tracking-[0.2em] font-semibold text-gold-500 bg-gold-400/10 px-3 py-1.5 rounded-full mb-5">
              What We Do
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 leading-[0.95]">
              Everything Under
              <br />
              <span className="text-warm-400">One Roof</span>
            </h2>
            <p className="text-warm-600 text-lg leading-relaxed max-w-[55ch]">
              From the first stud to the final coat of paint, Fortis Brothers
              delivers complete construction and remodeling services across
              Miami-Dade and Broward counties. No subcontractor runaround. One
              team, one standard.
            </p>
          </div>

          {/* Service blocks */}
          <div className="flex flex-col gap-24 md:gap-32">
            {services.map((s, i) => (
              <ServiceCard
                key={s.title}
                title={s.title}
                description={s.description}
                image={s.image}
                features={s.features}
                reversed={i % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  BEFORE / AFTER                                               */}
      {/* ============================================================ */}
      <section className="py-24 md:py-36 bg-warm-50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="max-w-2xl mb-16 reveal">
            <span className="inline-block text-[10px] uppercase tracking-[0.2em] font-semibold text-gold-500 bg-gold-400/10 px-3 py-1.5 rounded-full mb-5">
              Transformations
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter mb-6 leading-[0.95]">
              See the <span className="text-warm-400">Difference</span>
            </h2>
            <p className="text-warm-600 text-lg leading-relaxed max-w-[55ch]">
              Drag the slider to see a real before-and-after from one of our
              recent flooring projects in Miami Beach. This is what happens when
              you trust your property to the right hands.
            </p>
          </div>
          <div className="max-w-3xl reveal">
            <BeforeAfter
              before="/images/flooring-before.jpg"
              after="/images/flooring-after.jpg"
              alt="Flooring renovation by Fortis Brothers in Miami Beach"
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  GALLERY                                                      */}
      {/* ============================================================ */}
      <section id="gallery" className="py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="max-w-2xl mb-16 reveal">
            <span className="inline-block text-[10px] uppercase tracking-[0.2em] font-semibold text-gold-500 bg-gold-400/10 px-3 py-1.5 rounded-full mb-5">
              Portfolio
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter mb-6 leading-[0.95]">
              Recent <span className="text-warm-400">Projects</span>
            </h2>
            <p className="text-warm-600 text-lg leading-relaxed max-w-[55ch]">
              Browse through our recent construction and renovation work across
              Miami Beach and South Florida. Every project reflects the care and
              craftsmanship that defines Fortis Brothers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children reveal">
            <GalleryImage
              src="/images/bathroom-luxury.jpg"
              alt="Luxury bathroom renovation with freestanding tub in Miami Beach"
              span="md:row-span-2"
            />
            <GalleryImage
              src="/images/bathroom-teal.jpg"
              alt="Modern teal tile bathroom remodel by Fortis Brothers"
            />
            <GalleryImage
              src="/images/bathroom-shower.jpg"
              alt="Custom glass shower enclosure installation in Miami"
            />
            <GalleryImage
              src="/images/kitchen.jpg"
              alt="Custom kitchen with shaker cabinets built by Fortis Brothers"
            />
            <GalleryImage
              src="/images/bathroom-double.jpg"
              alt="Double vanity bathroom with marble flooring in Miami Beach"
            />
            <GalleryImage
              src="/images/living-space.jpg"
              alt="Interior finish work with shiplap walls in South Florida home"
              span="md:col-span-2"
            />
            <GalleryImage
              src="/images/accent-wall.jpg"
              alt="Stone accent wall with chandelier installed by Fortis Brothers"
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  ABOUT                                                        */}
      {/* ============================================================ */}
      <section id="about" className="py-24 md:py-36 bg-espresso text-cream">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <span className="inline-block text-[10px] uppercase tracking-[0.2em] font-semibold text-gold-400 bg-gold-400/10 px-3 py-1.5 rounded-full mb-6">
                About Fortis Brothers
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-7 leading-[0.95]">
                Built on Skill.
                <br />
                <span className="text-gold-400">Driven by Standards.</span>
              </h2>
              <div className="space-y-5 text-warm-300 text-base leading-relaxed max-w-[55ch]">
                <p>
                  Fortis Brothers is a licensed, full-service construction and
                  remodeling company based in Miami Beach, Florida. We handle
                  every phase of the build process in-house, from the initial
                  frame to the final coat of paint, which means fewer delays,
                  tighter quality control, and one team you can hold accountable
                  from start to finish.
                </p>
                <p>
                  We serve homeowners, property investors, developers, and
                  commercial clients across Miami-Dade and Broward counties. Our
                  work spans single-family homes, luxury condominiums, retail
                  build-outs, restaurant renovations, and multi-unit residential
                  projects.
                </p>
                <p>
                  We do not cut corners. We do not disappear mid-project. We
                  show up on time, communicate clearly, and deliver work that
                  meets the standard we would want in our own homes. That is the
                  Fortis Brothers commitment.
                </p>
              </div>
            </div>
            <div className="reveal-right">
              <div className="p-2 bg-white/5 rounded-[2rem] ring-1 ring-white/10">
                <div className="rounded-[calc(2rem-0.5rem)] overflow-hidden">
                  <Image
                    src="/images/bathroom-tub.jpg"
                    alt="Fortis Brothers luxury bathroom construction in Miami Beach"
                    width={800}
                    height={700}
                    className="w-full aspect-[4/3.5] object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SERVICE AREAS (SEO)                                          */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 border-b border-warm-200/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 reveal">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tighter mb-4">
              Serving All of <span className="text-warm-400">South Florida</span>
            </h2>
            <p className="text-warm-600 text-base max-w-[50ch] mx-auto">
              We work across Miami-Dade and Broward counties. Here are some of
              the communities we serve regularly.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 stagger-children">
            {[
              "Miami Beach",
              "South Beach",
              "Coral Gables",
              "Coconut Grove",
              "Brickell",
              "Wynwood",
              "Downtown Miami",
              "Key Biscayne",
              "Pinecrest",
              "Aventura",
              "Sunny Isles Beach",
              "Bal Harbour",
              "Surfside",
              "North Miami",
              "Fort Lauderdale",
              "Hollywood, FL",
            ].map((area) => (
              <span
                key={area}
                className="text-sm font-medium text-warm-700 bg-warm-50 px-5 py-2.5 rounded-full ring-1 ring-warm-200/50"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CONTACT / CTA                                                */}
      {/* ============================================================ */}
      <section id="contact" className="py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: info */}
            <div className="reveal-left">
              <span className="inline-block text-[10px] uppercase tracking-[0.2em] font-semibold text-gold-500 bg-gold-400/10 px-3 py-1.5 rounded-full mb-6">
                Get In Touch
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-7 leading-[0.95]">
                Ready to
                <br />
                <span className="text-warm-400">Start Building?</span>
              </h2>
              <p className="text-warm-600 text-lg leading-relaxed max-w-[50ch] mb-10">
                Tell us about your project and we will get back to you with a
                detailed estimate. No pressure, no obligation. Just real numbers
                from a team that shows up.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-warm-100 flex items-center justify-center flex-shrink-0 ring-1 ring-warm-200/50">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      className="text-warm-600"
                    >
                      <path
                        d="M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M9 16.5C9 16.5 15 12 15 7.5C15 4.18629 12.3137 1.5 9 1.5C5.68629 1.5 3 4.18629 3 7.5C3 12 9 16.5 9 16.5Z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-0.5">Address</div>
                    <div className="text-warm-600 text-sm">
                      8201 Abbott Avenue #4, Miami Beach FL 33141
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-warm-100 flex items-center justify-center flex-shrink-0 ring-1 ring-warm-200/50">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      className="text-warm-600"
                    >
                      <path
                        d="M1.5 4.5L7.6 8.9C8.4 9.5 9.6 9.5 10.4 8.9L16.5 4.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                      <rect
                        x="1.5"
                        y="3"
                        width="15"
                        height="12"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-0.5">Email</div>
                    <a
                      href="mailto:info@fortisbrothers.com"
                      className="text-warm-600 text-sm hover:text-gold-500 transition-colors"
                    >
                      info@fortisbrothers.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-warm-100 flex items-center justify-center flex-shrink-0 ring-1 ring-warm-200/50">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      className="text-warm-600"
                    >
                      <path
                        d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 10.74 2.1 12.33 3.09 13.59L1.5 16.5L4.41 14.91C5.67 15.9 7.26 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5Z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-0.5">
                      Instagram
                    </div>
                    <a
                      href="https://www.instagram.com/fortisbrothers/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-warm-600 text-sm hover:text-gold-500 transition-colors"
                    >
                      @fortisbrothers
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-warm-100 flex items-center justify-center flex-shrink-0 ring-1 ring-warm-200/50">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      className="text-warm-600"
                    >
                      <path
                        d="M3 6L3 15M15 6V15M3 6C3 3.79086 4.79086 2 7 2H11C13.2091 2 15 3.79086 15 6M3 6H15M6 10H12M6 13H10"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-0.5">Hours</div>
                    <div className="text-warm-600 text-sm">
                      Monday - Saturday: 7:00 AM - 6:00 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: contact form */}
            <div className="reveal-right">
              <div className="p-2 bg-warm-100/60 rounded-[2rem] ring-1 ring-warm-200/40">
                <div className="bg-white rounded-[calc(2rem-0.5rem)] p-8 md:p-10">
                  <h3 className="font-display text-2xl font-semibold tracking-tight mb-2">
                    Request a Free Estimate
                  </h3>
                  <p className="text-warm-500 text-sm mb-8">
                    Fill out the form and we will contact you within 24 hours.
                  </p>
                  <form
                    action="https://formsubmit.co/info@fortisbrothers.com"
                    method="POST"
                    className="space-y-5"
                  >
                    <input type="hidden" name="_captcha" value="false" />
                    <input
                      type="hidden"
                      name="_next"
                      value="https://fortisbrothers.com/#contact"
                    />
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 text-sm bg-warm-50 border border-warm-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-gold-400 transition-all duration-300 placeholder:text-warm-400"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="you@email.com"
                          className="w-full px-4 py-3 text-sm bg-warm-50 border border-warm-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-gold-400 transition-all duration-300 placeholder:text-warm-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="(786) 555-1234"
                          className="w-full px-4 py-3 text-sm bg-warm-50 border border-warm-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-gold-400 transition-all duration-300 placeholder:text-warm-400"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Service Needed
                      </label>
                      <select
                        name="service"
                        className="w-full px-4 py-3 text-sm bg-warm-50 border border-warm-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-gold-400 transition-all duration-300 text-warm-600"
                      >
                        <option value="">Select a service</option>
                        <option value="Framing">Framing</option>
                        <option value="Drywall">Drywall</option>
                        <option value="Interior Finishes">
                          Interior Finishes
                        </option>
                        <option value="Bathroom Renovation">
                          Bathroom Renovation
                        </option>
                        <option value="Stucco">Stucco</option>
                        <option value="Flooring">Flooring</option>
                        <option value="Full Remodel">Full Remodel</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Project Details
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        required
                        placeholder="Tell us about your project -- size, location, timeline, and anything else that helps us give you an accurate estimate."
                        className="w-full px-4 py-3 text-sm bg-warm-50 border border-warm-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-gold-400 transition-all duration-300 placeholder:text-warm-400 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-3 bg-espresso text-cream text-base font-semibold py-3.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-warm-800 active:scale-[0.98]"
                    >
                      Send Request
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M2 7H12M12 7L8 3M12 7L8 11"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER                                                       */}
      {/* ============================================================ */}
      <footer className="bg-espresso text-warm-400 py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center">
                  <span className="text-espresso font-display font-bold text-lg leading-none">
                    F
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-semibold text-lg tracking-tight leading-tight text-cream">
                    Fortis Brothers
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-warm-500 font-medium leading-tight">
                    Construction & Remodeling
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed max-w-[35ch]">
                Licensed full-service construction company based in Miami Beach,
                FL. Serving residential and commercial clients across South
                Florida.
              </p>
            </div>

            {/* Services quick links */}
            <div>
              <h4 className="font-display font-semibold text-cream text-sm mb-5 tracking-tight">
                Services
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="#services"
                    className="hover:text-gold-400 transition-colors"
                  >
                    Framing
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-gold-400 transition-colors"
                  >
                    Drywall Installation
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-gold-400 transition-colors"
                  >
                    Interior Finishes
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-gold-400 transition-colors"
                  >
                    Bathroom Renovations
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-gold-400 transition-colors"
                  >
                    Stucco
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-gold-400 transition-colors"
                  >
                    Flooring
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-semibold text-cream text-sm mb-5 tracking-tight">
                Contact
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>8201 Abbott Avenue #4</li>
                <li>Miami Beach, FL 33141</li>
                <li className="pt-2">
                  <a
                    href="mailto:info@fortisbrothers.com"
                    className="hover:text-gold-400 transition-colors"
                  >
                    info@fortisbrothers.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/fortisbrothers/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold-400 transition-colors"
                  >
                    Instagram: @fortisbrothers
                  </a>
                </li>
                <li className="pt-2">Mon - Sat: 7:00 AM - 6:00 PM</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-warm-600">
              &copy; {new Date().getFullYear()} Fortis Brothers Construction.
              All rights reserved.
            </p>
            <p className="text-xs text-warm-600">
              Licensed & Insured | Miami Beach, FL
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
