import 'dotenv/config';
import {z} from 'zod';
const schema=z.object({PORT:z.coerce.number().default(4000),CLIENT_URL:z.string().default('http://localhost:5173'),SUPABASE_URL:z.string().url().optional(),SUPABASE_SERVICE_ROLE_KEY:z.string().optional()});
export const config=schema.parse(process.env);
