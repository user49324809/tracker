import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';
function ExpenseList({ expenses, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  if (!expenses.length) return <p className="empty">Нет расходов для отображения.</p>;
  return (
    <div className="expense-list">
        {expenses.map(exp => (
        <div key={exp.id} className="expense-item">
          <div className="main">
            <div className="title">{exp.title}</div>
            <div className="meta">
              {exp.category} • {exp.date ? new Date(exp.date).toLocaleDateString() : 'Дата не указана'}
            </div>
          </div>
          <div className="right-cell">
            <div className="amount">
              {typeof exp.amount === 'number' ? exp.amount.toLocaleString() : '0'} ₽
            </div>
            <div className="actions-small">
              <button onClick={() => setEditingId(editingId === exp.id ? null : exp.id)}>✏️</button>
              <button onClick={() => { if(window.confirm('Удалить расход?')) onDelete(exp.id); }}>🗑️</button>
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