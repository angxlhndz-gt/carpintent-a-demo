'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Images, X } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { projectCategories, projects } from '@/lib/site-data';

export function ProjectGallery() {
  const [category, setCategory] = useState<string>('Todos');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const visibleProjects = useMemo(() => projects.filter((project) => category === 'Todos' || project.category === category), [category]);
  const activeProject = activeIndex === null ? null : visibleProjects[activeIndex] ?? null;

  const move = (direction: -1 | 1) => {
    if (activeIndex === null || visibleProjects.length < 2) return;
    setActiveIndex((current) => (current! + direction + visibleProjects.length) % visibleProjects.length);
  };

  return (
    <>
      <div className="gallery-toolbar">
        <div className="filter-label"><Images size={17} /> Filtrar por categoría</div>
        <fieldset className="gallery-filters">
          <legend className="sr-only">Filtrar proyectos</legend>
          {['Todos', ...projectCategories].map((item) => (
            <button key={item} type="button" className={category === item ? 'filter-chip is-selected' : 'filter-chip'} aria-pressed={category === item} onClick={() => { setCategory(item); setActiveIndex(null); }}>
              {item}
            </button>
          ))}
        </fieldset>
      </div>

      {visibleProjects.length ? (
        <div className="project-grid">
          {visibleProjects.map((project, index) => (
            <button className="project-card" key={project.category} type="button" onClick={() => setActiveIndex(index)} aria-label={`Ampliar ${project.title}`}>
              <span className="project-card-image"><Image src={project.image} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" alt={project.alt} /><span className="image-demo-tag">Proyecto de demostración</span></span>
              <span className="project-card-info"><span><small>{project.category}</small><strong>{project.title}</strong></span><span className="project-open-icon"><ArrowRight size={17} /></span></span>
            </button>
          ))}
        </div>
      ) : (
        <output className="gallery-empty" aria-live="polite"><Images size={23} /><span>Aún no hay proyectos en esta categoría.</span><button type="button" onClick={() => setCategory('Todos')}>Ver todos los proyectos</button></output>
      )}

      <Dialog open={activeProject !== null} onOpenChange={(open) => { if (!open) setActiveIndex(null); }}>
        {activeProject && (
          <DialogContent className="gallery-dialog" showCloseButton={false} onKeyDown={(event) => {
            if (event.key === 'ArrowRight') move(1);
            if (event.key === 'ArrowLeft') move(-1);
          }}>
            <DialogHeader className="gallery-dialog-header">
              <div><DialogTitle>{activeProject.title}</DialogTitle><DialogDescription>{activeProject.category} · Imagen provisional</DialogDescription></div>
              <DialogClose className="icon-button dialog-close" aria-label="Cerrar galería"><X size={19} /></DialogClose>
            </DialogHeader>
            <div className="gallery-dialog-image"><Image src={activeProject.image} fill sizes="(max-width: 900px) 94vw, 900px" alt={activeProject.alt} priority /></div>
            <div className="gallery-dialog-controls">
              <button className="icon-button" type="button" onClick={() => move(-1)} aria-label="Proyecto anterior" disabled={visibleProjects.length < 2}><ChevronLeft size={20} /></button>
              <p>{activeIndex! + 1} de {visibleProjects.length} · Proyecto de demostración</p>
              <button className="icon-button" type="button" onClick={() => move(1)} aria-label="Proyecto siguiente" disabled={visibleProjects.length < 2}><ChevronRight size={20} /></button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
