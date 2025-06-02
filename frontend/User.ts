import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'coordinator' | 'admin';
  avatar?: string;
  level?: number;
  points?: number;
  streak?: number;
  completedModules?: number;
  totalModules?: number;
  completedSimulations?: number;
  performanceData?: Array<{
    area: string;
    score: number;
  }>;
  engagementData?: Array<{
    date: Date;
    minutes: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'coordinator', 'admin'],
    default: 'student'
  },
  avatar: {
    type: String
  },
  level: {
    type: Number,
    default: 1
  },
  points: {
    type: Number,
    default: 0
  },
  streak: {
    type: Number,
    default: 0
  },
  completedModules: {
    type: Number,
    default: 0
  },
  totalModules: {
    type: Number,
    default: 0
  },
  completedSimulations: {
    type: Number,
    default: 0
  },
  performanceData: [{
    area: String,
    score: Number
  }],
  engagementData: [{
    date: Date,
    minutes: Number
  }]
}, {
  timestamps: true
});

// Método para comparar senha
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  // Em um ambiente real, usaríamos bcrypt.compare
  return this.password === candidatePassword;
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
