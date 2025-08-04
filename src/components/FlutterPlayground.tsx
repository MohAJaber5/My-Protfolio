import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, RotateCcw, Code2 } from 'lucide-react';

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
          child: ElevatedButton(
            onPressed: () {},
            child: Text('Click Me!'),
          ),
        ),
      ),
    );
  }
}`;

const codeSnippets = {
  'basic-button': {
    name: 'Basic Button',
    code: defaultCode
  },
  'column-widget': {
    name: 'Column Layout',
    code: `import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.flutter_dash, size: 64, color: Colors.blue),
              SizedBox(height: 16),
              Text('Flutter Demo', style: TextStyle(fontSize: 24)),
              SizedBox(height: 16),
              ElevatedButton(
                onPressed: () {},
                child: Text('Get Started'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}`
  },
  'listview': {
    name: 'ListView Example',
    code: `import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('ListView Demo')),
        body: ListView.builder(
          itemCount: 10,
          itemBuilder: (context, index) {
            return ListTile(
              leading: CircleAvatar(child: Text('\${index + 1}')),
              title: Text('Item \${index + 1}'),
              subtitle: Text('This is item number \${index + 1}'),
              trailing: Icon(Icons.arrow_forward_ios),
            );
          },
        ),
      ),
    );
  }
}`
  },
  'textfield': {
    name: 'TextField Controller',
    code: `import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatefulWidget {
  const MyApp({super.key});
  
  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final TextEditingController _controller = TextEditingController();
  String _displayText = '';
  
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('TextField Demo')),
        body: Padding(
          padding: EdgeInsets.all(16),
          child: Column(
            children: [
              TextField(
                controller: _controller,
                decoration: InputDecoration(
                  labelText: 'Enter your text',
                  border: OutlineInputBorder(),
                ),
              ),
              SizedBox(height: 16),
              ElevatedButton(
                onPressed: () {
                  setState(() {
                    _displayText = _controller.text;
                  });
                },
                child: Text('Update Text'),
              ),
              SizedBox(height: 16),
              Text('You typed: \$_displayText', 
                   style: TextStyle(fontSize: 18)),
            ],
          ),
        ),
      ),
    );
  }
}`
  }
};

const FlutterPlayground: React.FC = () => {
  const [code, setCode] = useState(defaultCode);
  const [selectedSnippet, setSelectedSnippet] = useState('basic-button');
  const [isRunning, setIsRunning] = useState(false);
  const [dartpadKey, setDartpadKey] = useState(0);
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
    // Force iframe reload with new code
    setDartpadKey(prev => prev + 1);
    setTimeout(() => setIsRunning(false), 1000);
  };

  const resetCode = () => {
    setCode(codeSnippets[selectedSnippet].code);
  };

  const handleSnippetChange = (snippetKey: string) => {
    setSelectedSnippet(snippetKey);
    setCode(codeSnippets[snippetKey].code);
  };

  // Encode code for DartPad URL
  const encodedCode = encodeURIComponent(code);
  const dartpadUrl = `https://dartpad.dev/embed-flutter.html?split=60&theme=dark&run=true&sample_id=${encodedCode}`;

  return (
    <section id="flutter-playground" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'hsl(var(--background))' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Code2 className="w-8 h-8" style={{ color: 'hsl(var(--primary))' }} />
            <h2 
              className="text-4xl md:text-5xl font-bold"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              Flutter Dev Playground
            </h2>
          </div>
          <p 
            className="text-xl max-w-3xl mx-auto"
            style={{ color: 'hsl(var(--muted-foreground))' }}
          >
            Experience Flutter development right in your browser. Write Dart code, 
            run it instantly, and see the results in real-time.
          </p>
        </div>

        <Card className="border-0 shadow-2xl" style={{ backgroundColor: 'hsl(var(--card))' }}>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <span style={{ color: 'hsl(var(--card-foreground))' }}>
                Interactive Flutter Editor
              </span>
              <div className="flex items-center gap-2">
                <Select value={selectedSnippet} onValueChange={handleSnippetChange}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select example" />
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
                <Button onClick={runCode} disabled={isRunning} size="sm">
                  <Play className="w-4 h-4 mr-2" />
                  {isRunning ? 'Running...' : 'Run'}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-2 gap-0 h-[600px]">
              {/* Code Editor */}
              <div className="border-r" style={{ borderColor: 'hsl(var(--border))' }}>
                <div 
                  className="px-4 py-2 text-sm font-medium border-b"
                  style={{ 
                    backgroundColor: 'hsl(var(--muted))', 
                    color: 'hsl(var(--muted-foreground))',
                    borderColor: 'hsl(var(--border))'
                  }}
                >
                  main.dart
                </div>
                <Editor
                  height="560px"
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
                  }}
                />
              </div>

              {/* Preview Panel */}
              <div className="flex flex-col">
                <div 
                  className="px-4 py-2 text-sm font-medium border-b"
                  style={{ 
                    backgroundColor: 'hsl(var(--muted))', 
                    color: 'hsl(var(--muted-foreground))',
                    borderColor: 'hsl(var(--border))'
                  }}
                >
                  Preview
                </div>
                <div className="flex-1 relative">
                  {isRunning && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center z-10"
                      style={{ backgroundColor: 'hsl(var(--background) / 0.8)' }}
                    >
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: 'hsl(var(--primary))' }}></div>
                    </div>
                  )}
                  <iframe
                    key={dartpadKey}
                    src="https://dartpad.dev/embed-flutter.html?theme=dark&run=true"
                    width="100%"
                    height="560px"
                    style={{ border: 'none' }}
                    title="Flutter Preview"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            {
              title: 'Live Code Editing',
              description: 'Write Dart code with syntax highlighting and intelligent code completion.',
              icon: '🔧'
            },
            {
              title: 'Instant Preview',
              description: 'See your Flutter widgets come to life in real-time with DartPad integration.',
              icon: '⚡'
            },
            {
              title: 'Pre-built Examples',
              description: 'Explore curated Flutter examples covering common UI patterns and widgets.',
              icon: '📚'
            }
          ].map((feature, index) => (
            <Card key={index} className="text-center p-6">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'hsl(var(--foreground))' }}>
                {feature.title}
              </h3>
              <p style={{ color: 'hsl(var(--muted-foreground))' }}>
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