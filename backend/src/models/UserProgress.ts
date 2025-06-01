import mongoose, { Schema, Document } from 'mongoose';

export interface IUserProgress extends Document {
  user: mongoose.Types.ObjectId;
  module: mongoose.Types.ObjectId;
  trail: mongoose.Types.ObjectId;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number; // 0-100
  completedAt?: Date;
  timeSpentMinutes: number;
  lastAccessedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserProgressSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Usuário é obrigatório'],
    },
    module: {
      type: Schema.Types.ObjectId,
      ref: 'Module',
      required: [true, 'Módulo é obrigatório'],
    },
    trail: {
      type: Schema.Types.ObjectId,
      ref: 'Trail',
      required: [true, 'Trilha é obrigatória'],
    },
    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'completed'],
      default: 'not_started',
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    completedAt: {
      type: Date,
    },
    timeSpentMinutes: {
      type: Number,
      default: 0,
    },
    lastAccessedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Índice composto para garantir que cada usuário tenha apenas um registro de progresso por módulo
UserProgressSchema.index({ user: 1, module: 1 }, { unique: true });

export default mongoose.model<IUserProgress>('UserProgress', UserProgressSchema);
