import * as mongoose from 'mongoose';

export const CardSchema = new mongoose.Schema(
  {
    name: String,
    img: String,
    inProgress: {
      type: Boolean,
      default: false,
    },
    finished: {
      type: Boolean,
      default: false,
    },
    finishedAt: {
      type: Date,
      default: null,
    },
    blocks: Array<{
      number: number;
      isFinished: boolean;
    }>,
    pendingBlocks: Array<number>,
    records: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Records',
      },
    ],
    dontVisit: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DontVisit',
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    startedAt: { type: Date, default: null },
  },
  {
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
