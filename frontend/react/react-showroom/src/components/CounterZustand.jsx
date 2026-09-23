import React from "react";
import { Link } from "react-router-dom";
import { useCounterStore } from "../stores/CounterStore";

const CounterZustand = () => {
  const { count, action, increment, decrement, reset } = useCounterStore();

  return (
    <div className="counter-page-container">
      <div className="counter-card">
        <h1 className="counter-title">Zustand Counter</h1>

        <div className="counter-display">
          <span className="counter-number">{count}</span>
          <span className="counter-label">Current Count</span>
        </div>

        <div className="counter-action-badge">
          Last Action: <strong>{action || "None"}</strong>
        </div>

        <div className="counter-controls">
          <button onClick={decrement} className="counter-btn secondary">
            - Decrement
          </button>
          <button onClick={reset} className="counter-btn outline">
            Reset
          </button>
          <button onClick={increment} className="counter-btn primary">
            + Increment
          </button>
        </div>
      </div>

      <div className="counter-footer">
        <Link to="/" className="counter-back-link">
          ← Back to Showroom
        </Link>
      </div>
    </div>
  );
};

export default CounterZustand;
