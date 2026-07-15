import React, { useState, useEffect } from 'react';
import { Box, Text, useInput, useStdout } from 'ink';
import Gradient from 'ink-gradient';
import { getAllSystems } from '../reader/system-reader.js';

// ─── Types ──────────────────────────────────────────────────────────

type DashboardTab = 'BUILD' | 'QUIZ' | 'DOCTOR' | 'RESOURCES';

interface DashboardProps {
  onNavigate: (command: string, args?: string) => void;
}

// ─── Main Dashboard ─────────────────────────────────────────────────

export function Dashboard({ onNavigate }: DashboardProps) {
  const { stdout } = useStdout();
  const [dimensions, setDimensions] = useState({ width: stdout?.columns || 100, height: stdout?.rows || 30 });
  const [activeTab, setActiveTab] = useState<DashboardTab>('BUILD');
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [systems] = useState(() => getAllSystems());

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: stdout?.columns || 100, height: stdout?.rows || 30 });
    };
    stdout?.on('resize', handleResize);
    return () => { stdout?.off('resize', handleResize); };
  }, [stdout]);

  useInput((input, key) => {
    if (key.tab) {
      const tabs: DashboardTab[] = ['BUILD', 'QUIZ', 'DOCTOR', 'RESOURCES'];
      const idx = tabs.indexOf(activeTab);
      setActiveTab(tabs[(idx + 1) % tabs.length]);
      return;
    }

    // Ctrl+M to toggle modal
    if (input === 'm' && key.ctrl) {
      setShowModal(prev => !prev);
      return;
    }

    // Escape to close modal
    if (key.escape) {
      if (showModal) { setShowModal(false); return; }
      return;
    }

    // Enter to execute the typed command
    if (key.return) {
      const cmd = inputValue.trim().toLowerCase();
      setInputValue('');
      if (cmd.startsWith('init ')) onNavigate('init', cmd.slice(5));
      else if (cmd.startsWith('quiz ')) onNavigate('quiz', cmd.slice(5));
      else if (cmd.startsWith('list')) onNavigate('list');
      else if (cmd.startsWith('doctor')) onNavigate('doctor');
      else if (cmd.startsWith('resources')) onNavigate('resources');
      else if (cmd.startsWith('validate')) onNavigate('validate');
      else if (cmd.startsWith('verify')) onNavigate('verify');
      else if (cmd.startsWith('submit')) onNavigate('submit');
      else if (cmd.startsWith('progress')) onNavigate('progress');
      return;
    }

    // Text input
    if (key.backspace || key.delete) {
      setInputValue(prev => prev.slice(0, -1));
    } else if (input && !key.ctrl && !key.meta) {
      setInputValue(prev => prev + input);
    }
  });

  const leftPanelWidth = Math.floor(dimensions.width * 0.32);
  const rightPanelWidth = dimensions.width - leftPanelWidth - 6;
  const workspaceHeight = dimensions.height - 8;

  return (
    <Box flexDirection="column" width={dimensions.width} paddingX={1} paddingY={0}>
      {/* ── 1. Brand Header ───────────────────────────────────── */}
      <Box flexDirection="row" justifyContent="space-between" marginBottom={1}>
        <Gradient name="retro">
          <Text bold>{'  '}⚡ 100x SYSTEMS ENGINE</Text>
        </Gradient>
        <Text dimColor>[Tab] modes · [Ctrl+M] menu</Text>
      </Box>

      {/* ── 2. Tab Navigation ──────────────────────────────────── */}
      <Box flexDirection="row" marginBottom={1}>
        {(['BUILD', 'QUIZ', 'DOCTOR', 'RESOURCES'] as DashboardTab[]).map(tab => {
          const isActive = tab === activeTab;
          const color = tab === 'BUILD' ? 'cyan' : tab === 'QUIZ' ? 'magenta' : tab === 'DOCTOR' ? 'yellow' : 'green';
          return (
            <Box key={tab} borderStyle="single" borderColor={isActive ? color : 'gray'} paddingX={2} marginRight={1}>
              <Text bold={isActive} color={isActive ? color : 'white'}>
                {isActive ? '● ' : '  '}{tab}
              </Text>
            </Box>
          );
        })}
      </Box>

      {/* ── 3. Dual-Panel Workspace ────────────────────────────── */}
      <Box flexDirection="row" height={workspaceHeight}>
        {/* Left Panel: Context / Stats */}
        <Box flexDirection="column" width={leftPanelWidth} borderStyle="round" borderColor="gray" paddingX={1}>
          <Text underline bold color="yellow">{'  '}Workspace</Text>
          <Box marginTop={1} flexDirection="column" paddingX={1}>
            <Text>Systems: <Text color="cyan" bold>{systems.length}</Text></Text>
            <Text>Quizzes: <Text color="magenta" bold>available</Text></Text>
            <Text>Templates: <Text color="green" bold>TypeScript / Java</Text></Text>
          </Box>
          <Box marginTop={1} paddingX={1}>
            <Text dimColor>─{'─'.repeat(leftPanelWidth - 8)}</Text>
          </Box>
          <Box flexDirection="column" paddingX={1} marginTop={1}>
            <Text dimColor bold>Available Systems</Text>
            {systems.slice(0, Math.min(systems.length, Math.floor(workspaceHeight / 3))).map(sys => (
              <Text key={sys.slug} dimColor>
                {'  '}<Text color="cyan">100x init {sys.slug}</Text>
              </Text>
            ))}
            {systems.length > Math.floor(workspaceHeight / 3) && (
              <Text dimColor>{'  '}... and {systems.length - Math.floor(workspaceHeight / 3)} more</Text>
            )}
          </Box>
        </Box>

        {/* Right Panel: Tab Content */}
        <Box flexDirection="column" width={rightPanelWidth} borderStyle="round" borderColor={activeTab === 'BUILD' ? 'cyan' : activeTab === 'QUIZ' ? 'magenta' : activeTab === 'DOCTOR' ? 'yellow' : 'green'} paddingX={1} marginLeft={1}>
          {activeTab === 'BUILD' && <BuildTab onNavigate={onNavigate} />}
          {activeTab === 'QUIZ' && <QuizTab onNavigate={onNavigate} />}
          {activeTab === 'DOCTOR' && <DoctorTab onNavigate={onNavigate} />}
          {activeTab === 'RESOURCES' && <ResourcesTab onNavigate={onNavigate} />}
        </Box>
      </Box>

      {/* ── 4. Bottom Input Bar ────────────────────────────────── */}
      <Box borderStyle="single" borderColor="green" paddingX={1} width="100%">
        <Text color="green" bold> 100x ❯ </Text>
        <Text>{inputValue}</Text>
        {!inputValue && <Text dimColor>Type a command (init, quiz, list, doctor, ...)</Text>}
      </Box>

      {/* ── 5. Floating Modal ───────────────────────────────────── */}
      {showModal && (
        <Box position="absolute" marginTop={5} marginLeft={Math.floor(dimensions.width / 4)}
          width={Math.floor(dimensions.width / 2)}
          borderStyle="double" borderColor="yellow" backgroundColor="black"
          flexDirection="column" padding={1}>
          <Text bold color="yellow">{'  '}⚙ Quick Command Palette</Text>
          <Text dimColor>{'  '}─{'─'.repeat(30)}</Text>
          <Box marginLeft={1}>
            <Text color="cyan">  100x list</Text><Text dimColor>      — browse systems</Text>
          </Box>
          <Box marginLeft={1}>
            <Text color="cyan">  100x init &lt;system&gt;</Text><Text dimColor>  — start building</Text>
          </Box>
          <Box marginLeft={1}>
            <Text color="magenta">  100x quiz &lt;system&gt;</Text><Text dimColor>  — take quizzes</Text>
          </Box>
          <Box marginLeft={1}>
            <Text color="yellow">  100x doctor</Text><Text dimColor>    — check environment</Text>
          </Box>
          <Box marginLeft={1}>
            <Text color="green">  100x resources</Text><Text dimColor>  — view resources</Text>
          </Box>
          <Box marginLeft={1}>
            <Text color="yellow">  100x submit</Text><Text dimColor>    — submit implementation</Text>
          </Box>
          <Box marginTop={1}>
            <Text color="red">{'  '}[Ctrl+M] or [Esc] to close</Text>
          </Box>
        </Box>
      )}
    </Box>
  );
}

