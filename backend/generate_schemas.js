const fs = require('fs');
const path = require('path');

const apiPath = path.join(__dirname, 'src', 'api');

const schemas = [
  {
    name: 'service',
    schema: {
      kind: 'collectionType',
      collectionName: 'services',
      info: { singularName: 'service', pluralName: 'services', displayName: 'Service', description: '' },
      options: { draftAndPublish: true },
      pluginOptions: {},
      attributes: {
        id_slug: { type: 'string', required: true, unique: true },
        title: { type: 'string', required: true },
        desc: { type: 'text' },
        fullDesc: { type: 'text' },
        icon: { type: 'string', default: 'User' },
        color: { type: 'string' },
        image: { type: 'string' },
        price: { type: 'string' },
        duration: { type: 'string' }
      }
    }
  },
  {
    name: 'team-member',
    schema: {
      kind: 'collectionType',
      collectionName: 'team_members',
      info: { singularName: 'team-member', pluralName: 'team-members', displayName: 'TeamMember', description: '' },
      options: { draftAndPublish: true },
      pluginOptions: {},
      attributes: {
        id_slug: { type: 'string', required: true, unique: true },
        name: { type: 'string', required: true },
        role: { type: 'string' },
        bio: { type: 'text' },
        img: { type: 'string' }
      }
    }
  },
  {
    name: 'testimonial',
    schema: {
      kind: 'collectionType',
      collectionName: 'testimonials',
      info: { singularName: 'testimonial', pluralName: 'testimonials', displayName: 'Testimonial', description: '' },
      options: { draftAndPublish: true },
      pluginOptions: {},
      attributes: {
        text: { type: 'text', required: true },
        author: { type: 'string', required: true },
        location: { type: 'string' }
      }
    }
  },
  {
    name: 'resource',
    schema: {
      kind: 'collectionType',
      collectionName: 'resources',
      info: { singularName: 'resource', pluralName: 'resources', displayName: 'Resource', description: '' },
      options: { draftAndPublish: true },
      pluginOptions: {},
      attributes: {
        title: { type: 'string', required: true },
        category: { type: 'string' },
        time: { type: 'string' },
        color: { type: 'string' }
      }
    }
  },
  {
    name: 'hero-content',
    schema: {
      kind: 'singleType',
      collectionName: 'hero_contents',
      info: { singularName: 'hero-content', pluralName: 'hero-contents', displayName: 'HeroContent', description: '' },
      options: { draftAndPublish: false },
      pluginOptions: {},
      attributes: {
        badge: { type: 'string' },
        titleHighlight: { type: 'string' },
        titleMain: { type: 'string' },
        description: { type: 'text' },
        ctaText: { type: 'string' },
        ctaSecondaryText: { type: 'string' }
      }
    }
  }
];

schemas.forEach(({ name, schema }) => {
  const dir = path.join(apiPath, name);
  const contentTypesDir = path.join(dir, 'content-types', name);
  const controllersDir = path.join(dir, 'controllers');
  const routesDir = path.join(dir, 'routes');
  const servicesDir = path.join(dir, 'services');

  // Create directories
  [contentTypesDir, controllersDir, routesDir, servicesDir].forEach(d => fs.mkdirSync(d, { recursive: true }));

  // Write schema.json
  fs.writeFileSync(path.join(contentTypesDir, 'schema.json'), JSON.stringify(schema, null, 2));

  // Write controller
  fs.writeFileSync(
    path.join(controllersDir, `${name}.ts`),
    `import { factories } from '@strapi/strapi';\n\nexport default factories.createCoreController('api::${name}.${name}');`
  );

  // Write routes
  fs.writeFileSync(
    path.join(routesDir, `${name}.ts`),
    `import { factories } from '@strapi/strapi';\n\nexport default factories.createCoreRouter('api::${name}.${name}');`
  );

  // Write service
  fs.writeFileSync(
    path.join(servicesDir, `${name}.ts`),
    `import { factories } from '@strapi/strapi';\n\nexport default factories.createCoreService('api::${name}.${name}');`
  );

  console.log(`Created schema and core files for ${name}`);
});
