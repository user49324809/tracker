import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler 
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);
function MonthlyLineChart({ expenses = [] }) {
  const { labels, sums } = useMemo(() => {
    const now = new Date();
    const months = [];
    const sumsMap = {};

    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
      months.push(key);
      sumsMap[key] = 0;
    }
    for (const e of expenses) {
      const d = new Date(e.date);
      const key = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
      if (sumsMap.hasOwnProperty(key)) sumsMap[key] += Number(e.amount);
    }
    return {
      labels: months.map(m => {
        const [y, mm] = m.split('-');
        return `${mm}.${y}`;
      }),
      sums: months.map(m => sumsMap[m])
    };
  }, [expenses]);
  const data = {
    labels,
    datasets: [
      {
        label: 'Расходы',
        data: sums,
        fill: true, 
        backgroundColor: 'rgba(54, 162, 235, 0.15)',
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.3,
      }
    ]
  };
  return (
    <div className="chart card">
      <h4>Динамика по месяцам (12 мес)</h4>
      <Line data={data} />
    </div>
  );
}

export default MonthlyLineChart;