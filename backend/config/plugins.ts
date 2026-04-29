import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env('SUPABASE_S3_ACCESS_KEY_ID'),
            secretAccessKey: env('SUPABASE_S3_SECRET_ACCESS_KEY'),
          },
          region: env('SUPABASE_REGION', 'eu-central-1'),
          endpoint: env('SUPABASE_S3_ENDPOINT'),
          forcePathStyle: true,
          params: {
            Bucket: env('SUPABASE_S3_BUCKET', 'sentido-migrante-media'),
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});

export default config;
