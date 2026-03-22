import { useState } from "react";
import { createRecord } from "../../api/recordApi";

const initialForm = {
  ethanol: "",
  glucose: "",
  fructose: "",
  titratable_acidity: "",
  volatile_acids: "",
  malic_acid: "",
  tartaric_acid: "",
  lactic_acid: "",
  ph: "",
  density: "",
  must_weight_brix: "",
  extract: "",
  glycerol: "",
  yeast_assimilable_nitrogen: "",
};

function RecordForm() {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fields = [
    { name: "ethanol", label: "Etanol (% v/v)" },
    { name: "glucose", label: "Glucosa (g/L)" },
    { name: "fructose", label: "Fructosa (g/L)" },
    { name: "titratable_acidity", label: "Acidez valorable (g/L)" },
    { name: "volatile_acids", label: "Ácidos volátiles (g/L)" },
    { name: "malic_acid", label: "Ácido málico (g/L)" },
    { name: "tartaric_acid", label: "Ácido tartárico (g/L)" },
    { name: "lactic_acid", label: "Ácido láctico (g/L)" },
    { name: "ph", label: "pH" },
    { name: "density", label: "Densidad (g/mL)" },
    { name: "must_weight_brix", label: "Peso del mosto (°Brix)" },
    { name: "extract", label: "Extracto (g/L)" },
    { name: "glycerol", label: "Glicerol (g/L)" },
    {
      name: "yeast_assimilable_nitrogen",
      label: "Nitrógeno asimilable por la levadura (mg/L)",
    },
  ];

  const sanitizeNumericValue = (value) => {
    let cleaned = value.replace(",", ".");
    cleaned = cleaned.replace(/[^0-9.]/g, "");

    const parts = cleaned.split(".");
    if (parts.length > 2) {
      cleaned = `${parts[0]}.${parts.slice(1).join("")}`;
    }

    return cleaned;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const cleanedValue = sanitizeNumericValue(value);

    setFormData((prev) => ({
      ...prev,
      [name]: cleanedValue,
    }));
  };

  const handleKeyDown = (event) => {
    if (["e", "E", "+", "-"].includes(event.key)) {
      event.preventDefault();
    }
  };

  const buildPayload = () => {
    const payload = {};
    Object.keys(formData).forEach((key) => {
      payload[key] = Number(formData[key]);
    });
    return payload;
  };

  const validateForm = () => {
    for (const key of Object.keys(formData)) {
      const value = formData[key];

      if (value === "") {
        return "Todos los campos son obligatorios.";
      }

      if (Number.isNaN(Number(value))) {
        return "Todos los campos deben ser numéricos.";
      }
    }

    return "";
  };

  const handleClear = () => {
    setFormData(initialForm);
    setMessage("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsSubmitting(true);
      await createRecord(buildPayload());
      setMessage("Registro guardado correctamente.");
      setFormData(initialForm);
    } catch (err) {
      console.error(err);
      setError("No se pudo guardar el registro.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="card">
      <div className="card-header">
        <h2>Introducción de datos</h2>
        <p>
          Introduce los parámetros analíticos del mosto o vino para guardar el
          registro en la base de datos.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="record-form">
        <div className="form-grid">
          {fields.map((field) => (
            <div className="form-group" key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                id={field.name}
                name={field.name}
                type="text"
                inputMode="decimal"
                value={formData[field.name]}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onWheel={(e) => e.target.blur()}
                placeholder="Ingrese un valor"
                autoComplete="off"
              />
            </div>
          ))}
        </div>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        <div className="form-actions" style={{ gap: "12px" }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClear}
          >
            Limpiar
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Guardar registro"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default RecordForm;