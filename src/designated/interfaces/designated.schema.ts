import * as mongoose from 'mongoose';

export const DesignatedSchema = new mongoose.Schema(
  {
    name: String,
    office: String,
    deletedAt: String,
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
