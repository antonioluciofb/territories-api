import { Document } from 'mongoose';

export interface DontVisit extends Document {
  card: string;
  street: string;
  number: string;
  type: string;
  observations: string;
}
