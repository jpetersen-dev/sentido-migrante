# **PLAN MAESTRO DE REDIRECCIÓN Y ARQUITECTURA MULTI-SUBDOMINIO (PRODUCCIÓN & LOCAL)**

**Proyecto:** Sentido Migrante

**Rol de Origen:** STRATEGOS (Consultoría Técnica y Clínica)

**Stack Tecnológico Detectado en el Repo:** Next.js 14+ (App Router), Strapi v5, NextAuth.js, Tailwind CSS, Docker, Hetzner VPS

## **🔍 DIAGNÓSTICO DE LA RADIOGRAFÍA REAL DEL REPOSITORIO**

Tras auditar el código fuente del repositorio actual de jpetersen-dev/sentido-migrante, se identificaron los siguientes puntos críticos que el enjambre de agentes debe resolver para implementar la separación entre la Landing Page (sentidomigrante.com) y el Portal Operativo (app.sentidomigrante.com):

1. **La Realidad de NextAuth.js:** La autenticación se está gestionando a través de NextAuth.js (src/lib/auth.ts). No se debe intentar migrar esto a Supabase Auth de forma disruptiva. El objetivo es configurar las cookies de NextAuth para que se compartan de forma cruzada entre subdominios.  
2. **Conflicto del Layout de Navegación:** El archivo src/app/layout.tsx actual inyecta de forma monolítica tanto el Navbar superior como el BottomNav inferior. Esto satura visualmente la Landing Page en dispositivos móviles. Debemos aislar las navegaciones utilizando grupos de rutas (Route Groups).  
3. **Estructura Plana de Rutas:** Las páginas /agendar, /mi-cuenta y /recursos están expuestas de manera plana en el directorio raíz de src/app/. Deben ser movidas bajo sus respectivos grupos lógicos para que el Middleware las sirva según el hostname de la petición.

## **🛠️ PARTE 1: IMPLEMENTACIÓN TÉCNICA EN LOCAL**

### **A. Simulación de Subdominios en el Archivo hosts**

Para desarrollar y probar localmente la persistencia de sesión con NextAuth.js, se debe engañar al sistema operativo para que resuelva los nombres de dominio virtuales apuntando a tu máquina local.

Añade estas líneas al archivo de configuración de hosts:

* **macOS / Linux:** Editar con sudo nano /etc/hosts  
* **Windows (Ejecutar como Administrador):** Editar C:\\Windows\\System32\\drivers\\etc\\hosts

\# \--- ECOSISTEMA SENTIDO MIGRANTE LOCAL \---  
127.0.0.1       sentidomigrante.local  
127.0.0.1       app.sentidomigrante.local

Una vez guardado, se levantará el proyecto localmente mediante npm run dev y se accederá mediante http://sentidomigrante.local:3000 y http://app.sentidomigrante.local:3000 en lugar de utilizar localhost.

### **B. El Middleware de Ruteo por Hostname (src/middleware.js)**

Este script actuará como el "policía de tráfico" en la raíz del proyecto. Leerá las cabeceras HTTP de entrada y redirigirá la petición al grupo de carpetas interna correspondiente sin alterar la URL visible en el navegador del usuario.

Crea el archivo src/middleware.js con el siguiente código:

import { NextResponse } from 'next/server';

