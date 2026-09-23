import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const worldCities = [
  {
    id: 1,
    name: "Buenos Aires",
    country: "Argentina",
    timeZone: "America/Argentina/Buenos_Aires",
  },
  {
    id: 2,
    name: "San José",
    country: "Costa Rica",
    timeZone: "America/Costa_Rica",
  },
  {
    id: 3,
    name: "New York",
    country: "United States",
    timeZone: "America/New_York",
  },
  {
    id: 4,
    name: "London",
    country: "United Kingdom",
    timeZone: "Europe/London",
  },
  { id: 5, name: "Tokyo", country: "Japan", timeZone: "Asia/Tokyo" },
];

const WorldClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Suscripción al intervalo de 1 segundo
    const timer = setInterval(() => setTime(new Date()), 1000);

    // Cleanup impecable para evitar leaks de memoria
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <header style={styles.header}>
        <h1 style={styles.mainTitle}>Global World Clock</h1>
        <p style={styles.subtitle}>
          Real-time timezone synchronization using React lifecycle hooks, clean
          intervals, and native Intl date formatting.
        </p>
      </header>

      {/* GRID DE CIUDADES */}
      <div style={styles.grid}>
        {worldCities.map((city) => {
          const formattedTime = time.toLocaleTimeString("en-US", {
            timeZone: city.timeZone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          });

          return (
            <div key={city.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cityName}>{city.name}</h2>
                <span style={styles.countryBadge}>{city.country}</span>
              </div>

              <div style={styles.timeDisplay}>{formattedTime}</div>

              <div style={styles.timezoneTag}>
                <span>Zone:</span> {city.timeZone}
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER / BACK */}
      <div style={{ marginTop: "3rem" }}>
        <Link to="/" style={styles.backLink}>
          ← Back to Showroom
        </Link>
      </div>
    </div>
  );
};

export default WorldClock;

// 💅 ESTILOS REUTILIZANDO TUS VARIABLES CSS
const styles = {
  wrapper: {
    padding: "2rem",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "2.5rem",
  },
  mainTitle: {
    color: "var(--accent-yellow)",
    fontSize: "1.8rem",
    marginBottom: "0.5rem",
  },
  subtitle: {
    color: "var(--text-muted)",
    fontSize: "0.95rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "var(--bg-card)",
    padding: "1.5rem",
    borderRadius: "12px",
    border: "1px solid var(--border-color)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    transition: "border-color 0.2s ease",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  cityName: {
    color: "var(--text-main)",
    fontSize: "1.2rem",
    margin: 0,
    fontWeight: "600",
  },
  countryBadge: {
    fontSize: "0.75rem",
    backgroundColor: "var(--bg-main)",
    color: "var(--text-muted)",
    padding: "0.25rem 0.5rem",
    borderRadius: "4px",
    border: "1px solid var(--border-color)",
  },
  timeDisplay: {
    fontSize: "1.75rem",
    fontFamily: "monospace",
    fontWeight: "bold",
    color: "var(--accent-yellow)",
    textAlign: "center",
    margin: "1rem 0",
    letterSpacing: "1px",
    backgroundColor: "var(--bg-main)",
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid var(--border-color)",
  },
  timezoneTag: {
    fontSize: "0.8rem",
    color: "var(--text-muted)",
    textAlign: "right",
  },
  backLink: {
    color: "var(--accent-yellow)",
    textDecoration: "none",
    fontWeight: "600",
  },
};
