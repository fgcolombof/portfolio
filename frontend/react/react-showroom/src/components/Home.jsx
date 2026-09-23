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
          Colección de patrones de arquitectura en React, custom hooks, gestión
          de estado global y miniaplicaciones interactivas.
        </p>
      </header>

      {/* ⚡ SECCIÓN 1 */}
      <section className="showroom-section">
        <div className="section-header">
          <span className="section-icon">⚡</span>
          <div>
            <h2 className="section-title">Core Concepts & React Hooks</h2>
            <p className="section-desc">
              Fundamentos, manipulación de DOM con refs, limpieza de intervalos
              y APIs externas.
            </p>
          </div>
        </div>

        <div className="card-grid">
          <div className="card" onClick={() => navigate("/counter-zus")}>
            <div className="card-content">
              <div className="card-top">
                <span className="card-number">#01</span>
                <span className="tech-tag zustand">Zustand Basic</span>
              </div>
              <h3 className="card-title">Counter Zustand</h3>
              <p className="card-text">
                Contador de estado simple implementado con Zustand.
              </p>
              <span className="card-link">Preview demo [Launch]</span>
            </div>
          </div>

          <div className="card" onClick={() => navigate("/uncontrolled-form")}>
            <div className="card-content">
              <div className="card-top">
                <span className="card-number">#02</span>
                <span className="tech-tag">useRef Hook</span>
              </div>
              <h3 className="card-title">Uncontrolled Form</h3>
              <p className="card-text">
                Manejo de formulario no controlado evitando re-renders mediante{" "}
                <code>useRef</code>.
              </p>
              <span className="card-link">Preview demo [Launch]</span>
            </div>
          </div>

          <div className="card" onClick={() => navigate("/search")}>
            <div className="card-content">
              <div className="card-top">
                <span className="card-number">#03</span>
                <span className="tech-tag">Fetch / API</span>
              </div>
              <h3 className="card-title">Wikipedia Search</h3>
              <p className="card-text">
                Buscador en tiempo real consumiendo la API de Wikipedia.
              </p>
              <span className="card-link">Preview demo [Launch]</span>
            </div>
          </div>

          <div className="card" onClick={() => navigate("/chrono")}>
            <div className="card-content">
              <div className="card-top">
                <span className="card-number">#04</span>
                <span className="tech-tag">Intervals</span>
              </div>
              <h3 className="card-title">Chronometer</h3>
              <p className="card-text">
                Cronómetro con formato HH:MM:SS y control de limpieza de
                efectos.
              </p>
              <span className="card-link">Preview demo [Launch]</span>
            </div>
          </div>

          <div className="card" onClick={() => navigate("/wc")}>
            <div className="card-content">
              <div className="card-top">
                <span className="card-number">#05</span>
                <span className="tech-tag">Intl API</span>
              </div>
              <h3 className="card-title">World Clock</h3>
              <p className="card-text">
                Reloj mundial con actualización en tiempo real y formateo de
                zonas horarias.
              </p>
              <span className="card-link">Preview demo [Launch]</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🛡️ SECCIÓN 2 */}
      <section className="showroom-section">
        <div className="section-header">
          <span className="section-icon">🛡️</span>
          <div>
            <h2 className="section-title">Global State Management</h2>
            <p className="section-desc">
              Comparativa frente a frente entre Zustand y Redux Toolkit (RTK).
            </p>
          </div>
        </div>

        <div className="card-grid">
          <div className="card" onClick={() => navigate("/fav-list-zus")}>
            <div className="card-content">
              <div className="card-top">
                <span className="card-number">#06</span>
                <span className="tech-tag zustand">Zustand Store</span>
              </div>
              <h3 className="card-title">Favorites List (Zustand)</h3>
              <p className="card-text">
                Lista de favoritos global gestionada mediante Zustand Store.
              </p>
              <span className="card-link">Preview demo [Launch]</span>
            </div>
          </div>

          <div className="card" onClick={() => navigate("/fav-list-redux")}>
            <div className="card-content">
              <div className="card-top">
                <span className="card-number">#07</span>
                <span className="tech-tag redux">Redux Toolkit</span>
              </div>
              <h3 className="card-title">Favorites List (Redux)</h3>
              <p className="card-text">
                Arquitectura de estado global utilizando Slices, Selectors y
                Redux Store.
              </p>
              <span className="card-link">Preview demo [Launch]</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🛡️ SECCIÓN 3 */}
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
                <span className="card-number">#07</span>
                <span className="tech-tag zustand">Quiz Application</span>
              </div>
              <h3 className="card-title">Quiz Application</h3>
              <p className="card-text">
                Sample quiz application built with React, demonstrating state
                management and component interaction.
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
