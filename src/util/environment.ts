import 'dotenv/config';
import { z, ZodError, ZodObject, ZodRawShape } from 'zod';

const parse = <T extends ZodRawShape>(zodObject: ZodObject<T>, env: unknown) => {
  try {
    return zodObject.parse(env);
  } catch (e) {
    if (!(e instanceof ZodError)) {
      throw e;
    }

    const missing = e.issues.map((issue) => issue.path).join(', ');

    if (!missing) {
      throw e;
    }

    throw new Error(`Environment variable missing: ${missing}`);
  }
};

const serverEnvironmentSchema = z.object({

});

let serverEnvironmentMemo: z.infer<typeof serverEnvironmentSchema> | undefined;

export const serverEnvironment = () => {
  if (serverEnvironmentMemo) {
    return serverEnvironmentMemo;
  }
  serverEnvironmentMemo = parse(serverEnvironmentSchema, process.env);
  return serverEnvironmentMemo;
};

const clientEnvironmentSchema = z.object({
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string(),
});

let clientEnvironmentMemo: z.infer<typeof clientEnvironmentSchema> | undefined;

export const clientEnvironment = () => {
  if (clientEnvironmentMemo) {
    return clientEnvironmentMemo;
  }

  clientEnvironmentMemo = parse(clientEnvironmentSchema, {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  return clientEnvironmentMemo;
};
