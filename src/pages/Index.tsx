import React, { useState } from 'react';
import { CourseHeader } from '@/components/CourseHeader';
import { ModuleCard } from '@/components/ModuleCard';
import { InteractiveEditor } from '@/components/InteractiveEditor';
import { HeatTransferViz } from '@/components/HeatTransferViz';
import { ProgressTracker } from '@/components/ProgressTracker';
import { AIAssistant } from '@/components/AIAssistant';
import { courseModules } from '@/data/courseData';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [selectedModule, setSelectedModule] = useState(courseModules[0]);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  const handleModuleComplete = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900">
      <CourseHeader />
      
      {/* AI Assistant Toggle Button */}
      <div className="fixed top-20 right-4 z-40">
        <Button
          onClick={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
          className={`bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg transition-all duration-300 ${
            isAIAssistantOpen ? 'translate-x-[-384px]' : ''
          }`}
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          AI Assistant
        </Button>
      </div>
      
      <div className={`container mx-auto px-4 py-8 transition-all duration-300 ${
        isAIAssistantOpen ? 'mr-96' : ''
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Modules Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <ProgressTracker 
              totalModules={courseModules.length}
              completedModules={completedModules.length}
            />
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4">Course Modules</h2>
              {courseModules.map((module) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  isSelected={selectedModule.id === module.id}
                  isCompleted={completedModules.includes(module.id)}
                  onClick={() => setSelectedModule(module)}
                />
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Module Content */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h1 className="text-3xl font-bold text-white mb-4">{selectedModule.title}</h1>
              <p className="text-cyan-100 text-lg mb-6">{selectedModule.description}</p>
              
              <div className="space-y-6">
                {selectedModule.concepts.map((concept, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-cyan-300 mb-2">{concept.title}</h3>
                    <p className="text-gray-300 mb-4">{concept.explanation}</p>
                    {concept.formula && (
                      <div className="bg-slate-800 rounded p-3 font-mono text-green-400">
                        {concept.formula}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => handleModuleComplete(selectedModule.id)}
                className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-105"
              >
                Mark as Complete
              </button>
            </div>

            {/* Interactive Visualization */}
            {selectedModule.hasVisualization && (
              <HeatTransferViz moduleId={selectedModule.id} />
            )}

            {/* Interactive Code Editor */}
            {selectedModule.hasCodeExample && (
              <InteractiveEditor 
                initialCode={selectedModule.codeExample || ''}
                title={`${selectedModule.title} - Code Example`}
              />
            )}
          </div>
        </div>
      </div>

      {/* AI Assistant Sidebar */}
      <AIAssistant 
        isOpen={isAIAssistantOpen} 
        onClose={() => setIsAIAssistantOpen(false)} 
      />
    </div>
  );
};

export default Index;
