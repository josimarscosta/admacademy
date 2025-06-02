import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AchievementCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  id,
  title,
  description,
  icon,
  unlocked,
  date
}) => {
  return (
    <div className={`achievement-card ${!unlocked ? 'achievement-locked' : ''}`}>
      <div className="achievement-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {unlocked && date && <div className="achievement-date">Conquistado em: {date}</div>}
    </div>
  );
};

interface AchievementsProps {
  achievements: AchievementCardProps[];
}

const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  const navigate = useNavigate();
  
  return (
    <div className="achievements-container">
      <div className="achievements-header">
        <h2>Suas Conquistas</h2>
        <button 
          className="btn-secondary"
          onClick={() => navigate('/achievements')}
        >
          Ver todas
        </button>
      </div>
      <div className="achievements-grid">
        {achievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            id={achievement.id}
            title={achievement.title}
            description={achievement.description}
            icon={achievement.icon}
            unlocked={achievement.unlocked}
            date={achievement.date}
          />
        ))}
      </div>
    </div>
  );
};

export default Achievements;
