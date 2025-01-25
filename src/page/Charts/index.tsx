import { PieChart, Pie, Tooltip, BarChart, Bar, XAxis } from "recharts";

import "./index.scss";

const pieChartData = [
  { value: 400 },
  { value: 340 },
  { value: 320 },
  { value: 10 },
  { value: 278 },
  { value: 238 },
].map((item, index) => ({ ...item, name: `Item ${index + 1}` }));

const barChartData = [
  {
    value: 4000,
  },
  {
    value: 3000,
  },
  {
    value: 2000,
  },
  {
    value: 2780,
  },
  {
    value: 1890,
  },
  {
    value: 2390,
  },
  {
    value: 3490,
  },
].map((item, index) => ({ ...item, name: `Item ${index + 1}` }));

const Charts = () => {
  return (
    <div className="charts">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={pieChartData}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
      <BarChart width={400} height={200} data={barChartData}>
        <XAxis dataKey="name" />
        <Bar dataKey="value" fill="#8884d8" label />
        <Tooltip />
      </BarChart>
    </div>
  );
};

export default Charts;
