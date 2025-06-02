import mongoose, { Document, Schema } from 'mongoose';

export interface IUserAchievement extends Document {
  userId: Schema.Types.ObjectId;
  achievementId: Schema.Types.ObjectId;
  earnedAt: Date;
  progress: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserAchievementSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    achievementId: {
      type: Schema.Types.ObjectId,
      ref: 'Achievement',
      required: true,
    },
    earnedAt: {
      type: Date,
      default: null,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Índice composto para garantir que um usuário tenha cada conquista apenas uma vez
UserAchievementSchema.index({ userId: 1, achievementId: 1 }, { unique: true });

export default mongoose.model<IUserAchievement>('UserAchievement', UserAchievementSchema);
