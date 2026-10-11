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
          // ⚡ Structure expected by the endpoint in Render
          body: JSON.stringify({
            messages: [{ role: "user", content: userText }],
          }),
        },
      );
      const data = await response.json();
      setLoading(false);

      // We back the string from the API ({ response: "..." })
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

    inputRef.current.value = "";

    const userMsg = { role: "user", text: userText };
    setContent((prevContent) => [...prevContent, userMsg]);

    const botReplyText = await fetchAiResponse(userText);

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

      {/* Messages Panel */}
      <div className="chat-messages-panel">
        {content.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${msg.role === "user" ? "user" : "bot"}`}
          >
            <span className="chat-bubble-sender">
              {msg.role === "user" ? "You" : "AI Advisor"}
            </span>
            {/* ⚡ We print unified msg.text respecting new lines characters  */}
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

      {/* Form */}
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
