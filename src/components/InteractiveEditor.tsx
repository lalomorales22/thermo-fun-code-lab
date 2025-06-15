
import React, { useState } from 'react';
import { Play, RotateCcw, Code } from 'lucide-react';

interface InteractiveEditorProps {
  initialCode: string;
  title: string;
}

export const InteractiveEditor: React.FC<InteractiveEditorProps> = ({
  initialCode,
  title
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    // Simulate code execution with thermodynamic calculations
    setTimeout(() => {
      const result = simulateThermodynamicCalculation(code);
      setOutput(result);
      setIsRunning(false);
    }, 1000);
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
  };

  const simulateThermodynamicCalculation = (code: string) => {
    // Simple simulation based on code content
    if (code.includes('heat_transfer')) {
      return `Heat Transfer Calculation:
Temperature Gradient: 45.2°C/m
Heat Flux: 1250 W/m²
Thermal Conductivity: 0.8 W/m·K
Convection Coefficient: 25 W/m²·K

Simulation completed successfully!`;
    }
    return 'Code executed successfully! Results will appear here.';
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
      <div className="bg-gray-800/50 px-6 py-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Code className="h-5 w-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={resetCode}
              className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={runCode}
              disabled={isRunning}
              className="bg-green-600 hover:bg-green-500 disabled:bg-green-800 text-white px-4 py-1 rounded transition-colors flex items-center space-x-2"
            >
              <Play className="h-4 w-4" />
              <span>{isRunning ? 'Running...' : 'Run'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Code Editor */}
        <div className="p-4">
          <h4 className="text-cyan-300 font-medium mb-2">Code Editor</h4>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 bg-gray-900 text-green-400 font-mono text-sm p-4 rounded border border-gray-700 focus:border-cyan-500 focus:outline-none resize-none"
            placeholder="Enter your thermodynamic computing code here..."
          />
        </div>

        {/* Output */}
        <div className="p-4 border-l border-white/10">
          <h4 className="text-cyan-300 font-medium mb-2">Output</h4>
          <div className="bg-gray-900 text-gray-300 font-mono text-sm p-4 rounded h-64 overflow-y-auto">
            {output || 'Run your code to see the output here...'}
          </div>
        </div>
      </div>
    </div>
  );
};
