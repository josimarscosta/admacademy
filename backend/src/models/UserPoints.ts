import mongoose, { Document, Schema } from 'mongoose';

export interface IUserPoints extends Document {
  userId: Schema.Types.ObjectId;
  totalPoints: number;
  level: number;
  pointsHistory: {
    amount: number;
    reason: string;
    source: string;
    sourceId: Schema.Types.ObjectId;
    timestamp: Date;
  }[];
  streakDays: number;
  lastActivityDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserPointsSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    totalPoints: {
      type: Number,
      default: 0,
      min: 0,
    },
    level: {
      type: Number,
      default: 1,
      min: 1,
    },
    pointsHistory: [
      {
        amount: {
          type: Number,
          required: true,
        },
        reason: {
          type: String,
          required: true,
        },
        source: {
          type: String,
          required: true,
          enum: ['módulo', 'trilha', 'simulado', 'conquista', 'desafio', 'bônus'],
        },
        sourceId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    streakDays: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastActivityDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Método para adicionar pontos
UserPointsSchema.methods.addPoints = async function(
  amount: number,
  reason: string,
  source: string,
  sourceId: mongoose.Types.ObjectId
) {
  this.totalPoints += amount;
  
  // Atualiza o nível com base nos pontos totais
  // Fórmula: level = 1 + floor(sqrt(totalPoints / 100))
  this.level = 1 + Math.floor(Math.sqrt(this.totalPoints / 100));
  
  // Registra no histórico
  this.pointsHistory.push({
    amount,
    reason,
    source,
    sourceId,
    timestamp: new Date(),
  });
  
  // Atualiza data da última atividade
  this.lastActivityDate = new Date();
  
  // Atualiza streak se for um novo dia
  const today = new Date();
  const lastDate = new Date(this.lastActivityDate);
  
  if (
    today.getDate() !== lastDate.getDate() ||
    today.getMonth() !== lastDate.getMonth() ||
    today.getFullYear() !== lastDate.getFullYear()
  ) {
    // Verifica se é um dia consecutivo
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (
      lastDate.getDate() === yesterday.getDate() &&
      lastDate.getMonth() === yesterday.getMonth() &&
      lastDate.getFullYear() === yesterday.getFullYear()
    ) {
      this.streakDays += 1;
    } else {
      // Reinicia streak se não for consecutivo
      this.streakDays = 1;
    }
  }
  
  return await this.save();
};

export default mongoose.model<IUserPoints>('UserPoints', UserPointsSchema);
