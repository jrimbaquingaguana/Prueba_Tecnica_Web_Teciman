import { formatDate } from "../../utils/formatDate";

function RecordTable({ records }) {
  return (
    <div className="table-wrapper">
      <table className="records-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Etanol</th>
            <th>Glucosa</th>
            <th>Fructosa</th>
            <th>pH</th>
            <th>Densidad</th>
            <th>Extracto</th>
            <th>Fecha y hora</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.ethanol}</td>
              <td>{record.glucose}</td>
              <td>{record.fructose}</td>
              <td>{record.ph}</td>
              <td>{record.density}</td>
              <td>{record.extract}</td>
              <td>{formatDate(record.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecordTable;