import React, { useState } from 'react';
import FluidSimulation from 'fluid-simulation-react';
import FluidAnimation from '../../components/particles/FluidAnimation';

export default function TestPage() {
  const [inputText, setInputText] = useState('');
  const [useCustomColors, setUseCustomColors] = useState(false);

  const colors = [
    [1, 1, 0], // Yellow
    [0, 1, 1]  // Cyan
  ];

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Test FluidAnimation Component */}
      <FluidAnimation id="test-fluid-animation" useCustomColors={true} />
      
      {/* Fluid Simulation Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <FluidSimulation 
          color={useCustomColors ? colors : undefined}
        />
      </div>
      
      {/* Interactive Content Overlay */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        padding: '40px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '20px',
        pointerEvents: 'none'
      }}>
        {/* Title */}
        <h1 style={{ 
          color: 'white', 
          fontSize: '2.5rem', 
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
          margin: 0,
          pointerEvents: 'auto'
        }}>
          Fluid Simulation Test
        </h1>

        {/* Selectable Text */}
        <p style={{ 
          color: 'white', 
          fontSize: '1.2rem',
          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
          maxWidth: '600px',
          lineHeight: 1.6,
          pointerEvents: 'auto',
          userSelect: 'text'
        }}>
          This is a test of the fluid simulation library with interactive HTML elements. 
          You can select this text, click the buttons below, and type in the input field. 
          The fluid animation continues in the background.
        </p>

        {/* Interactive Controls */}
        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          flexWrap: 'wrap',
          pointerEvents: 'auto'
        }}>
          <button 
            onClick={() => alert('Button 1 clicked!')}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: '#3b82f6',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}
            onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.4)';
            }}
            onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
            }}
          >
            Click Me!
          </button>

          <button 
            onClick={() => setUseCustomColors(!useCustomColors)}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: useCustomColors ? '#10b981' : '#6b7280',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}
          >
            {useCustomColors ? 'Using Yellow/Cyan' : 'Using Random Colors'}
          </button>

          <button 
            onClick={() => setInputText('')}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: '#ef4444',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}
          >
            Clear Input
          </button>
        </div>

        {/* Text Input Area */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '10px',
          pointerEvents: 'auto',
          maxWidth: '500px'
        }}>
          <label style={{ 
            color: 'white', 
            fontSize: '16px',
            fontWeight: '600',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
          }}>
            Type something here:
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="This text is selectable and editable..."
            style={{
              padding: '12px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '2px solid rgba(255,255,255,0.3)',
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: 'white',
              backdropFilter: 'blur(10px)',
              minHeight: '100px',
              resize: 'vertical',
              fontFamily: 'inherit',
              lineHeight: 1.5
            }}
          />
          {inputText && (
            <p style={{ 
              color: 'white', 
              fontSize: '14px',
              opacity: 0.8,
              fontStyle: 'italic'
            }}>
              You typed: {inputText.length} characters
            </p>
          )}
        </div>

        {/* Instructions */}
        <div style={{ 
          marginTop: 'auto',
          padding: '20px',
          backgroundColor: 'rgba(0,0,0,0.6)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          pointerEvents: 'auto',
          maxWidth: '600px'
        }}>
          <h3 style={{ 
            color: 'white', 
            margin: '0 0 10px 0',
            fontSize: '18px'
          }}>
            Instructions:
          </h3>
          <ul style={{ 
            color: 'white', 
            margin: 0,
            paddingLeft: '20px',
            fontSize: '14px',
            lineHeight: 1.5
          }}>
            <li>Move your mouse anywhere to create fluid effects</li>
            <li>Select and copy the text above</li>
            <li>Click the buttons to test interactions</li>
            <li>Type in the text area - it's fully functional</li>
            <li>Toggle between random and custom colors</li>
          </ul>
        </div>
      </div>
    </div>
  );
}