// ─── Tab Components ─────────────────────────────────────────────────

function BuildTab({ onNavigate }: { onNavigate: (cmd: string, args?: string) => void }) {
  const systems = getAllSystems();
  return (
    <Box flexDirection="column" paddingX={1}>
      <Text bold color="cyan">{'  '}🔨 System Builder</Text>
      <Box marginY={1} />
      <Text dimColor>{'  '}Select a system to start building:</Text>
      <Box flexDirection="column" marginTop={1}>
        {systems.slice(0, 6).map(sys => (
          <Box key={sys.slug} marginY={0}>
            <Text>{'  '}<Text color="cyan">init {sys.slug}</Text><Text dimColor>  — {sys.title}</Text></Text>
          </Box>
        ))}
      </Box>
      <Box marginY={1}>
        <Text dimColor>{'  '}Type "init &lt;system&gt;" in the prompt below</Text>
      </Box>
    </Box>
  );
}

function QuizTab({ onNavigate }: { onNavigate: (cmd: string, args?: string) => void }) {
  const systems = getAllSystems();
  return (
    <Box flexDirection="column" paddingX={1}>
      <Text bold color="magenta">{'  '}📝 Quizzes</Text>
      <Box marginY={1} />
      <Text dimColor>{'  '}Take quizzes for any system:</Text>
      <Box flexDirection="column" marginTop={1}>
        {systems.slice(0, 6).map(sys => (
          <Box key={sys.slug} marginY={0}>
            <Text>{'  '}<Text color="magenta">quiz {sys.slug}</Text><Text dimColor>  — {sys.title}</Text></Text>
          </Box>
        ))}
      </Box>
      <Box marginY={1}>
        <Text dimColor>{'  '}Type "quiz &lt;system&gt;" in the prompt below</Text>
      </Box>
    </Box>
  );
}