export function middleware(request) {  
  const url \= request.nextUrl.clone();  
  const hostname \= request.headers.get('host') || '';

  // Bypass para las rutas de la API de autenticación, archivos estáticos y optimización de imágenes  
  if (  
    url.pathname.startsWith('/api') ||  
    url.pathname.startsWith('/\_next') ||  
    url.pathname.includes('.')  
  ) {  
    return NextResponse.next();  
  }

  // 1\. Detectar si la petición viene del subdominio de la aplicación móvil-web  
  // Captura app.sentidomigrante.com, app.sentidomigrante.local:3000 y app.localhost:3000  
  if (hostname.startsWith('app.')) {  
    // Reescribe de forma invisible hacia el Route Group de la aplicación (app)  
    url.pathname \= \`/(app)${url.pathname}\`;  
    return NextResponse.rewrite(url);  
  }

  // 2\. Por defecto, derivar el tráfico al Route Group de la Landing Page de Captación (landing)  
  url.pathname \= \`/(landing)${url.pathname}\`;  
  return NextResponse.rewrite(url);  
}

export const config \= {  
  matcher: \[  
    /\*  
     \* Coincide con todas las rutas de solicitud excepto las que comienzan con:  
     \* \- api (rutas de API)  
     \* \- \_next/static (archivos estáticos)  
     \* \- \_next/image (optimización de imágenes)  
     \* \- favicon.ico, assets, etc. (archivos públicos en la raíz)  
     \*/  
    '/((?\!api|\_next/static|\_next/image|assets|favicon.ico|sw.js|site.webmanifest).\*)',  
  \],  
};

### **C. Persistencia de la Sesión de NextAuth.js entre Subdominios (src/lib/auth.ts)**

Para que un paciente que inicie sesión en app.sentidomigrante.com sea reconocido inmediatamente como usuario activo si navega hacia la landing principal sentidomigrante.com (por ejemplo, para leer un artículo del blog), NextAuth debe guardar su cookie de sesión con el parámetro de dominio comodín (domain: '.sentidomigrante.com').

Modifica las opciones de configuración de NextAuth en src/lib/auth.ts añadiendo la propiedad cookies:

import { NextAuthOptions } from "next-auth";

// Lee el dominio del cookie desde las variables de entorno  
// En local: .sentidomigrante.local  
// En Hetzner: .sentidomigrante.com  
const cookieDomain \= process.env.NEXT\_PUBLIC\_COOKIE\_DOMAIN || ".sentidomigrante.local";

export const authOptions: NextAuthOptions \= {  
  // ... Tus proveedores de autenticación existentes (Google, Credentials, etc.) ...  
  providers: \[  
    // ... Configuración existente de Providers ...  
  \],  
  cookies: {  
    sessionToken: {  
      name: \`next-auth.session-token\`,  
      options: {  
        httpOnly: true,  
        sameSite: 'lax',  
        path: '/',  
        secure: process.env.NODE\_ENV \=== 'production',  
        domain: cookieDomain // Permite compartir la sesión entre subdominios  
      }  
    }  
  },  
  callbacks: {  
    async session({ session, token }) {  
      // Mantener tus mapeos y callbacks existentes de NextAuth  
      return session;  
    }  
  }  
};

*Variables de entorno sugeridas para configurar en tus archivos .env:*

**En .env.local (Desarrollo local):**

NEXTAUTH\_URL=\[http://sentidomigrante.local:3000\](http://sentidomigrante.local:3000)  
NEXT\_PUBLIC\_COOKIE\_DOMAIN=.sentidomigrante.local

**En .env.production (Hetzner VPS):**

NEXTAUTH\_URL=\[https://sentidomigrante.com\](https://sentidomigrante.com)  
NEXT\_PUBLIC\_COOKIE\_DOMAIN=.sentidomigrante.com

## **📂 PARTE 2: EL NUEVO ÁRBOL DE CARPETAS DE TU REPOSITORIO**

Para aplicar esta arquitectura sin perder tu avance de código, los agentes moverán tus archivos actuales a la siguiente estructura interna de Next.js App Router utilizando **Route Groups**:

src/  
├── middleware.js                 \# \[CREAR\] Ruteador por hostname  
└── app/  
    ├── layout.tsx                \# Layout global del HTML base (Inyecta el SessionProvider)  
    │  
    ├── (landing)/                \# \==========================================  
    │   │                         \# ECOSISTEMA PÚBLICO (sentidomigrante.com)  
    │   │                         \# \==========================================  
    │   ├── layout.tsx            \# \[CREAR\] Renderiza: \<Navbar /\> \+ {children} \+ \<Footer /\>  
    │   ├── page.tsx              \# \[MOVER DESDE RAÍZ\] Home pública (Landing Core / Importa Home.tsx)  
    │   │  
    │   ├── servicios/              
    │   │   └── page.tsx          \# \[MOVER DESDE RAÍZ\] Verticales de Acompañamiento (Importa Services.tsx)  
    │   │  
    │   ├── suiza/                  
    │   │   └── page.tsx          \# Landing geolocalizada Suiza (Conversión CHF \+ Schema JSON-LD)  
    │   │  
    │   ├── alemania/               
    │   │   └── page.tsx          \# Landing geolocalizada Alemania (Conversión EUR \+ Schema JSON-LD)  
    │   │  
    │   └── legal/                \# Copy de términos y privacidad indexables (RGPD / GDPR)  
    │       ├── terminos/  
    │       │   └── page.tsx  
    │       └── privacidad/  
    │           └── page.tsx  
    │  
    └── (app)/                    \# \==========================================  
        │                         \# ECOSISTEMA OPERATIVO (app.sentidomigrante.com)  
        │                         \# \==========================================  
        ├── layout.tsx            \# \[CREAR\] Renderiza: {children} \+ \<BottomNav /\> (Barra tipo App)  
        ├── page.tsx              \# \[CREAR\] Mapea la vista del Portal del Paciente (Importa Profile.tsx)  
        │  
        ├── agendar/                
        │   └── page.tsx          \# \[MOVER DESDE RAÍZ\] Calendario de Citas (Importa Booking.tsx)  
        │  
        ├── recursos/               
        │   ├── page.tsx          \# \[MOVER DESDE RAÍZ\] Hub de Descargables y Test (Importa Resources.tsx)  
        │   ├── test-duelo/  
        │   │   └── page.tsx      \# Cuestionario fenomenológico interactivo (Síndrome de Ulises)  
        │   └── guia-bienestar/  
        │       └── page.tsx      \# Formulario de conversión y descarga de e-book  
        │  
        └── articulo/               
            └── \[id\]/               
                └── page.tsx      \# \[MOVER DESDE RAÍZ\] Visualización de artículos dinámicos (Importa Article.tsx)

## **🚀 PARTE 3: MEMORÁNDUM DE INSTRUCCIONES PARA EL DIRECTOR DE AGENTES**

Copia y pega la siguiente orden técnica directamente en la interfaz de tu Director en Antigravity para iniciar la migración del código de manera segura y coordinada:

\#\#\# 📢 DIRECTRIZ TÉCNICA DE REARQUITECTURA: MIGRACIÓN A MULTI-SUBDOMINIO NEXTAUTH

\*\*Para:\*\* Director de Agentes de Antigravity  
\*\*De:\*\* Dirección del Proyecto Sentido Migrante  
\*\*Prioridad:\*\* Alta (Acción Inmediata)

Director, tras una auditoría directa de nuestro repositorio real, hemos identificado la presencia activa de \*\*NextAuth.js\*\* (\`src/lib/auth.ts\`) e interfaces de navegación duplicadas (\`Navbar.tsx\` y \`BottomNav.tsx\`) en el layout global. 

Para optimizar nuestra Landing Page para dispositivos móviles sin sacrificar la persistencia de las sesiones de usuario en el portal, reorientarás de inmediato al enjambre de agentes bajo las siguientes directivas técnicas estrictas de migración:

\#\#\#\# 1\. Implementación del Ruteador Dinámico (Acción para 'web-architect')  
\* Detener toda inyección plana en \`src/app/\`.  
\* Crear un archivo middleware unificado en la raíz del proyecto (\`src/middleware.js\`) que lea la cabecera \`host\` de cada petición HTTP.  
\* Si el host comienza con \`app.\`, debe reescribir de manera invisible la ruta hacia el grupo interno \`(app)\`. En cualquier otro caso, derivará por defecto al grupo \`(landing)\`.  
\* Reestructurar el árbol de directorios de Next.js migrando las páginas existentes hacia los Route Groups \`src/app/(landing)/\` y \`src/app/(app)/\` según el mapa de carpetas oficial adjunto.

\#\#\#\# 2\. Reconfiguración de Cookies de Sesión Cruzada (Acción para 'auth-security' y 'debugger-expert')  
\* Queda estrictamente prohibido intentar migrar el inicio de sesión a Supabase Auth. Seguiremos utilizando \*\*NextAuth.js\*\* tal como está declarado en \`src/lib/auth.ts\`.  
\* El agente 'auth-security' modificará el objeto de configuración de NextAuth para inyectar una política de cookies que use el dominio comodín definido en la variable de entorno \`process.env.NEXT\_PUBLIC\_COOKIE\_DOMAIN\`.  
\* Esto garantizará la persistencia de las credenciales activas del paciente cuando este navegue de forma cruzada entre el subdominio operativo (\`app.sentidomigrante.com\`) y el dominio raíz informativo (\`sentidomigrante.com\`).

\#\#\#\# 3\. Rediseño y Desacoplamiento de Interfaz UX (Acción para 'ui-designer')  
\* Modificar el layout global de la raíz \`src/app/layout.tsx\` para que \*\*únicamente\*\* actúe como contenedor HTML y sirva el \`SessionProvider\` de NextAuth. El layout global ya no debe renderizar componentes visuales de navegación directamente.  
\* \*\*En el layout interno de \`src/app/(landing)/layout.tsx\`:\*\* Renderizar exclusivamente la barra de navegación superior tradicional (\`src/components/layout/Navbar.tsx\`) y el Footer público. El diseño de la landing informativa debe enfocarse en una lectura limpia y de scroll lineal móvil.  
\* \*\*En el layout interno de \`src/app/(app)/layout.tsx\`:\*\* Renderizar la barra de navegación inferior móvil fija (\`src/components/layout/BottomNav.tsx\`) para emular la experiencia de una aplicación nativa (PWA) de alto rendimiento una vez que el usuario se encuentra dentro de la aplicación.

\#\#\#\# 4\. Entorno de Desarrollo y Simulación Local  
\* El enjambre completo deberá mapear sus configuraciones de hosts de desarrollo para apuntar los hostnames virtuales \`sentidomigrante.local:3000\` y \`app.sentidomigrante.local:3000\` a la IP local \`127.0.0.1\`.  
\* No se aprobará ningún commit ni despliegue de prueba si la persistencia de la sesión o la navegación dinámica basada en el middleware de hostnames fallan en la simulación local.

Reportar el avance de la migración y la reubicación de los archivos de Next.js en el próximo informe de compilación.  
