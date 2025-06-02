import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion extends Document {
  text: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  difficulty: number;
  tags: string[];
  competencies: string[];
  category: string;
  contentArea: string;
  usageCount: number;
  successRate: number;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema: Schema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    options: [
      {
        text: {
          type: String,
          required: true,
        },
        isCorrect: {
          type: Boolean,
          required: true,
        },
      },
    ],
    explanation: {
      type: String,
      required: true,
    },
    difficulty: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 3,
    },
    tags: [
      {
        type: String,
        index: true,
      },
    ],
    competencies: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: String,
      required: true,
      enum: ['formação geral', 'conhecimento específico'],
    },
    contentArea: {
      type: String,
      required: true,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
    successRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 1,
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
QuestionSchema.index({ difficulty: 1, category: 1 });
QuestionSchema.index({ competencies: 1 });
QuestionSchema.index({ contentArea: 1 });

export default mongoose.model<IQuestion>('Question', QuestionSchema);
