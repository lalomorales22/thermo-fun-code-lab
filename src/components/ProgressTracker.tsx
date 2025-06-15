
import React from 'react';
import { Trophy, Star } from 'lucide-react';

interface ProgressTrackerProps {
  totalModules: number;
  completedModules: number;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  totalModules,
  completedModules
}) => {
  const progressPercentage = (completedModules / totalModules) * 100;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
          <Trophy className="h-6 w-6 text-yellow-400" />
          <span>Course Progress</span>
        </h3>
        <div className="flex items-center space-x-1">
          <Star className="h-5 w-5 text-yellow-400" />
          <span className="text-yellow-400 font-bold">{completedModules}/{totalModules}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="text-center">
          <p className="text-cyan-300 text-lg font-semibold">
            {progressPercentage.toFixed(0)}% Complete
          </p>
          <p className="text-gray-400 text-sm">
            {totalModules - completedModules} modules remaining
          </p>
        </div>

        {progressPercentage >= 100 && (
          <div className="text-center p-4 bg-green-500/20 rounded-lg border border-green-400">
            <p className="text-green-400 font-bold">🎉 Congratulations!</p>
            <p className="text-green-300 text-sm">You've completed the course!</p>
          </div>
        )}
      </div>
    </div>
  );
};
