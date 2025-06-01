import mongoose, { Document, Schema } from 'mongoose';

export interface IModule extends Document {
  title: string;
  description: string;
  content: string;
  contentType: 'text' | 'video' | 'quiz' | 'interactive';
  contentArea: string;
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  trailId: mongoose.Types.ObjectId;
  order: number;
  tags: string[];
  resources: Array<{
    type: string;
    url: string;
    title: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const ModuleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória']
  },
  content: {
    type: String,
    required: [true, 'Conteúdo é obrigatório']
  },
  contentType: {
    type: String,
    enum: ['text', 'video', 'quiz', 'interactive'],
    default: 'text'
  },
  contentArea: {
    type: String,
    required: [true, 'Área de conteúdo é obrigatória']
  },
  estimatedTime: {
    type: Number,
    required: [true, 'Tempo estimado é obrigatório'],
    min: 1
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  trailId: {
    type: Schema.Types.ObjectId,
    ref: 'Trail',
    required: [true, 'ID da trilha é obrigatório']
  },
  order: {
    type: Number,
    required: [true, 'Ordem é obrigatória']
  },
  tags: [{
    type: String
  }],
  resources: [{
    type: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

const Module = mongoose.model<IModule>('Module', ModuleSchema);

export default Module;
