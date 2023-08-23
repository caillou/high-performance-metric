import { z } from 'zod';

const isYYYYMMDD = (value: string) => {
  const date = new Date(value);
  return date.toISOString().slice(0, 10) === value;
};

export const kidSchema = z.object({
  id: z.string().optional(),
  lastName: z.string().trim(),
  firstName: z.string().trim(),
  birthDate: z.string().refine(isYYYYMMDD, {
    message: 'birthDate must be a valid calendar date string, e.g. 2021-12-31', // todo ps figure out localization
    //  params: ['ISO8601'] todo ps: figure out what params does.
  }),
});

export type Kid = z.infer<typeof kidSchema>;
