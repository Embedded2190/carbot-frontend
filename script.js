const chatBox = document.getElementById("chat-box");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");

// ⚠️ Укажи здесь ссылку на твой backend на Render
const API_URL = "https://carbot-api.onrender.com/chat";


form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const question = input.value;
  appendMessage("Вы", question, "user");
  input.value = "";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    appendMessage("Бот", data.reply, "bot");
  } catch (err) {
    appendMessage("Бот", "Ошибка соединения с сервером", "bot");
  }
});

function appendMessage(sender, message, className) {
  const div = document.createElement("div");
  div.classList.add(className);

  // Ищем ссылку на изображение в тексте
  const imageRegex = /(https?:\/\/[^\s\]]+\.(?:png|jpg|jpeg|gif))/i;
  const match = message.match(imageRegex);

  if (match) {
    const imageUrl = match[1];
    const cleanText = message.replace(imageRegex, "").replace(/[\[\]\(\)]/g, "").trim();
    div.innerHTML = `<strong>${sender}:</strong> ${cleanText}<br><img src="${imageUrl}" style="max-width: 100%; margin-top: 5px;">`;
  } else {
    div.innerHTML = `<strong>${sender}:</strong> ${message}`;
  }

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

