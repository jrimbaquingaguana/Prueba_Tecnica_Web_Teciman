import { useState } from "react";
import { sendRecordsEmail } from "../../api/recordApi";

function SendEmailButton() {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSendEmail = async () => {
    setMessage("");
    setError("");

    if (!recipientEmail.trim()) {
      setError("Debe ingresar un correo electrónico de destino.");
      return;
    }

    if (!validateEmail(recipientEmail)) {
      setError("Ingrese un correo electrónico válido.");
      return;
    }

    try {
      setIsSending(true);
      await sendRecordsEmail({ email: recipientEmail.trim() });
      setMessage("Email enviado correctamente.");
      setRecipientEmail("");
    } catch (err) {
      console.error(err);
      setError("No se pudo enviar el email.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="email-section email-panel">
      <div className="email-input-group">
        <label htmlFor="recipientEmail">Correo de destino</label>
        <input
          id="recipientEmail"
          type="email"
          placeholder="ejemplo@correo.com"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
        />
      </div>

      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleSendEmail}
        disabled={isSending}
      >
        {isSending ? "Enviando..." : "Enviar datos por email"}
      </button>

      {message && <div className="alert alert-success mt-16">{message}</div>}
      {error && <div className="alert alert-error mt-16">{error}</div>}
    </div>
  );
}

export default SendEmailButton;