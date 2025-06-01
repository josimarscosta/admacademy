import mongoose, { Document, Schema } from 'mongoose';

export interface IRecommendation extends Document {
  userId: Schema.Types.ObjectId;
  type: string;
  contentId: Schema.Types.ObjectId;
  contentType: string;
  reason: string;
  priority: number;
  status: string;
  metadata: Record<string, any>;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const RecommendationSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['módulo', 'trilha', 'simulado', 'questão', 'revisão'],
    },
    contentId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'contentType',
    },
    contentType: {
      type: String,
      required: true,
      enum: ['Module', 'Trail', 'Simulation', 'Question'],
    },
    reason: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      default: 5,
      min: 1,
      max: 10,
    },
    status: {
      type: String,
      enum: ['pendente', 'visualizada', 'aceita', 'concluída', 'ignorada'],
      default: 'pendente',
    },
    metadata: {
      type: Map,
      of: Schema.Types.Mixed,
      default: {},
    },
    expiresAt: {
      type: Date,
      default: () => new Date(+new Date() + 30 * 24 * 60 * 60 * 1000), // 30 dias por padrão
    },
  },
  {
    timestamps: true,
  }
);

// Índices para melhorar a performance de consultas
RecommendationSchema.index({ userId: 1, status: 1 });
RecommendationSchema.index({ userId: 1, priority: -1 });
RecommendationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

export default mongoose.model<IRecommendation>('Recommendation', RecommendationSchema);
