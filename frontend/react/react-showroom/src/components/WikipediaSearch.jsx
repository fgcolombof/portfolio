import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const URL_PREFIX =
  "https://en.wikipedia.org/w/api.php?action=opensearch&search=";
const URL_POSTFIX = "&format=json&origin=*";

// 1. EL MAPPER (Tu adaptador de datos)
const mapWikipediaResponse = (rawArray) => {
  if (!Array.isArray(rawArray) || rawArray.length < 4) {
    return { query: "", results: [] };
  }

  const [query, titles, , urls] = rawArray;

  return {
    query: query,
    results: titles.map((title, index) => ({
      id: `${title}-${index}`,
      title: title,
      url: urls[index] || "#",
    })),
  };
};

// 2. SERVICIO DE FETCH
const fetchData = async (searchTerm) => {
  try {
    const url = `${URL_PREFIX}${encodeURIComponent(searchTerm)}${URL_POSTFIX}`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP Error: ${resp.status}`);
    const rawData = await resp.json();
    return mapWikipediaResponse(rawData);
  } catch (err) {
    console.error("Error cargando datos:", err);
    return { query: "", results: [] };
  }
};

const WikipediaSearch = () => {
  const tokenRef = useRef("");
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = tokenRef.current.value.trim();
    if (!token) return;

    setLoading(true);
    const data = await fetchData(token);
    setInfo(data);
    setLoading(false);
  };

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <header style={styles.header}>
        <h1 style={styles.mainTitle}>Wikipedia Search Engine</h1>
        <p style={styles.subtitle}>
          Real-time API integration with un-controlled inputs, custom data
          mapping, and external routing.
        </p>
      </header>

      {/* BOX DE BUSQUEDA */}
      <div style={styles.searchContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            ref={tokenRef}
            placeholder="Search Wikipedia articles..."
            style={styles.input}
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {/* RESULTADOS */}
      <div style={styles.resultsContainer}>
        {info && (
          <h2 style={styles.resultsTitle}>
            Results for:{" "}
            <span style={{ color: "var(--accent-yellow)" }}>
              "{info.query}"
            </span>
          </h2>
        )}

        {info?.results?.length === 0 && !loading && (
          <p style={styles.emptyText}>
            No articles found. Try another search term!
          </p>
        )}

        <div style={styles.grid}>
          {info?.results?.map((item) => (
            <article key={item.id} style={styles.card}>
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                style={styles.link}
              >
                Read full article on Wikipedia →
              </a>
            </article>
          ))}
        </div>
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

// 💅 ESTILOS REUTILIZANDO TUS VARIABLES CSS
const styles = {
  wrapper: {
    padding: "2rem",
    maxWidth: "900px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "2rem",
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
  searchContainer: {
    backgroundColor: "var(--bg-card)",
    padding: "1.5rem",
    borderRadius: "12px",
    border: "1px solid var(--border-color)",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    gap: "1rem",
  },
  input: {
    flexGrow: 1,
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    border: "1px solid var(--border-color)",
    backgroundColor: "var(--bg-main)",
    color: "var(--text-main)",
    fontSize: "1rem",
    outline: "none",
  },
  button: {
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "var(--accent-yellow)",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "0.95rem",
    transition: "opacity 0.2s ease",
  },
  resultsContainer: {
    marginTop: "1rem",
  },
  resultsTitle: {
    color: "var(--text-main)",
    fontSize: "1.25rem",
    marginBottom: "1.5rem",
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  card: {
    backgroundColor: "var(--bg-card)",
    padding: "1.25rem",
    borderRadius: "8px",
    border: "1px solid var(--border-color)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    color: "var(--text-main)",
    fontSize: "1.1rem",
    margin: 0,
  },
  link: {
    color: "var(--accent-yellow)",
    textDecoration: "none",
    fontSize: "0.85rem",
    fontWeight: "600",
  },
  emptyText: {
    color: "var(--text-muted)",
    fontStyle: "italic",
  },
  backLink: {
    color: "var(--accent-yellow)",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default WikipediaSearch;
