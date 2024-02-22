import { Document } from 'mongoose';

export interface Record extends Document {
  card: string;
  designated: string;
  periodOfDay: string;
  date: string;
  pendingBlocks: Array<number>;
}
