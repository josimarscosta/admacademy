import mongoose, { Document, Schema } from 'mongoose';

export interface IAchievement extends Document {
  name: string;
  description: string;
  icon: string;
  category: string;
  points: number;
  requirements: {
    type: string;
    value: number;
    metric: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const AchievementSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['conhecimento', 'participação', 'desempenho', 'colaboração', 'consistência'],
    },
    points: {
      type: Number,
      required: true,
      default: 0,
    },
    requirements: [
      {
        type: {
          type: String,
          required: true,
          enum: ['completar', 'acertar', 'participar', 'sequência', 'tempo'],
        },
        value: {
          type: Number,
          required: true,
        },
        metric: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAchievement>('Achievement', AchievementSchema);
