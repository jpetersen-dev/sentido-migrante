"use client";

import React from 'react';
import { Quote } from 'lucide-react';

// Tipos básicos para los bloques de Strapi (v4/v5 Blocks field)
interface StrapiBlock {
  type: string;
  children?: any[];
  level?: number;
  format?: string;
  image?: any;
  [key: string]: any;
}

interface StrapiRichTextProps {
  content: any[]; // El array de bloques que viene de Strapi
}

/**
 * Este componente actúa como el "Artista". 
 * Toma el JSON crudo de Strapi y lo convierte en nuestro diseño premium.
 */
export default function StrapiRichText({ content }: StrapiRichTextProps) {
  if (!content || !Array.isArray(content)) return null;

  return (
    <div className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-bluegrey-900 prose-p:text-bluegrey-700 prose-p:leading-relaxed prose-strong:text-bluegrey-900">
      {content.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={index} className={index === 0 ? "first-letter:text-7xl first-letter:font-bold first-letter:text-suculenta first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]" : ""}>
                {renderChildren(block.children)}
              </p>
            );

          case 'heading':
            const Tag = `h${block.level || 2}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
            return (
              <Tag key={index} className="mt-12 mb-6">
                {renderChildren(block.children)}
              </Tag>
            );

          case 'list':
            const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
            return (
              <ListTag key={index} className="my-8 space-y-3 list-outside">
                {block.children?.map((item: any, i: number) => (
                  <li key={i} className="pl-2">
                    {renderChildren(item.children)}
                  </li>
                ))}
              </ListTag>
            );

          case 'quote':
            return (
              <div key={index} className="my-14 p-10 bg-suculenta/5 border-l-4 border-suculenta rounded-r-3xl italic text-2xl text-bosque-dark font-display quote-card relative overflow-hidden group shadow-sm">
                <Quote className="absolute -top-4 -right-4 w-32 h-32 opacity-5 rotate-12 transition-transform group-hover:scale-110" />
                {renderChildren(block.children)}
              </div>
            );

          case 'image':
            return (
              <figure key={index} className="my-12">
                <img 
                  src={block.image?.url} 
                  alt={block.image?.alternativeText || ''} 
                  className="rounded-3xl shadow-xl w-full object-cover max-h-[500px]"
                />
                {block.image?.caption && (
                  <figcaption className="mt-4 text-center text-sm text-bluegrey-400 italic">
                    {block.image.caption}
                  </figcaption>
                )}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

// Función auxiliar para renderizar los hijos de un bloque (negritas, cursivas, etc.)
function renderChildren(children: any[] | undefined) {
  if (!children) return null;
  return children.map((child, i) => {
    let content = child.text;

    if (child.bold) content = <strong key={i}>{content}</strong>;
    if (child.italic) content = <em key={i}>{content}</em>;
    if (child.underline) content = <u key={i}>{content}</u>;
    if (child.strikethrough) content = <del key={i}>{content}</del>;
    if (child.code) content = <code key={i} className="bg-slate-100 px-1 rounded text-pink-600">{content}</code>;

    return <React.Fragment key={i}>{content}</React.Fragment>;
  });
}
