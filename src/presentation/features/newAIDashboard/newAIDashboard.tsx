/**
 * ## Presentation: New AI Dashboard
 *
 * AI chat dashboard page wrapping the NewAIChatBot
 * component with page metadata.
 *
 * @packageDocumentation
 */

import Head from 'next/head';
import NewAIChatBot from '../ai/NewAIChatBot';

export default function NewAIDashboard() {
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
