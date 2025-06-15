
import React, { useState, useEffect } from 'react';
import { TrendingUp, Thermometer, Zap } from 'lucide-react';

interface HeatTransferVizProps {
  moduleId: string;
}

export const HeatTransferViz: React.FC<HeatTransferVizProps> = ({ moduleId }) => {
  const [temperature, setTemperature] = useState(25);
  const [heatFlux, setHeatFlux] = useState(100);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setTemperature(prev => Math.min(prev + 2, 150));
        setHeatFlux(prev => Math.min(prev + 10, 500));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isAnimating]);

  const resetAnimation = () => {
    setTemperature(25);
    setHeatFlux(100);
    setIsAnimating(false);
  };

  const startAnimation = () => {
    resetAnimation();
    setTimeout(() => setIsAnimating(true), 100);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-cyan-400" />
          <span>Heat Transfer Visualization</span>
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={startAnimation}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded transition-colors"
          >
            Start Simulation
          </button>
          <button
            onClick={resetAnimation}
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Temperature Visualization */}
        <div className="space-y-4">
          <h4 className="text-cyan-300 font-medium flex items-center space-x-2">
            <Thermometer className="h-5 w-5" />
            <span>Temperature Distribution</span>
          </h4>
          
          <div className="relative h-48 bg-gradient-to-r from-blue-600 via-yellow-500 to-red-600 rounded-lg overflow-hidden">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-blue-800 to-transparent transition-all duration-1000"
              style={{ 
                width: `${Math.max(0, 100 - (temperature / 150) * 100)}%`,
                opacity: 0.8 
              }}
            />
            <div className="absolute top-4 left-4 text-white font-bold">
              {temperature.toFixed(1)}°C
            </div>
            <div className="absolute bottom-4 right-4 text-white text-sm">
              Hot Side
            </div>
            <div className="absolute bottom-4 left-4 text-white text-sm">
              Cold Side
            </div>
          </div>
        </div>

        {/* Heat Flux Visualization */}
        <div className="space-y-4">
          <h4 className="text-cyan-300 font-medium flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Heat Flux</span>
          </h4>
          
          <div className="relative h-48 bg-gray-800 rounded-lg p-4">
            <div className="h-full flex items-end">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className="flex-1 mx-1 bg-gradient-to-t from-cyan-500 to-blue-400 rounded-t transition-all duration-300"
                  style={{
                    height: `${(heatFlux / 500) * 100 * (0.5 + Math.random() * 0.5)}%`,
                    animationDelay: `${i * 50}ms`
                  }}
                />
              ))}
            </div>
            <div className="absolute top-4 right-4 text-cyan-300 font-bold">
              {heatFlux.toFixed(0)} W/m²
            </div>
          </div>
        </div>
      </div>

      {/* Calculation Results */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 rounded-lg p-4">
          <h5 className="text-cyan-400 font-medium mb-2">Thermal Conductivity</h5>
          <p className="text-white text-lg font-bold">{(heatFlux / temperature * 0.1).toFixed(2)} W/m·K</p>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <h5 className="text-cyan-400 font-medium mb-2">Reynolds Number</h5>
          <p className="text-white text-lg font-bold">{(temperature * 100).toFixed(0)}</p>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <h5 className="text-cyan-400 font-medium mb-2">Nusselt Number</h5>
          <p className="text-white text-lg font-bold">{(Math.sqrt(temperature * heatFlux) / 10).toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
};
