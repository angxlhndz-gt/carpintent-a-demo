import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { processSteps } from '@/lib/site-data';

export function ProcessTimeline({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`process-timeline${compact ? ' is-compact' : ''}`}>
      <ol>
        {processSteps.map((step) => {
          const Icon = step.icon;
          return (
            <li key={step.number}>
              <span className="timeline-number">{step.number}</span>
              <span className="timeline-icon"><Icon size={21} strokeWidth={1.7} /></span>
              <h2>{step.title}</h2>
              <p>{step.description}</p>
            </li>
          );
        })}
      </ol>
      {compact && <Link className="text-link timeline-link" href="/proceso">Conoce el proceso <ArrowRight size={16} /></Link>}
    </div>
  );
}
