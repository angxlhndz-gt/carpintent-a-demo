'use client';

import Image from 'next/image';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  ClipboardCheck,
  Compass,
  Hammer,
  Images,
  MapPin,
  Menu,
  MessageCircle,
  MoveRight,
  PenTool,
  Ruler,
  Send,
  Sparkles,
  Upload,
  X,
} from 'lucide-react';
import { type ReactNode, type SyntheticEvent, useEffect, useMemo, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const whatsappNumber = '50249842796';

const services = [
  { title: 'Cocinas', text: 'Distribución pensada para tu espacio y rutina.', image: '/images/cocina-demo.webp' },
  { title: 'Comedores', text: 'Piezas para reunir, conversar y compartir.', image: '/images/cocina-demo.webp' },
  { title: 'Closets', text: 'Almacenamiento hecho a la medida de tu ambiente.', image: '/images/closet-demo.webp' },
  { title: 'Tocadores', text: 'Detalles funcionales para tu momento personal.', image: '/images/closet-demo.webp' },
  { title: 'Pérgolas', text: 'Estructuras para disfrutar mejor el exterior.', image: '/images/pergola-demo.webp' },
  { title: 'Cabañas', text: 'Espacios de madera concebidos para tu proyecto.', image: '/images/pergola-demo.webp' },
  { title: 'Mobiliario especial', text: 'Ideas singulares convertidas en piezas funcionales.', image: '/images/cocina-demo.webp' },
];

const projects = [
  { title: 'Cocina a medida', tag: 'Cocina', image: '/images/cocina-demo.webp', alt: 'Cocina de madera de demostración' },
  { title: 'Closet con tocador', tag: 'Closet', image: '/images/closet-demo.webp', alt: 'Closet y tocador de demostración' },
  { title: 'Pérgola exterior', tag: 'Pérgola', image: '/images/pergola-demo.webp', alt: 'Pérgola de madera de demostración' },
  { title: 'Comedor integrado', tag: 'Comedor', image: '/images/cocina-demo.webp', alt: 'Comedor integrado de demostración' },
  { title: 'Mobiliario especial', tag: 'Especial', image: '/images/closet-demo.webp', alt: 'Mobiliario especial de demostración' },
  { title: 'Cabaña y terraza', tag: 'Cabaña', image: '/images/pergola-demo.webp', alt: 'Cabaña y terraza de demostración' },
];

const process = [
  { number: '01', title: 'Consulta', text: 'Cuéntanos qué necesitas y para qué espacio.', icon: MessageCircle },
  { number: '02', title: 'Diseño', text: 'Aterrizamos la idea según tus referencias y medidas.', icon: PenTool },
  { number: '03', title: 'Cotización', text: 'Revisamos el alcance para preparar tu solicitud.', icon: ClipboardCheck },
  { number: '04', title: 'Fabricación', text: 'El proyecto pasa a trabajo de taller.', icon: Hammer },
  { number: '05', title: 'Instalación', text: 'Coordinamos la entrega para tu espacio.', icon: Compass },
];

type FormValues = {
  name: string;
  whatsapp: string;
  project: string;
  dimensions: string;
  location: string;
  materials: string;
  details: string;
};

const initialValues: FormValues = { name: '', whatsapp: '', project: '', dimensions: '', location: '', materials: '', details: '' };

type ModelContext = {
  registerTool: (tool: {
    name: string;
    title: string;
    description: string;
    inputSchema: object;
    annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
    execute: (input: unknown) => unknown;
  }, options: { signal: AbortSignal }) => void | Promise<void>;
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [sentNote, setSentNote] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const previews = useMemo(() => files.map((file) => ({ name: file.name, url: URL.createObjectURL(file) })), [files]);
  const active = activeProject === null ? null : projects[activeProject];

  const setValue = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: '' }));
  };
  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!values.name.trim()) nextErrors.name = 'Escribe tu nombre para continuar.';
    if (!values.whatsapp.trim()) nextErrors.whatsapp = 'Escribe un número de WhatsApp.';
    if (!values.project) nextErrors.project = 'Selecciona el tipo de proyecto.';
    if (!values.location.trim()) nextErrors.location = 'Indica la ubicación del proyecto.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };
  const handleFormSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault(); setSentNote(false); if (validate()) setReviewOpen(true);
  };
  const whatsAppMessage = [
    'Hola, quiero solicitar una cotización en Carpintería Pro GT.', '', `Nombre: ${values.name}`, `WhatsApp: ${values.whatsapp}`,
    `Tipo de proyecto: ${values.project}`, `Medidas aproximadas: ${values.dimensions || 'Por confirmar'}`, `Ubicación: ${values.location}`,
    `Materiales o acabados: ${values.materials || 'Por definir'}`, `Detalles adicionales: ${values.details || 'Sin detalles adicionales'}`, `Fotografías seleccionadas: ${files.length}`,
  ].join('\n');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsAppMessage)}`;
  const scrollToQuote = () => { setMenuOpen(false); document.querySelector('#cotizacion')?.scrollIntoView({ behavior: 'smooth' }); };
  const moveProject = (direction: -1 | 1) => { if (activeProject !== null) setActiveProject((activeProject + direction + projects.length) % projects.length); };
  const openWhatsApp = () => {
    setIsSending(true);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setReviewOpen(false);
    setSentNote(true);
    window.setTimeout(() => setIsSending(false), 350);
  };

  useEffect(() => {
    const context = (document as Document & { modelContext?: ModelContext }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const projectTypes = ['Cocina', 'Comedor', 'Closet', 'Tocador', 'Pérgola', 'Cabaña', 'Mobiliario especial'];
    void Promise.resolve(context.registerTool({
      name: 'prepare_quote_request',
      title: 'Preparar solicitud de cotización',
      description: 'Completa la solicitud de Carpintería Pro GT y abre la revisión visible antes de enviar por WhatsApp.',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string' }, whatsapp: { type: 'string' }, project: { type: 'string', enum: projectTypes },
          dimensions: { type: 'string' }, location: { type: 'string' }, materials: { type: 'string' }, details: { type: 'string' },
        },
        required: ['name', 'whatsapp', 'project', 'location'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: true },
      execute(input) {
        const request = input as Partial<FormValues>;
        const valid = typeof request.name === 'string' && request.name.trim()
          && typeof request.whatsapp === 'string' && request.whatsapp.trim()
          && typeof request.project === 'string' && projectTypes.includes(request.project)
          && typeof request.location === 'string' && request.location.trim();
        if (!valid) return { status: 'error', message: 'Nombre, WhatsApp, tipo de proyecto y ubicación son obligatorios.' };
        setValues({
          name: request.name!.trim(), whatsapp: request.whatsapp!.trim(), project: request.project!, location: request.location!.trim(),
          dimensions: typeof request.dimensions === 'string' ? request.dimensions : '', materials: typeof request.materials === 'string' ? request.materials : '', details: typeof request.details === 'string' ? request.details : '',
        });
        setErrors({});
        setReviewOpen(true);
        document.querySelector('#cotizacion')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return { status: 'ready_for_review', message: 'Solicitud preparada; revisa el resumen antes de abrir WhatsApp.' };
      },
    }, { signal: lifecycle.signal })).catch(() => undefined);
    return () => lifecycle.abort();
  }, []);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Carpintería Pro GT, inicio"><span className="brand-mark">CP</span><span>Carpintería <strong>Pro GT</strong></span></a>
        <nav className="desktop-nav" aria-label="Navegación principal"><a href="#servicios">Servicios</a><a href="#proyectos">Proyectos</a><a href="#proceso">Proceso</a><a href="#contacto">Contacto</a></nav>
        <button className="header-cta" type="button" onClick={scrollToQuote}>Solicitar cotización <ArrowRight size={16} /></button>
        <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        {menuOpen && <nav className="mobile-nav" aria-label="Navegación móvil"><a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a><a href="#proyectos" onClick={() => setMenuOpen(false)}>Proyectos</a><a href="#proceso" onClick={() => setMenuOpen(false)}>Proceso</a><a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a><button type="button" onClick={scrollToQuote}>Solicitar cotización <ArrowRight size={16} /></button></nav>}
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy"><p className="eyebrow"><MapPin size={14} /> San Raymundo y zonas cercanas</p><h1>Carpintería a medida que hace <em>tuyo</em> cada espacio.</h1><p className="hero-text">Diseñamos cocinas, closets, pérgolas y mobiliario especial a partir de tu idea, tu espacio y las medidas de tu proyecto.</p><div className="hero-actions"><button className="button button-primary" type="button" onClick={scrollToQuote}>Solicitar cotización <ArrowRight size={18} /></button><a className="button button-secondary" href="#proyectos">Ver proyectos <MoveRight size={18} /></a></div><p className="hero-note"><Sparkles size={15} /> Proyectos personalizados, hechos al gusto del cliente.</p></div>
        <div className="hero-visual"><Image src="/images/cocina-demo.webp" fill sizes="(max-width: 800px) 100vw, 52vw" priority alt="Cocina de madera como imagen de demostración" /><div className="hero-caption"><span>01</span><p>Diseño a medida<br /><strong>Proyecto de demostración</strong></p></div></div>
      </section>

      <section className="section service-section" id="servicios">
        <div className="section-intro split-intro"><div><p className="eyebrow">Servicios principales</p><h2>Espacios que responden a cómo los vives.</h2></div><p>Una selección clara para empezar la conversación. Cada solicitud se revisa según el espacio y los detalles que quieras compartir.</p></div>
        <div className="services-grid">{services.map((service) => <article className="service-card" key={service.title}><div className="service-image"><Image src={service.image} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" alt="Imagen de demostración" /></div><div className="service-content"><h3>{service.title}</h3><p>{service.text}</p><button type="button" onClick={scrollToQuote}>Consultar proyecto <ArrowRight size={15} /></button></div></article>)}</div>
      </section>

      <section className="section gallery-section" id="proyectos">
        <div className="section-intro gallery-intro"><div><p className="eyebrow"><Images size={14} /> Galería de inspiración</p><h2>Detalles para imaginar tu próximo espacio.</h2></div><p className="demo-note">Las imágenes y los nombres de esta galería son <strong>proyectos de demostración</strong>; se reemplazan con el portafolio autorizado de Carpintería Pro GT.</p></div>
        <div className="gallery-grid">{projects.map((project, index) => <button className={`gallery-card gallery-card-${index + 1}`} key={project.title} type="button" onClick={() => setActiveProject(index)} aria-label={`Ampliar ${project.title}`}><Image src={project.image} fill sizes="(max-width: 720px) 100vw, 50vw" alt={project.alt} /><span className="gallery-scrim" /><span className="gallery-meta"><small>{project.tag}</small><strong>{project.title}</strong><span>Ver imagen <ArrowRight size={15} /></span></span></button>)}</div>
      </section>

      <section className="section process-section" id="proceso"><div className="section-intro center-intro"><p className="eyebrow">Proceso de trabajo</p><h2>De la primera idea al espacio terminado.</h2><p>Un recorrido simple para que la conversación comience con la información que importa.</p></div><ol className="process-grid">{process.map((item) => { const Icon = item.icon; return <li key={item.number}><span className="process-number">{item.number}</span><span className="process-icon"><Icon size={21} /></span><h3>{item.title}</h3><p>{item.text}</p></li>; })}</ol></section>

      <section className="contact-strip" id="contacto"><div><p className="eyebrow">Cobertura y contacto</p><h2>¿Tienes una idea en mente?</h2><p>Atendemos proyectos en San Raymundo y zonas cercanas.</p></div><div className="contact-actions"><a className="phone-link" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer"><MessageCircle size={19} /><span><small>WhatsApp</small>+502 4984 2796</span></a><button className="button button-light" type="button" onClick={scrollToQuote}>Solicitar cotización <ArrowRight size={18} /></button></div></section>

      <section className="section quote-section" id="cotizacion">
        <div className="quote-aside"><p className="eyebrow">Solicitud de cotización</p><h2>Cuéntanos un poco sobre tu proyecto.</h2><p>Con estos datos puedes iniciar la conversación por WhatsApp de forma más clara.</p><div className="quote-tip"><Ruler size={21} /><p><strong>No necesitas tener todo definido.</strong> Comparte medidas aproximadas, referencias y cualquier detalle que te ayude a explicar la idea.</p></div></div>
        <form className="quote-form" onSubmit={handleFormSubmit} noValidate>
          <div className="form-grid"><Field label="Nombre" required error={errors.name}><input value={values.name} onChange={(event) => setValue('name', event.target.value)} placeholder="Tu nombre" autoComplete="name" /></Field><Field label="WhatsApp" required error={errors.whatsapp}><input value={values.whatsapp} onChange={(event) => setValue('whatsapp', event.target.value)} placeholder="Ej. +502 0000 0000" inputMode="tel" autoComplete="tel" /></Field><Field label="Tipo de proyecto" required error={errors.project}><select value={values.project} onChange={(event) => setValue('project', event.target.value)}><option value="">Selecciona una opción</option>{['Cocina', 'Comedor', 'Closet', 'Tocador', 'Pérgola', 'Cabaña', 'Mobiliario especial'].map((item) => <option key={item}>{item}</option>)}</select></Field><Field label="Medidas aproximadas"><input value={values.dimensions} onChange={(event) => setValue('dimensions', event.target.value)} placeholder="Ej. 3 m x 2.4 m" /></Field><Field label="Ubicación" required error={errors.location}><input value={values.location} onChange={(event) => setValue('location', event.target.value)} placeholder="Municipio o referencia de ubicación" /></Field><Field label="Materiales o acabados"><input value={values.materials} onChange={(event) => setValue('materials', event.target.value)} placeholder="Ej. colores, estilo o referencias" /></Field></div>
          <Field label="Fotografías"><label className="upload-area"><Upload size={20} /><span><strong>Selecciona fotos o referencias</strong><small>Se mostrarán como vista previa en este dispositivo.</small></span><input type="file" accept="image/*" multiple onChange={(event) => setFiles(Array.from(event.target.files ?? []))} /></label></Field>
          {previews.length > 0 && <div className="file-previews" aria-label="Fotografías seleccionadas">{previews.map((preview) => <figure key={preview.url}><Image src={preview.url} width={48} height={48} unoptimized alt={`Vista previa de ${preview.name}`} /><figcaption>{preview.name}</figcaption></figure>)}</div>}
          <Field label="Detalles adicionales"><textarea value={values.details} onChange={(event) => setValue('details', event.target.value)} placeholder="Describe la idea, el uso del espacio o cualquier detalle que quieras compartir." rows={4} /></Field><div className="form-bottom"><p><CircleAlert size={15} /> Revisa los datos de tu solicitud antes de enviarla.</p><button className="button button-primary" type="submit">Enviar solicitud por WhatsApp <Send size={17} /></button></div>{sentNote && <output className="send-note"><Check size={17} /> Las fotografías seleccionadas deben compartirse directamente en el chat si el dispositivo no permite adjuntarlas automáticamente.</output>}
        </form>
      </section>

      <footer><a className="brand" href="#inicio"><span className="brand-mark">CP</span><span>Carpintería <strong>Pro GT</strong></span></a><p>San Raymundo y zonas cercanas</p><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">+502 4984 2796</a></footer>

      <Dialog open={activeProject !== null} onOpenChange={(open) => !open && setActiveProject(null)}>{active && <DialogContent className="project-dialog" showCloseButton={false}><DialogHeader><DialogTitle>{active.title}</DialogTitle><DialogDescription><span className="dialog-tag">{active.tag}</span> <span>Proyecto de demostración</span></DialogDescription></DialogHeader><div className="dialog-image"><Image src={active.image} fill sizes="90vw" alt={active.alt} /></div><div className="dialog-actions"><button type="button" onClick={() => moveProject(-1)} aria-label="Proyecto anterior"><ChevronLeft size={20} /></button><p>Imagen {activeProject! + 1} de {projects.length}</p><button type="button" onClick={() => moveProject(1)} aria-label="Proyecto siguiente"><ChevronRight size={20} /></button></div><DialogClose className="dialog-close" aria-label="Cerrar imagen"><X size={19} /></DialogClose></DialogContent>}</Dialog>

      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}><DialogContent className="review-dialog" showCloseButton={false}><DialogHeader><p className="eyebrow">Antes de enviar</p><DialogTitle>Revisa los datos de tu solicitud.</DialogTitle><DialogDescription>Al continuar se abrirá WhatsApp con este resumen.</DialogDescription></DialogHeader><dl><div><dt>Proyecto</dt><dd>{values.project}</dd></div><div><dt>Ubicación</dt><dd>{values.location}</dd></div><div><dt>Medidas</dt><dd>{values.dimensions || 'Por confirmar'}</dd></div><div><dt>Fotografías</dt><dd>{files.length} seleccionada{files.length === 1 ? '' : 's'}</dd></div></dl><div className="review-actions"><DialogClose className="button button-secondary">Editar</DialogClose><button className="button button-primary" type="button" onClick={openWhatsApp} disabled={isSending}>{isSending ? 'Abriendo WhatsApp…' : 'Abrir WhatsApp'} <MessageCircle size={17} /></button></div></DialogContent></Dialog>
    </main>
  );
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: ReactNode }) {
  return <div className={`field ${error ? 'field-error' : ''}`}><span>{label}{required && <em> *</em>}</span>{children}{error && <small className="error-message">{error}</small>}</div>;
}
