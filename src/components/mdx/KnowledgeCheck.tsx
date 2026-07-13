/**
 * ## KnowledgeCheck
 *
 * Interactive quiz component for MDX chapters. Allows readers to test
 * their understanding with multiple-choice questions.
 *
 * @packageDocumentation
 */

'use client';

import { useState } from 'react';
import { cn } from '@/application/lib/utils';
import { Icon } from '@/presentation/__components';

interface Answer {
  id: string;
  text: string;
  correct: boolean;
}

interface KnowledgeCheckProps {
  question: string;
  answers: Answer[];
  explanation: string;
  className?: string;
}

export function KnowledgeCheck({ question, answers = [], explanation, className }: KnowledgeCheckProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const selectedAnswer = answers.find((a) => a.id === selectedId);
  const isCorrect = selectedAnswer?.correct ?? false;

  const handleSubmit = () => {
    if (!selectedId) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedId(null);
    setSubmitted(false);
  };

  return (
    <div className={cn('my-8 border-l-4 border-accent bg-accent-bg/30 p-6', className)}>
      <div className="flex items-center gap-2 mb-4">
        <Icon name="check" size={18} className="text-accent" />
        <span className="text-xs font-bold uppercase tracking-wider text-accent">Knowledge Check</span>
      </div>

      <p className="text-sm font-semibold text-fg mb-4">{question}</p>

      <div className="space-y-2 mb-4">
        {answers.map((answer) => {
          const isSelected = selectedId === answer.id;
          const showResult = submitted && (isSelected || answer.correct);

          let borderColor = 'border-border hover:border-accent/50';
          let bgColor = 'bg-white hover:bg-accent-bg/20';
          let indicator = null;

          if (submitted) {
            if (answer.correct) {
              borderColor = 'border-green-500';
              bgColor = 'bg-green-50';
              indicator = <Icon name="check" size={14} className="text-green-600 shrink-0" />;
            } else if (isSelected && !answer.correct) {
              borderColor = 'border-red-400';
              bgColor = 'bg-red-50';
              indicator = <Icon name="x" size={14} className="text-red-500 shrink-0" />;
            } else {
              bgColor = 'bg-white/50';
            }
          }

          return (
            <button
              key={answer.id}
              onClick={() => !submitted && setSelectedId(answer.id)}
              disabled={submitted}
              className={cn(
                'flex items-center gap-3 w-full text-left p-3 border text-sm transition-all duration-150',
                borderColor,
                bgColor,
                submitted ? 'cursor-default' : 'cursor-pointer',
                isSelected && !submitted && 'border-accent bg-accent-bg/10',
              )}
            >
              <span className={cn(
                'flex items-center justify-center w-6 h-6 text-xs font-bold shrink-0 border',
                isSelected && !submitted ? 'border-accent bg-accent text-white' : 'border-border text-fg-secondary',
              )}>
                {indicator || answer.id.toUpperCase()}
              </span>
              <span className="text-fg-secondary">{answer.text}</span>
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!selectedId}
          className={cn(
            'px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-150',
            selectedId
              ? 'bg-accent text-white hover:bg-accent-hover'
              : 'bg-surface-secondary text-fg-muted cursor-not-allowed',
          )}
        >
          Check Answer
        </button>
      ) : (
        <div className="space-y-3">
          <div className={cn(
            'flex items-center gap-2 text-sm font-semibold',
            isCorrect ? 'text-green-700' : 'text-red-600',
          )}>
            <Icon name={isCorrect ? 'check' : 'x'} size={16} />
            <span>{isCorrect ? 'Correct!' : 'Not quite.'}</span>
          </div>

          <div className="bg-white border border-border p-4 text-sm text-fg-secondary leading-relaxed">
            <span className="text-xs font-bold uppercase tracking-wider text-fg-muted block mb-1">Explanation</span>
            {explanation}
          </div>

          <button
            onClick={handleReset}
            className="text-xs font-semibold text-accent hover:underline"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
