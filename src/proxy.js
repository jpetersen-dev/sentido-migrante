import { NextResponse } from 'next/server';

export function proxy(request) {  
  const url = request.nextUrl.clone();  
  const hostname = request.headers.get('host') || '';

  // Bypass para las rutas de la API de autenticación, archivos estáticos y optimización de imágenes  
  if (  
    url.pathname.startsWith('/api') ||  
    url.pathname.startsWith('/_next') ||  
    url.pathname.includes('.')  
  ) {  
    return NextResponse.next();  
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const proto = isProduction ? 'https' : 'http';

  // Normalizar: redirigir de inmediato si contiene subdominios anidados como app.www. o www.app.
  if (hostname.includes('app.www.') || hostname.includes('www.app.')) {
    const cleanHost = hostname.replace(/^(app\.www\.|www\.app\.)+/i, 'app.');
    return NextResponse.redirect(`${proto}://${cleanHost}${url.pathname}${url.search}`);
  }

  // Definir las rutas que pertenecen a cada ecosistema
  const appRoutes = ['/mi-cuenta', '/agendar', '/recursos', '/articulo'];
  const landingRoutes = ['/servicios', '/suiza', '/alemania', '/legal'];

  // 1. Detectar si la petición viene del subdominio de la aplicación (app.)
  if (hostname.startsWith('app.')) {
    // Si están en la raíz, reescribir internamente a la página de mi-cuenta (portal del paciente)
    if (url.pathname === '/') {
      url.pathname = '/mi-cuenta';
      return NextResponse.rewrite(url);
    }

    // Si intentan entrar a una ruta de la landing desde el subdominio, redirigir al dominio principal
    const isLandingRoute = landingRoutes.some(route => url.pathname.startsWith(route));
    if (isLandingRoute) {
      const cleanHost = hostname.replace(/^(app\.|www\.)+/i, '');
      return NextResponse.redirect(`${proto}://${cleanHost}${url.pathname}${url.search}`);
    }

    // Permitir el paso para rutas operativas de la app (/mi-cuenta, /agendar, /recursos, /articulo)
    return NextResponse.next();
  }

  // 2. Si viene del dominio principal (landing page)
  // Si solicitan una ruta del portal del paciente, redirigir al subdominio 'app.' correspondiente
  const isAppRoute = appRoutes.some(route => url.pathname.startsWith(route));
  if (isAppRoute) {
    const cleanHost = hostname.replace(/^(app\.|www\.)+/i, ''); // Limpiar cualquier residuo de app. o www.
    return NextResponse.redirect(`${proto}://app.${cleanHost}${url.pathname}${url.search}`);
  }

  // De lo contrario, permitir el paso (Next.js resolverá automáticamente a las vistas del grupo (landing))
  return NextResponse.next();
}

export const config = {  
  matcher: [  
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)',  
  ],
};
