import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { buildChartData } from "../../utils/chartHelpers";

function RecordChart({ records }) {
  const data = buildChartData(records);

  return (
    <div className="chart-box">
      <h3>Evolución de pH, etanol y densidad</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ph" stroke="#2DB4AD" strokeWidth={3} />
            <Line type="monotone" dataKey="ethanol" stroke="#3C3C3B" strokeWidth={3} />
            <Line type="monotone" dataKey="density" stroke="#B3B4B2" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RecordChart;