import React, { useEffect, useState } from 'react';
import { Smartphone, Layers, Zap, Heart, Star, Settings } from 'lucide-react';

interface FlutterAppProps {
  codeContent: string;
  isRunning: boolean;
  deviceType: 'phone' | 'tablet' | 'desktop';
}

const FlutterApp: React.FC<FlutterAppProps> = ({ codeContent, isRunning, deviceType }) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (isRunning) {
      setAnimating(true);
      const timer = setTimeout(() => setAnimating(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isRunning]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getAppContent = () => {
    if (codeContent.includes('Dashboard') || codeContent.includes('dashboard')) {
      return <DashboardScreen deviceType={deviceType} animating={animating} />;
    } else if (codeContent.includes('ListView') || codeContent.includes('SliverList')) {
      return <ListScreen deviceType={deviceType} animating={animating} />;
    } else if (codeContent.includes('Column') || codeContent.includes('mainAxisAlignment')) {
      return <ModernUIScreen deviceType={deviceType} animating={animating} />;
    }
    return <DefaultScreen deviceType={deviceType} animating={animating} />;
  };

  const containerClass = `
    ${deviceType === 'phone' ? 'w-80 h-[600px]' : 
      deviceType === 'tablet' ? 'w-96 h-[500px]' : 
      'w-[600px] h-[400px]'}
    bg-gradient-to-br from-blue-50 to-purple-50 
    relative overflow-hidden rounded-lg shadow-2xl
    ${animating ? 'animate-pulse' : ''}
  `;

  return (
    <div className={containerClass}>
      {/* Status Bar (for mobile devices) */}
      {(deviceType === 'phone' || deviceType === 'tablet') && (
        <div className="w-full h-8 bg-black/90 flex items-center justify-between px-4 text-white text-xs">
          <span className="flex items-center gap-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            <span className="ml-1">Flutter</span>
          </span>
          <span>9:41 AM</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2 border border-white rounded-sm">
              <div className="w-3 h-1 bg-green-400 rounded-sm m-0.5"></div>
            </div>
          </div>
        </div>
      )}
      
      {/* App Content */}
      <div className="flex-1 relative">
        {getAppContent()}
        
        {/* Loading Overlay */}
        {isRunning && (
          <div className="absolute inset-0 bg-blue-600/90 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-3"></div>
              <div className="text-sm font-medium">Building Flutter App...</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DefaultScreen: React.FC<{ deviceType: string; animating: boolean }> = ({ deviceType, animating }) => (
  <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className={`mb-6 transform transition-all duration-500 ${animating ? 'scale-110 rotate-12' : 'scale-100'}`}>
      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
        <Smartphone className="w-10 h-10 text-white" />
      </div>
    </div>
    <h1 className="text-2xl font-bold text-gray-800 mb-3 text-center">Flutter Magic!</h1>
    <p className="text-gray-600 text-center mb-6 leading-relaxed">
      Experience the power of Flutter development
    </p>
    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium shadow-lg transform transition-all hover:scale-105">
      Experience Flutter
    </button>
    
    {/* Stats */}
    <div className="mt-8 flex gap-6">
      <div className="text-center">
        <div className="text-xl font-bold text-blue-600">2+</div>
        <div className="text-xs text-gray-500">Years</div>
      </div>
      <div className="text-center">
        <div className="text-xl font-bold text-blue-600">15+</div>
        <div className="text-xs text-gray-500">Projects</div>
      </div>
      <div className="text-center">
        <div className="text-xl font-bold text-blue-600">2</div>
        <div className="text-xs text-gray-500">Awards</div>
      </div>
    </div>
  </div>
);

const DashboardScreen: React.FC<{ deviceType: string; animating: boolean }> = ({ deviceType, animating }) => (
  <div className="h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
    {/* Header */}
    <div className="p-4 flex items-center gap-3">
      <div className={`w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center transform transition-all duration-500 ${animating ? 'rotate-180' : ''}`}>
        <Layers className="w-5 h-5" />
      </div>
      <h1 className="text-xl font-bold">Dashboard</h1>
    </div>
    
    {/* Grid */}
    <div className="grid grid-cols-2 gap-4 p-4">
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">24.5K</div>
            <div className="text-green-100 text-sm">Analytics</div>
          </div>
          <Zap className="w-8 h-8 text-green-100" />
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">1.2K</div>
            <div className="text-blue-100 text-sm">Users</div>
          </div>
          <Heart className="w-8 h-8 text-blue-100" />
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">$12.4K</div>
            <div className="text-orange-100 text-sm">Revenue</div>
          </div>
          <Star className="w-8 h-8 text-orange-100" />
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">89%</div>
            <div className="text-purple-100 text-sm">Growth</div>
          </div>
          <Settings className="w-8 h-8 text-purple-100" />
        </div>
      </div>
    </div>
  </div>
);

const ListScreen: React.FC<{ deviceType: string; animating: boolean }> = ({ deviceType, animating }) => (
  <div className="h-full bg-gray-900 text-white">
    {/* App Bar */}
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
      <h1 className="text-xl font-bold">Animated List</h1>
    </div>
    
    {/* List Items */}
    <div className="flex-1 overflow-hidden">
      {[...Array(8)].map((_, index) => (
        <div 
          key={index}
          className={`flex items-center p-4 border-b border-gray-700 bg-gray-800 mx-2 my-1 rounded-lg transform transition-all duration-300 ${animating ? 'translate-x-2' : ''}`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${
            ['from-red-400 to-pink-400', 'from-blue-400 to-cyan-400', 'from-green-400 to-emerald-400', 'from-yellow-400 to-orange-400'][index % 4]
          } flex items-center justify-center text-white font-bold mr-3`}>
            {index + 1}
          </div>
          <div className="flex-1">
            <div className="font-medium">Animated Item {index + 1}</div>
            <div className="text-gray-400 text-sm">Smooth scrolling experience</div>
          </div>
          <Star className="w-5 h-5 text-yellow-400" />
        </div>
      ))}
    </div>
  </div>
);

const ModernUIScreen: React.FC<{ deviceType: string; animating: boolean }> = ({ deviceType, animating }) => (
  <div className="h-full bg-gradient-to-br from-slate-100 to-blue-50 flex flex-col items-center justify-center p-6">
    <div className={`mb-6 transform transition-all duration-700 ${animating ? 'scale-110 rotate-6' : 'scale-100'}`}>
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
        <Layers className="w-8 h-8 text-white" />
      </div>
    </div>
    
    <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Flutter Demo</h1>
    <p className="text-gray-600 text-center mb-6">Beautiful cross-platform apps</p>
    
    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-medium shadow-lg transform transition-all hover:scale-105 mb-6">
      Get Started
    </button>
    
    {/* Feature Cards */}
    <div className="grid grid-cols-1 gap-3 w-full max-w-sm">
      <div className="bg-white/80 backdrop-blur p-3 rounded-lg shadow-sm flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          <Zap className="w-4 h-4 text-blue-600" />
        </div>
        <span className="text-gray-700 text-sm font-medium">Fast Development</span>
      </div>
      
      <div className="bg-white/80 backdrop-blur p-3 rounded-lg shadow-sm flex items-center gap-3">
        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
          <Heart className="w-4 h-4 text-purple-600" />
        </div>
        <span className="text-gray-700 text-sm font-medium">Great Performance</span>
      </div>
    </div>
  </div>
);

export default FlutterApp;