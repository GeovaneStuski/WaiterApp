import zod from 'zod';
import { IDSchema } from './IDSchema';

export const RegistersSchema = zod.array(IDSchema);
