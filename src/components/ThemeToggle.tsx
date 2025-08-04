import React, { useState } from 'react';
import { useTheme, ColorScheme, colorSchemes } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { Moon, Sun, Palette, Settings } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, colorScheme, toggleTheme, setColorScheme } = useTheme();
  const [showCustomizer, setShowCustomizer] = useState(false);

  const colorOptions: { scheme: ColorScheme; name: string; colors: string[] }[] = [
    { scheme: 'default', name: 'Orange', colors: ['#f97316', '#eab308'] },
    { scheme: 'blue', name: 'Blue', colors: ['#3b82f6', '#0ea5e9'] },
    { scheme: 'purple', name: 'Purple', colors: ['#8b5cf6', '#a855f7'] },
    { scheme: 'green', name: 'Green', colors: ['#10b981', '#22c55e'] },
    { scheme: 'red', name: 'Red', colors: ['#ef4444', '#f97316'] },
    { scheme: 'orange', name: 'Amber', colors: ['#f59e0b', '#f97316'] }
  ];

  return (
    <div className="fixed top-20 right-4 z-50">
      {/* Theme Toggle Button */}
      <div className="flex flex-col space-y-2">
        <button
          onClick={toggleTheme}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
            "bg-background/80 backdrop-blur-md border border-border",
            "hover:bg-background/90 hover:scale-110",
            "shadow-lg"
          )}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-primary" />
          ) : (
            <Moon className="w-5 h-5 text-primary" />
          )}
        </button>

        {/* Customizer Toggle */}
        <button
          onClick={() => setShowCustomizer(!showCustomizer)}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
            "bg-background/80 backdrop-blur-md border border-border",
            "hover:bg-background/90 hover:scale-110",
            "shadow-lg",
            showCustomizer && "bg-primary/20 border-primary/50"
          )}
          aria-label="Customize theme"
        >
          <Palette className="w-5 h-5 text-primary" />
        </button>
      </div>

      {/* Customizer Panel */}
      {showCustomizer && (
        <div className={cn(
          "absolute top-0 right-16 w-72 rounded-lg transition-all duration-300",
          "bg-background/90 backdrop-blur-md border border-border shadow-2xl",
          "p-6"
        )}>
          <div className="flex items-center space-x-2 mb-4">
            <Settings className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Customize Theme</h3>
          </div>

          {/* Theme Mode */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-muted-foreground mb-3">
              Theme Mode
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => theme !== 'light' && toggleTheme()}
                className={cn(
                  "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200",
                  theme === 'light'
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                )}
              >
                <Sun className="w-4 h-4 inline mr-2" />
                Light
              </button>
              <button
                onClick={() => theme !== 'dark' && toggleTheme()}
                className={cn(
                  "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200",
                  theme === 'dark'
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                )}
              >
                <Moon className="w-4 h-4 inline mr-2" />
                Dark
              </button>
            </div>
          </div>

          {/* Color Schemes */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-3">
              Color Scheme
            </label>
            <div className="grid grid-cols-2 gap-2">
              {colorOptions.map((option) => (
                <button
                  key={option.scheme}
                  onClick={() => setColorScheme(option.scheme)}
                  className={cn(
                    "p-3 rounded-lg text-left transition-all duration-200",
                    "border-2",
                    colorScheme === option.scheme
                      ? "border-primary bg-primary/10"
                      : "border-border bg-muted/30 hover:bg-muted/50 hover:border-border/50"
                  )}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex space-x-1">
                      {option.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-xs font-medium text-foreground">
                    {option.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setShowCustomizer(false)}
            className="w-full mt-4 py-2 px-4 bg-muted/30 border border-border rounded-lg text-sm text-muted-foreground hover:bg-muted/50 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;