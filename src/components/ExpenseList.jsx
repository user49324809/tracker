import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import { getCategoryLabel } from '../categories';
import { formatMoney } from '../formatMoney';
function ExpenseList({ expenses, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const formatDate = (date) => {
    if (!date) return 'Дата не указана';
    const [year, month, day] = date.split('-');
    return `${day}.${month}.${year}`;
  };
  if (!expenses.length) return <p className="empty">Нет расходов для отображения.</p>;
  return (
    <div className="expense-list">
        {expenses.map(exp => (
        <div key={exp.id} className="expense-item">
          <div className="main">
            <div className="title">{exp.title}</div>
            <div className="meta">
              {getCategoryLabel(exp.category)} • {formatDate(exp.date)}
            </div>
          </div>
          <div className="right-cell">
            <div className="amount">
              {formatMoney(exp.amount)}
            </div>
            <div className="actions-small">
              <button aria-label={`Редактировать расход «${exp.title}»`} title="Редактировать" onClick={() => setEditingId(editingId === exp.id ? null : exp.id)}>✏️</button>
              <button aria-label={`Удалить расход «${exp.title}»`} title="Удалить" onClick={() => { if(window.confirm('Удалить расход?')) onDelete(exp.id); }}>🗑️</button>
            </div>
          </div>
          {editingId === exp.id && (
            <div className="editor">
              <ExpenseForm
                initial={{ title: exp.title, amount: exp.amount, category: exp.category, date: exp.date, note: exp.note }}
                onSubmit={(data) => { onUpdate(exp.id, data); setEditingId(null); }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
