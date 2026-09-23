import { ClipboardCheck, Compass, Hammer, MessageCircle, PenTool, Ruler } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const company = {
  name: 'Carpintería Pro GT',
  coverage: 'San Raymundo y zonas cercanas',
  phone: '+502 4984 2796',
  phoneDigits: '50249842796',
  facebookUrl: null as string | null,
};

export const navigation = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Proceso', href: '/proceso' },
  { label: 'Contacto', href: '/contacto' },
];

export type Service = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
  categories: string[];
};

export const services: Service[] = [
  {
    title: 'Cocinas y comedores',
    description: 'Diseños modulares o integrales, pensados para el espacio y el uso diario.',
    image: '/images/cocina-demo.webp',
    imageAlt: 'Cocina de madera — imagen de demostración',
    icon: Ruler,
    categories: ['Cocina', 'Comedor'],
  },
  {
    title: 'Closets y tocadores',
    description: 'Almacenamiento con distribución interior adaptada al espacio.',
    image: '/images/closet-demo.webp',
    imageAlt: 'Closet y tocador — imagen de demostración',
    icon: ClipboardCheck,
    categories: ['Closet', 'Tocador'],
  },
  {
    title: 'Pérgolas y cabañas',
    description: 'Estructuras de madera para áreas exteriores y espacios habitables.',
    image: '/images/pergola-demo.webp',
    imageAlt: 'Pérgola de madera — imagen de demostración',
    icon: Compass,
    categories: ['Pérgola', 'Cabaña'],
  },
  {
    title: 'Mobiliario especial',
    description: 'Piezas de carpintería personalizadas para cada proyecto.',
    image: '/images/cocina-demo.webp',
    imageAlt: 'Mobiliario de madera — imagen de demostración',
    icon: Hammer,
    categories: ['Mobiliario especial'],
  },
];

export const projectCategories = [
  'Cocinas',
  'Comedores',
  'Closets',
  'Tocadores',
  'Pérgolas',
  'Cabañas',
  'Mobiliario especial',
] as const;

export type Project = {
  title: string;
  category: (typeof projectCategories)[number];
  image: string;
  alt: string;
};

export const projects: Project[] = [
  { title: 'Cocina de demostración 01', category: 'Cocinas', image: '/images/cocina-demo.webp', alt: 'Cocina de madera, proyecto de demostración' },
  { title: 'Comedor de demostración 01', category: 'Comedores', image: '/images/cocina-demo.webp', alt: 'Área de comedor, proyecto de demostración' },
  { title: 'Closet de demostración 01', category: 'Closets', image: '/images/closet-demo.webp', alt: 'Closet de madera, proyecto de demostración' },
  { title: 'Tocador de demostración 01', category: 'Tocadores', image: '/images/closet-demo.webp', alt: 'Tocador integrado, proyecto de demostración' },
  { title: 'Pérgola de demostración 01', category: 'Pérgolas', image: '/images/pergola-demo.webp', alt: 'Pérgola de madera, proyecto de demostración' },
  { title: 'Cabaña de demostración 01', category: 'Cabañas', image: '/images/pergola-demo.webp', alt: 'Espacio de madera, proyecto de demostración' },
  { title: 'Mobiliario de demostración 01', category: 'Mobiliario especial', image: '/images/cocina-demo.webp', alt: 'Mobiliario de madera, proyecto de demostración' },
];

export const processSteps = [
  { number: '01', title: 'Consulta', description: 'Conocemos tu idea, tus necesidades y el espacio donde irá el proyecto.', icon: MessageCircle },
  { number: '02', title: 'Diseño', description: 'Definimos una propuesta según tus referencias, medidas y estilo.', icon: PenTool },
  { number: '03', title: 'Cotización', description: 'Preparamos la propuesta según el diseño, las medidas y los materiales.', icon: ClipboardCheck },
  { number: '04', title: 'Fabricación', description: 'El proyecto se construye en el taller con los detalles acordados.', icon: Hammer },
  { number: '05', title: 'Instalación', description: 'Coordinamos la entrega e instalación correspondiente.', icon: Compass },
];
