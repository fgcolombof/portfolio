import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Formatea los milisegundos en HH:MM:SS:CC (Minutos:Segundos:Centésimas)
const formatTime = (time) => {
  const hours = Math.floor((time / 3600000) % 60);
  const minutos = Math.floor((time / 60000) % 60);
  const segundos = Math.floor((time / 1000) % 60);
  const centesimas = Math.floor((time / 10) % 100);

  const pad = (num) => String(num).padStart(2, "0");
  return `${pad(hours)}:${pad(minutos)}:${pad(segundos)}:${pad(centesimas)}`;
};

const Chronometer = () => {
  const [tiempo, setTiempo] = useState(0);
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    let intervalo = null;

    if (activo) {
      intervalo = setInterval(() => {
        setTiempo((tiempoAnterior) => tiempoAnterior + 10);
      }, 10);
    } else {
      clearInterval(intervalo);
    }

    // Función de limpieza (cleanup) crucial para evitar fugas de memoria
    return () => clearInterval(intervalo);
  }, [activo]);

  return (
    <>
      <div
        style={{
          textAlign: "center",
          fontFamily: "monospace",
          padding: "20px",
        }}
      >
        <h1>{formatTime(tiempo)}</h1>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button onClick={() => setActivo(!activo)}>
            {activo ? "Pause" : "Start"}
          </button>
          <button
            onClick={() => {
              setActivo(false);
              setTiempo(0);
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <br />
      {/* FOOTER / BACK */}
      <div style={{ marginTop: "3rem" }}>
        <Link to="/" style={styles.backLink}>
          ← Back to Showroom
        </Link>
      </div>
    </>
  );
};

const styles = {
  backLink: {
    color: "var(--accent-yellow)",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Chronometer;
