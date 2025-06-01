import React from 'react';

interface ProgressBarProps {
  progress: number;
  height?: number;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 10,
  color = '#1e40af',
  backgroundColor = '#e5e7eb',
  showPercentage = true
}) => {
  // Garantir que o progresso esteja entre 0 e 100
  const validProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className="progress-bar-container" style={{ 
      height: `${height}px`, 
      backgroundColor,
      borderRadius: `${height / 2}px`,
      overflow: 'hidden',
      position: 'relative'
    }}>
      <div className="progress-bar-fill" style={{ 
        width: `${validProgress}%`, 
        height: '100%', 
        backgroundColor: color,
        transition: 'width 0.5s ease-in-out'
      }} />
      
      {showPercentage && (
        <div className="progress-bar-text" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: validProgress > 50 ? '#ffffff' : '#1f2937',
          fontSize: `${height * 0.8}px`,
          fontWeight: 'bold'
        }}>
          {validProgress}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
