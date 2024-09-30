import zod from 'zod';
import { isValidObjectId, Types } from 'mongoose';

export const IDSchema = zod.custom<Types.ObjectId>((id: string) => isValidObjectId(id), { message: 'Invalid ID' });
