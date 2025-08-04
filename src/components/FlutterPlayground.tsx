import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, RotateCcw, Code2, Smartphone, Tablet, Monitor, Sparkles } from 'lucide-react';
import DeviceSimulator from './3d/DeviceSimulator';

const defaultCode = `import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.blueGrey[50],
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 100,
                height: 100,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Colors.blue, Colors.purple],
                  ),
                  borderRadius: BorderRadius.circular(50),
                ),
                child: Icon(Icons.flutter_dash, size: 50, color: Colors.white),
              ),
              SizedBox(height: 20),
              Text('Flutter Magic!', 
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
              SizedBox(height: 16),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue,
                  padding: EdgeInsets.symmetric(horizontal: 30, vertical: 15),
                ),
                onPressed: () {},
                child: Text('Experience Flutter', 
                  style: TextStyle(color: Colors.white)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}`;

const codeSnippets = {
  'modern-ui': {
    name: '🎨 Modern UI Design',
    code: defaultCode
  },
  'animated-list': {
    name: '🌟 Animated ListView',
    code: `import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData.dark(),
      home: Scaffold(
        body: CustomScrollView(
          slivers: [
            SliverAppBar(
              expandedHeight: 200,
              flexibleSpace: FlexibleSpaceBar(
                title: Text('Animated Cards'),
                background: Container(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [Colors.purple, Colors.blue],
                    ),
                  ),
                ),
              ),
            ),
            SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  return Container(
                    margin: EdgeInsets.all(8),
                    child: Card(
                      elevation: 8,
                      child: ListTile(
                        leading: CircleAvatar(
                          backgroundColor: Colors.primaries[index % Colors.primaries.length],
                          child: Text('\${index + 1}'),
                        ),
                        title: Text('Animated Item \${index + 1}'),
                        subtitle: Text('Smooth scrolling experience'),
                        trailing: Icon(Icons.star, color: Colors.amber),
                      ),
                    ),
                  );
                },
                childCount: 20,
              ),
            ),
          ],
        ),
      ),
    );
  }
}`
  },
  'interactive-dashboard': {
    name: '📊 Interactive Dashboard',
    code: `import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatefulWidget {
  const MyApp({super.key});
  
  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> with TickerProviderStateMixin {
  late AnimationController _controller;
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(seconds: 2),
      vsync: this,
    )..repeat();
  }
  
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData.dark(),
      home: Scaffold(
        body: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [Colors.indigo[900]!, Colors.purple[900]!],
            ),
          ),
          child: SafeArea(
            child: Column(
              children: [
                Padding(
                  padding: EdgeInsets.all(20),
                  child: Row(
                    children: [
                      RotationTransition(
                        turns: _controller,
                        child: Container(
                          width: 50,
                          height: 50,
                          decoration: BoxDecoration(
                            gradient: LinearGradient(colors: [Colors.cyan, Colors.blue]),
                            shape: BoxShape.circle,
                          ),
                          child: Icon(Icons.dashboard, color: Colors.white),
                        ),
                      ),
                      SizedBox(width: 15),
                      Text('Dashboard', style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),
                    ],
                  ),
                ),
                Expanded(
                  child: GridView.count(
                    crossAxisCount: 2,
                    padding: EdgeInsets.all(20),
                    children: [
                      _buildCard('Analytics', Icons.analytics, Colors.green),
                      _buildCard('Users', Icons.people, Colors.blue),
                      _buildCard('Revenue', Icons.monetization_on, Colors.orange),
                      _buildCard('Growth', Icons.trending_up, Colors.purple),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
  
  Widget _buildCard(String title, IconData icon, Color color) {
    return Card(
      elevation: 10,
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          gradient: LinearGradient(
            colors: [color.withOpacity(0.8), color],
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 48, color: Colors.white),
            SizedBox(height: 10),
            Text(title, style: TextStyle(fontSize: 18, color: Colors.white, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }
}`
  }
};

// 3D Scene Component - Replaced with DeviceSimulator

