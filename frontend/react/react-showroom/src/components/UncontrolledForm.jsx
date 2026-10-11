import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";

// 🛡️ Zod Schema
const profileSchema = z.object({
  username: z
    .string()
    .min(3, "The username must be at least 3 characters long."),
  email: z.string().email("Please enter a valid email address."),
});

const ProfileForm = () => {
  const userNameRef = useRef(null);
  const emailRef = useRef(null);

  // States
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null); // We store the result here

  const handleSubmit = (event) => {
    event.preventDefault();

    const rawData = {
      username: userNameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
    };

    const result = profileSchema.safeParse(rawData);

    if (!result.success) {
      const formattedErrors = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message;
      });
      setErrors(formattedErrors);
      setSubmittedData(null); // If error, we hid previous view
      return;
    }

    // SUCCESS: Clear errors, show data, and reset inputs
    setErrors({});
    setSubmittedData(result.data);

    userNameRef.current.value = "";
    emailRef.current.value = "";
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Uncontrolled Form</h1>
      <p className="form-subtitle">
        <code>useRef</code> + Validation <code>Zod</code> + Live preview on
        screen.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        {/* USERNAME */}
        <div className="form-group">
          <label htmlFor="userName" className="form-label">
            Username:
          </label>
          <input
            id="userName"
            type="text"
            ref={userNameRef}
            defaultValue=""
            placeholder="Add a valid userName"
            className={`form-input ${errors.username ? "has-error" : ""}`}
          />
          {errors.username && (
            <span className="form-error-msg">{errors.username}</span>
          )}
        </div>

        {/* EMAIL */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            id="email"
            type="email"
            ref={emailRef}
            defaultValue=""
            placeholder="Add a valid email address"
            className={`form-input ${errors.email ? "has-error" : ""}`}
          />
          {errors.email && (
            <span className="form-error-msg">{errors.email}</span>
          )}
        </div>

        <button type="submit" className="form-submit-btn">
          Submit Changes
        </button>
      </form>

      {/* 📊 SUMMARY PANEL / PREVIEW (Only appears after successful submit) */}
      {submittedData && (
        <div className="submitted-card" data-testid="submitted-summary">
          <h2 className="submitted-card-title">✔ Submitted Data</h2>
          <div className="submitted-field">
            <span className="submitted-label">Username:</span>
            <span className="submitted-value">{submittedData.username}</span>
          </div>
          <div className="submitted-field">
            <span className="submitted-label">Email:</span>
            <span className="submitted-value">{submittedData.email}</span>
          </div>
        </div>
      )}

      <div className="form-footer">
        <Link to="/" className="form-back-link">
          ← Back to Showroom
        </Link>
      </div>
    </div>
  );
};

export default ProfileForm;
