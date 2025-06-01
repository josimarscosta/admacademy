import mongoose, { Document, Schema } from 'mongoose';

export interface IAnalytics extends Document {
  userId: Schema.Types.ObjectId;
  type: string;
  data: Record<string, any>;
  timestamp: Date;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const AnalyticsSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['desempenho', 'engajamento', 'progresso', 'previsão', 'comparativo'],
    },
    data: {
      type: Map,
      of: Schema.Types.Mixed,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    metadata: {
      type: Map,
      of: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Índices para melhorar a performance de consultas
AnalyticsSchema.index({ userId: 1, type: 1, timestamp: -1 });
AnalyticsSchema.index({ type: 1, timestamp: -1 });

export default mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);
