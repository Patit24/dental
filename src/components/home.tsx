"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Activity, ArrowRight, Award, Baby, Bone, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, ClipboardCheck, Clock3, Heart, HeartPulse, MapPin, Microscope, MoveRight, PhoneCall, Quote, ScanLine, ShieldCheck, Smile, Sparkles, Star, Stethoscope, Syringe, WandSparkles, Waves, Zap } from "lucide-react";
import { assetPath } from "@/lib/assets";
import { clinic, doctors, faqs, posts, reviews, services } from "@/lib/data";
import { Counter } from "./motion";

// Emil Kowalski snappy spring animation parameters
const springSnappy = { type: "spring" as const, duration: 0.4, bounce: 0.05 };

// Snappy blur-fade entrance preset
const blurFadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 15, scale: 0.96, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.15 },
  transition: { ...springSnappy, delay }
});

// Stagger container variants
const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.04
    }
  }
};

const staggerItem = {
  initial: { opacity: 0, y: 15, scale: 0.96, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  transition: springSnappy
};

export function Hero() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  
  // Subtle 2D parallax movement
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 20]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.985]);
  
  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 15, scale: 0.96, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    transition: { ...springSnappy, delay }
  });

  return (
    <section ref={heroRef} className="hero-3d relative min-h-[800px] overflow-hidden py-16 lg:min-h-[850px] lg:py-24 flex items-center">
      <div className="pointer-events-none absolute -left-32 top-44 h-80 w-80 rounded-full border border-[var(--teal)]/10" />
      <div className="container grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative z-10">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springSnappy, delay: 0.05 }}
            className="dot-heading mb-8 text-[var(--teal)]"
          >
            <motion.span 
              initial={reduce ? false : { scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.12 }}
              className="dot-heading-dot dot-heading-dot--blue"
            />
            <span>Chapter 01 · The perfect smile universe</span>
          </motion.div>

          <div className="reveal-wrapper">
            <motion.h1 
              initial={reduce ? false : { y: "105%" }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.1 }}
              className="display max-w-[800px]"
            >
              Advanced Dental Care with <span className="text-[var(--teal)] drop-shadow-[0_2px_10px_var(--teal-glow)]">Bespoke Precision</span>
            </motion.h1>
          </div>

          <div className="reveal-wrapper mt-6">
            <motion.p 
              initial={reduce ? false : { y: "105%" }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.16 }}
              className="lead max-w-[620px]"
            >
              Modern, painless, and trusted dental treatments designed for your perfect smile. Experience clinical excellence.
            </motion.p>
          </div>

          <motion.div {...enter(0.22)} className="mt-8 flex flex-col gap-4 sm:flex-row">
            <MagneticLink className="btn btn-primary" href="/appointment">
              <CalendarDays size={18}/> Book Appointment
            </MagneticLink>
            <MagneticLink className="btn btn-secondary" href="/treatments">
              Explore Treatments <ArrowRight size={18}/>
            </MagneticLink>
          </motion.div>
          <motion.div {...enter(0.28)} className="mt-10 flex flex-wrap items-center gap-6 text-sm text-[var(--ink-soft)]">
            <span className="flex items-center gap-2">
              <span className="flex -space-x-2">
                {["DZ","DC","WB"].map(x => (
                  <span key={x} className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-[var(--cyan)] text-[9px] font-bold text-[var(--teal)]">
                    {x}
                  </span>
                ))}
              </span> 
              Complete dental team
            </span>
            <span className="h-5 w-px bg-black/10"/>
            <span className="flex items-center gap-1.5">
              <MapPin size={15} className="text-[var(--teal)]"/>
              <b>Habra</b>, West Bengal
            </span>
          </motion.div>
        </div>
        
        <motion.div 
          style={{ y: visualY, scale: visualScale }} 
          className="relative mx-auto w-full max-w-[580px]"
        >
          <motion.div 
            initial={reduce ? false : { clipPath: "inset(0% 0% 100% 0%)", scale: 1.05 }} 
            animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }} 
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
            className="hero-3d-stage relative aspect-[1.02] overflow-hidden rounded-[32px]"
          >
            <div className="absolute inset-0">
              <Image 
                src={assetPath("/images/dentazone-hero-photo.png")} 
                alt="Photorealistic dental tooth model and professional instruments" 
                fill 
                priority 
                sizes="(max-width: 1024px) 100vw, 48vw" 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/15 via-transparent to-white/5"/>
            </div>
            <div className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-2xl bg-white/70 text-[var(--teal)] backdrop-blur-xl border border-white/40">
              <Sparkles size={22}/>
            </div>
          </motion.div>
          
          <StatFloat className="-left-4 top-8 lg:-left-10" icon={<Award/>} value="Open" label="Now welcoming patients" delay={0.4}/>
          <StatFloat className="-right-3 top-[42%] lg:-right-8" icon={<Heart/>} value="11:30" label="Closes tonight" delay={0.48}/>
          <StatFloat className="bottom-6 left-6 lg:-left-2" icon={<PhoneCall/>} value="Online" label="Booking Available" delay={0.56}/>
        </motion.div>
      </div>
    </section>
  );
}

