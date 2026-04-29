import { User, Users, Globe } from 'lucide-react';

export const servicesData = [
  { 
    id: "individual",
    title: "Psicoterapia Individual", 
    desc: "Acompañamiento personalizado para ansiedad, depresión y desarrollo personal.", 
    fullDesc: "En nuestras sesiones individuales exploramos a fondo tus preocupaciones en un entorno seguro y libre de juicios. Utilizamos herramientas basadas en evidencia para ayudarte a gestionar el estrés, sanar el pasado y construir tu futuro.", 
    icon: User, 
    color: "bg-menta text-bosque-dark", 
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=800&auto=format&fit=crop", 
    price: "CHF 150", 
    duration: "50 min" 
  },
  { 
    id: "couple",
    title: "Terapia de Pareja", 
    desc: "Estrategias de comunicación y resolución de conflictos para fortalecer el vínculo.", 
    fullDesc: "Aprenda a comunicarse efectivamente, a comprender las necesidades del otro y a recuperar la intimidad. Ya sea para superar una crisis o para fortalecer un buen vínculo, nuestra terapia proporciona un espacio neutro y constructivo.", 
    icon: Users, 
    color: "bg-suculenta text-bosque-dark", 
    image: "https://images.unsplash.com/photo-1516584282367-ac5f3f0bc835?q=80&w=800&auto=format&fit=crop", 
    price: "CHF 180", 
    duration: "60 min" 
  },
  { 
    id: "migrants",
    title: "Psicoterapia Migrantes", 
    desc: "Apoyo en duelo migratorio, adaptación y choque cultural en Europa.", 
    fullDesc: "Migrar conlleva un inmenso desafío emocional. Tratamos la soledad, la nostalgia, la identidad dividida y las barreras de integración. Te ayudamos a transformar la experiencia migratoria en una oportunidad de crecimiento vital sin perder tus raíces.", 
    icon: Globe, 
    color: "bg-menta text-olivo-dark", 
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop", 
    price: "CHF 150", 
    duration: "50 min" 
  },
];

export const teamData = [
  { 
    id: "martin",
    name: "Lic. Martín Suárez", 
    role: "Psicólogo Clínico", 
    bio: "Especialista en desarrollo personal y procesos de transición. Enfoque cognitivo constructivista con más de 10 años de experiencia acompañando a hispanohablantes en Suiza.", 
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop" 
  },
  { 
    id: "elena",
    name: "Lic. Elena Rojas", 
    role: "Psicoterapeuta Sistémica", 
    bio: "Experta en terapia de pareja y relacional. Ayuda a navegar el choque cultural en parejas binacionales y familias migrantes con un enfoque empático y estructurado.", 
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop" 
  }
];

export const testinomialsData = [
  { id: 1, text: "Encontrar una psicóloga que entienda mi cultura y mi idioma ha sido fundamental para adaptarme a mi nueva vida en Zúrich.", author: "María G.", location: "Suiza" },
  { id: 2, text: "El proceso de terapia de pareja nos ayudó a superar la crisis del choque cultural. Muy profesionales y empáticos.", author: "Carlos y Ana", location: "Alemania" },
  { id: 3, text: "Me sentí escuchado desde la primera sesión. Las herramientas que me dieron para manejar la ansiedad son invaluables.", author: "Javier V.", location: "Francia" },
  { id: 4, text: "Su enfoque cálido pero directo me guió cuando me sentía totalmente estancado con el idioma y la cultura.", author: "Pablo C.", location: "Suiza" }
];

export const heroContent = {
  badge: "Atención Clínica Especializada",
  titleHighlight: "en tu propio idioma.",
  titleMain: "Tu bienestar mental,",
  description: "Accede a terapia psicológica profesional desde cualquier lugar de Europa. Conectamos con tus raíces para Sanar en el presente.",
  ctaText: "Agendar Sesión",
  ctaSecondaryText: "Descubre"
};

export const resourcesContent = [
  { title: "El duelo oculto de emigrar", category: "Psicología", time: "5 min", color: "bg-olivo text-white" },
  { title: "Límites saludables en parejas biculturales", category: "Relaciones", time: "8 min", color: "bg-bluegrey-800 text-white" },
  { title: "Guía práctica para manejar la ansiedad invernal", category: "Bienestar", time: "4 min", color: "bg-menta text-bosque-dark" }
];
