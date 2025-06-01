import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  name: string;
  code: string;
  description: string;
  coordinator: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Nome do curso é obrigatório'],
      trim: true,
    },
    code: {
      type: String,
      required: [true, 'Código do curso é obrigatório'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Descrição do curso é obrigatória'],
    },
    coordinator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Coordenador do curso é obrigatório'],
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

export default mongoose.model<ICourse>('Course', CourseSchema);
