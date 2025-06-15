
import React from 'react';
import { Thermometer, Cpu, BookOpen } from 'lucide-react';

export const CourseHeader = () => {
  return (
    <header className="bg-gradient-to-r from-blue-800 to-cyan-700 border-b border-cyan-500/30">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Thermometer className="h-8 w-8 text-cyan-300" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Thermodynamic Computing</h1>
              <p className="text-cyan-200">Interactive Engineering Course</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-cyan-100">
              <Cpu className="h-5 w-5" />
              <span>Advanced Engineering</span>
            </div>
            <div className="flex items-center space-x-2 text-cyan-100">
              <BookOpen className="h-5 w-5" />
              <span>12 Modules</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
