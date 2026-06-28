"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, CalendarDays, Clock3, Instagram, MapPin, Menu, ShieldCheck, X } from "lucide-react";
import { clinic, nav } from "@/lib/data";

function Logo() {
  return <Link href="/" className="flex items-center gap-3" aria-label={`${clinic.name} home`}>
    <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--teal)] text-white font-bold">S</span>
    <span><b className="block font-[var(--font-heading)] text-[17px] leading-none">Saha Clinic</b><small className="mt-1 block text-[9px] uppercase tracking-[.22em] text-[var(--ink-soft)]">Family dental care</small></span>
  </Link>;
}

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  return <>
    <div className="relative z-20 hidden bg-[var(--ink)] text-white lg:block">
      <div className="container flex h-9 items-center justify-between text-[11px]">
        <span className="flex items-center gap-2"><Clock3 size={13}/> Bagati Rd · Bhyabla · Basirhat</span>
        <span>{clinic.rating} ★ from {clinic.reviewCount} Google reviews · <a className="font-bold" href={clinic.mapLink} target="_blank" rel="noreferrer">Open Maps</a></span>
      </div>
    </div>
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[rgba(251,252,250,.88)] backdrop-blur-xl">
      <div className="container flex h-[76px] items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
          {nav.map(([label, href]) => <Link key={href} className={`relative py-2 text-[13px] font-semibold ${path === href ? "text-[var(--teal)]" : "text-[var(--ink-soft)] hover:text-[var(--ink)]"}`} href={href}>
            {label}{path === href && <motion.span layoutId="nav" className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-[var(--teal)]"/>}
          </Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <Link className="btn btn-primary !min-h-11 !px-5 text-[13px] max-sm:!hidden" href="/appointment"><CalendarDays size={16}/> Book a visit</Link>
          <button className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm xl:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={20}/></button>
        </div>
      </div>
    </header>
    <AnimatePresence>
      {open && <motion.div className="fixed inset-0 z-[60] bg-[var(--ink)] text-white xl:hidden" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .2 }}>
        <div className="container flex h-[76px] items-center justify-between"><Logo/><button className="grid h-11 w-11 place-items-center rounded-full bg-white/10" onClick={() => setOpen(false)} aria-label="Close menu"><X/></button></div>
        <nav className="container grid gap-1 pt-10">{nav.map(([label, href], i) => <motion.div key={href} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .035, type: "spring", bounce: 0 }}>
          <Link className="flex min-h-14 items-center justify-between border-b border-white/10 text-2xl font-semibold" href={href} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={19}/></Link>
        </motion.div>)}</nav>
      </motion.div>}
    </AnimatePresence>
  </>;
}

export function Footer() {
  return <footer className="bg-[var(--ink)] pb-28 pt-20 text-white sm:pb-10">
    <div className="container">
      <div className="grid gap-12 border-b border-white/10 pb-16 md:grid-cols-[1.35fr_.8fr_.8fr_1fr]">
        <div><Logo/><p className="mt-6 max-w-sm text-sm leading-7 text-white/60">Family dental care with emergency support, online booking, cosmetic treatment and patient-first guidance in Basirhat, West Bengal.</p><div className="mt-6 flex gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-white/10"><Instagram size={17}/></span><a href={clinic.mapLink} target="_blank" rel="noreferrer" aria-label="Open Saha Clinic on Google Maps" className="grid h-10 w-10 place-items-center rounded-full bg-white/10"><MapPin size={17}/></a></div></div>
        <div><h3 className="mb-5 text-sm">Explore</h3><div className="grid gap-3 text-sm text-white/60">{nav.slice(0,5).map(([l,h])=><Link key={h} href={h}>{l}</Link>)}</div></div>
        <div><h3 className="mb-5 text-sm">Care</h3><div className="grid gap-3 text-sm text-white/60"><Link href="/services">Emergency care</Link><Link href="/services">Cosmetic care</Link><Link href="/services">Check-ups</Link><Link href="/services">Oral surgery</Link></div></div>
        <div><h3 className="mb-5 text-sm">Visit us</h3><p className="text-sm leading-7 text-white/60">{clinic.address}</p><a className="mt-4 flex items-center gap-2 text-sm font-bold" href={clinic.phoneHref} target="_blank" rel="noreferrer"><MapPin size={15}/> {clinic.phoneDisplay}</a></div>
      </div>
      <div className="flex flex-col gap-3 pt-7 text-xs text-white/45 sm:flex-row sm:justify-between"><span>© 2026 Saha Clinic Family Dental Care Center. All rights reserved.</span><span className="flex items-center gap-2"><ShieldCheck size={14}/> Patient-first dental care</span></div>
    </div>
  </footer>;
}

export function FloatingActions() {
  return <>
    <a className="fixed bottom-5 left-5 z-40 grid h-13 w-13 place-items-center rounded-full bg-[#20b45a] text-white shadow-xl sm:bottom-7 sm:left-7" href={clinic.mapLink} target="_blank" rel="noreferrer" aria-label="Open Saha Clinic on Google Maps"><MapPin/></a>
    <Link className="fixed bottom-4 left-1/2 z-40 flex min-h-14 w-[calc(100%-100px)] -translate-x-1/2 items-center justify-center gap-2 rounded-full bg-[var(--teal)] px-5 text-sm font-bold text-white shadow-2xl sm:hidden" href="/appointment"><CalendarDays size={17}/> Book appointment</Link>
  </>;
}
