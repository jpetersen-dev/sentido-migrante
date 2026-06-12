# Reglas de Diseño y Estética — Sentido Migrante

Estas directrices definen los principios UX/UI que diferencian la web de Sentido Migrante, garantizando que se sienta premium, fluida y con un comportamiento similar al de una aplicación móvil nativa.

## 1. Comportamiento "App-Native" y Cero Fricción

*   **Transiciones Fluidas**: Utilizar el paquete `motion` (Framer Motion v12) para animar transiciones de estado, apertura de modales, y cambios de tarjeta. Las interacciones deben sentirse orgánicas y con inmediatez física.
*   **Scroll Suave**: La aplicación está integrada con `Lenis` para ofrecer una experiencia de desplazamiento táctil premium. No interferir con su configuración básica y asegurar que los anclajes y modales no rompan el flujo de Lenis.
*   **Navegación Móvil Integrada**: La estructura cuenta con un `BottomNav` para dispositivos móviles y una barra de navegación fluida en desktop. Todos los modales interactivos deben tener botones de cierre grandes y accesibles.

## 2. Personalización de Landing por País (Geolocalización)

*   **Landings Optimizadas**: El flujo debe detectar si el usuario ingresa desde Suiza (CHF) o Alemania (EUR) para presentar una propuesta adaptada a la moneda, el sistema de salud local (ej. listas de espera en Alemania vs copagos en Suiza) y necesidades específicas de cada país.
*   **Arbitraje Visual**: Mostrar de forma clara los sweet spots de precios de manera adaptada y local (60 CHF para Suiza, 60 EUR para Alemania).

## 3. Calidad Visual y Recursos Gráficos

*   **Sin Placeholders**: Está prohibido el uso de placeholders vacíos. Utilizar ilustraciones en formato SVG limpio, diagramas vectoriales o imágenes generadas de alta calidad acordes con la marca.
*   **Diseño Limpio, Clínico y Acogedor**: Lograr un equilibrio entre la limpieza clínica (espacios en blanco, alineaciones perfectas, tipografía clara) y la calidez humana (colores crema, formas redondeadas suaves y fotos profesionales reales).
*   **SEO para Single Page App**: Aunque la experiencia de usuario se sienta interactiva y fluida como una SPA, Next.js debe renderizar el contenido en el servidor (SSR/ISR) usando rutas y metadatos dinámicos. Esto asegura que los buscadores puedan indexar cada sección de forma independiente.
