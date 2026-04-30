const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// In-memory session store: sessionId -> { messages, lastActivity }
const sessions = new Map();

const SYSTEM_PROMPT = `You are a health assistant chatbot, not a doctor.

Your purpose is to help users understand their symptoms, provide general health guidance, and recommend appropriate next steps.

Rules you must ALWAYS follow:
- Do NOT provide a definitive diagnosis.
- Do NOT say "you have [disease]".
- Always use phrases like "possible causes" or "may be related to".
- If symptoms seem severe or life-threatening (chest pain, breathing difficulty, fainting, heavy bleeding, stroke signs), prefix your ENTIRE response with the exact token EMERGENCY_DETECTED and immediately advise the user to call emergency services.

Behavior:
- Ask a follow-up question if key information is missing (duration, severity, age, existing conditions).
- Keep responses simple, clear, and calm. Avoid unexplained medical jargon.

Always structure your response using this exact format (no extra sections):

**Summary:** [1–2 sentence summary of the reported symptoms]

**Possible Causes:**
• [Cause 1]
• [Cause 2]
• [Cause 3]

**What You Can Do:**
• [Practical recommendation 1]
• [Practical recommendation 2]
• [Practical recommendation 3]

**When to See a Doctor:**
[Clear, concise guidance on urgency — routine vs. soon vs. immediately]

*This is not a medical diagnosis. Please consult a qualified doctor for proper evaluation.*`;

const EMERGENCY_KEYWORDS = [
  'chest pain', 'heart attack', "can't breathe", 'cannot breathe',
  'difficulty breathing', 'stopped breathing', 'not breathing',
  'unconscious', 'fainted', 'fainting', 'heavy bleeding',
  'stroke', 'seizure', 'overdose', 'poisoning', 'choking',
  'severe allergic', 'anaphylaxis', 'suicidal', 'suicide'
];

function isEmergencyMessage(text) {
  const lower = text.toLowerCase();
  return EMERGENCY_KEYWORDS.some(kw => lower.includes(kw));
}

function log(level, msg) {
  console.log(`[${new Date().toISOString()}] [${level}] ${msg}`);
}

// Prune sessions older than 1 hour every 10 minutes
setInterval(() => {
  const cutoff = Date.now() - 60 * 60 * 1000;
  for (const [id, s] of sessions) {
    if (s.lastActivity < cutoff) sessions.delete(id);
  }
}, 10 * 60 * 1000);

// POST /chat
app.post('/chat', async (req, res) => {
  const { message, sessionId } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  const sid = sessionId || `s_${Date.now()}`;
  log('REQ', `[${sid}] ${message.slice(0, 120)}`);

  const clientEmergency = isEmergencyMessage(message);

  if (!sessions.has(sid)) {
    sessions.set(sid, { messages: [], lastActivity: Date.now() });
  }
  const session = sessions.get(sid);
  session.lastActivity = Date.now();

  session.messages.push({ role: 'user', content: message.trim() });
  // Keep last 10 messages (5 pairs)
  if (session.messages.length > 10) {
    session.messages = session.messages.slice(-10);
  }

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...session.messages,
      ],
      max_tokens: 900,
      temperature: 0.3,
    });

    const raw = completion.choices[0].message.content;
    const aiEmergency = raw.trimStart().startsWith('EMERGENCY_DETECTED');
    const response = raw.replace(/^EMERGENCY_DETECTED\s*/i, '').trim();

    session.messages.push({ role: 'assistant', content: response });

    log('RES', `[${sid}] emergency=${aiEmergency || clientEmergency} tokens=${completion.usage?.total_tokens}`);

    res.json({
      response,
      isEmergency: aiEmergency || clientEmergency,
      sessionId: sid,
    });
  } catch (err) {
    log('ERR', `[${sid}] ${err.message}`);

    if (err.status === 401) return res.status(500).json({ error: 'Invalid OpenAI API key.' });
    if (err.status === 429) return res.status(500).json({ error: 'API rate limit reached. Please try again in a moment.' });

    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// POST /doctor-callback
app.post('/doctor-callback', (req, res) => {
  const { name, phone, symptoms, sessionId } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone number are required.' });
  }

  log('CALLBACK', `name="${name}" phone="${phone}" session=${sessionId}`);
  // In production: forward to CRM / SMS / notification service here

  res.json({
    success: true,
    message: 'Your callback request has been received. A doctor will contact you within 2 hours.',
    requestId: `CB-${Date.now()}`,
  });
});

// GET /health — Railway health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Catch-all: serve React app for client-side routes
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => log('SERVER', `Cue Health AI running on port ${PORT}`));
