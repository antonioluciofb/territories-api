import { Document } from 'mongoose';

interface Block {
  number: number;
  isFinished: boolean;
}
export interface Card extends Document {
  name: string;
  img: string;
  inProgress: boolean;
  finished: boolean;
  finishedAt: string;
  blocks: Array<Block>;
  pendingBlocks: Array<number>;
  records: Array<string>;
  dontVisit: Array<string>;
  createdAt: string;
  updatedAt: string;
  startedAt: string;
}
