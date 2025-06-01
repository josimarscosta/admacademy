import mongoose, { Schema, Document } from 'mongoose';

export interface ITrail extends Document {
  name: string;
  description: string;
  course: mongoose.Types.ObjectId;
  modules: mongoose.Types.ObjectId[];
  difficulty: 'basic' | 'intermediate' | 'advanced';
  estimatedTimeHours: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TrailSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Nome da trilha é obrigatório'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Descrição da trilha é obrigatória'],
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Curso associado é obrigatório'],
    },
    modules: [{
      type: Schema.Types.ObjectId,
      ref: 'Module',
    }],
    difficulty: {
      type: String,
      enum: ['basic', 'intermediate', 'advanced'],
      default: 'intermediate',
    },
    estimatedTimeHours: {
      type: Number,
      required: [true, 'Tempo estimado é obrigatório'],
      min: [1, 'Tempo estimado deve ser pelo menos 1 hora'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITrail>('Trail', TrailSchema);
