import * as mongoose from 'mongoose';

export const RecordSchema = new mongoose.Schema(
  {
    card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card',
    },
    designated: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Designated',
    },
    periodOfDay: String,
    date: String,
    pendingBlocks: Array<number>,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: 'records',
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);
