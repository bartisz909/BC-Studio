// api/chat.js - Vercel Serverless Function
// Deploy to Vercel - chatbot endpoint with OpenAI

import { Configuration, OpenAIApi } from 'openai';

const openai = new OpenAIApi(
 new Configuration({
 apiKey: process.env.OPENAI_API_KEY,
 })
);

const systemPrompt = {
 en: `You are an AI assistant for BC Studio, a web and AI solutions company founded by Bartek. 
You represent BC Studio professionally but conversationally. 
BC Studio offers:
1. Websites & Web Apps - Fast, responsive, conversion-focused websites
2. AI Chatbots - Conversational AI for lead generation and customer support
3. AI Integration - Embedding AI into existing workflows
4. AI Agents - Autonomous agents that handle multi-step tasks
5. IT Solutions - Infrastructure, cloud setup, technical consulting
6. Automation - Smart workflows with Zapier, Make, n8n

Key facts about BC Studio:
- Founded by Bartek, a full-stack developer and AI specialist
- Located in Poland, works globally
- Response time: Within 24 hours
- Email: hello@bc-studio.dev
- Tech stack: React, Next.js, Node.js, Python, OpenAI API, LangChain, n8n
- Pricing typically: 50% upfront, 50% on delivery
- Project timeline: Websites 2-4 weeks, AI projects 1-8 weeks

When users ask about services, pricing, timeline, or want to get in touch, provide helpful information. 
Be friendly, professional, and encourage them to visit the website or contact Bartek directly.
Keep responses concise and natural (2-3 sentences max).`,
 
 pl: `Jesteś asystentem AI dla BC Studio, firmy specjalizującej się w rozwiązaniach webowych i AI, którą założył Bartek.
Reprezentujesz BC Studio profesjonalnie, ale w sposób konwersacyjny.
BC Studio oferuje:
1. Strony internetowe i aplikacje - Szybkie, responsywne strony zorientowane na konwersję
2. Chatboty AI - Konwersacyjna AI do generowania leadów i wsparcia klientów
3. Integracja AI - Wbudowywanie AI w istniejące procesy
4. Agenty AI - Autonomiczne agenty obsługujące wieloetapowe zadania
5. Rozwiązania IT - Infrastruktura, konfiguracja chmury, doradztwo techniczne
6. Automatyzacja - Inteligentne przepływy z Zapier, Make, n8n

Kluczowe fakty o BC Studio:
- Założona przez Bartka, full-stack developera i specjalistę AI
- Siedziba w Polsce, pracuje globalnie
- Czas odpowiedzi: W ciągu 24 godzin
- Email: hello@bc-studio.dev
- Stack technologiczny: React, Next.js, Node.js, Python, OpenAI API, LangChain, n8n
- Wycena zwykle: 50% z góry, 50% przy dostarczeniu
- Czas projektu: Strony 2-4 tygodnie, projekty AI 1-8 tygodni

Gdy użytkownicy pytają o usługi, wycenę, harmonogram lub chcą się skontaktować, dostarcz pomocne informacje.
Bądź przyjazny, profesjonalny i zachęcaj do odwiedzenia strony lub bezpośredniego kontaktu z Bartkiem.
Utrzymuj odpowiedzi zwięzłe i naturalne (max 2-3 zdania).`
};

export default async function handler(req, res) {
 // CORS headers
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
 res.setHeader(
 'Access-Control-Allow-Headers',
 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
 );

 if (req.method === 'OPTIONS') {
 res.status(200).end();
 return;
 }

 if (req.method !== 'POST') {
 return res.status(405).json({ error: 'Method not allowed' });
 }

 try {
 const { message, lang = 'en' } = req.body;

 if (!message || typeof message !== 'string') {
 return res.status(400).json({ error: 'Invalid message' });
 }

 if (!process.env.OPENAI_API_KEY) {
 return res.status(500).json({ error: 'OpenAI API key not configured' });
 }

 const response = await openai.createChatCompletion({
 model: 'gpt-3.5-turbo',
 messages: [
 {
 role: 'system',
 content: systemPrompt[lang] || systemPrompt.en
 },
 {
 role: 'user',
 content: message
 }
 ],
 temperature: 0.7,
 max_tokens: 150,
 });

 const reply = response.data.choices[0].message.content.trim();

 res.status(200).json({ reply });
 } catch (error) {
 console.error('Chat API error:', error);
 
 res.status(500).json({
 error: 'Failed to process message',
 details: error.message
 });
 }
}
