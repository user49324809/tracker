import React, { useState } from 'react';

function ExpenseForm({ onSubmit, initial = null }) {
  const [data, setData] = useState(() => initial ?? {
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().slice(0,10),
    note: '',
  });
  const handle = (k, v) => setData(d => ({ ...d, [k]: v }));
  const submit = (e) => {
  e.preventDefault();
  const amount = parseFloat(data.amount);
    if (!data.title.trim() || amount <= 0) {
      alert('Пожалуйста, введите корректные название и сумму.');
      return;
    }
    onSubmit({
      title: data.title.trim(),
      amount: amount,
      category: data.category,
      date: data.date,
      note: data.note.trim()
    });
    if (!initial) {
      setData({ title: '', amount: '', category: 'Food', date: new Date().toISOString().slice(0,10), note: '' });
    }
  };
  return (
    <form className="expense-form" onSubmit={submit}>
      <div className="row">
        <input type='text' placeholder="Название" value={data.title} onChange={e => handle('title', e.target.value)} />
        <input type='number' placeholder="Сумма" value={data.amount} onChange={e => handle('amount', e.target.value)} />
      </div>
      <div className="row">
        <select value={data.category} onChange={e => handle('category', e.target.value)}>
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Utilities</option>
          <option>Health</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>
        <input type="date" value={data.date} onChange={e => handle('date', e.target.value)} />
      </div>
      <textarea placeholder="Заметки (опционально)" value={data.note} onChange={e => handle('note', e.target.value)} />
      <div className="actions">
        <button type="submit">{initial ? 'Сохранить' : 'Добавить расход'}</button>
      </div>
    </form>
  );
}

export default ExpenseForm;