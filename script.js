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
  div.textContent = `${sender}: ${message}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
