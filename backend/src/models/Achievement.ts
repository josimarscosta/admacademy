import mongoose, { Document, Schema } from 'mongoose';

export interface IAchievement extends Document {
  name: string;
  description: string;
  icon: string;
  category: string;
  points: number;
  criteria: {
    type: string;
    target: number;
    entityId?: mongoose.Types.ObjectId;
  };
  createdAt: Date;
  updatedAt: Date;
}

const AchievementSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória']
  },
  icon: {
    type: String,
    required: [true, 'Ícone é obrigatório']
  },
  category: {
    type: String,
    required: [true, 'Categoria é obrigatória']
  },
  points: {
    type: Number,
    required: [true, 'Pontos são obrigatórios'],
    min: 1
  },
  criteria: {
    type: {
      type: String,
      required: [true, 'Tipo de critério é obrigatório'],
      enum: ['completion', 'score', 'streak', 'time']
    },
    target: {
      type: Number,
      required: [true, 'Alvo do critério é obrigatório']
    },
    entityId: {
      type: Schema.Types.ObjectId,
      required: false
    }
  }
}, {
  timestamps: true
});

const Achievement = mongoose.model<IAchievement>('Achievement', AchievementSchema);

export default Achievement;
