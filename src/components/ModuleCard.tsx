
import React from 'react';
import { CheckCircle, PlayCircle, Clock } from 'lucide-react';
import { CourseModule } from '@/types/course';

interface ModuleCardProps {
  module: CourseModule;
  isSelected: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  isSelected,
  isCompleted,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-lg border transition-all duration-300 hover:scale-105 ${
        isSelected
          ? 'bg-cyan-500/20 border-cyan-400'
          : 'bg-white/10 border-white/20 hover:bg-white/15'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">{module.title}</h3>
        {isCompleted ? (
          <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
        ) : (
          <PlayCircle className="h-6 w-6 text-cyan-400 flex-shrink-0" />
        )}
      </div>
      
      <p className="text-gray-300 text-sm mb-3">{module.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-cyan-300">
          <Clock className="h-4 w-4" />
          <span className="text-sm">{module.duration}</span>
        </div>
        <span className="text-xs text-gray-400">
          {module.difficulty}
        </span>
      </div>
    </div>
  );
};
