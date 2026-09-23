'use client';

import Image from 'next/image';
import { CircleAlert, Check, MessageCircle, Send, Upload } from 'lucide-react';
import { useEffect, useMemo, useState, type ReactNode, type SyntheticEvent } from 'react';
import { company } from '@/lib/site-data';

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
const projectTypes = ['Cocina', 'Comedor', 'Closet', 'Tocador', 'Pérgola', 'Cabaña', 'Mobiliario especial'];

export function QuoteForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'preparing' | 'review' | 'ready'>('idle');

  const previews = useMemo(() => files.map((file) => ({ file, url: URL.createObjectURL(file) })), [files]);
  useEffect(() => () => previews.forEach(({ url }) => URL.revokeObjectURL(url)), [previews]);

  const setValue = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: '' }));
  };

  const whatsappMessage = [
    'Hola, quiero solicitar una cotización en Carpintería Pro GT.',
    '',
    `Nombre: ${values.name.trim()}`,
    `WhatsApp: ${values.whatsapp.trim()}`,
    `Tipo de proyecto: ${values.project}`,
    `Medidas aproximadas: ${values.dimensions.trim() || 'Por confirmar'}`,
    `Ubicación: ${values.location.trim()}`,
    `Materiales o acabados: ${values.materials.trim() || 'Por definir'}`,
    `Detalles adicionales: ${values.details.trim() || 'Sin detalles adicionales'}`,
    `Fotografías seleccionadas: ${files.length}`,
  ].join('\n');
  const whatsappUrl = `https://wa.me/${company.phoneDigits}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!values.name.trim()) nextErrors.name = 'Escribe tu nombre para continuar.';
    if (!values.whatsapp.trim()) nextErrors.whatsapp = 'Escribe un número de WhatsApp.';
    else if (values.whatsapp.replace(/\D/g, '').length < 8) nextErrors.whatsapp = 'Revisa el número de WhatsApp.';
    if (!values.project) nextErrors.project = 'Selecciona el tipo de proyecto.';
    if (!values.location.trim()) nextErrors.location = 'Indica la ubicación del proyecto.';
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }

    setStatus('preparing');
    window.setTimeout(() => setStatus('review'), 240);
  };

  return (
    <form className="quote-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <span className="form-step">Cuéntanos</span>
        <h2>Solicitud de cotización</h2>
        <p>Comparte los detalles que ya tengas. Puedes dejar las medidas por confirmar.</p>
      </div>

      <div className="form-grid">
        <Field id="quote-name" label="Nombre" required error={errors.name}>
          <input id="quote-name" name="name" autoComplete="name" value={values.name} onChange={(event) => setValue('name', event.target.value)} placeholder="Tu nombre" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'quote-name-error' : undefined} />
        </Field>
        <Field id="quote-whatsapp" label="WhatsApp" required error={errors.whatsapp}>
          <input id="quote-whatsapp" name="whatsapp" autoComplete="tel" inputMode="tel" value={values.whatsapp} onChange={(event) => setValue('whatsapp', event.target.value)} placeholder="Ej. +502 0000 0000" aria-invalid={Boolean(errors.whatsapp)} aria-describedby={errors.whatsapp ? 'quote-whatsapp-error' : undefined} />
        </Field>
        <Field id="quote-project" label="Tipo de proyecto" required error={errors.project}>
          <select id="quote-project" name="project" value={values.project} onChange={(event) => setValue('project', event.target.value)} aria-invalid={Boolean(errors.project)} aria-describedby={errors.project ? 'quote-project-error' : undefined}>
            <option value="">Selecciona una opción</option>
            {projectTypes.map((project) => <option key={project} value={project}>{project}</option>)}
          </select>
        </Field>
        <Field id="quote-dimensions" label="Medidas aproximadas">
          <input id="quote-dimensions" name="dimensions" value={values.dimensions} onChange={(event) => setValue('dimensions', event.target.value)} placeholder="Ej. 3 m x 2.4 m" />
        </Field>
        <Field id="quote-location" label="Ubicación" required error={errors.location}>
          <input id="quote-location" name="location" value={values.location} onChange={(event) => setValue('location', event.target.value)} placeholder="Municipio o referencia" aria-invalid={Boolean(errors.location)} aria-describedby={errors.location ? 'quote-location-error' : undefined} />
        </Field>
        <Field id="quote-materials" label="Materiales o acabados">
          <input id="quote-materials" name="materials" value={values.materials} onChange={(event) => setValue('materials', event.target.value)} placeholder="Colores, estilo o referencia" />
        </Field>
      </div>

      <Field id="quote-photos" label="Fotografías o referencias">
        <label className="upload-area" htmlFor="quote-photos">
          <span className="upload-icon"><Upload size={19} /></span>
          <span><strong>Selecciona archivos</strong><small>La vista previa se queda en este dispositivo.</small></span>
          <input id="quote-photos" name="photos" type="file" accept="image/*" multiple onChange={(event) => setFiles(Array.from(event.target.files ?? []))} />
        </label>
        <small className="form-hint">Las fotografías no se adjuntan automáticamente a WhatsApp; compártelas directamente en el chat.</small>
      </Field>

      {previews.length > 0 && (
        <div className="file-previews" aria-label={`${previews.length} fotografías seleccionadas`}>
          {previews.map(({ file, url }) => <figure key={`${file.name}-${file.lastModified}-${url}`}><Image src={url} width={56} height={56} unoptimized alt={`Vista previa de ${file.name}`} /><figcaption>{file.name}</figcaption></figure>)}
        </div>
      )}

      <Field id="quote-details" label="Detalles adicionales">
        <textarea id="quote-details" name="details" value={values.details} onChange={(event) => setValue('details', event.target.value)} placeholder="Cuéntanos sobre el uso del espacio, tu idea o algún detalle que quieras compartir." rows={4} />
      </Field>

      {Object.keys(errors).length > 0 && <p className="form-error-summary" role="alert"><CircleAlert size={17} /> Revisa los campos marcados para continuar.</p>}

      {status === 'review' || status === 'ready' ? (
        <section className="quote-review" aria-live="polite">
          <div className="review-title"><Check size={18} /><div><strong>{status === 'ready' ? 'Solicitud preparada' : 'Revisa tu solicitud'}</strong><p>WhatsApp abrirá con los datos de abajo.</p></div></div>
          <dl>
            <div><dt>Proyecto</dt><dd>{values.project}</dd></div>
            <div><dt>Ubicación</dt><dd>{values.location}</dd></div>
            <div><dt>Medidas</dt><dd>{values.dimensions || 'Por confirmar'}</dd></div>
            <div><dt>Materiales</dt><dd>{values.materials || 'Por definir'}</dd></div>
            <div><dt>Fotografías</dt><dd>{files.length} seleccionada{files.length === 1 ? '' : 's'}</dd></div>
          </dl>
          <div className="review-actions">
            <button className="button button-secondary" type="button" onClick={() => setStatus('idle')}>Editar datos</button>
            <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => setStatus('ready')}>
              {status === 'ready' ? 'Volver a abrir WhatsApp' : 'Abrir WhatsApp'} <MessageCircle size={17} />
            </a>
          </div>
          <p className="review-note">Recuerda compartir las fotografías en el chat si las seleccionaste.</p>
        </section>
      ) : (
        <div className="form-bottom">
          <p><CircleAlert size={16} /> No se envía ninguna solicitud hasta que abras WhatsApp.</p>
          <button className="button button-primary" type="submit" disabled={status === 'preparing'}>
            {status === 'preparing' ? 'Preparando solicitud…' : 'Revisar y continuar'} <Send size={16} />
          </button>
        </div>
      )}
    </form>
  );
}

function Field({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: ReactNode }) {
  return (
    <div className={`field${error ? ' field-error' : ''}`}>
      <label htmlFor={id}>{label}{required && <span className="required-mark"> *</span>}</label>
      {children}
      {error && <small className="error-message" id={`${id}-error`}>{error}</small>}
    </div>
  );
}
