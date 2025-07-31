const chatBox = document.getElementById("chat-box");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");

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

  // Обработка изображений в ответе
  const imgRegex = /(https:\/\/[^\s]+\.(jpg|png|gif))/i;
  const imgMatch = message.match(imgRegex);

  if (imgMatch) {
    const parts = message.split(imgRegex);
    div.innerHTML = `${sender}: ${parts[0]}<br/><img src="${imgMatch[0]}" style="max-width:100%; border-radius:10px;" />`;
  } else {
    div.textContent = `${sender}: ${message}`;
  }

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
