import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="showroom-container">
      {/* 🚀 HEADER PRINCIPAL */}
      <header className="main-header">
        <span className="header-badge">React 19 & Vite Showroom</span>
        <h1 className="main-title">Fernando Colombo's React Showroom</h1>
        <p className="main-subtitle">
          Collection of React architecture patterns, custom hooks, global state
          management, and interactive mini-applications.
        </p>
      </header>

      {/* 🛡️ SECTION 1 */}
      <section className="showroom-section">
        <div className="section-header">
          <span className="section-icon">🖥️</span>
          <div>
            <h2 className="section-title">Full Apps</h2>
            <p className="section-desc">
              Application section showcasing complete React applications with
              state management and routing.
            </p>
          </div>
        </div>

        <div className="card-grid">
          <div className="card" onClick={() => navigate("/quiz-app")}>
            <div className="card-content">
               <div className="card-top">
                 <span className="card-number">#01</span>
                 <span className="tech-tag zustand">Quiz Application</span>
               </div>
              <h3 className="card-title">❓ Quiz Application</h3>
              <p className="card-text">
                Sample quiz application built with React, demonstrating state
                management and component interaction.
              </p>
              <span className="card-link">Preview demo [Launch]</span>
            </div>
          </div>

          <div className="card" onClick={() => navigate("/ai-smart-advisor")}>
            <div className="card-content">
               <div className="card-top">
                 <span className="card-number">#02</span>
                 <span className="tech-tag zustand">AI Smart Advisor</span>
               </div>
              <h3 className="card-title">🤖 AI Smart Advisor</h3>
              <p className="card-text">
                Interactive React client integrated with a containerized FastAPI
                backend. Powered by OpenRouter API for advanced LLM
                orchestration, secure environment handling, and real-time
                intelligent recommendations
              </p>
              <span className="card-link">Preview demo [Launch]</span>
            </div>
          </div>
        </div>
      </section>

      {/* ⚡ SECTION 2 */}
      <section className="showroom-section">
        <div className="section-header">
          <span className="section-icon">⚡</span>
          <div>
            <h2 className="section-title">Core Concepts & React Hooks</h2>
            <p className="section-desc">
              Fundamentals, DOM manipulation with refs, interval cleanup and
              external APIs.
            </p>
          </div>
        </div>

        <div className="card-grid">
          <div className="card" onClick={() => navigate("/counter-zus")}>
            <div className="card-content">
               <div className="card-top">
                 <span className="card-number">#03</span>
                 <span className="tech-tag zustand">Zustand Basic</span>
               </div>
              <h3 className="card-title">Counter Zustand</h3>
              <p className="card-text">
                Simple state counter implemented with Zustand.
              </p>
              <span className="card-link">Preview demo [Launch]</span>
            </div>
          </div>

          <div className="card" onClick={() => navigate("/uncontrolled-form")}>
            <div className="card-content">
               <div className="card-top">
                 <span className="card-number">#04</span>
                 <span className="tech-tag">useRef Hook</span>
               </div>
              <h3 className="card-title">Uncontrolled Form</h3>
              <p className="card-text">
                Uncontrolled form handling avoiding re-renders using{" "}
                <code>useRef</code>.
              </p>
              <span className="card-link">Preview demo [Launch]</span>
            </div>
          </div>

          <div className="card" onClick={() => navigate("/search")}>
            <div className="card-content">
               <div className="card-top">
                 <span className="card-number">#05</span>
                 <span className="tech-tag">Fetch / API</span>
               </div>
              <h3 className="card-title">Wikipedia Search</h3>
              <p className="card-text">
                Real-time search consuming the Wikipedia API.
              </p>
              <span className="card-link">Preview demo [Launch]</span>
            </div>
          </div>

          <div className="card" onClick={() => navigate("/chrono")}>
            <div className="card-content">
               <div className="card-top">
                 <span className="card-number">#06</span>
                 <span className="tech-tag">Intervals</span>
               </div>
              <h3 className="card-title">Chronometer</h3>
              <p className="card-text">
                Stopwatch with HH:MM:SS format and effect cleanup control.
              </p>
              <span className="card-link">Preview demo [Launch]</span>
            </div>
          </div>

          <div className="card" onClick={() => navigate("/wc")}>
            <div className="card-content">
               <div className="card-top">
                 <span className="card-number">#07</span>
                 <span className="tech-tag">Intl API</span>
               </div>
              <h3 className="card-title">World Clock</h3>
              <p className="card-text">
                World clock with real-time updates and timezone formatting.
              </p>
              <span className="card-link">Preview demo [Launch]</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🛡️ SECTION 3 */}
      <section className="showroom-section">
        <div className="section-header">
          <span className="section-icon">🛡️</span>
          <div>
            <h2 className="section-title">Global State Management</h2>
            <p className="section-desc">
              Head-to-head comparison between Zustand and Redux Toolkit (RTK).
            </p>
          </div>
        </div>

        <div className="card-grid">
          <div className="card" onClick={() => navigate("/fav-list-zus")}>
            <div className="card-content">
               <div className="card-top">
                 <span className="card-number">#08</span>
                 <span className="tech-tag zustand">Zustand Store</span>
               </div>
              <h3 className="card-title">Favorites List (Zustand)</h3>
              <p className="card-text">
                Global favorites list managed via Zustand Store.
              </p>
              <span className="card-link">Preview demo [Launch]</span>
            </div>
          </div>

          <div className="card" onClick={() => navigate("/fav-list-redux")}>
            <div className="card-content">
               <div className="card-top">
                 <span className="card-number">#09</span>
                 <span className="tech-tag redux">Redux Toolkit</span>
               </div>
              <h3 className="card-title">Favorites List (Redux)</h3>
              <p className="card-text">
                Global state architecture using Slices, Selectors, and Redux
                Store.
              </p>
              <span className="card-link">Preview demo [Launch]</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