export function DentalScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });



  // Scale of the image container zoom matching the reference scale(0.2)
  const scale = useTransform(scrollYProgress, [0, 0.8], [0.22, 1.0]);

  // Scale of the image content inside the box
  const imgScale1 = useTransform(scrollYProgress, [0, 0.5], [1.16, 1.04]);
  const imgScale2 = useTransform(scrollYProgress, [0.4, 0.95], [1.18, 1.06]);

  // Reactive inset clipPath calculation to expand the box to 100% full screen
  const insetY = useTransform(scrollYProgress, [0, 0.8], [18, 0]);
  const insetX = useTransform(scrollYProgress, [0, 0.8], [22, 0]);
  const radius = useTransform(scrollYProgress, [0, 0.8], [32, 0]);
  const clipPath = useTransform(
    [insetY, insetX, radius],
    ([y, x, r]) => `inset(${y}% ${x}% ${y}% ${x}% rounded ${r}px)`
  );

  // Precise vertical/horizontal slide-ins matching Haven Constructions
  const y1 = useTransform(scrollYProgress, [0, 0.45], [reduce ? 0 : 60, 0]);
  const x2 = useTransform(scrollYProgress, [0, 0.45], [reduce ? 0 : -60, 0]);
  const y3 = useTransform(scrollYProgress, [0, 0.45], [reduce ? 0 : -60, 0]);
  const x4 = useTransform(scrollYProgress, [0, 0.45], [reduce ? 0 : 60, 0]);

  // Image crossfade opacity transforms
  const opacity1 = useTransform(scrollYProgress, [0, 0.42, 0.52, 1], [1, 1, 0, 0]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.42, 0.52, 1], [0, 0, 1, 1]);

  // Fade out text layout as the card expands to cover full screen
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.72], [1, 0]);

  return (
    <section ref={containerRef} className="scroll-gallery-container">
      <div className="scroll-gallery-sticky">
        {/* Full Viewport Pinned Interactive Image Block */}
        <div className="scroll-gallery-images-wrapper">
          <motion.div
            style={{ 
              scale,
              clipPath
            }}
            className="scroll-gallery-img-box"
          >
            {/* Image 1: Tools */}
            <motion.div 
              style={{ opacity: opacity1 }}
              className="absolute inset-0"
            >
              <motion.div style={{ scale: imgScale1 }} className="absolute inset-0">
                <Image 
                  src={assetPath("/images/dentazone-tools-photo.png")} 
                  alt="Everyday and preventive dental care instruments" 
                  fill 
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/25 bg-gradient-to-t from-[var(--ink)]/40 via-transparent to-black/10" />
            </motion.div>

            {/* Image 2: Implant */}
            <motion.div 
              style={{ opacity: opacity2 }}
              className="absolute inset-0"
            >
              <motion.div style={{ scale: imgScale2 }} className="absolute inset-0">
                <Image 
                  src={assetPath("/images/dentazone-implant-photo.png")} 
                  alt="Bespoke restorative dental implants and clear aligners" 
                  fill 
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/25 bg-gradient-to-t from-[var(--ink)]/40 via-transparent to-black/10" />
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Typography Layout Layer */}
        <motion.div style={{ opacity: textOpacity }} className="scroll-gallery-text-container">
          {/* Row 1 */}
          <div className="scroll-gallery-row justify-start">
            <div className="reveal-wrapper">
              <motion.h2 style={{ y: y1 }} className="scroll-gallery-title">Bespoke</motion.h2>
            </div>
          </div>

          {/* Row 2 */}
          <div className="scroll-gallery-row justify-end">
            <div className="reveal-wrapper">
              <motion.p style={{ x: x2 }} className="scroll-gallery-sub">Habra</motion.p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="scroll-gallery-row justify-start">
            <div className="reveal-wrapper">
              <motion.h2 style={{ y: y3 }} className="scroll-gallery-title">Precision</motion.h2>
            </div>
          </div>

          {/* Row 4 */}
          <div className="scroll-gallery-row justify-end">
            <div className="reveal-wrapper">
              <motion.p style={{ x: x4 }} className="scroll-gallery-sub">Est. 2024</motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



function MagneticLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  return (
    <motion.div
      animate={reduce ? undefined : offset}
      transition={{ type: "spring", stiffness: 350, damping: 24, mass: 0.35 }}
      onMouseMove={(event) => {
        if (reduce) return;
        const rect = event.currentTarget.getBoundingClientRect();
        setOffset({ 
          x: (event.clientX - rect.left - rect.width / 2) * 0.1, 
          y: (event.clientY - rect.top - rect.height / 2) * 0.1 
        });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
    >
      <Link className={className} href={href}>{children}</Link>
    </motion.div>
  );
}

function StatFloat({ className, icon, value, label, delay }: { className: string; icon: React.ReactNode; value: string; label: string; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div 
      className={`glass absolute flex items-center gap-3 rounded-2xl p-3.5 pr-6 ${className}`} 
      initial={reduce ? false : { opacity: 0, y: 15, scale: 0.96 }} 
      animate={{ opacity: 1, y: 0, scale: 1 }} 
      transition={{ ...springSnappy, delay }}
    >
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--cyan)] text-[var(--teal)] [&>svg]:h-5 [&>svg]:w-5 border border-white/20">
        {icon}
      </span>
      <span>
        <b className="block font-[var(--font-heading)] text-base leading-none">{value}</b>
        <small className="whitespace-nowrap text-[10px] text-[var(--ink-soft)] mt-1 block">{label}</small>
      </span>
    </motion.div>
  );
}

