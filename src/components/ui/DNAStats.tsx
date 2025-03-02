import { ChartData } from "chart.js";
import { Doughnut } from "react-chartjs-2";

interface DNAStatsProps {
  data: ChartData<"doughnut", number[], unknown>;
}
export default function DNAStats({ data }: DNAStatsProps) {
  return <Doughnut data={data} />;
}
