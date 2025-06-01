import mongoose, { Document, Schema } from 'mongoose';

export interface IUserActivity extends Document {
  userId: Schema.Types.ObjectId;
  activityType: string;
  entityId: Schema.Types.ObjectId;
  entityType: string;
  action: string;
  details: Record<string, any>;
  duration: number;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserActivitySchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    activityType: {
      type: String,
      required: true,
      enum: ['estudo', 'simulado', 'revisão', 'interação', 'conquista'],
    },
    entityId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'entityType',
    },
    entityType: {
      type: String,
      required: true,
      enum: ['Module', 'Trail', 'Simulation', 'Question', 'Achievement'],
    },
    action: {
      type: String,
      required: true,
      enum: ['iniciou', 'completou', 'respondeu', 'acertou', 'errou', 'revisou', 'conquistou'],
    },
    details: {
      type: Map,
      of: Schema.Types.Mixed,
      default: {},
    },
    duration: {
      type: Number, // em segundos
      default: 0,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Índices para melhorar a performance de consultas
UserActivitySchema.index({ userId: 1, timestamp: -1 });
UserActivitySchema.index({ userId: 1, activityType: 1, timestamp: -1 });
UserActivitySchema.index({ entityType: 1, entityId: 1, timestamp: -1 });

export default mongoose.model<IUserActivity>('UserActivity', UserActivitySchema);
