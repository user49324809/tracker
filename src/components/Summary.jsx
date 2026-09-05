import React, { useMemo } from 'react';
import { getCategoryLabel } from '../categories';
import { formatMoney } from '../formatMoney';

function Summary({ expenses = [] }) {
  const total = useMemo(() => expenses.reduce((s, e) => s + Number(e.amount), 0), [expenses]);
  const byCategory = useMemo(() => {
    const map = {};
    for (const e of expenses) {
      map[e.category] = (map[e.category] || 0) + Number(e.amount);
    }
    return map;
  }, [expenses]);
  return (
    <div className="summary">
      <h3>Итоги</h3>
      <div className="total">Всего: <strong>{formatMoney(total)}</strong></div>
      <div className="category-list">
        {Object.keys(byCategory).length === 0 && <div>Нет расходов</div>}
        {Object.entries(byCategory).map(([cat, sum]) => (
          <div key={cat} className="category-row">
            <span>{getCategoryLabel(cat)}</span>
            <span>{formatMoney(sum)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Summary;
