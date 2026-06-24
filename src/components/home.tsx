"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Activity, ArrowRight, Award, Baby, Bone, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, ClipboardCheck, Clock3, Heart, HeartPulse, MapPin, Microscope, MoveRight, PhoneCall, Quote, ScanLine, ShieldCheck, Smile, Sparkles, Star, Stethoscope, Syringe, WandSparkles, Waves, Zap } from "lucide-react";
import { clinic, doctors, faqs, posts, reviews, services } from "@/lib/data";
import { Counter, Reveal } from "./motion";

export function Hero() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 42]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : .97]);
  const enter = (delay: number) => ({ initial: reduce ? false : { opacity: 0, y: 24, filter: "blur(6px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { type: "spring" as const, duration: .65, bounce: 0, delay } });
  return <section ref={heroRef} data-journey="0" className="hero-3d relative min-h-[800px] overflow-hidden py-16 lg:min-h-[870px] lg:py-24">
    <div className="pointer-events-none absolute -left-32 top-44 h-80 w-80 rounded-full border border-[var(--teal)]/10" />
    <div className="container grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
      <div className="relative z-10">
        <motion.div {...enter(.05)} className="eyebrow mb-7">Chapter 01 · The perfect smile universe</motion.div>
        <motion.h1 {...enter(.12)} className="display max-w-[800px]">Advanced Dental Care with <span className="text-[var(--teal)]">3D Motion Experience</span></motion.h1>
        <motion.p {...enter(.2)} className="lead mt-7 max-w-[620px]">Modern, painless, and trusted dental treatments designed for your perfect smile.</motion.p>
        <motion.div {...enter(.28)} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <MagneticLink className="btn btn-primary" href="/appointment"><CalendarDays size={18}/> Book Appointment</MagneticLink>
          <MagneticLink className="btn btn-secondary" href="/treatments">Explore Treatments <ArrowRight size={18}/></MagneticLink>
        </motion.div>
        <motion.div {...enter(.36)} className="mt-10 flex flex-wrap items-center gap-5 text-sm text-[var(--ink-soft)]">
          <span className="flex items-center gap-2"><span className="flex -space-x-2">{["DZ","DC","WB"].map(x=><span key={x} className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-[var(--cyan)] text-[9px] font-bold text-[var(--teal)]">{x}</span>)}</span> Complete dental team</span>
          <span className="h-5 w-px bg-black/10"/><span className="flex items-center gap-1.5"><MapPin size={15} className="text-[var(--teal)]"/><b>Bagjola</b>, West Bengal</span>
        </motion.div>
      </div>
      <motion.div style={{ y: visualY, scale: visualScale }} initial={reduce ? false : { opacity: 0, scale: .96, filter: "blur(8px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ type: "spring", duration: .85, bounce: 0, delay: .18 }} className="relative mx-auto w-full max-w-[620px]">
        <div className="hero-3d-stage relative aspect-[1.05] overflow-hidden rounded-[44px]">
          <motion.div className="absolute inset-0" whileHover={reduce ? undefined : { rotateY: -3, rotateX: 2, scale: 1.025 }} transition={{ type:"spring",duration:.4,bounce:0 }} style={{ transformPerspective: 1100 }}>
            <Image src="/images/dentazone-hero-photo.png" alt="Photorealistic dental tooth model and professional instruments" fill priority sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/14 via-transparent to-white/5"/>
          </motion.div>
          <div className="absolute bottom-7 left-7 rounded-full bg-white/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[.15em] text-[var(--teal)] backdrop-blur-xl">Scroll to move the dental world</div>
          <div className="absolute right-7 top-7 grid h-12 w-12 place-items-center rounded-2xl bg-white/65 text-[var(--teal)] backdrop-blur-xl"><Sparkles size={22}/></div>
        </div>
        <StatFloat className="-left-4 top-9 lg:-left-16" icon={<Award/>} value="20" label="Dental Services" delay={.7}/>
        <StatFloat className="-right-3 top-[42%] lg:-right-12" icon={<Heart/>} value="Trusted" label="Patient-first Care" delay={.85}/>
        <StatFloat className="bottom-5 left-5 lg:-left-8" icon={<PhoneCall/>} value="Call" label={clinic.phoneDisplay} delay={1}/>
        <motion.span initial={reduce ? false : { opacity: 0, rotate: -12, scale: .9 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} transition={{ type:"spring",duration:.6,bounce:0,delay:1.05 }} className="glass absolute -top-5 right-10 hidden h-14 w-14 place-items-center rounded-2xl text-[var(--teal)] md:grid"><Sparkles size={24}/></motion.span>
      </motion.div>
    </div>
  </section>;
}

export function RealDentalMotionShowcase() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const leftY = useTransform(scrollYProgress, [0, .5, 1], reduce ? [0,0,0] : [90, 0, -60]);
  const rightY = useTransform(scrollYProgress, [0, .5, 1], reduce ? [0,0,0] : [150, 10, -100]);
  const leftRotate = useTransform(scrollYProgress, [0, 1], reduce ? [0,0] : [-5, 4]);
  const rightRotate = useTransform(scrollYProgress, [0, 1], reduce ? [0,0] : [6, -4]);
  return <section ref={ref} data-journey="3" className="section journey-implant overflow-hidden bg-[linear-gradient(180deg,rgba(249,252,251,.90),rgba(234,248,246,.84))]">
    <div className="container">
      <Reveal className="mx-auto max-w-3xl text-center"><span className="eyebrow">Chapter 04 · Implant intelligence</span><h2 className="section-title mt-5">Real tools. Modern treatment. Designed in motion.</h2><p className="lead mt-6">Explore the materials and technology behind restorative, surgical and everyday dental care.</p></Reveal>
      <div className="mt-14 grid gap-6 md:grid-cols-2 [perspective:1400px]">
        <motion.figure style={{ y:leftY, rotateZ:leftRotate, rotateY:-3 }} whileHover={reduce?undefined:{scale:1.02,rotateY:1}} transition={{type:"spring",duration:.35,bounce:0}} className="photo-motion-card">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[30px]"><Image src="/images/dentazone-tools-photo.png" alt="Real toothbrush, dental tools, floss, toothpaste and aligner in a premium clinical composition" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover"/></div>
          <figcaption><b>Everyday & preventive care</b><span>Cleaning, diagnostics, aligners and precision instruments.</span></figcaption>
        </motion.figure>
        <motion.figure style={{ y:rightY, rotateZ:rightRotate, rotateY:3 }} whileHover={reduce?undefined:{scale:1.02,rotateY:-1}} transition={{type:"spring",duration:.35,bounce:0}} className="photo-motion-card md:mt-24">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[30px]"><Image src="/images/dentazone-implant-photo.png" alt="Real dental implant, ceramic crown, clear aligner and braces model" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover"/></div>
          <figcaption><b>Restorative & surgical care</b><span>Implants, crowns, orthodontics and rehabilitation planning.</span></figcaption>
        </motion.figure>
      </div>
    </div>
  </section>;
}

function MagneticLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  return <motion.div
    animate={reduce ? undefined : offset}
    transition={{ type: "spring", stiffness: 350, damping: 24, mass: .35 }}
    onMouseMove={(event) => {
      if (reduce) return;
      const rect = event.currentTarget.getBoundingClientRect();
      setOffset({ x: (event.clientX - rect.left - rect.width / 2) * .12, y: (event.clientY - rect.top - rect.height / 2) * .12 });
    }}
    onMouseLeave={() => setOffset({ x: 0, y: 0 })}
  ><Link className={className} href={href}>{children}</Link></motion.div>;
}

function StatFloat({ className, icon, value, label, delay }: { className: string; icon: React.ReactNode; value: string; label: string; delay: number }) {
  const reduce = useReducedMotion();
  return <motion.div className={`glass absolute flex items-center gap-3 rounded-2xl p-3 pr-5 ${className}`} initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", duration: .55, bounce: 0, delay }}>
    <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--cyan)] text-[var(--teal)] [&>svg]:h-5 [&>svg]:w-5">{icon}</span><span><b className="block font-[var(--font-heading)] text-base">{value}</b><small className="whitespace-nowrap text-[10px] text-[var(--ink-soft)]">{label}</small></span>
  </motion.div>;
}

export function TrustStrip() {
  return <section data-journey="1" className="journey-portal border-y border-black/5 bg-white/88 py-16 backdrop-blur-xl"><div className="container">
    <div className="mb-12 max-w-xl"><span className="eyebrow">Chapter 02 · Inside the tooth</span><h2 className="mt-4 text-3xl font-semibold md:text-5xl">Enter a more precise world of dentistry.</h2></div>
    <div className="grid gap-5 text-center sm:grid-cols-2 lg:grid-cols-4">{[["Same-day","appointments"],["Digital","diagnostics"],["Transparent","treatment plans"],["Flexible","payment options"]].map(([a,b])=><div key={a} className="flex items-center justify-center gap-3 text-sm"><Check className="rounded-full bg-[var(--cyan)] p-1 text-[var(--teal)]" size={24}/><span><b>{a}</b> {b}</span></div>)}</div>
  </div></section>;
}

export function ServicesSection({ all = false }: { all?: boolean }) {
  const featured = [
    { title:"General Dentistry", desc:"Complete preventive and everyday dental care.", icon:Stethoscope },
    { title:"Root Canal Treatment", desc:"Modern care focused on relief and tooth preservation.", icon:Syringe },
    { title:"Dental Implants", desc:"Stable replacements planned for natural function.", icon:Bone },
    { title:"Teeth Whitening", desc:"Professional brightening for a refreshed smile.", icon:Sparkles },
    { title:"Braces & Aligners", desc:"Smile alignment with modern orthodontic options.", icon:Waves },
    { title:"Cosmetic Dentistry", desc:"Aesthetic treatments tailored to your smile.", icon:WandSparkles },
    { title:"Kids Dentistry", desc:"Friendly dental care for children and growing smiles.", icon:Baby },
    { title:"Gum Treatment", desc:"Focused care for healthier gums and foundations.", icon:HeartPulse },
    { title:"Tooth Extraction", desc:"Carefully planned simple and surgical extraction.", icon:Zap },
    { title:"Smile Designing", desc:"Thoughtful planning for balanced smile aesthetics.", icon:Smile },
    { title:"Crown & Bridge", desc:"Restorations for strength, function and appearance.", icon:Award },
    { title:"Emergency Dental Care", desc:"Direct guidance when a dental concern cannot wait.", icon:Activity },
  ];
  const list = all ? services : featured;
  return <section data-journey="2" className="section section-translucent journey-services" id="services"><div className="container">
    <Reveal className="mx-auto max-w-3xl text-center"><span className="eyebrow">Chapter 03 · Services assembled</span><h2 className="section-title mt-5">Everything your smile needs, under one roof.</h2><p className="lead mx-auto mt-6 max-w-2xl">From routine prevention to full smile transformation, every treatment is planned with clarity and delivered with care.</p></Reveal>
    <div className="mt-14 grid gap-5 [perspective:1200px] md:grid-cols-2 lg:grid-cols-3">{list.map((s,i)=><Reveal key={s.title} delay={(i%3)*.05}><motion.article whileHover={{ y: -8, rotateX: -2.5, rotateY: i%2===0?2.5:-2.5, scale:1.012 }} transition={{ type:"spring",duration:.32,bounce:0 }} style={{transformStyle:"preserve-3d"}} className="card soft-3d-card group h-full p-7">
      <div className="mb-8 flex items-start justify-between"><span className="grid h-13 w-13 place-items-center rounded-2xl bg-[var(--cyan)] text-[var(--teal)]"><s.icon size={24}/></span><ArrowRight className="text-[var(--ink)]/25 transition-transform group-hover:translate-x-1 group-hover:text-[var(--teal)]" size={20}/></div>
      <h3 className="text-xl font-semibold">{s.title}</h3><p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{s.desc}</p>
    </motion.article></Reveal>)}</div>
    {!all && <div className="mt-10 text-center"><Link className="btn btn-secondary" href="/services">Explore all services <ArrowRight size={17}/></Link></div>}
  </div></section>;
}

export function ExperienceSection() {
  return <section className="section section-soft"><div className="container grid items-center gap-14 lg:grid-cols-2">
    <Reveal><div className="relative mx-auto max-w-[520px]"><div className="aspect-[4/5] overflow-hidden rounded-[36px] bg-[var(--cyan)]"><Image src={doctors[0].image} alt="Dentazone dental care team" width={900} height={1100} className="h-full w-full object-cover"/></div><div className="glass absolute -bottom-6 -right-2 max-w-[250px] rounded-3xl p-5 sm:-right-10"><ShieldCheck className="mb-3 text-[var(--teal)]"/><b className="block font-[var(--font-heading)] text-lg">Care without compromise</b><p className="mt-2 text-xs leading-5 text-[var(--ink-soft)]">Modern treatment planning with a strong focus on patient comfort.</p></div></div></Reveal>
    <Reveal><span className="eyebrow">A better dental experience</span><h2 className="section-title mt-5">Complete dentistry, with a genuinely human touch.</h2><p className="lead mt-6">Dentazone is designed around what patients value: clear conversations, comfortable treatment and coordinated dental care close to home.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">{[["01","Comfort-first care"],["02","Digital precision"],["03","Clear communication"],["04","Long-term results"]].map(([n,t])=><div key={n} className="border-t border-black/10 pt-4"><small className="text-[var(--teal)]">{n}</small><b className="mt-1 block">{t}</b></div>)}</div>
      <Link href="/about" className="mt-9 inline-flex items-center gap-2 font-bold text-[var(--teal)]">Discover our approach <MoveRight size={18}/></Link>
    </Reveal>
  </div></section>;
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
  return <section ref={ref} data-journey="4" className="section journey-smile overflow-hidden bg-[rgba(16,58,67,.94)] text-white">
    <div className="container grid gap-14 lg:grid-cols-[.78fr_1.22fr]">
      <Reveal><span className="eyebrow !text-[#8de3dc]">Chapter 05 · Smile made of light</span><h2 className="section-title mt-5">Advanced care should feel reassuring, not overwhelming.</h2><p className="mt-6 max-w-xl leading-8 text-white/62">Every detail—from diagnosis to follow-up—is designed to create clarity, comfort and confidence.</p></Reveal>
      <div className="relative">
        <div className="absolute bottom-7 left-[23px] top-7 w-px bg-white/12"/>
        <motion.div style={{ scaleY: reduce ? 1 : lineScale, transformOrigin:"top" }} className="absolute bottom-7 left-[23px] top-7 w-px bg-gradient-to-b from-[#8de3dc] to-[#4daeb9]"/>
        <div className="grid gap-5">{points.map((p,i)=><Reveal key={p.title} delay={i*.05}><div className="relative grid grid-cols-[48px_1fr] gap-5 rounded-[26px] bg-white/[.055] p-5 backdrop-blur-sm">
          <span className="relative z-10 grid h-12 w-12 place-items-center rounded-2xl bg-[#d9f6f2] text-[var(--teal)] shadow-[0_10px_30px_rgba(0,0,0,.18)]"><p.icon size={21}/></span>
          <div><small className="text-[10px] font-bold uppercase tracking-[.16em] text-[#8de3dc]">Step 0{i+1}</small><h3 className="mt-2 text-xl font-semibold">{p.title}</h3><p className="mt-2 text-sm leading-7 text-white/58">{p.text}</p></div>
        </div></Reveal>)}</div>
      </div>
    </div>
  </section>;
}

export function TreatmentProcess() {
  const steps = [
    { n:"01", icon: Activity, title:"Consultation", text:"We listen, examine and understand what matters most to you." },
    { n:"02", icon: ScanLine, title:"Digital assessment", text:"Comfortable imaging gives us a precise view of your oral health." },
    { n:"03", icon: ClipboardCheck, title:"Personal plan", text:"Review clear options, timelines and costs before choosing together." },
    { n:"04", icon: WandSparkles, title:"Gentle treatment", text:"Modern techniques deliver efficient care with a calm, human touch." },
  ];
  return <section className="section section-soft"><div className="container">
    <Reveal className="mx-auto max-w-3xl text-center"><span className="eyebrow">Your treatment journey</span><h2 className="section-title mt-5">Four considered steps to your best smile.</h2><p className="lead mt-6">A clear process removes uncertainty and keeps you informed from the first conversation to the final result.</p></Reveal>
    <div className="relative mt-14 grid gap-5 lg:grid-cols-4">
      <div className="absolute left-[12%] right-[12%] top-11 hidden h-px bg-gradient-to-r from-transparent via-[var(--teal)]/25 to-transparent lg:block"/>
      {steps.map((s,i)=><Reveal key={s.title} delay={i*.06}><motion.article whileHover={{y:-5}} transition={{type:"spring",duration:.28,bounce:0}} className="card relative h-full p-7">
        <div className="flex items-center justify-between"><span className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl bg-[linear-gradient(145deg,#fff,#d7f3ef)] text-[var(--teal)] shadow-[0_12px_28px_rgba(8,127,132,.13)]"><s.icon size={23}/></span><span className="font-[var(--font-heading)] text-3xl font-semibold text-[var(--teal)]/20">{s.n}</span></div>
        <h3 className="mt-8 text-2xl font-semibold">{s.title}</h3><p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{s.text}</p>
      </motion.article></Reveal>)}
    </div>
  </div></section>;
}

export function Metrics() {
  return <section className="bg-[var(--ink)] py-20 text-white"><div className="container grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
    {[[20,"","Listed services"],[1,"","Convenient location"],[5,"","Care categories"],[360,"°","Complete dental care"]].map(([v,s,l])=><div key={String(l)}><div className="font-[var(--font-heading)] text-5xl font-semibold text-[#8de3dc]"><Counter end={Number(v)} suffix={String(s)}/></div><p className="mt-2 text-sm text-white/60">{l}</p></div>)}
  </div></section>;
}

export function DoctorsSection({ all = false }: { all?: boolean }) {
  return <section data-journey={all ? undefined : "6"} className="section journey-doctor"><div className="container"><Reveal className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><span className="eyebrow">{all ? "Meet your care team" : "Chapter 07 · The digital clinic"}</span><h2 className="section-title mt-5 max-w-2xl">Experts who listen before they treat.</h2></div>{!all&&<Link className="btn btn-secondary" href="/doctors">Meet all doctors <ArrowRight size={17}/></Link>}</Reveal>
    <div className="mt-14 grid gap-6 md:grid-cols-3">{doctors.map((d,i)=><Reveal key={d.name} delay={i*.06}><article className="group"><div className="relative aspect-[4/5] overflow-hidden rounded-[30px] bg-[var(--cyan)]"><Image src={d.image} alt={d.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"/><span className="glass absolute bottom-4 right-4 rounded-full px-3 py-2 text-[10px] font-bold">{d.exp}</span></div><h3 className="mt-5 text-2xl font-semibold">{d.name}</h3><p className="mt-1 text-sm text-[var(--teal)]">{d.role}</p></article></Reveal>)}</div>
  </div></section>;
}

export function BeforeAfter() {
  const [after, setAfter] = useState(58);
  return <section data-journey="5" className="section section-soft journey-transformation"><div className="container grid items-center gap-14 lg:grid-cols-[.8fr_1.2fr]">
    <Reveal><span className="eyebrow">Chapter 06 · Smile transformation</span><h2 className="section-title mt-5">Subtle changes. Life-changing confidence.</h2><p className="lead mt-6">Every smile is designed around the person—not a template. Drag to compare one of our recent cosmetic cases.</p><Link className="btn btn-primary mt-8" href="/gallery">View smile gallery <ArrowRight size={17}/></Link></Reveal>
    <Reveal><div className="relative aspect-[16/10] overflow-hidden rounded-[34px] bg-[#d7f0eb] shadow-[var(--shadow)]">
      <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,#d8ede8,#f7fbf9)]"><div className="text-center"><SmileGraphic bright/><b className="mt-4 block">After treatment</b></div></div>
      <div className="absolute inset-y-0 left-0 overflow-hidden bg-[#ece8df]" style={{width:`${after}%`}}><div className="grid h-full place-items-center" style={{width:`${10000/after}%`}}><div className="text-center"><SmileGraphic/><b className="mt-4 block">Before treatment</b></div></div></div>
      <div className="absolute inset-y-0 w-0.5 bg-white shadow-lg" style={{left:`${after}%`}}><span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-xl"><span className="flex"><ChevronLeft size={15}/><ChevronRight size={15}/></span></span></div>
      <input aria-label="Compare before and after treatment" type="range" min="20" max="80" value={after} onChange={e=>setAfter(Number(e.target.value))} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"/>
    </div></Reveal>
  </div></section>;
}

function SmileGraphic({ bright=false }: {bright?:boolean}) {
  return <div className={`relative h-32 w-60 overflow-hidden rounded-[50%] border-[18px] ${bright?"border-[#f6c8b4] bg-[#fff9f5]":"border-[#d7ae9b] bg-[#3b2025]"}`}><div className="absolute left-1/2 top-4 flex -translate-x-1/2 gap-0.5">{Array.from({length:6}).map((_,i)=><span key={i} className={`h-14 w-8 rounded-b-xl border ${bright?"border-[#c9dcd8] bg-white":"border-[#d1c7b8] bg-[#e9e1d4]"}`}/>)}</div></div>;
}

export function Testimonials({ all = false }: { all?: boolean }) {
  const [index,setIndex]=useState(0); const reduce=useReducedMotion();
  useEffect(()=>{ if(reduce||all)return; const id=setInterval(()=>setIndex(v=>(v+1)%reviews.length),6500); return()=>clearInterval(id)},[all,reduce]);
  if(all) return <section className="section"><div className="container grid gap-6 md:grid-cols-3">{reviews.map(r=><ReviewCard key={r.name} r={r}/>)}</div></section>;
  return <section className="section bg-[var(--ink)] text-white"><div className="container"><div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><Reveal><span className="eyebrow !text-[#8de3dc]">Patient stories</span><h2 className="section-title mt-5">The experience matters as much as the outcome.</h2><div className="mt-8 flex gap-3"><button className="grid h-12 w-12 place-items-center rounded-full bg-white/10" onClick={()=>setIndex((index+reviews.length-1)%reviews.length)} aria-label="Previous review"><ChevronLeft/></button><button className="grid h-12 w-12 place-items-center rounded-full bg-white text-[var(--ink)]" onClick={()=>setIndex((index+1)%reviews.length)} aria-label="Next review"><ChevronRight/></button></div></Reveal>
    <div className="relative min-h-[330px]"><AnimatePresence mode="wait"><motion.div key={index} initial={reduce?false:{opacity:0,y:16,filter:"blur(5px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} exit={{opacity:0,y:-8,filter:"blur(3px)"}} transition={{type:"spring",duration:.45,bounce:0}} className="absolute inset-0 rounded-[32px] bg-white p-8 text-[var(--ink)] md:p-12"><Quote className="text-[var(--teal)]" size={32}/><p className="mt-8 font-[var(--font-heading)] text-2xl font-medium leading-relaxed md:text-3xl">“{reviews[index].quote}”</p><div className="mt-8"><b>{reviews[index].name}</b><small className="ml-3 text-[var(--ink-soft)]">{reviews[index].treatment}</small></div></motion.div></AnimatePresence></div></div></div></section>;
}
function ReviewCard({r}:{r:typeof reviews[number]}){return <article className="card p-7"><div className="flex text-[#f3a83b]">{[1,2,3,4,5].map(x=><Star key={x} size={15} fill="currentColor"/>)}</div><p className="mt-6 leading-8 text-[var(--ink-soft)]">“{r.quote}”</p><div className="mt-6"><b>{r.name}</b><small className="ml-2 text-[var(--teal)]">{r.treatment}</small></div></article>}

export function Emergency() {
  return <section className="section"><div className="container"><Reveal><div className="overflow-hidden rounded-[36px] bg-[linear-gradient(110deg,#087f84,#07555d)] px-7 py-12 text-white md:px-14 md:py-16"><div className="grid items-center gap-8 md:grid-cols-[1fr_auto]"><div><span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#9ce5df]"><Clock3 size={15}/> Need dental assistance?</span><h2 className="mt-5 max-w-3xl text-4xl font-semibold md:text-6xl">Speak directly with Dentazone Clinic.</h2><p className="mt-5 max-w-2xl text-white/70">Call for appointment availability and guidance about your dental concern.</p></div><a className="btn bg-white text-[var(--teal)]" href={clinic.phoneHref}><PhoneCall size={18}/> Call {clinic.phoneDisplay}</a></div></div></Reveal></div></section>;
}

export function BookingSection() {
  return <section data-journey="7" className="section journey-booking relative overflow-hidden bg-[radial-gradient(circle_at_10%_10%,rgba(216,245,239,.92),transparent_33%),linear-gradient(135deg,rgba(238,250,248,.9),rgba(249,252,251,.88))]">
    <div className="container grid items-start gap-12 lg:grid-cols-[.72fr_1.28fr]">
      <Reveal><span className="eyebrow">Chapter 08 · Appointment pod</span><h2 className="section-title mt-5">Ready for a calmer dental experience?</h2><p className="lead mt-6">Choose a preferred date and treatment. Our patient care team will call to confirm the best appointment for you.</p>
        <div className="mt-8 grid gap-4">{["Same-day appointments available","Transparent treatment estimates","Flexible payment options"].map(x=><div key={x} className="flex items-center gap-3 text-sm font-semibold"><Check className="rounded-full bg-white p-1 text-[var(--teal)] shadow-sm" size={25}/>{x}</div>)}</div>
      </Reveal>
      <Reveal><div className="glass rounded-[34px] p-5 md:p-8"><AppointmentForm compact/></div></Reveal>
    </div>
  </section>;
}

export function BlogSection({ all = false }: {all?:boolean}) {
  return <section className="section"><div className="container"><Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><span className="eyebrow">Dental journal</span><h2 className="section-title mt-5">Simple guidance for a healthier smile.</h2></div>{!all&&<Link className="font-bold text-[var(--teal)]" href="/blog">View all articles →</Link>}</Reveal><div className="mt-12 grid gap-6 md:grid-cols-3">{posts.map((p,i)=><Reveal key={p.title} delay={i*.05}><article className="group"><div className={`aspect-[16/10] rounded-[26px] ${["bg-[#d5efeb]","bg-[#e4ecf3]","bg-[#f2e9dc]"][i]} grid place-items-center`}><span className="grid h-20 w-20 place-items-center rounded-full bg-white/60 text-[var(--teal)]"><Sparkles size={30}/></span></div><p className="mt-5 text-xs font-bold uppercase tracking-[.12em] text-[var(--teal)]">{p.category}</p><h3 className="mt-3 text-2xl font-semibold leading-tight transition-colors group-hover:text-[var(--teal)]">{p.title}</h3><p className="mt-4 text-xs text-[var(--ink-soft)]">{p.date} · {p.read} read</p></article></Reveal>)}</div></div></section>;
}

export function FAQ() {
  const [open,setOpen]=useState(0);
  return <section className="section section-soft"><div className="container grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><Reveal><span className="eyebrow">Good to know</span><h2 className="section-title mt-5">Questions, answered clearly.</h2><p className="lead mt-5">Still wondering about something? Our patient care team is one call away.</p></Reveal><div>{faqs.map(([q,a],i)=><div key={q} className="border-b border-black/10"><button className="flex min-h-[76px] w-full items-center justify-between gap-5 py-4 text-left font-[var(--font-heading)] text-lg font-semibold" onClick={()=>setOpen(open===i?-1:i)} aria-expanded={open===i}>{q}<ChevronDown className={`shrink-0 transition-transform ${open===i?"rotate-180":""}`}/></button><AnimatePresence initial={false}>{open===i&&<motion.div initial={{opacity:0,y:-6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-4}} transition={{duration:.2}}><p className="max-w-2xl pb-6 leading-7 text-[var(--ink-soft)]">{a}</p></motion.div>}</AnimatePresence></div>)}</div></div></section>;
}

export function ContactMapSection() {
  return <section data-journey="8" className="section journey-finale"><div className="container grid gap-8 lg:grid-cols-[.72fr_1.28fr]">
    <Reveal><div className="card h-full p-8 md:p-10"><span className="grid h-13 w-13 place-items-center rounded-2xl bg-[var(--cyan)] text-[var(--teal)]"><MapPin size={23}/></span><span className="eyebrow mt-9">Chapter 09 · Return to Dentazone</span><h2 className="mt-5 text-4xl font-semibold md:text-5xl">Dental care close to home.</h2><p className="mt-6 leading-8 text-[var(--ink-soft)]">{clinic.address}</p><div className="mt-7 grid gap-3 text-sm"><a className="font-bold text-[var(--teal)]" href={clinic.phoneHref}>{clinic.phoneDisplay}</a><a className="font-semibold" href={clinic.mapLink} target="_blank" rel="noreferrer">Open in Google Maps →</a></div><Link href="/contact" className="btn btn-primary mt-8">Contact the clinic <ArrowRight size={17}/></Link></div></Reveal>
    <Reveal><div className="h-[480px] overflow-hidden rounded-[34px] bg-[var(--cyan)] shadow-[var(--shadow)]"><iframe className="h-full w-full border-0" title="Map showing Dentazone Clinic in Bagjola" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={clinic.mapEmbed}/></div></Reveal>
  </div></section>;
}

export function AppointmentForm({ compact=false }: {compact?:boolean}) {
  const [sent,setSent]=useState(false);
  function submit(e:React.FormEvent){e.preventDefault();setSent(true)}
  return <form onSubmit={submit} className={`${compact?"":"card"} grid gap-5 ${compact?"":"p-6 md:p-9"}`}>
    {sent&&<div className="rounded-2xl bg-[#e4f7ef] p-4 text-sm font-semibold text-[#176347]" role="status">Thank you—your request is ready for our patient care team. This demo does not send data yet.</div>}
    <div className="grid gap-5 md:grid-cols-2"><div className="field"><label htmlFor="name">Name *</label><input id="name" name="name" autoComplete="name" required placeholder="Your full name"/></div><div className="field"><label htmlFor="phone">Phone *</label><input id="phone" name="phone" type="tel" autoComplete="tel" required placeholder="+91 00000 00000"/></div></div>
    <div className="grid gap-5 md:grid-cols-2"><div className="field"><label htmlFor="email">Email *</label><input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com"/></div><div className="field"><label htmlFor="treatment">Treatment type</label><select id="treatment" name="treatment" defaultValue=""><option value="" disabled>Select a treatment</option>{services.map(s=><option key={s.title}>{s.title}</option>)}</select></div></div>
    <div className="grid gap-5 md:grid-cols-2"><div className="field"><label htmlFor="date">Preferred date *</label><input id="date" name="date" type="date" required/></div><div className="field"><label htmlFor="time">Preferred time *</label><input id="time" name="time" type="time" required/></div></div>
    <div className="field"><label htmlFor="message">Message</label><textarea id="message" name="message" placeholder="Tell us how we can help"/></div>
    <button className="btn btn-primary w-full sm:w-fit" type="submit"><CalendarDays size={18}/> Request appointment</button>
    <p className="text-xs leading-5 text-[var(--ink-soft)]">By submitting, you agree to be contacted about your appointment request. For emergencies, please call us directly.</p>
  </form>;
}
