/* ── Session ──────────────────────────────────────── */
let sessionId = localStorage.getItem('cue_session_id');
if (!sessionId) {
  sessionId = `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  localStorage.setItem('cue_session_id', sessionId);
}

/* ── DOM refs ─────────────────────────────────────── */
const messagesEl   = document.getElementById('messages');
const inputEl      = document.getElementById('user-input');
const sendBtn      = document.getElementById('send-btn');
const typingEl     = document.getElementById('typing');
const emergencyEl  = document.getElementById('emergency-banner');

/* ── Auto-resize textarea ─────────────────────────── */
inputEl.addEventListener('input', () => {
  inputEl.style.height = 'auto';
  inputEl.style.height = Math.min(inputEl.scrollHeight, 160) + 'px';
});

/* ── Send on Enter (Shift+Enter = newline) ────────── */
inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

/* ── sendMessage ──────────────────────────────────── */
async function sendMessage() {
  const text = inputEl.value.trim();
  if (!text) return;

  appendMessage('user', text);
  inputEl.value = '';
  inputEl.style.height = 'auto';
  setLoading(true);

  try {
    const res = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, sessionId }),
    });

    const data = await res.json();

    if (!res.ok) {
      appendMessage('assistant', `⚠️ ${data.error || 'An error occurred. Please try again.'}`, false);
      return;
    }

    appendMessage('assistant', data.response, data.isEmergency);

    if (data.isEmergency) showEmergencyBanner();

  } catch (err) {
    appendMessage('assistant', '⚠️ Could not reach the server. Check your connection and try again.');
  } finally {
    setLoading(false);
  }
}

/* ── appendMessage ────────────────────────────────── */
function appendMessage(role, text, isEmergency = false) {
  const row = document.createElement('div');
  row.className = `message ${role}`;

  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = role === 'user' ? '🧑' : '🌿';

  const bubble = document.createElement('div');
  bubble.className = 'bubble' + (isEmergency ? ' emergency' : '');
  bubble.innerHTML = formatText(text);

  row.appendChild(avatar);
  row.appendChild(bubble);
  messagesEl.appendChild(row);
  scrollToBottom();
}

/* ── formatText — basic markdown-ish rendering ────── */
function formatText(text) {
  return text
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Bullet lines starting with •
    .replace(/^•\s(.+)/gm, '<li>$1</li>')
    // Wrap consecutive <li> in <ul>
    .replace(/(<li>.*?<\/li>)(\s*<li>)/gs, '$1$2')
    .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
    // Fix nested <ul><ul>
    .replace(/<ul><ul>/g, '<ul>')
    .replace(/<\/ul><\/ul>/g, '</ul>')
    // Line breaks → paragraphs
    .split(/\n\n+/)
    .map(para => para.trim())
    .filter(Boolean)
    .map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`)
    .join('');
}

/* ── setLoading ───────────────────────────────────── */
function setLoading(on) {
  typingEl.classList.toggle('hidden', !on);
  sendBtn.disabled = on;
  if (on) scrollToBottom();
}

/* ── scrollToBottom ───────────────────────────────── */
function scrollToBottom() {
  requestAnimationFrame(() => {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  });
}

/* ── Emergency Banner ─────────────────────────────── */
function showEmergencyBanner() {
  emergencyEl.classList.remove('hidden');
  emergencyEl.scrollIntoView({ behavior: 'smooth' });
}

function dismissEmergency() {
  emergencyEl.classList.add('hidden');
}

/* ── New Chat ─────────────────────────────────────── */
function newChat() {
  sessionId = `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  localStorage.setItem('cue_session_id', sessionId);

  messagesEl.innerHTML = '';
  emergencyEl.classList.add('hidden');

  appendMessage('assistant', `Hello! I'm your **Cue Health AI** assistant.\n\nDescribe your symptoms and I'll help you understand possible causes and next steps.\n\n*For emergencies, please call 911 immediately.*`);
}

/* ── Doctor Callback Modal ────────────────────────── */
function openCallbackModal() {
  const modal = document.getElementById('callback-modal');
  modal.classList.toggle('hidden');

  // Reset form state when opening
  if (!modal.classList.contains('hidden')) {
    document.getElementById('callback-form').classList.remove('hidden');
    document.getElementById('callback-success').classList.add('hidden');
    document.getElementById('cb-submit').disabled = false;
    document.getElementById('cb-submit').textContent = 'Request Callback';
  }
}

function closeCallbackModal(e) {
  // Close only if clicking the overlay, not the modal card
  if (e.target === document.getElementById('callback-modal')) {
    document.getElementById('callback-modal').classList.add('hidden');
  }
}

async function submitCallback(e) {
  e.preventDefault();

  const name     = document.getElementById('cb-name').value.trim();
  const phone    = document.getElementById('cb-phone').value.trim();
  const symptoms = document.getElementById('cb-symptoms').value.trim();
  const submitBtn = document.getElementById('cb-submit');

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  try {
    const res = await fetch('/doctor-callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, symptoms, sessionId }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      document.getElementById('callback-form').classList.add('hidden');
      document.getElementById('callback-message').textContent = data.message;
      document.getElementById('request-id').textContent = `Request ID: ${data.requestId}`;
      document.getElementById('callback-success').classList.remove('hidden');
    } else {
      alert(data.error || 'Request failed. Please try again.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Request Callback';
    }
  } catch {
    alert('Could not send request. Check your connection.');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Request Callback';
  }
}
