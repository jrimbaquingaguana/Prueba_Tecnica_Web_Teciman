import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import RecordTable from "../components/records/RecordTable";
import RecordChart from "../components/records/RecordChart";
import SendEmailButton from "../components/records/SendEmailButton";
import { getRecords } from "../api/recordApi";

function RecordsPage() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecords = async () => {
    try {
      setIsLoading(true);
      const data = await getRecords();
      setRecords(data);
    } catch (error) {
      console.error(error);
      setRecords([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <MainLayout>
      <section className="page-section">
        <div className="section-header">
          <div>
            <h2>Visualización de registros</h2>
            <p>Consulta todos los registros almacenados y su evolución.</p>
          </div>

          <SendEmailButton />
        </div>

        {isLoading ? (
          <Loader />
        ) : records.length === 0 ? (
          <EmptyState message="Aún no existen registros para mostrar." />
        ) : (
          <>
            <section className="card">
              <RecordChart records={records} />
            </section>

            <section className="card">
              <div className="card-header">
                <h3>Tabla de registros</h3>
                <p>Vista resumida de los datos almacenados.</p>
              </div>
              <RecordTable records={records} />
            </section>
          </>
        )}
      </section>
    </MainLayout>
  );
}

export default RecordsPage;