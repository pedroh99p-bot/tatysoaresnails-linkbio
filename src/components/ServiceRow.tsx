import { ArrowUpRight, Droplets, Flower2, Footprints, Gem, Hand, Heart, Layers3, ShieldCheck, Sparkles, WandSparkles } from 'lucide-react';
import type { Service } from '../data/services';
import { formatWhatsAppLink } from '../config/links';

const serviceIcons = {
  'molde-f1': WandSparkles,
  acrigel: Gem,
  'fibra-de-vidro': Layers3,
  'manutencao-acrigel': Heart,
  'manutencao-fibra': Heart,
  'banho-gel': Droplets,
  blindagem: ShieldCheck,
  pe: Footprints,
  'pe-mao': Hand,
  spa: Flower2,
  decoracao: Sparkles,
};

export function ServiceRow({ service, active }: { service: Service; active: boolean }) {
  const Icon = serviceIcons[service.id as keyof typeof serviceIcons] ?? Sparkles;

  return (
    <a className="service-row" href={formatWhatsAppLink(service.label)} target="_blank" rel="noopener noreferrer"
      tabIndex={active ? 0 : -1}>
      <span className="service-symbol"><Icon size={20} strokeWidth={1.3} aria-hidden="true" /></span>
      <span>{service.label}</span>
      <ArrowUpRight size={17} strokeWidth={1.4} aria-hidden="true" />
    </a>
  );
}
