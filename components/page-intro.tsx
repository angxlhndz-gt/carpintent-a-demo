import type { ReactNode } from 'react';

export function PageIntro({ eyebrow, title, children, aside }: { eyebrow: string; title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section className="page-intro container">
      <div className="page-intro-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="page-intro-description">{children}</div>
      </div>
      {aside && <div className="page-intro-aside">{aside}</div>}
    </section>
  );
}
