const messagesEl = document.getElementById('messages');
const form = document.getElementById('composer');
const input = document.getElementById('input');

function appendMessage(text, role){
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  div.textContent = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const text = input.value.trim();
  if(!text) return;
  appendMessage(text, 'user');
  input.value = '';
  setTimeout(()=>{
    appendMessage('This is a demo reply. Wire to backend or AI later.', 'ai');
  }, 400);
});



