import { ChevronDown, Flower2, Heart, Sparkles } from 'lucide-react';
import type { ServiceCategory } from '../data/services';
import { ServiceRow } from './ServiceRow';

type Props = { category: ServiceCategory; index: number; expanded: boolean; onToggle: () => void };
const categoryIcons = [Sparkles, Heart, Flower2];

export function CategoryAccordion({ category, index, expanded, onToggle }: Props) {
  const Icon = categoryIcons[index] ?? Sparkles;
  const buttonId = `category-${category.id}`;
  const panelId = `services-${category.id}`;

  return (
    <div className={`category ${expanded ? 'is-expanded' : ''}`}>
      <h2>
        <button className="category-toggle" id={buttonId} type="button" aria-expanded={expanded}
          aria-controls={panelId} onClick={onToggle}>
          <span className="category-icon"><Icon size={24} strokeWidth={1.25} aria-hidden="true" /></span>
          <span className="category-copy"><span className="category-title">{category.label}</span>
            <span className="category-description">{category.description}</span></span>
          <ChevronDown className="category-chevron" size={19} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </h2>
      <div className="accordion-panel" id={panelId} role="region" aria-labelledby={buttonId} aria-hidden={!expanded}>
        <div className="accordion-inner">
          <ul className="service-list">{category.items.map((service) => (
            <li key={service.id}><ServiceRow service={service} active={expanded} /></li>
          ))}</ul>
        </div>
      </div>
    </div>
  );
}
