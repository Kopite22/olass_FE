/* eslint-disable @typescript-eslint/no-namespace */
/**
 * Configuration for type-safe environment variables.
 * Imported through src/app/page.tsx
 * @see https://x.com/mattpocockuk/status/1760991147793449396
 */
import { z } from 'zod';

const envVariables = z.object({
  NEXT_PUBLIC_SHOW_LOGGER: z.enum(['true', 'false']).optional(),
  GA_MEASUREMENT_ID: z.string(),
  SERVER_URL: z.string().url(),
  NEXT_PUBLIC_SERVER_URL: z.string().url(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