function DoctorTab({ onNavigate }: { onNavigate: (cmd: string, args?: string) => void }) {
  return (
    <Box flexDirection="column" paddingX={1}>
      <Text bold color="yellow">{'  '}🔍 Environment Doctor</Text>
      <Box marginY={1} />
      <Text dimColor>{'  '}Check your development environment for required tools.</Text>
      <Box marginY={1}>
        <Text>{'  '}Run <Text color="yellow">100x doctor</Text> to check:</Text>
      </Box>
      <Box flexDirection="column" paddingX={1}>
        <Text dimColor>• Node.js, Git, npm (required)</Text>
        <Text dimColor>• TypeScript, Docker, Java (optional)</Text>
        <Text dimColor>• Kubernetes, Terraform, AWS CLI</Text>
      </Box>
      <Box marginY={1}>
        <Text dimColor>{'  '}Type "doctor" in the prompt below</Text>
      </Box>
    </Box>
  );
}

function ResourcesTab({ onNavigate }: { onNavigate: (cmd: string, args?: string) => void }) {
  const systems = getAllSystems();
  return (
    <Box flexDirection="column" paddingX={1}>
      <Text bold color="green">{'  '}📚 Curated Resources</Text>
      <Box marginY={1} />
      <Text dimColor>{'  '}Browse curated papers, blogs, and videos:</Text>
      <Box flexDirection="column" marginTop={1}>
        {systems.slice(0, 6).map(sys => (
          <Box key={sys.slug} marginY={0}>
            <Text>{'  '}<Text color="green">resources {sys.slug}</Text><Text dimColor>  — {sys.title}</Text></Text>
          </Box>
        ))}
      </Box>
      <Box marginY={1}>
        <Text dimColor>{'  '}Type "resources &lt;system&gt;" in the prompt below</Text>
      </Box>
    </Box>
  );
}
