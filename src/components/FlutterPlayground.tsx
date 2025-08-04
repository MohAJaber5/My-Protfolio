import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, RotateCcw, Code2, Smartphone, Tablet, Monitor } from 'lucide-react';
import * as THREE from 'three';

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

// 3D Scene Component
const Scene3D: React.FC<{ deviceType: string }> = ({ deviceType }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const phoneRef = useRef<THREE.Group>();
  const flutterLogosRef = useRef<THREE.Group[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(400, 400);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x00d4ff, 0.8, 10);
    pointLight1.position.set(-3, 2, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff0080, 0.8, 10);
    pointLight2.position.set(3, -2, 3);
    scene.add(pointLight2);

    // Create phone/device
    const phoneGroup = new THREE.Group();
    phoneRef.current = phoneGroup;

    // Device dimensions based on type
    let width = 0.8, height = 1.6, depth = 0.1;
    if (deviceType === 'tablet') {
      width = 1.5; height = 2; depth = 0.08;
    } else if (deviceType === 'desktop') {
      width = 2.5; height = 1.6; depth = 0.05;
    }

    // Phone body
    const bodyGeometry = new THREE.BoxGeometry(width, height, depth);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1a1a1a,
      shininess: 100 
    });
    const phoneBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    phoneBody.castShadow = true;
    phoneGroup.add(phoneBody);

    // Screen
    const screenGeometry = new THREE.BoxGeometry(width * 0.85, height * 0.8, depth + 0.01);
    const screenMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x000033,
      emissive: 0x001122 
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.y = 0.05;
    phoneGroup.add(screen);

    // App preview (simulated)
    const appGeometry = new THREE.BoxGeometry(width * 0.75, height * 0.6, depth + 0.02);
    const appMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4285f4,
      emissive: 0x1a4490 
    });
    const app = new THREE.Mesh(appGeometry, appMaterial);
    app.position.y = 0.05;
    app.position.z = 0.01;
    phoneGroup.add(app);

    scene.add(phoneGroup);

    // Create floating Flutter logos
    for (let i = 0; i < 6; i++) {
      const logoGroup = new THREE.Group();
      
      // Flutter logo geometry (simplified)
      const logoGeometry = new THREE.SphereGeometry(0.15, 8, 8);
      const logoMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x02569b,
        emissive: 0x001a33 
      });
      const logo = new THREE.Mesh(logoGeometry, logoMaterial);
      logoGroup.add(logo);
      
      // Position randomly around the phone
      logoGroup.position.set(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3
      );
      
      scene.add(logoGroup);
      flutterLogosRef.current.push(logoGroup);
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate phone
      if (phoneRef.current) {
        phoneRef.current.rotation.y += 0.01;
        phoneRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
      }

      // Animate floating logos
      flutterLogosRef.current.forEach((logo, index) => {
        logo.rotation.x += 0.02;
        logo.rotation.y += 0.03;
        logo.position.y += Math.sin(Date.now() * 0.002 + index) * 0.001;
        logo.position.x += Math.cos(Date.now() * 0.001 + index) * 0.001;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      if (phoneRef.current) {
        phoneRef.current.rotation.y = mouseX * 0.5;
        phoneRef.current.rotation.x = mouseY * 0.3;
      }
    };

    renderer.domElement.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [deviceType]);

  return <div ref={mountRef} className="w-full h-full flex justify-center items-center" />;
};

const FlutterPlayground: React.FC = () => {
  const [code, setCode] = useState(defaultCode);
  const [selectedSnippet, setSelectedSnippet] = useState('modern-ui');
  const [deviceType, setDeviceType] = useState('phone');
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
    setTimeout(() => setIsRunning(false), 2000);
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
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
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
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
            <Code2 className="w-6 h-6 text-primary" />
            <span className="text-primary font-medium">Interactive Experience</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6">
            Flutter 3D Playground
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the future of Flutter development with our immersive 3D code playground. 
            Write Dart code and watch it come alive in stunning 3D device simulations.
          </p>
        </div>

        {/* Main Playground */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Code Editor */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-2xl bg-card/50 backdrop-blur-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-card-foreground flex items-center gap-2">
                    <Code2 className="w-5 h-5" />
                    Flutter Code Editor
                  </span>
                  <div className="flex items-center gap-2">
                    <Select value={selectedSnippet} onValueChange={handleSnippetChange}>
                      <SelectTrigger className="w-52">
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
                    <Button onClick={resetCode} variant="outline" size="sm">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                    <Button onClick={runCode} disabled={isRunning} className="bg-primary hover:bg-primary/90">
                      <Play className="w-4 h-4 mr-2" />
                      {isRunning ? 'Running...' : 'Run'}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[500px]">
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
                      fontFamily: 'JetBrains Mono, Consolas, monospace',
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 3D Device Simulator */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-2xl bg-card/50 backdrop-blur-xl h-full">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-card-foreground">3D Device Preview</span>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant={deviceType === 'phone' ? 'default' : 'outline'}
                      onClick={() => setDeviceType('phone')}
                    >
                      <Smartphone className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={deviceType === 'tablet' ? 'default' : 'outline'}
                      onClick={() => setDeviceType('tablet')}
                    >
                      <Tablet className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={deviceType === 'desktop' ? 'default' : 'outline'}
                      onClick={() => setDeviceType('desktop')}
                    >
                      <Monitor className="w-4 h-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-[440px] rounded-lg overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
                  <Scene3D deviceType={deviceType} />
                </div>
                <p className="text-sm text-muted-foreground mt-3 text-center">
                  🖱️ Move your mouse to interact with the 3D device
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              title: '3D Device Simulation',
              description: 'Interactive 3D phones, tablets, and desktops with realistic lighting',
              icon: '📱',
              gradient: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Real-time Code Execution',
              description: 'See your Flutter code changes instantly with live preview',
              icon: '⚡',
              gradient: 'from-purple-500 to-pink-500'
            },
            {
              title: 'Advanced Examples',
              description: 'Curated Flutter templates for modern app development',
              icon: '🎨',
              gradient: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Interactive Experience',
              description: 'Mouse controls, animations, and immersive 3D environment',
              icon: '🎮',
              gradient: 'from-orange-500 to-red-500'
            }
          ].map((feature, index) => (
            <Card 
              key={index} 
              className="text-center p-6 border-0 bg-card/30 backdrop-blur-xl hover:bg-card/50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <div className={`inline-block bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                <h3 className="text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlutterPlayground;