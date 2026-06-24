"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Activity, ArrowRight, Award, Baby, Bone, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, ClipboardCheck, Clock3, Heart, HeartPulse, MapPin, Microscope, MoveRight, PhoneCall, Quote, ScanLine, ShieldCheck, Smile, Sparkles, Star, Stethoscope, Syringe, WandSparkles, Waves, Zap } from "lucide-react";
import { clinic, doctors, faqs, posts, reviews, services } from "@/lib/data";
import { Counter, Reveal } from "./motion";

// Custom premium animation spring presets
const smoothSpring = { type: "spring" as const, stiffness: 100, damping: 20, bounce: 0 };
const blurFadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 30, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.15 },
  transition: { ...smoothSpring, duration: 0.8, delay }
});

export function Hero() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 35]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.98]);
  
  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { ...smoothSpring, duration: 0.7, delay }
  });

  return (
    <section ref={heroRef} data-journey="0" className="hero-3d relative min-h-[850px] overflow-hidden py-20 lg:min-h-[900px] lg:py-28 flex items-center">
      <div className="pointer-events-none absolute -left-32 top-44 h-80 w-80 rounded-full border border-[var(--teal)]/10" />
      <div className="container grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative z-10">
          <motion.div {...enter(0.05)} className="eyebrow mb-8">Chapter 01 · The perfect smile universe</motion.div>
          <motion.h1 {...enter(0.12)} className="display max-w-[800px]">
            Advanced Dental Care with <span className="text-[var(--teal)] drop-shadow-[0_2px_15px_var(--teal-glow)]">3D Motion Experience</span>
          </motion.h1>
          <motion.p {...enter(0.2)} className="lead mt-8 max-w-[620px]">
            Modern, painless, and trusted dental treatments designed for your perfect smile. Experience clinical excellence.
          </motion.p>
          <motion.div {...enter(0.28)} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <MagneticLink className="btn btn-primary" href="/appointment">
              <CalendarDays size={18}/> Book Appointment
            </MagneticLink>
            <MagneticLink className="btn btn-secondary" href="/treatments">
              Explore Treatments <ArrowRight size={18}/>
            </MagneticLink>
          </motion.div>
          <motion.div {...enter(0.36)} className="mt-12 flex flex-wrap items-center gap-6 text-sm text-[var(--ink-soft)]">
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
              <b>Bagjola</b>, West Bengal
            </span>
          </motion.div>
        </div>
        
        <motion.div 
          style={{ y: visualY, scale: visualScale }} 
          initial={reduce ? false : { opacity: 0, scale: 0.95, filter: "blur(10px)" }} 
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
          transition={{ ...smoothSpring, duration: 1, delay: 0.2 }} 
          className="relative mx-auto w-full max-w-[580px]"
        >
          <div className="hero-3d-stage relative aspect-[1.02] overflow-hidden rounded-[36px]">
            <motion.div 
              className="absolute inset-0" 
              whileHover={reduce ? undefined : { rotateY: -2, rotateX: 1.5, scale: 1.015 }} 
              transition={{ type: "spring", duration: 0.5, bounce: 0 }} 
              style={{ transformPerspective: 1200 }}
            >
              <Image 
                src="/images/dentazone-hero-photo.png" 
                alt="Photorealistic dental tooth model and professional instruments" 
                fill 
                priority 
                sizes="(max-width: 1024px) 100vw, 48vw" 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/20 via-transparent to-white/5"/>
            </motion.div>
            <div className="absolute bottom-6 left-6 rounded-full bg-white/75 px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--teal)] backdrop-blur-xl border border-white/40">
              Scroll to move the dental world
            </div>
            <div className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-2xl bg-white/70 text-[var(--teal)] backdrop-blur-xl border border-white/40">
              <Sparkles size={22}/>
            </div>
          </div>
          
          <StatFloat className="-left-4 top-8 lg:-left-12" icon={<Award/>} value="20" label="Dental Services" delay={0.7}/>
          <StatFloat className="-right-3 top-[42%] lg:-right-10" icon={<Heart/>} value="Trusted" label="Patient-first Care" delay={0.85}/>
          <StatFloat className="bottom-6 left-6 lg:-left-4" icon={<PhoneCall/>} value="Call" label={clinic.phoneDisplay} delay={1}/>
          <motion.span 
            initial={reduce ? false : { opacity: 0, rotate: -15, scale: 0.8 }} 
            animate={{ opacity: 1, rotate: 0, scale: 1 }} 
            transition={{ ...smoothSpring, duration: 0.6, delay: 1.1 }} 
            className="glass absolute -top-4 right-10 hidden h-14 w-14 place-items-center rounded-2xl text-[var(--teal)] md:grid border border-white/40"
          >
            <Sparkles size={24}/>
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}