export function TrustStrip() {
  return (
    <section className="border-y border-black/5 bg-white/70 py-16 backdrop-blur-xl">
      <div className="container">
        <div className="mb-10 max-w-xl">
          <h2 className="text-3xl font-semibold md:text-5xl tracking-tight">Enter a more precise world of dentistry.</h2>
        </div>
        <div className="grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Same-day", "appointments"],
            ["Digital", "diagnostics"],
            ["Transparent", "treatment plans"],
            ["Flexible", "payment options"]
          ].map(([a, b]) => (
            <div key={a} className="flex items-center justify-center gap-3 text-sm bg-white/40 p-4 rounded-xl border border-white/30">
              <Check className="rounded-full bg-[var(--cyan)] p-1 text-[var(--teal)]" size={24}/>
              <span><b>{a}</b> {b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesSection({ all = false }: { all?: boolean }) {
  const featuredServices = [
    { title: "Dental Implants", desc: "Stable titanium replacements planned with clinical precision for natural restoration and lifelong bone health.", icon: Bone, category: "Surgical", isLarge: true },
    { title: "Smile Designing", desc: "Artistic and analytical digital planning to shape custom proportions, balancing gum lines and tooth color for a radiant smile.", icon: Smile, category: "Cosmetic", isTall: true },
    { title: "General Dentistry", desc: "Complete preventive checkups, digital cleaning, fluorides, and everyday care to prevent dental issues.", icon: Stethoscope, category: "Preventive" },
    { title: "Root Canal Treatment", desc: "Modern micro-dentistry focused on immediate pain relief and natural tooth conservation.", icon: Syringe, category: "Therapy" },
    { title: "Braces & Aligners", desc: "Clear, comfortable orthodontic solutions designed for adults and teens to align teeth discreetly.", icon: Waves, category: "Orthodontics" },
    { title: "Emergency Dental Care", desc: "Rapid clinical diagnostics and immediate treatment slots for acute relief when a tooth emergency strikes.", icon: Activity, category: "Urgent", isLarge: true },
  ];

  const fullServices = [
    { title: "General Dentistry", desc: "Complete preventive and everyday dental care.", icon: Stethoscope },
    { title: "Root Canal Treatment", desc: "Modern care focused on relief and tooth preservation.", icon: Syringe },
    { title: "Dental Implants", desc: "Stable replacements planned for natural function.", icon: Bone },
    { title: "Teeth Whitening", desc: "Professional brightening for a refreshed smile.", icon: Sparkles },
    { title: "Braces & Aligners", desc: "Smile alignment with modern orthodontic options.", icon: Waves },
    { title: "Cosmetic Dentistry", desc: "Aesthetic treatments tailored to your smile.", icon: WandSparkles },
    { title: "Kids Dentistry", desc: "Friendly dental care for children and growing smiles.", icon: Baby },
    { title: "Gum Treatment", desc: "Focused care for healthier gums and foundations.", icon: HeartPulse },
    { title: "Tooth Extraction", desc: "Carefully planned simple and surgical extraction.", icon: Zap },
    { title: "Smile Designing", desc: "Thoughtful planning for balanced smile aesthetics.", icon: Smile },
    { title: "Crown & Bridge", desc: "Restorations for strength, function and appearance.", icon: Award },
    { title: "Emergency Dental Care", desc: "Direct guidance when a dental concern cannot wait.", icon: Activity },
  ];

  if (all) {
    return (
      <section className="section bg-[var(--warm)]" id="services">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {fullServices.map((s, i) => (
              <motion.div 
                key={s.title} 
                initial={{ opacity: 0, y: 15, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ ...springSnappy, delay: (i % 3) * 0.04 }}
              >
                <article className="card p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="mb-6 flex items-start justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--cyan)] text-[var(--teal)]">
                        <s.icon size={22}/>
                      </span>
                    </div>
                    <h3 className="text-xl font-bold leading-snug">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{s.desc}</p>
                  </div>
                  <Link href="/appointment" className="mt-6 flex items-center gap-2 text-xs font-bold text-[var(--teal)] group">
                    Book Treatment <ArrowRight size={14} className="transition-transform group-hover:translate-x-1"/>
                  </Link>
                </article>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section section-translucent" id="services">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springSnappy}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="section-title">Everything your smile needs, under one roof.</h2>
          <p className="lead mx-auto mt-5 max-w-2xl">
            From routine prevention to full smile transformation, every treatment is planned with clarity and delivered with care.
          </p>
        </motion.div>
        
        {/* Emil-style Staggered Bento Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          className="bento-grid mt-14"
        >
          {featuredServices.map((s) => {
            let colSpanClass = "lg:col-span-4 md:col-span-6 col-span-12";
            if (s.isLarge) colSpanClass = "lg:col-span-8 md:col-span-12 col-span-12";
            if (s.isTall) colSpanClass = "lg:col-span-4 md:col-span-6 col-span-12 bento-card-tall";
            
            return (
              <motion.div key={s.title} variants={staggerItem} className={colSpanClass}>
                <article className={`bento-card h-full ${s.isLarge ? 'bento-card-large' : ''} ${s.isTall ? 'bento-card-tall' : ''}`}>
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--cyan)] text-[var(--teal)] border border-white/30 shadow-sm">
                        <s.icon size={22} />
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-white/80 border border-black/5 px-2.5 py-1 rounded-full text-[var(--ink-soft)]">
                        {s.category}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight">{s.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{s.desc}</p>
                    </div>
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <Link className="btn btn-secondary !min-h-[40px] !px-4 !text-xs" href="/appointment">
                      Request consultation
                    </Link>
                    <ArrowRight className="text-[var(--ink)]/30 hover:text-[var(--teal)] transition-colors cursor-pointer" size={18}/>
                  </div>
                </article>
              </motion.div>
            );
          })}
        </motion.div>
        
        <div className="mt-12 text-center">
          <Link className="btn btn-secondary" href="/services">
            Explore all services <ArrowRight size={17}/>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start .8", "end .45"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const points = [
    { icon: ScanLine, title: "See the complete picture", text: "Digital scans and high-resolution diagnostics reveal more while keeping visits comfortable." },
    { icon: Microscope, title: "Plan with precision", text: "Your clinician combines evidence, experience and your goals into one transparent care plan." },
    { icon: Heart, title: "Feel cared for", text: "Gentle techniques, thoughtful pacing and real conversation make every step feel easier." },
    { icon: ShieldCheck, title: "Protect the result", text: "Long-term reviews and preventive support help your new smile stay healthy and beautiful." },
  ];

  return (
    <section ref={ref} className="section bg-[var(--ink)] text-white flex items-center">
      <div className="container grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springSnappy}
        >
          <span className="eyebrow !text-[#8de3dc]">Chapter 05 · Smile made of light</span>
          <h2 className="section-title mt-5">Advanced care should feel reassuring, not overwhelming.</h2>
          <p className="mt-6 max-w-xl leading-relaxed text-white/70">
            Every detail—from diagnosis to follow-up—is designed to create clarity, comfort and confidence.
          </p>
        </motion.div>
        
        <div className="relative">
          <div className="absolute bottom-7 left-[23px] top-7 w-px bg-white/10"/>
          <motion.div 
            style={{ scaleY: reduce ? 1 : lineScale, transformOrigin: "top" }} 
            className="absolute bottom-7 left-[23px] top-7 w-px bg-gradient-to-b from-[#8de3dc] to-[var(--teal)]"
          />
          <div className="grid gap-6">
            {points.map((p, i) => (
              <motion.div 
                key={p.title} 
                {...blurFadeIn(i * 0.04)}
                className="relative grid grid-cols-[48px_1fr] gap-6 rounded-[24px] bg-white/[0.04] p-6 backdrop-blur-md border border-white/[0.06]"
              >
                <span className="relative z-10 grid h-12 w-12 place-items-center rounded-2xl bg-[#d9f6f2] text-[var(--teal)] shadow-lg">
                  <p.icon size={21}/>
                </span>
                <div>
                  <small className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8de3dc]">Step 0{i+1}</small>
                  <h3 className="mt-2 text-xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{p.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TreatmentProcess() {
  const steps = [
    { n: "01", icon: Activity, title: "Consultation", text: "We listen, examine and understand what matters most to you." },
    { n: "02", icon: ScanLine, title: "Digital assessment", text: "Comfortable imaging gives us a precise view of your oral health." },
    { n: "03", icon: ClipboardCheck, title: "Personal plan", text: "Review clear options, timelines and costs before choosing together." },
    { n: "04", icon: WandSparkles, title: "Gentle treatment", text: "Modern techniques deliver efficient care with a calm, human touch." },
  ];

  return (
    <section className="section section-soft">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springSnappy}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="section-title">Four considered steps to your best smile.</h2>
          <p className="lead mt-5">A clear process removes uncertainty and keeps you informed from the first conversation to the final result.</p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.15 }}
          className="relative mt-14 grid gap-6 lg:grid-cols-4"
        >
          <div className="absolute left-[12%] right-[12%] top-12 hidden h-px bg-gradient-to-r from-transparent via-[var(--teal)]/30 to-transparent lg:block"/>
          {steps.map((s) => (
            <motion.div key={s.title} variants={staggerItem}>
              <article className="card relative h-full p-8">
                <div className="flex items-center justify-between">
                  <span className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl bg-[linear-gradient(145deg,#fff,#d7f3ef)] text-[var(--teal)] shadow-[0_8px_24px_rgba(8,127,132,0.12)] border border-white/80">
                    <s.icon size={22}/>
                  </span>
                  <span className="font-[var(--font-heading)] text-3xl font-bold text-[var(--teal)]/20">{s.n}</span>
                </div>
                <h3 className="mt-8 text-2xl font-bold leading-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{s.text}</p>
              </article>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function Metrics() {
  return (
    <section className="bg-[var(--ink)] py-20 text-white">
      <div className="container grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
        {[
          [20, "", "Listed services"],
          [1, "", "Convenient location"],
          [5, "", "Care categories"],
          [360, "°", "Complete dental care"]
        ].map(([v, s, l]) => (
          <div key={String(l)} className="p-4 bg-white/[0.02] rounded-2xl border border-white/[0.04]">
            <div className="font-[var(--font-heading)] text-5xl font-bold text-[#8de3dc]">
              <Counter end={Number(v)} suffix={String(s)}/>
            </div>
            <p className="mt-2 text-sm text-white/50">{l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DoctorsSection({ all = false }: { all?: boolean }) {
  return (
    <section className="section flex items-center">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springSnappy}
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <h2 className="section-title max-w-2xl">Experts who listen before they treat.</h2>
          </div>
          {!all && (
            <Link className="btn btn-secondary" href="/doctors">
              Meet all doctors <ArrowRight size={17}/>
            </Link>
          )}
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-8 md:grid-cols-3"
        >
          {doctors.map((d) => (
            <motion.div key={d.name} variants={staggerItem}>
              <article className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[var(--cyan)] border border-white/60 shadow-md">
                  <Image 
                    src={d.image} 
                    alt={d.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 33vw" 
                    className="object-cover"
                  />
                  <span className="glass absolute bottom-4 right-4 rounded-full px-3.5 py-2 text-[10px] font-bold border border-white/40 shadow-lg">
                    {d.exp}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-bold leading-tight group-hover:text-[var(--teal)] transition-colors">{d.name}</h3>
                <p className="mt-1 text-sm text-[var(--teal)] font-semibold">{d.role}</p>
              </article>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function BeforeAfter() {
  const [after, setAfter] = useState(58);
  return (
    <section className="section section-soft flex items-center">
      <div className="container grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springSnappy}
        >
          <span className="eyebrow">Chapter 06 · Smile transformation</span>
          <h2 className="section-title mt-5">Subtle changes. Life-changing confidence.</h2>
          <p className="lead mt-6">
            Every smile is designed around the person—not a template. Drag the slider to compare one of our recent cosmetic cases.
          </p>
          <Link className="btn btn-primary mt-8" href="/gallery">
            View smile gallery <ArrowRight size={17}/>
          </Link>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={springSnappy}
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-[#d7f0eb] border border-white/60 shadow-lg">
            <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,#d8ede8,#f7fbf9)]">
              <div className="text-center">
                <SmileGraphic bright/>
                <b className="mt-4 block font-bold text-[var(--ink)]">After treatment</b>
              </div>
            </div>
            <div className="absolute inset-y-0 left-0 overflow-hidden bg-[#ece8df]" style={{ width: `${after}%` }}>
              <div className="grid h-full place-items-center" style={{ width: `${10000 / after}%` }}>
                <div className="text-center">
                  <SmileGraphic/>
                  <b className="mt-4 block font-bold text-[var(--ink)]">Before treatment</b>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 w-0.5 bg-white shadow-lg" style={{ left: `${after}%` }}>
              <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-2xl border border-black/5 cursor-ew-resize">
                <span className="flex text-[var(--teal)]"><ChevronLeft size={14}/><ChevronRight size={14}/></span>
              </span>
            </div>
            <input 
              aria-label="Compare before and after treatment" 
              type="range" 
              min="20" 
              max="80" 
              value={after} 
              onChange={e => setAfter(Number(e.target.value))} 
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SmileGraphic({ bright = false }: { bright?: boolean }) {
  return (
    <div className="relative h-28 w-56 overflow-hidden rounded-[50%] border-[16px] shadow-inner border-[#c9dcd8] bg-[#e9e1d4]">
      <div className="absolute left-1/2 top-3 flex -translate-x-1/2 gap-0.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className={`h-12 w-7 rounded-b-xl border ${bright ? "border-[#c9dcd8] bg-white" : "border-[#d1c7b8] bg-[#e9e1d4]"}`}/>
        ))}
      </div>
    </div>
  );
}

export function Testimonials({ all = false }: { all?: boolean }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  
  useEffect(() => {
    if (reduce || all) return;
    const id = setInterval(() => setIndex(v => (v + 1) % reviews.length), 6500);
    return () => clearInterval(id);
  }, [all, reduce]);

  if (all) {
    return (
      <section className="section bg-[var(--warm)]">
        <div className="container grid gap-6 md:grid-cols-3">
          {reviews.map(r => (
            <ReviewCard key={r.name} r={r}/>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-[var(--ink)] text-white">
      <div className="container py-4">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springSnappy}
          >
            <h2 className="section-title">The experience matters as much as the outcome.</h2>
            <div className="mt-8 flex gap-4">
              <button 
                className="grid h-12 w-12 place-items-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors" 
                onClick={() => setIndex((index + reviews.length - 1) % reviews.length)} 
                aria-label="Previous review"
              >
                <ChevronLeft/>
              </button>
              <button 
                className="grid h-12 w-12 place-items-center rounded-full bg-white text-[var(--ink)] hover:bg-white/90 transition-colors shadow-lg" 
                onClick={() => setIndex((index + 1) % reviews.length)} 
                aria-label="Next review"
              >
                <ChevronRight/>
              </button>
            </div>
          </motion.div>
          
          <div className="relative min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={index} 
                initial={reduce ? false : { opacity: 0, y: 15, scale: 0.97, filter: "blur(4px)" }} 
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} 
                exit={{ opacity: 0, y: -10, scale: 0.97, filter: "blur(3px)" }} 
                transition={{ duration: 0.3, ease: "easeOut" }} 
                className="absolute inset-0 rounded-[32px] bg-white p-8 text-[var(--ink)] md:p-12 border border-white/50 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <Quote className="text-[var(--teal)] opacity-60" size={36}/>
                  <p className="mt-6 font-[var(--font-heading)] text-2xl font-semibold leading-relaxed md:text-3xl text-[var(--ink)]">
                    “{reviews[index].quote}”
                  </p>
                </div>
                <div className="mt-6 border-t border-black/5 pt-5 flex justify-between items-center">
                  <span>
                    <b className="font-bold text-lg block">{reviews[index].name}</b>
                    <small className="text-[var(--ink-soft)] font-medium mt-1 block">{reviews[index].treatment}</small>
                  </span>
                  <span className="flex text-[#f3a83b]">{[1,2,3,4,5].map(x=><Star key={x} size={14} fill="currentColor"/>)}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ r }: { r: typeof reviews[number] }) {
  return (
    <article className="card p-8 flex flex-col justify-between h-full bg-white border border-white/50 shadow-sm">
      <div>
        <div className="flex text-[#f3a83b]">{[1,2,3,4,5].map(x => <Star key={x} size={14} fill="currentColor"/>)}</div>
        <p className="mt-6 leading-relaxed text-[var(--ink-soft)] text-sm">“{r.quote}”</p>
      </div>
      <div className="mt-8 border-t border-black/5 pt-5">
        <b className="font-bold">{r.name}</b>
        <small className="ml-2 text-[var(--teal)] font-semibold">{r.treatment}</small>
      </div>
    </article>
  );
}

export function Emergency() {
  return (
    <section className="section bg-[var(--warm)]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={springSnappy}
        >
          <div className="overflow-hidden rounded-[32px] bg-[linear-gradient(110deg,#0a585c,#043d42)] px-8 py-12 text-white md:px-16 md:py-16 shadow-xl border border-[var(--teal)]/20 relative">
            <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-white/[0.02] blur-xl pointer-events-none"/>
            <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#9ce5df]">
                  <Clock3 size={15}/> Need dental assistance?
                </span>
                <h2 className="mt-6 max-w-3xl text-4xl font-bold md:text-5xl leading-tight">Reach Dr. Shaheen&apos;s Dental Clinic.</h2>
                <p className="mt-4 max-w-2xl text-white/70">Open until 11:30 pm. Use the online appointment form or open the clinic listing for current contact details.</p>
              </div>
              <a className="btn bg-white text-[var(--teal)] font-bold text-sm shadow-xl" href={clinic.phoneHref}>
                <MapPin size={18}/> Open Google Maps
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function BookingSection() {
  return (
    <section className="section relative overflow-hidden bg-[radial-gradient(circle_at_10%_10%,rgba(216,245,239,0.95),transparent_33%),linear-gradient(135deg,rgba(238,250,248,0.92),rgba(249,252,251,0.85))] flex items-center">
      <div className="container grid items-start gap-14 lg:grid-cols-[0.75fr_1.25fr] py-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springSnappy}
        >
          <h2 className="section-title">Ready for a calmer dental experience?</h2>
          <p className="lead mt-5">Choose a preferred date and treatment. Our patient care team will call to confirm the best appointment for you.</p>
          <div className="mt-8 grid gap-4">
            {["Same-day appointments available", "Transparent treatment estimates", "Flexible payment options"].map(x => (
              <div key={x} className="flex items-center gap-3 text-sm font-semibold text-[var(--ink)]">
                <Check className="rounded-full bg-white p-1 text-[var(--teal)] shadow-sm border border-black/5" size={24}/>
                {x}
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 15, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={springSnappy}
          className="w-full"
        >
          <div className="glass rounded-[28px] p-6 md:p-8 border border-white/60 shadow-xl">
            <AppointmentForm compact/>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function BlogSection({ all = false }: { all?: boolean }) {
  return (
    <section className="section bg-[var(--warm)]">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springSnappy}
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <h2 className="section-title max-w-2xl">Simple guidance for a healthier smile.</h2>
          </div>
          {!all && (
            <Link className="font-bold text-[var(--teal)] flex items-center gap-2 hover:underline" href="/blog">
              View all articles <ArrowRight size={16}/>
            </Link>
          )}
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-8 md:grid-cols-3"
        >
          {posts.map((p, i) => (
            <motion.div key={p.title} variants={staggerItem}>
              <article className="group cursor-pointer">
                <div className={`aspect-[16/10] rounded-[24px] ${["bg-[#d5efeb]","bg-[#e4ecf3]","bg-[#f2e9dc]"][i % 3]} grid place-items-center border border-white/60 overflow-hidden shadow-sm relative`}>
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-white/65 text-[var(--teal)] backdrop-blur-sm border border-white/40 transition-transform group-hover:scale-110">
                    <Sparkles size={24}/>
                  </span>
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--teal)]">{p.category}</p>
                <h3 className="mt-3 text-2xl font-bold leading-snug transition-colors group-hover:text-[var(--teal)]">{p.title}</h3>
                <p className="mt-3 text-xs text-[var(--ink-soft)] font-medium">{p.date} · {p.read} read</p>
              </article>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section section-soft">
      <div className="container grid gap-14 lg:grid-cols-[0.8fr_1.2fr] py-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springSnappy}
        >
          <h2 className="section-title">Questions, answered clearly.</h2>
          <p className="lead mt-5">Still wondering about something? Our patient care team is one call away.</p>
        </motion.div>
        
        <div>
          {faqs.map(([q, a], i) => (
            <div key={q} className="border-b border-black/10">
              <button 
                className="flex min-h-[76px] w-full items-center justify-between gap-5 py-4 text-left font-[var(--font-heading)] text-lg font-bold text-[var(--ink)]" 
                onClick={() => setOpen(open === i ? -1 : i)} 
                aria-expanded={open === i}
              >
                {q}
                <ChevronDown className={`shrink-0 text-[var(--teal)] transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}/>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: "auto" }} 
                    exit={{ opacity: 0, height: 0 }} 
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-6 text-sm leading-relaxed text-[var(--ink-soft)]">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactMapSection() {
  return (
    <section className="section flex items-center">
      <div className="container grid gap-10 lg:grid-cols-[0.75fr_1.25fr] py-4">
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={springSnappy}
        >
          <div className="card h-full p-8 md:p-10 border border-white/60 shadow-xl bg-white/70">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--cyan)] text-[var(--teal)] border border-white/30">
              <MapPin size={22}/>
            </span>
            <span className="eyebrow mt-10">Chapter 09 · Return to Dr. Shaheen&apos;s</span>
            <h2 className="mt-5 text-4xl font-bold tracking-tight">Dental care close to home.</h2>
            <p className="mt-5 text-sm leading-relaxed text-[var(--ink-soft)]">{clinic.address}</p>
            <div className="mt-6 grid gap-2 text-sm border-t border-black/5 pt-5">
              <a className="font-bold text-lg text-[var(--teal)]" href={clinic.phoneHref} target="_blank" rel="noreferrer">{clinic.phoneDisplay}</a>
              <span className="text-xs font-semibold text-[var(--teal)]">{clinic.hoursDisplay}</span>
              <a className="font-semibold text-xs text-[var(--ink-soft)] hover:text-[var(--ink)] flex items-center gap-1.5" href={clinic.mapLink} target="_blank" rel="noreferrer">
                Open in Google Maps <ArrowRight size={14}/>
              </a>
            </div>
            <Link href="/contact" className="btn btn-primary mt-8 w-full sm:w-auto">
              Contact the clinic <ArrowRight size={17}/>
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={springSnappy}
          className="w-full"
        >
          <div className="h-[480px] overflow-hidden rounded-[28px] bg-[var(--cyan)] border border-white/60 shadow-xl">
            <iframe 
              className="h-full w-full border-0" 
              title="Map showing Dr. Shaheen's Dental Clinic in Habra" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
              src={clinic.mapEmbed}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function AppointmentForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);
  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }
  
  return (
    <form onSubmit={submit} className={`${compact ? "" : "card"} grid gap-6 ${compact ? "" : "p-6 md:p-8 bg-white"}`}>
      {sent && (
        <div className="rounded-2xl bg-[#e4f7ef] p-4 text-sm font-semibold text-[#176347] border border-[#a3e2c9]" role="status">
          Thank you—your request is ready for our patient care team. This demo does not send data yet.
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="field">
          <label htmlFor="name">Name *</label>
          <input id="name" name="name" autoComplete="name" required placeholder="Your full name"/>
        </div>
        <div className="field">
          <label htmlFor="phone">Phone *</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required placeholder="+91 00000 00000"/>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="field">
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com"/>
        </div>
        <div className="field">
          <label htmlFor="treatment">Treatment type</label>
          <select id="treatment" name="treatment" defaultValue="">
            <option value="" disabled>Select a treatment</option>
            {services.map(s => <option key={s.title}>{s.title}</option>)}
          </select>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="field">
          <label htmlFor="date">Preferred date *</label>
          <input id="date" name="date" type="date" required/>
        </div>
        <div className="field">
          <label htmlFor="time">Preferred time *</label>
          <input id="time" name="time" type="time" required/>
        </div>
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="Tell us how we can help"/>
      </div>
      <button className="btn btn-primary w-full sm:w-fit mt-2" type="submit">
        <CalendarDays size={18}/> Request appointment
      </button>
      <p className="text-xs leading-relaxed text-[var(--ink-soft)]">
        By submitting, you agree to be contacted about your appointment request. For emergencies, please call us directly.
      </p>
    </form>
  );
}

export function FeaturedPortfolio() {
  const portfolioRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: portfolioRef,
    offset: ["start end", "end start"]
  });

  // Vertical scroll parallax offsets for staggered columns
  const yLeft = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 60, reduce ? 0 : -60]);
  const yRight = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -60, reduce ? 0 : 60]);

  const items = [
    { title: "Emergency & Family Care", year: "2026", image: assetPath("/images/dentazone-implant-photo.png"), alt: "Restorative dental implant model", col: "left" },
    { title: "Cosmetic Whitening", year: "2026", image: assetPath("/images/dentazone-hero-photo.png"), alt: "Cosmetic dental smile showcase", col: "right" },
    { title: "Paediatric Dentistry", year: "2026", image: assetPath("/images/dentazone-tools-photo.png"), alt: "Dental tools and aligner case review", col: "left" },
    { title: "Dentures & Bridges", year: "2026", image: assetPath("/images/dental-hero.png"), alt: "Complete oral rehabilitation patient profile", col: "right" },
  ];

  const leftItems = items.filter(item => item.col === "left");
  const rightItems = items.filter(item => item.col === "right");

  return (
    <section ref={portfolioRef} className="portfolio-section">
      <div className="container">
        <div className="mb-14 max-w-2xl">
          <div className="dot-heading mb-6 text-[var(--teal)]">
            <span className="dot-heading-dot dot-heading-dot--blue" />
            <span>Featured Cases & Gallery</span>
          </div>
          <h2 className="section-title">Smile transformations designed to inspire.</h2>
        </div>

        <div className="portfolio-grid">
          {/* Left Column (staggered down) */}
          <motion.div style={{ y: yLeft }} className="portfolio-col-left">
            {leftItems.map((item, idx) => (
              <article key={idx} className="portfolio-card">
                <div className="portfolio-image-wrapper">
                  <Image 
                    src={item.image} 
                    alt={item.alt}
                    fill
                    sizes="(max-width: 800px) 100vw, 50vw"
                    className="portfolio-img"
                  />
                </div>
                <div className="portfolio-overlay">
                  <div className="portfolio-content-row">
                    <div className="portfolio-title-group">
                      <span className="portfolio-arrow">
                        <ArrowRight size={26} style={{ transform: "rotate(-45deg)" }} />
                      </span>
                      <h3 className="portfolio-title">{item.title}</h3>
                    </div>
                    <span className="portfolio-year">{item.year}</span>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>

          {/* Right Column (staggered up) */}
          <motion.div style={{ y: yRight }} className="portfolio-col-right">
            {rightItems.map((item, idx) => (
              <article key={idx} className="portfolio-card">
                <div className="portfolio-image-wrapper">
                  <Image 
                    src={item.image} 
                    alt={item.alt}
                    fill
                    sizes="(max-width: 800px) 100vw, 50vw"
                    className="portfolio-img"
                  />
                </div>
                <div className="portfolio-overlay">
                  <div className="portfolio-content-row">
                    <div className="portfolio-title-group">
                      <span className="portfolio-arrow">
                        <ArrowRight size={26} style={{ transform: "rotate(-45deg)" }} />
                      </span>
                      <h3 className="portfolio-title">{item.title}</h3>
                    </div>
                    <span className="portfolio-year">{item.year}</span>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
