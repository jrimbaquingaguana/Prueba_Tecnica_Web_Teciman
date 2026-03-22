import MainLayout from "../components/layout/MainLayout";
import RecordForm from "../components/records/RecordForm";

function CreateRecordPage() {
  return (
    <MainLayout>
      <section className="hero-section">
        <div className="hero-text">
          <span className="badge">Prueba técnica</span>
          <h2>Registro analítico de muestras</h2>
          <p>
            Aplicación web para capturar parámetros clave de análisis y
            almacenarlos de forma persistente, con una interfaz clara y
            consistente.
          </p>
        </div>
      </section>

      <RecordForm />
    </MainLayout>
  );
}

export default CreateRecordPage;