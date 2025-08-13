import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
function CategoryPieChart({ expenses = [] }) {
  const byCategory = useMemo(() => {
    const map = {};
    for (const e of expenses) {
      map[e.category] = (map[e.category] || 0) + Number(e.amount);
    }
    return map;
  }, [expenses]);
  const labels = Object.keys(byCategory);
  const data = {
    labels,
    datasets: [
      {
        data: labels.map(l => byCategory[l]),
        backgroundColor: [
          '#4dc9f6','#f67019','#f53794','#537bc4','#acc236','#166a8f','#00a950'
        ].slice(0, labels.length),
        hoverOffset: 6
      }
    ]
  };
  if (labels.length === 0) return <div className="chart-empty">Нет данных для диаграммы</div>;
  return (
    <div className="chart card">
      <h4>Расходы по категориям</h4>
      <Pie data={data} />
    </div>
  );
}

export default CategoryPieChart;