export function RealDentalMotionShowcase() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const leftY = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [0, 0, 0] : [70, 0, -40]);
  const rightY = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [0, 0, 0] : [120, 10, -70]);
  const leftRotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-4, 3]);
  const rightRotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [4, -3]);

  return (
    <section ref={ref} data-journey="3" className="section journey-implant overflow-hidden bg-[linear-gradient(180deg,rgba(249,252,251,0.92),rgba(232,246,244,0.85))] flex items-center">
      <div className="container py-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="section-title">Real tools. Modern treatment. Designed in motion.</h2>
          <p className="lead mt-6">Explore the materials and technology behind restorative, surgical and everyday dental care.</p>
        </Reveal>
        
        <div className="mt-16 grid gap-8 md:grid-cols-2 [perspective:1400px]">
          <motion.figure 
            style={{ y: leftY, rotateZ: leftRotate, rotateY: -2 }} 
            whileHover={reduce ? undefined : { scale: 1.015, rotateY: 1, y: -5 }} 
            transition={{ type: "spring", duration: 0.45, bounce: 0 }} 
            className="photo-motion-card"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[24px]">
              <Image 
                src="/images/dentazone-tools-photo.png" 
                alt="Real toothbrush, dental tools, floss, toothpaste and aligner in a premium clinical composition" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw" 
                className="object-cover"
              />
            </div>
            <figcaption>
              <b>Everyday & preventive care</b>
              <span>Cleaning, diagnostics, aligners and precision instruments.</span>
            </figcaption>
          </motion.figure>
          
          <motion.figure 
            style={{ y: rightY, rotateZ: rightRotate, rotateY: 2 }} 
            whileHover={reduce ? undefined : { scale: 1.015, rotateY: -1, y: -5 }} 
            transition={{ type: "spring", duration: 0.45, bounce: 0 }} 
            className="photo-motion-card md:mt-20"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[24px]">
              <Image 
                src="/images/dentazone-implant-photo.png" 
                alt="Real dental implant, ceramic crown, clear aligner and braces model" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw" 
                className="object-cover"
              />
            </div>
            <figcaption>
              <b>Restorative & surgical care</b>
              <span>Implants, crowns, orthodontics and rehabilitation planning.</span>
            </figcaption>
          </motion.figure>
        </div>
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
          x: (event.clientX - rect.left - rect.width / 2) * 0.12, 
          y: (event.clientY - rect.top - rect.height / 2) * 0.12 
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
      initial={reduce ? false : { opacity: 0, y: 16 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ ...smoothSpring, duration: 0.6, delay }}
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
    <section data-journey="1" className="journey-portal border-y border-black/5 bg-white/70 py-16 backdrop-blur-xl">
      <div className="container">
        <div className="mb-12 max-w-xl">
          <span className="eyebrow">Chapter 02 · Inside the tooth</span>
          <h2 className="mt-4 text-3xl font-semibold md:text-5xl">Enter a more precise world of dentistry.</h2>
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
              <Reveal key={s.title} delay={(i % 3) * 0.05}>
                <motion.article 
                  whileHover={{ y: -8, scale: 1.012 }} 
                  transition={smoothSpring} 
                  className="card p-8 h-full flex flex-col justify-between"
                >
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
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section data-journey="2" className="section section-translucent journey-services" id="services">
      <div className="container">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="section-title">Everything your smile needs, under one roof.</h2>
          <p className="lead mx-auto mt-6 max-w-2xl">
            From routine prevention to full smile transformation, every treatment is planned with clarity and delivered with care.
          </p>
        </Reveal>
        
        {/* Asymmetric Bento Grid Redesign */}
        <div className="bento-grid mt-16">
          {featuredServices.map((s, i) => {
            let colSpanClass = "lg:col-span-4 md:col-span-6 col-span-12";
            if (s.isLarge) colSpanClass = "lg:col-span-8 md:col-span-12 col-span-12";
            if (s.isTall) colSpanClass = "lg:col-span-4 md:col-span-6 col-span-12 bento-card-tall";
            
            return (
              <Reveal key={s.title} delay={i * 0.05} className={colSpanClass}>
                <motion.article
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={smoothSpring}
                  className={`bento-card h-full ${s.isLarge ? 'bento-card-large' : ''} ${s.isTall ? 'bento-card-tall' : ''}`}
                >
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
                </motion.article>
              </Reveal>
            );
          })}
        </div>
        
        <div className="mt-14 text-center">
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
    <section ref={ref} data-journey="4" className="section journey-smile overflow-hidden bg-[var(--ink)] text-white flex items-center">
      <div className="container grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <span className="eyebrow !text-[#8de3dc]">Chapter 05 · Smile made of light</span>
          <h2 className="section-title mt-5">Advanced care should feel reassuring, not overwhelming.</h2>
          <p className="mt-6 max-w-xl leading-relaxed text-white/70">
            Every detail—from diagnosis to follow-up—is designed to create clarity, comfort and confidence.
          </p>
        </Reveal>
        
        <div className="relative">
          <div className="absolute bottom-7 left-[23px] top-7 w-px bg-white/10"/>
          <motion.div 
            style={{ scaleY: reduce ? 1 : lineScale, transformOrigin: "top" }} 
            className="absolute bottom-7 left-[23px] top-7 w-px bg-gradient-to-b from-[#8de3dc] to-[var(--teal)]"
          />
          <div className="grid gap-6">
            {points.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="relative grid grid-cols-[48px_1fr] gap-6 rounded-[24px] bg-white/[0.04] p-6 backdrop-blur-md border border-white/[0.06] hover:bg-white/[0.08] transition-colors">
                  <span className="relative z-10 grid h-12 w-12 place-items-center rounded-2xl bg-[#d9f6f2] text-[var(--teal)] shadow-lg">
                    <p.icon size={21}/>
                  </span>
                  <div>
                    <small className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8de3dc]">Step 0{i+1}</small>
                    <h3 className="mt-2 text-xl font-bold">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{p.text}</p>
                  </div>
                </div>
              </Reveal>
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
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="section-title">Four considered steps to your best smile.</h2>
          <p className="lead mt-6">A clear process removes uncertainty and keeps you informed from the first conversation to the final result.</p>
        </Reveal>
        <div className="relative mt-16 grid gap-6 lg:grid-cols-4">
          <div className="absolute left-[12%] right-[12%] top-12 hidden h-px bg-gradient-to-r from-transparent via-[var(--teal)]/30 to-transparent lg:block"/>
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <motion.article 
                whileHover={{ y: -6 }} 
                transition={smoothSpring} 
                className="card relative h-full p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl bg-[linear-gradient(145deg,#fff,#d7f3ef)] text-[var(--teal)] shadow-[0_8px_24px_rgba(8,127,132,0.12)] border border-white/80">
                    <s.icon size={22}/>
                  </span>
                  <span className="font-[var(--font-heading)] text-3xl font-bold text-[var(--teal)]/20">{s.n}</span>
                </div>
                <h3 className="mt-8 text-2xl font-bold leading-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{s.text}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Metrics() {
  return (
    <section className="bg-[var(--ink)] py-24 text-white">
      <div className="container grid gap-12 text-center sm:grid-cols-2 lg:grid-cols-4">
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
            <p className="mt-3 text-sm text-white/50">{l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DoctorsSection({ all = false }: { all?: boolean }) {
  return (
    <section data-journey={all ? undefined : "6"} className="section journey-doctor flex items-center">
      <div className="container">
        <Reveal className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <h2 className="section-title max-w-2xl">Experts who listen before they treat.</h2>
          </div>
          {!all && (
            <Link className="btn btn-secondary" href="/doctors">
              Meet all doctors <ArrowRight size={17}/>
            </Link>
          )}
        </Reveal>
        
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {doctors.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.06}>
              <article className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[var(--cyan)] border border-white/60 shadow-md">
                  <Image 
                    src={d.image} 
                    alt={d.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 33vw" 
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="glass absolute bottom-4 right-4 rounded-full px-3.5 py-2 text-[10px] font-bold border border-white/40 shadow-lg">
                    {d.exp}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-bold leading-tight group-hover:text-[var(--teal)] transition-colors">{d.name}</h3>
                <p className="mt-1.5 text-sm text-[var(--teal)] font-semibold">{d.role}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BeforeAfter() {
  const [after, setAfter] = useState(58);
  return (
    <section data-journey="5" className="section section-soft journey-transformation flex items-center">
      <div className="container grid items-center gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <span className="eyebrow">Chapter 06 · Smile transformation</span>
          <h2 className="section-title mt-5">Subtle changes. Life-changing confidence.</h2>
          <p className="lead mt-6">
            Every smile is designed around the person—not a template. Drag the slider to compare one of our recent cosmetic cases.
          </p>
          <Link className="btn btn-primary mt-8" href="/gallery">
            View smile gallery <ArrowRight size={17}/>
          </Link>
        </Reveal>
        
        <Reveal>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[32px] bg-[#d7f0eb] border border-white/60 shadow-lg">
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
        </Reveal>
      </div>
    </section>
  );
}

function SmileGraphic({ bright = false }: { bright?: boolean }) {
  return (
    <div className={`relative h-28 w-56 overflow-hidden rounded-[50%] border-[16px] shadow-inner ${bright ? "border-[#f6c8b4] bg-[#fff9f5]" : "border-[#d7ae9b] bg-[#3b2025]"}`}>
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
      <div className="container py-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <h2 className="section-title">The experience matters as much as the outcome.</h2>
            <div className="mt-10 flex gap-4">
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
          </Reveal>
          
          <div className="relative min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={index} 
                initial={reduce ? false : { opacity: 0, y: 20, filter: "blur(6px)" }} 
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }} 
                transition={{ duration: 0.4 }} 
                className="absolute inset-0 rounded-[32px] bg-white p-8 text-[var(--ink)] md:p-12 border border-white/50 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <Quote className="text-[var(--teal)] opacity-60" size={36}/>
                  <p className="mt-8 font-[var(--font-heading)] text-2xl font-semibold leading-relaxed md:text-3xl text-[var(--ink)]">
                    “{reviews[index].quote}”
                  </p>
                </div>
                <div className="mt-8 border-t border-black/5 pt-6 flex justify-between items-center">
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
        <Reveal>
          <div className="overflow-hidden rounded-[36px] bg-[linear-gradient(110deg,#0a585c,#043d42)] px-8 py-14 text-white md:px-16 md:py-20 shadow-xl border border-[var(--teal)]/20 relative">
            <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-white/[0.02] blur-xl pointer-events-none"/>
            <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
              <div>
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#9ce5df]">
                  <Clock3 size={15}/> Need dental assistance?
                </span>
                <h2 className="mt-6 max-w-3xl text-4xl font-bold md:text-5xl lg:text-6xl leading-tight">Speak directly with Dentazone Clinic.</h2>
                <p className="mt-6 max-w-2xl text-white/70">Call for appointment availability and guidance about your dental concern.</p>
              </div>
              <a className="btn bg-white text-[var(--teal)] font-bold text-sm shadow-xl hover:bg-white/95" href={clinic.phoneHref}>
                <PhoneCall size={18}/> Call {clinic.phoneDisplay}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function BookingSection() {
  return (
    <section data-journey="7" className="section journey-booking relative overflow-hidden bg-[radial-gradient(circle_at_10%_10%,rgba(216,245,239,0.95),transparent_33%),linear-gradient(135deg,rgba(238,250,248,0.92),rgba(249,252,251,0.85))] flex items-center">
      <div className="container grid items-start gap-16 lg:grid-cols-[0.75fr_1.25fr] py-8">
        <Reveal>
          <span className="eyebrow">Chapter 08 · Appointment pod</span>
          <h2 className="section-title mt-5">Ready for a calmer dental experience?</h2>
          <p className="lead mt-6">Choose a preferred date and treatment. Our patient care team will call to confirm the best appointment for you.</p>
          <div className="mt-10 grid gap-4">
            {["Same-day appointments available", "Transparent treatment estimates", "Flexible payment options"].map(x => (
              <div key={x} className="flex items-center gap-3 text-sm font-semibold text-[var(--ink)]">
                <Check className="rounded-full bg-white p-1 text-[var(--teal)] shadow-sm border border-black/5" size={24}/>
                {x}
              </div>
            ))}
          </div>
        </Reveal>
        
        <Reveal className="w-full">
          <div className="glass rounded-[32px] p-6 md:p-10 border border-white/60 shadow-xl">
            <AppointmentForm compact/>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function BlogSection({ all = false }: { all?: boolean }) {
  return (
    <section className="section bg-[var(--warm)]">
      <div className="container">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="section-title max-w-2xl">Simple guidance for a healthier smile.</h2>
          </div>
          {!all && (
            <Link className="font-bold text-[var(--teal)] flex items-center gap-2 hover:underline" href="/blog">
              View all articles <ArrowRight size={16}/>
            </Link>
          )}
        </Reveal>
        
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <article className="group cursor-pointer">
                <div className={`aspect-[16/10] rounded-[28px] ${["bg-[#d5efeb]","bg-[#e4ecf3]","bg-[#f2e9dc]"][i % 3]} grid place-items-center border border-white/60 overflow-hidden shadow-sm relative`}>
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-white/65 text-[var(--teal)] backdrop-blur-sm border border-white/40 transition-transform group-hover:scale-110">
                    <Sparkles size={24}/>
                  </span>
                </div>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.12em] text-[var(--teal)]">{p.category}</p>
                <h3 className="mt-3.5 text-2xl font-bold leading-snug transition-colors group-hover:text-[var(--teal)]">{p.title}</h3>
                <p className="mt-4 text-xs text-[var(--ink-soft)] font-medium">{p.date} · {p.read} read</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section section-soft">
      <div className="container grid gap-16 lg:grid-cols-[0.8fr_1.2fr] py-8">
        <Reveal>
          <h2 className="section-title">Questions, answered clearly.</h2>
          <p className="lead mt-6">Still wondering about something? Our patient care team is one call away.</p>
        </Reveal>
        
        <div>
          {faqs.map(([q, a], i) => (
            <div key={q} className="border-b border-black/10">
              <button 
                className="flex min-h-[80px] w-full items-center justify-between gap-5 py-4 text-left font-[var(--font-heading)] text-lg font-bold text-[var(--ink)]" 
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
                    transition={{ duration: 0.25 }}
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
    <section data-journey="8" className="section journey-finale flex items-center">
      <div className="container grid gap-10 lg:grid-cols-[0.75fr_1.25fr] py-8">
        <Reveal>
          <div className="card h-full p-8 md:p-12 border border-white/60 shadow-xl bg-white/70">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--cyan)] text-[var(--teal)] border border-white/30">
              <MapPin size={22}/>
            </span>
            <span className="eyebrow mt-10">Chapter 09 · Return to Dentazone</span>
            <h2 className="mt-5 text-4xl font-bold tracking-tight">Dental care close to home.</h2>
            <p className="mt-6 text-sm leading-relaxed text-[var(--ink-soft)]">{clinic.address}</p>
            <div className="mt-8 grid gap-2 text-sm border-t border-black/5 pt-6">
              <a className="font-bold text-lg text-[var(--teal)]" href={clinic.phoneHref}>{clinic.phoneDisplay}</a>
              <a className="font-semibold text-xs text-[var(--ink-soft)] hover:text-[var(--ink)] flex items-center gap-1.5" href={clinic.mapLink} target="_blank" rel="noreferrer">
                Open in Google Maps <ArrowRight size={14}/>
              </a>
            </div>
            <Link href="/contact" className="btn btn-primary mt-10 w-full sm:w-auto">
              Contact the clinic <ArrowRight size={17}/>
            </Link>
          </div>
        </Reveal>
        
        <Reveal className="w-full">
          <div className="h-[500px] overflow-hidden rounded-[32px] bg-[var(--cyan)] border border-white/60 shadow-xl">
            <iframe 
              className="h-full w-full border-0" 
              title="Map showing Dentazone Clinic in Bagjola" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
              src={clinic.mapEmbed}
            />
          </div>
        </Reveal>
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
    <form onSubmit={submit} className={`${compact ? "" : "card"} grid gap-6 ${compact ? "" : "p-8 md:p-10 bg-white"}`}>
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
