import {
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
} from "recharts";

const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <BarChart data={data} width={48} height={48}>
        <Tooltip />
        <XAxis dataKey={"date"} />
        <YAxis dataKey={"value"} />
        <Bar dataKey="value" fill="#3498db" />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default BarChartComponent;
