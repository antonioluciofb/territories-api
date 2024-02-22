import { Document } from 'mongoose';

export interface Designated extends Document {
  name: string;
  office: string;
  deletedAt: string;
}