const FlutterPlayground: React.FC = () => {
  const [code, setCode] = useState(defaultCode);
  const [selectedSnippet, setSelectedSnippet] = useState('modern-ui');
  const [deviceType, setDeviceType] = useState<'phone' | 'tablet' | 'desktop'>('phone');
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Configure Dart language support
    monaco.languages.register({ id: 'dart' });
    monaco.languages.setLanguageConfiguration('dart', {
      brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')'],
      ],
      autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
    });
  };

  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 3000);
  };

  const resetCode = () => {
    setCode(codeSnippets[selectedSnippet].code);
  };

  const handleSnippetChange = (snippetKey: string) => {
    setSelectedSnippet(snippetKey);
    setCode(codeSnippets[snippetKey].code);
  };

  return (
    <section id="flutter-playground" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <Code2 className="w-6 h-6 text-primary" />
            <span className="text-primary font-medium">Advanced 3D Experience</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6">
            Flutter 3D Studio
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The most advanced Flutter development playground with photorealistic 3D device simulations. 
            Write code and watch it come alive on authentic device models with real-time rendering.
          </p>
        </div>

        {/* Main Playground */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Code Editor */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-2xl bg-card/50 backdrop-blur-xl overflow-hidden">
              <CardHeader className="pb-4 bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-card-foreground flex items-center gap-2">
                    <Code2 className="w-5 h-5" />
                    Professional Flutter Editor
                  </span>
                  <div className="flex items-center gap-2">
                    <Select value={selectedSnippet} onValueChange={handleSnippetChange}>
                      <SelectTrigger className="w-52 bg-background/50 backdrop-blur">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(codeSnippets).map(([key, snippet]) => (
                          <SelectItem key={key} value={key}>
                            {snippet.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={resetCode} variant="outline" size="sm" className="bg-background/50 backdrop-blur">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                    <Button onClick={runCode} disabled={isRunning} className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                      <Play className="w-4 h-4 mr-2" />
                      {isRunning ? 'Compiling...' : 'Run'}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[500px] relative">
                  <Editor
                    height="500px"
                    defaultLanguage="dart"
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    onMount={handleEditorDidMount}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      roundedSelection: false,
                      scrollBeyondLastLine: false,
                      readOnly: false,
                      automaticLayout: true,
                      tabSize: 2,
                      wordWrap: 'on',
                      fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
                      fontLigatures: true,
                      cursorBlinking: 'smooth',
                      renderLineHighlight: 'gutter',
                      bracketPairColorization: { enabled: true },
                    }}
                  />
                  {isRunning && (
                    <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-primary text-center">
                        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-2"></div>
                        <div className="text-sm font-medium">Compiling Flutter code...</div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Advanced 3D Device Simulator */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-2xl bg-card/50 backdrop-blur-xl h-full overflow-hidden">
              <CardHeader className="pb-4 bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-card-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    3D Device Studio
                  </span>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant={deviceType === 'phone' ? 'default' : 'outline'}
                      onClick={() => setDeviceType('phone')}
                      className={deviceType === 'phone' ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-background/50'}
                    >
                      <Smartphone className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={deviceType === 'tablet' ? 'default' : 'outline'}
                      onClick={() => setDeviceType('tablet')}
                      className={deviceType === 'tablet' ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-background/50'}
                    >
                      <Tablet className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={deviceType === 'desktop' ? 'default' : 'outline'}
                      onClick={() => setDeviceType('desktop')}
                      className={deviceType === 'desktop' ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-background/50'}
                    >
                      <Monitor className="w-4 h-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <DeviceSimulator 
                  deviceType={deviceType} 
                  codeContent={code} 
                  isRunning={isRunning} 
                />
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-muted-foreground text-center">
                    🎮 <strong>Interactive Controls:</strong>
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1 bg-muted/30 rounded-lg p-3">
                    <div>• <strong>Mouse:</strong> Rotate and explore the device</div>
                    <div>• <strong>Scroll:</strong> Zoom in/out for detail view</div>
                    <div>• <strong>Auto-rotate:</strong> Pauses when interacting</div>
                    <div>• <strong>Real-time:</strong> App updates with your code</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              title: 'Photorealistic Devices',
              description: 'Ultra-realistic 3D models with authentic materials, shadows, and lighting',
              icon: '📱',
              gradient: 'from-blue-500 via-blue-600 to-cyan-500',
              features: ['Realistic bezels', 'Material physics', 'Dynamic shadows']
            },
            {
              title: 'Real-time App Simulation',
              description: 'Live Flutter app rendering that responds to your code changes instantly',
              icon: '⚡',
              gradient: 'from-purple-500 via-purple-600 to-pink-500',
              features: ['Live updates', 'Code analysis', 'Performance metrics']
            },
            {
              title: 'Professional Templates',
              description: 'Industry-standard Flutter patterns and modern UI components',
              icon: '🎨',
              gradient: 'from-green-500 via-green-600 to-emerald-500',
              features: ['Modern designs', 'Best practices', 'Production ready']
            },
            {
              title: 'Interactive 3D Environment',
              description: 'Immersive development experience with advanced 3D controls',
              icon: '🎮',
              gradient: 'from-orange-500 via-orange-600 to-red-500',
              features: ['Mouse controls', 'Auto-rotation', 'Multiple angles']
            }
          ].map((feature, index) => (
            <Card 
              key={index} 
              className="text-center p-6 border-0 bg-card/30 backdrop-blur-xl hover:bg-card/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl group relative overflow-hidden"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative z-10">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <div className={`inline-block bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                  <h3 className="text-lg font-semibold mb-3">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                {/* Feature list */}
                <div className="space-y-1">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <div className="w-1 h-1 bg-primary rounded-full" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Performance Stats */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-card/30 backdrop-blur-xl rounded-full border border-border/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">60 FPS</div>
              <div className="text-xs text-muted-foreground">Smooth Rendering</div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">WebGL</div>
              <div className="text-xs text-muted-foreground">Hardware Accelerated</div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">Real-time</div>
              <div className="text-xs text-muted-foreground">Live Updates</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlutterPlayground;