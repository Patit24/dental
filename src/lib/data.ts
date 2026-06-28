import {
  Baby, Bone, BriefcaseMedical, CalendarDays, HeartPulse, ShieldPlus, Sparkles,
  Smile, Stethoscope, Syringe, WandSparkles, Waves, Zap,
} from "lucide-react";

export const clinic = {
  name: "Dr. Shaheen's Dental Clinic",
  shortName: "Dr. Shaheen's",
  status: "Open",
  hoursDisplay: "Open · Closes 11:30 pm",
  updatedDisplay: "Updated by this business 7 weeks ago",
  phoneDisplay: "Open in Google Maps",
  phoneHref: "https://www.google.com/maps/search/?api=1&query=Dr.%20Shaheen%27s%20Dental%20Clinic%2C%20Swamiji%20Road%2C%20Jorasirishtala%2C%20Habra%2C%20West%20Bengal%20743233",
  whatsappHref: "https://www.google.com/maps/search/?api=1&query=Dr.%20Shaheen%27s%20Dental%20Clinic%2C%20Swamiji%20Road%2C%20Jorasirishtala%2C%20Habra%2C%20West%20Bengal%20743233",
  address: "Swamiji Road, Jorasirishtala, Habra, West Bengal 743233",
  mapEmbed: "https://www.google.com/maps?q=Dr.%20Shaheen%27s%20Dental%20Clinic%2C%20Swamiji%20Road%2C%20Jorasirishtala%2C%20Habra%2C%20West%20Bengal%20743233&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Dr.%20Shaheen%27s%20Dental%20Clinic%2C%20Swamiji%20Road%2C%20Jorasirishtala%2C%20Habra%2C%20West%20Bengal%20743233",
} as const;

export const nav = [
  ["Home", "/"], ["About", "/about"], ["Services", "/services"],
  ["Doctors", "/doctors"], ["Treatments", "/treatments"],
  ["Gallery", "/gallery"], ["Reviews", "/reviews"], ["Blog", "/blog"], ["Contact", "/contact"],
] as const;

export const services = [
  { title: "Emergency Care", desc: "Prompt guidance for urgent tooth pain, swelling, injury and dental emergencies.", icon: ShieldPlus },
  { title: "Online Dentist Booking", desc: "Request your preferred appointment online and get visit details confirmed.", icon: CalendarDays },
  { title: "Cosmetic Procedures", desc: "Aesthetic dentistry planned around natural-looking confidence.", icon: Smile },
  { title: "Dental Check-ups", desc: "Routine examinations for early detection and preventive care.", icon: Stethoscope },
  { title: "Teeth Whitening", desc: "Professional whitening for a visibly brighter, refreshed smile.", icon: Sparkles },
  { title: "Extractions", desc: "Carefully planned simple and surgical tooth extractions.", icon: Zap },
  { title: "Dentures & Bridges", desc: "Comfortable restorative solutions designed to renew function and appearance.", icon: Bone },
  { title: "Paediatrics", desc: "Gentle, friendly dental care for children and growing smiles.", icon: Baby },
  { title: "Fillings & Sealants", desc: "Durable restorations and protection against future decay.", icon: ShieldPlus },
  { title: "Oral Surgery", desc: "Surgical dental care planned with precision and patient comfort.", icon: BriefcaseMedical },
] as const;

export const doctors = [
  { name: "Dr. Shaheen's Dental Team", role: "Preventive & Family Dentistry", exp: "Patient-first care", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=85" },
  { name: "Dr. Shaheen's Surgical Team", role: "Oral Surgery & Extractions", exp: "Modern treatment", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=85" },
  { name: "Dr. Shaheen's Cosmetic Team", role: "Cosmetic & Restorative Care", exp: "Complete dentistry", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=85" },
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
  ["How do I book an appointment?", "Use the online appointment form or open the clinic listing on Google Maps for the latest contact details."],
  ["Will my treatment be painful?", "Comfort is planned into every visit. The dental team uses gentle techniques, appropriate anaesthesia and clear check-ins throughout treatment."],
  ["Which services are available?", "Dr. Shaheen's Dental Clinic provides preventive, cosmetic, restorative, paediatric and surgical dental care, including emergency care, check-ups, whitening, extractions, dentures and bridges, fillings and sealants, and oral surgery."],
  ["How often should I visit the dentist?", "Most patients benefit from a preventive visit every six months. Your dentist may recommend a different schedule based on your oral health."],
] as const;
