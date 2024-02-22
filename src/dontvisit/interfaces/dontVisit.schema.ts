import * as mongoose from 'mongoose';

export const DontVisitSchema = new mongoose.Schema(
  {
    card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card',
    },
    street: String,
    number: String,
    type: String,
    observations: String,
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
