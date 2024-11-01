import { model, Schema } from 'mongoose';

export const Notification = model('Notification', new Schema({
  order: {
    table: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['IN_PRODUCTION', 'DONE'],
      required: true,
    }
  },

  sentAt: {
    type: Date,
    default: Date.now,
  },

  seen: {
    type: Boolean,
    default: false,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}));
