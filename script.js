document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('chat-form');
  const userInput = document.getElementById('user-input');
  const chatLog = document.getElementById('chat-log');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userMessage = userInput.value;
    userInput.value = '';

    const userMessageElem = document.createElement('p');
    userMessageElem.innerHTML = `<strong>You:</strong> ${userMessage}`;
    chatLog.appendChild(userMessageElem);

    const botResponse = await getChatbotResponse(userMessage);

    const botMessageElem = document.createElement('p');
    botMessageElem.innerHTML = `<strong>Bot:</strong> ${botResponse}`;
    chatLog.appendChild(botMessageElem);

    chatLog.scrollTop = chatLog.scrollHeight;
  });
});

async function getChatbotResponse(userMessage) {
  const response = await fetch('http://localhost:3000/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: userMessage }),
  });

  const data = await response.json();
  return data.botResponse;
}
