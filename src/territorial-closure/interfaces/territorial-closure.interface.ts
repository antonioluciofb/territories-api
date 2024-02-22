import { Document } from 'mongoose';
import { Record } from 'records/interfaces/record.interface';

export interface TerritorialClosure extends Document {
  startDate: string;
  endDate: string;
  periodRange: string;
  cards: Array<string>;
  records: Array<Record>;
}
