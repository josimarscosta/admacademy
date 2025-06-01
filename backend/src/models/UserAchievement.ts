import mongoose, { Document, Schema } from 'mongoose';

export interface IUserAchievement extends Document {
  userId: mongoose.Types.ObjectId;
  achievementId: mongoose.Types.ObjectId | any;
  progress: number;
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserAchievementSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'ID do usuário é obrigatório']
  },
  achievementId: {
    type: Schema.Types.ObjectId,
    ref: 'Achievement',
    required: [true, 'ID da conquista é obrigatório']
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

const UserAchievement = mongoose.model<IUserAchievement>('UserAchievement', UserAchievementSchema);

export default UserAchievement;
