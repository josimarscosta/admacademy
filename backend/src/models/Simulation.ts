import mongoose, { Schema, Document } from 'mongoose';

export interface ISimulation extends Document {
  title: string;
  description: string;
  course: mongoose.Types.ObjectId;
  questions: {
    questionText: string;
    options: string[];
    correctOption: number;
    explanation: string;
    competency: string;
    difficulty: 'easy' | 'medium' | 'hard';
    type: 'multiple_choice' | 'true_false' | 'essay';
    points: number;
  }[];
  duration: number; // em minutos
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SimulationSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Título do simulado é obrigatório'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Descrição do simulado é obrigatória'],
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Curso associado é obrigatório'],
    },
    questions: [{
      questionText: {
        type: String,
        required: true
      },
      options: [{
        type: String,
        required: true
      }],
      correctOption: {
        type: Number,
        required: true
      },
      explanation: {
        type: String,
        required: true
      },
      competency: {
        type: String,
        required: true
      },
      difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
      },
      type: {
        type: String,
        enum: ['multiple_choice', 'true_false', 'essay'],
        default: 'multiple_choice'
      },
      points: {
        type: Number,
        default: 1
      }
    }],
    duration: {
      type: Number,
      required: [true, 'Duração do simulado é obrigatória'],
      min: [10, 'Duração mínima é de 10 minutos']
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    startDate: {
      type: Date,
      required: [true, 'Data de início é obrigatória']
    },
    endDate: {
      type: Date,
      required: [true, 'Data de término é obrigatória']
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISimulation>('Simulation', SimulationSchema);
