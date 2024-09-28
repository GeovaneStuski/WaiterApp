import zod from 'zod';

export const FileSchema = zod.object({
  originalname: zod.string(),
  mimetype: zod.enum(["image/jpeg", "image/png"]),
  size: zod.number(),
})
