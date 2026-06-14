/**
 * ## Newaidashboard
 *
 * Newaidashboard feature module.
 * Contains all components, types, and logic for the newAIDashboard domain.
 *
 * @packageDocumentation
 * @module newAIDashboard
 */

'use client';

import Head from 'next/head';
import { NewAIChatBot } from './ai.feature';

// ============================================================
// Source: newAIDashboard.tsx
// ============================================================
export function NewAIDashboard() {
  return (
    <>
      <Head>
        <title>100x AI - Chat Dashboard</title>
        <meta name="description" content="Chat with 100x AI - Your systems and design assistant" />
      </Head>
      <NewAIChatBot />
    </>
  );
}
