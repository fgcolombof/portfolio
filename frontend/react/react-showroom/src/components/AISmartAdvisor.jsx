import { useState, useRef } from "react";

const AISmartAdvisor = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const fetchAiResponse = async (userText) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://portfolio-6o11.onrender.com/v1/advisor/",
        {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
          // ⚡ Estructura exacta que espera tu endpoint en Render
          body: JSON.stringify({
            messages: [{ role: "user", content: userText }],
          }),
        },
      );
      const data = await response.json();
      setLoading(false);

      // Retornamos el string devuelto por la API ({ response: "..." })
      return data.response;
    } catch (error) {
      setLoading(false);
      console.error("Error fetching AI response:", error);
      return "❌ Error al conectar con el servidor.";
    }
  };

  const handleSend = async (evt) => {
    if (evt) evt.preventDefault();
    const userText = inputRef.current?.value.trim();
    if (!userText || loading) return;

    // 1. Limpiamos el textarea
    inputRef.current.value = "";

    // 2. Agregamos el mensaje del usuario inmediatamente al chat
    const userMsg = { role: "user", text: userText };
    setContent((prevContent) => [...prevContent, userMsg]);

    // 3. Consultamos la API
    const botReplyText = await fetchAiResponse(userText);

    // 4. Agregamos la respuesta de la IA
    const botMsg = { role: "bot", text: botReplyText };
    setContent((prevContent) => [...prevContent, botMsg]);

    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <div className="chat-app-container">
      <h1 className="chat-header-title">AI Smart Advisor</h1>
      <p className="chat-header-subtitle">Ask our AI API anything you want.</p>

      {/* Panel de mensajes */}
      <div className="chat-messages-panel">
        {content.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${msg.role === "user" ? "user" : "bot"}`}
          >
            <span className="chat-bubble-sender">
              {msg.role === "user" ? "You" : "AI Advisor"}
            </span>
            {/* ⚡ Imprimimos msg.text unificado con saltos de línea respetados */}
            <p style={{ whiteSpace: "pre-wrap" }}>{msg.text}</p>
          </div>
        ))}

        {loading && (
          <div className="chat-bubble bot">
            <span className="chat-bubble-sender">AI Advisor</span>
            <p>Writing...</p>
          </div>
        )}
      </div>

      {/* Formulario */}
      <form onSubmit={handleSend} className="chat-input-form">
        <textarea
          ref={inputRef}
          onKeyDown={handleKeyDown}
          className="chat-textarea"
          placeholder="Type your question here (Enter to send, Shift+Enter for a new line)..."
          rows={3}
          disabled={loading}
        />
        <button type="submit" className="chat-submit-btn" disabled={loading}>
          {loading ? "Thinking..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default AISmartAdvisor;
