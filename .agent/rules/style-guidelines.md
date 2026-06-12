# Reglas de Estilo — Sentido Migrante

Estas directrices definen la identidad visual, el uso de la tipografía y la paleta de colores para todos los componentes de la aplicación. Todo desarrollador y subagente debe respetar estrictamente estas reglas.

## 1. Paleta de Colores Oficial

La aplicación utiliza un tema personalizado configurado en Tailwind CSS v4 (`src/app/globals.css`). Queda prohibido el uso de colores inline o ad-hoc que no pertenezcan a esta paleta:

*   **Color Dominante (Marca Principal)**:
    *   `Verde Bosque`: `#516750` (`bg-bosque` / `text-bosque`)
    *   `Verde Bosque Oscuro`: `#3f513e` (`bg-bosque-dark` / `text-bosque-dark`) - Para hovers y estados activos.
*   **Colores Secundarios**:
    *   `Menta`: `#DAEDDF` (`bg-menta` / `text-menta`) - Fondos de acento claros, badges de categoría.
    *   `Suculenta`: `#A2BC97` (`bg-suculenta` / `text-suculenta`) - Bordes sutiles, estados desactivados o contrastes suaves.
    *   `Olivo`: `#647453` (`bg-olivo` / `text-olivo`)
    *   `Olivo Oscuro`: `#586749` (`bg-olivo-dark` / `text-olivo-dark`)
*   **Color de Acento**:
    *   `Grape/Púrpura`: `#7E22CE` (`text-grape-600`) - Para resaltar enlaces importantes, llamadas de atención o micro-detalles.
    *   `Grape Oscuro`: `#581C87` (`text-grape-800`)
*   **Neutros e Interfaz**:
    *   `Crema Claro (Fondo Primario)`: `#FCFBF9` (`bg-cream-50`)
    *   `Crema Medio`: `#F9F7F3` (`bg-cream-100`)
    *   `Crema Oscuro`: `#F2EFE8` (`bg-cream-200`)
    *   `Escala de Gris Azulado (Neutros)`: Desde `bluegrey-50` (`#FAFAF9`) hasta `bluegrey-900` (`#1C1917`).
    *   `Texto General`: `text-bluegrey-900` sobre fondos claros.

## 2. Tipografía y Jerarquía

La tipografía debe reflejar la dualidad de una clínica suiza con el alma latina.

*   **Tipografía de Títulos e Identidad**: `Satoshi` (clase `font-display`).
    *   Utilizar en encabezados `h1`, `h2`, `h3`, logotipos y elementos decorativos grandes.
    *   Estilo sugerido: `tracking-tight font-display text-bluegrey-800`.
*   **Tipografía de Lectura y Funcional**: `Inter` (clase `font-sans`).
    *   Utilizar en textos largos, cuerpo del artículo, descripciones, inputs y botones.
    *   Estilo sugerido: `font-sans leading-relaxed text-bluegrey-700`.

## 3. Clases de Utilidad Especiales

*   **Efecto Glassmorphism**:
    *   Fondo claro: usar la clase `glass` (`bg-white/60 backdrop-blur-md border border-white/40 shadow-sm`).
    *   Fondo oscuro: usar la clase `glass-dark` (`bg-bluegrey-900/80 backdrop-blur-md border border-bluegrey-700/50 shadow-md`).
*   **Estilo de Bordes**:
    *   Preferir esquinas ligeramente redondeadas (`rounded-xl` o `rounded-2xl`) para una sensación de suavidad y modernidad orgánica.
