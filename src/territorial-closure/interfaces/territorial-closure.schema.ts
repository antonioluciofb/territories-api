import * as mongoose from 'mongoose';
import { Record } from 'records/interfaces/record.interface';

export const TerritorialClosureSchema = new mongoose.Schema(
  {
    startDate: String,
    endDate: String,
    periodRange: String,
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
      },
    ],
    records: Array<Record>,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);
