import {
  Baby, Bone, BriefcaseMedical, HeartPulse, ShieldPlus, Sparkles,
  Smile, Stethoscope, Syringe, WandSparkles, Waves, Zap,
} from "lucide-react";

export const clinic = {
  name: "Dentazone Clinic",
  shortName: "Dentazone",
  phoneDisplay: "079080 81534",
  phoneHref: "tel:+917908081534",
  whatsappHref: "https://wa.me/917908081534",
  address: "Kolsur More, Basirhat Road, Machalandapur, Bagjola, West Bengal 743438",
  mapEmbed: "https://www.google.com/maps?q=Kolsur%20More%2C%20Basirhat%20Road%2C%20Machalandapur%2C%20Bagjola%2C%20West%20Bengal%20743438&output=embed",
  mapLink: "https://maps.google.com/maps?vet=10CAAQoqAOahcKEwjI17WTz5-VAxUAAAAAHQAAAAAQCA..i&rlz=1C5GCEM_enIN1109IN1109&pvq=Cg0vZy8xMXh6Ml80XzI4IhMKDWRlbnRhbCBjbGluaWMQAhgD&lqi=ChVkZW50YWwgY2xpbmljIGJhZ2pvbGFIyPjJr_i8gIAIWiMQABABGAIiFWRlbnRhbCBjbGluaWMgYmFnam9sYSoECAMQAZIBDWRlbnRhbF9jbGluaWM&fvr=1&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x39f8ad3a1bd9f4af:0xe7b95d41e5c44f58",
} as const;

export const nav = [
  ["Home", "/"], ["About", "/about"], ["Services", "/services"],
  ["Doctors", "/doctors"], ["Treatments", "/treatments"],
  ["Gallery", "/gallery"], ["Reviews", "/reviews"], ["Blog", "/blog"], ["Contact", "/contact"],
] as const;

export const services = [
  { title: "Teeth Whitening", desc: "Professional whitening for a visibly brighter, refreshed smile.", icon: Sparkles },
  { title: "Bonding", desc: "Tooth-coloured bonding to repair chips, gaps and minor imperfections.", icon: WandSparkles },
  { title: "Dental Check-ups", desc: "Routine examinations for early detection and preventive care.", icon: Stethoscope },
  { title: "Cosmetic Procedures", desc: "Personalised aesthetic dentistry for a confident, natural-looking smile.", icon: Smile },
  { title: "Dental Implants", desc: "Stable, natural-looking replacement options for missing teeth.", icon: Bone },
  { title: "Dentures & Bridges", desc: "Comfortable restorative solutions designed to renew function and appearance.", icon: ShieldPlus },
  { title: "Extractions", desc: "Carefully planned simple and surgical tooth extractions.", icon: Zap },
  { title: "Fillings & Sealants", desc: "Durable restorations and protection against future decay.", icon: ShieldPlus },
  { title: "Mouth Guards", desc: "Custom protection for sports, grinding and jaw comfort.", icon: Waves },
  { title: "Oral Surgery", desc: "Surgical dental care planned with precision and patient comfort.", icon: BriefcaseMedical },
  { title: "Paediatrics", desc: "Gentle, friendly dental care for children and growing smiles.", icon: Baby },
  { title: "Root Canals", desc: "Modern root canal treatment focused on relief and tooth preservation.", icon: Syringe },
  { title: "Teeth Cleaning", desc: "Professional scaling and polishing for healthier teeth and gums.", icon: HeartPulse },
  { title: "Teeth Reshaping", desc: "Subtle contouring to improve tooth balance and smile harmony.", icon: Smile },
  { title: "Veneers & Crowns", desc: "Custom restorations crafted for strength, function and aesthetics.", icon: WandSparkles },
  { title: "Dental X-ray", desc: "Diagnostic imaging to support accurate, informed treatment planning.", icon: Stethoscope },
  { title: "Biopsy", desc: "Careful oral tissue assessment and biopsy when clinically indicated.", icon: HeartPulse },
  { title: "Disimpaction Surgery", desc: "Specialist surgical management of impacted teeth.", icon: BriefcaseMedical },
  { title: "Splinting", desc: "Stabilisation treatment for mobile or traumatised teeth.", icon: Waves },
  { title: "Full Mouth Rehabilitation", desc: "Comprehensive planning to restore oral health, comfort and function.", icon: Sparkles },
] as const;

export const doctors = [
  { name: "Dentazone Dental Team", role: "Preventive & General Dentistry", exp: "Patient-first care", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=85" },
  { name: "Dentazone Surgical Team", role: "Implants & Oral Surgery", exp: "Modern treatment", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=85" },
  { name: "Dentazone Restorative Team", role: "Cosmetic & Restorative Care", exp: "Complete dentistry", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=85" },
] as const;

export const reviews = [
  { quote: "The calmest dental experience I have ever had. Every step was explained, and the result feels completely natural.", name: "Patient review", treatment: "Cosmetic care" },
  { quote: "The care was precise, comfortable and genuinely thoughtful from consultation through treatment.", name: "Patient review", treatment: "Dental treatment" },
  { quote: "The team made the whole experience warm, clear and easy for our family.", name: "Patient review", treatment: "Paediatric care" },
] as const;

export const posts = [
  { title: "7 signs it may be time to see a dentist", category: "Preventive care", date: "Dental tips", read: "5 min" },
  { title: "What to expect during a dental implant consultation", category: "Restorative care", date: "Dental tips", read: "7 min" },
  { title: "How to keep a professionally whitened smile bright", category: "Cosmetic care", date: "Dental tips", read: "4 min" },
] as const;

export const faqs = [
  ["How do I book an appointment?", `Call Dentazone Clinic on ${clinic.phoneDisplay}, use the appointment form, or message us on WhatsApp.`],
  ["Will my treatment be painful?", "Comfort is planned into every visit. The dental team uses gentle techniques, appropriate anaesthesia and clear check-ins throughout treatment."],
  ["Which services are available?", "Dentazone provides preventive, cosmetic, restorative, paediatric and surgical dental care, including implants, root canals, oral surgery and full mouth rehabilitation."],
  ["How often should I visit the dentist?", "Most patients benefit from a preventive visit every six months. Your dentist may recommend a different schedule based on your oral health."],
] as const;
