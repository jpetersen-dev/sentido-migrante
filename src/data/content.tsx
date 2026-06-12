export const servicesData = [
  { 
    id: "identidad",
    title: "Restauración de Identidad", 
    desc: "Acompañamiento para profesionales y técnicos que enfrentan la pérdida de estatus laboral e identidad al migrar.", 
    fullDesc: "Diseñado especialmente para ingenieros, médicos, científicos y creativos en el extranjero. Te ayudamos a procesar la disonancia entre tu éxito laboral anterior y tu realidad actual, validando tu valor profesional y reconstruyendo un sentido de vida sólido en tu nuevo entorno.", 
    icon: 'User', 
    color: "bg-menta text-bosque-dark", 
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=800&auto=format&fit=crop", 
    price: "60 CHF / 60 EUR", 
    duration: "50 min" 
  },
  { 
    id: "tribu",
    title: "Tribu en el Exilio", 
    desc: "Soporte y contención para la \"Generación Sándwich\" que cría sin redes de apoyo y a la distancia.", 
    fullDesc: "Un espacio dedicado a madres, padres y cuidadores que enfrentan el desafío de criar hijos biculturales en el extranjero, mientras sostienen el cuidado emocional de sus familias de origen. Aliviamos la culpa transnacional y el agotamiento por falta de tribu.", 
    icon: 'Users', 
    color: "bg-suculenta text-bosque-dark", 
    image: "https://images.unsplash.com/photo-1516584282367-ac5f3f0bc835?q=80&w=800&auto=format&fit=crop", 
    price: "60 CHF / 60 EUR", 
    duration: "50 min" 
  },
  { 
    id: "soberania",
    title: "Soberanía Lingüística", 
    desc: "Psicoterapia enfocada en sanar y habitar las emociones profundas desde tu lengua materna.", 
    fullDesc: "El cerebro emocional sana profundamente en el idioma de tu infancia. Esta vertical valida tu identidad y tus afectos, superando el distanciamiento emocional y el desgaste cognitivo de tener que expresarte y traducir tu dolor en un segundo idioma.", 
    icon: 'Globe', 
    color: "bg-menta text-olivo-dark", 
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop", 
    price: "60 CHF / 60 EUR", 
    duration: "50 min" 
  },
  { 
    id: "duelo",
    title: "Duelo Migratorio", 
    desc: "Procesamiento saludable de las pérdidas, la nostalgia y la adaptación al nuevo entorno cultural.", 
    fullDesc: "Migrar es una reconfiguración existencial. Te ofrecemos un espacio seguro para elaborar la nostalgia de lo que dejaste atrás, reconciliarte con tu decisión de partir y transformar la desorientación inicial en un nuevo y saludable arraigo bicultural.", 
    icon: 'Heart', 
    color: "bg-suculenta text-olivo-dark", 
    image: "https://images.unsplash.com/photo-1516584282367-ac5f3f0bc835?q=80&w=800&auto=format&fit=crop", 
    price: "60 CHF / 60 EUR", 
    duration: "50 min" 
  },
];

export const teamData = [
  { 
    id: "jonathan",
    name: "Ps. Jonathan Petersen Zañartu", 
    role: "Psicólogo Clínico y Psicoterapeuta", 
    bio: "Psicólogo Clínico con diplomado en Infancia y Adolescencia. Especializado en acompañar a adultos y jóvenes en problemáticas de estrés, ansiedad, crisis de pánico y depresión. Su práctica sostiene una orientación psicoanalítica práctica e integradora, libre de dogmatismos, que incorpora elementos humanistas, sistémicos y herramientas como el mindfulness para redescubrir y potenciar los recursos internos en una relación clínica horizontal y cercana.", 
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop" 
  },
  { 
    id: "camila",
    name: "Ps. Camila Malebrán F.", 
    role: "Psicóloga Clínica y Psicoterapeuta", 
    bio: "Psicóloga Clínica y Psicoterapeuta con un enfoque centrado en la persona y sus recursos. Especializada en el acompañamiento y apoyo en la búsqueda de sentido, trabaja potenciando las propias capacidades y herramientas para ayudar a la persona a alcanzar un vivenciar libre, mental y emocionalmente, y un trato autorresponsable consigo misma y con el mundo.", 
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
export interface Resource {
  title: string;
  category: string;
  time: string;
  color: string;
  description?: string;
  content?: string | any[];
}

export const resourcesContent: Resource[] = [
  { title: "El duelo oculto de emigrar", category: "Psicología", time: "5 min", color: "bg-olivo text-white" },
  { title: "Límites saludables en parejas biculturales", category: "Relaciones", time: "8 min", color: "bg-bluegrey-800 text-white" },
  { title: "Guía práctica para manejar la ansiedad invernal", category: "Bienestar", time: "4 min", color: "bg-menta text-bosque-dark" }
];

