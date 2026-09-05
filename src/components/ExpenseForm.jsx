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
    const amount = Number(data.amount);
    if (!data.title.trim() || !Number.isFinite(amount) || amount <= 0 || !data.date) {
      alert('Пожалуйста, заполните название, положительную сумму и дату.');
      return;
    }
    onSubmit({
      title: data.title.trim(),
        amount,
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
        <input aria-label="Название расхода" type="text" placeholder="Название" value={data.title} onChange={e => handle('title', e.target.value)} required />
        <input aria-label="Сумма расхода" type="number" min="0.01" step="0.01" placeholder="Сумма" value={data.amount} onChange={e => handle('amount', e.target.value)} required />
      </div>
      <div className="row">
        <select aria-label="Категория расхода" value={data.category} onChange={e => handle('category', e.target.value)}>
          <option value="Food">Еда</option>
          <option value="Transport">Транспорт</option>
          <option value="Shopping">Покупки</option>
          <option value="Utilities">Коммунальные услуги</option>
          <option value="Health">Здоровье</option>
          <option value="Entertainment">Развлечения</option>
          <option value="Other">Другое</option>
        </select>
        <input aria-label="Дата расхода" type="date" value={data.date} onChange={e => handle('date', e.target.value)} required />
      </div>
      <textarea aria-label="Заметка" placeholder="Заметки (необязательно)" value={data.note} onChange={e => handle('note', e.target.value)} />
      <div className="actions">
        <button type="submit">{initial ? 'Сохранить' : 'Добавить расход'}</button>
      </div>
    </form>
  );
}

export default ExpenseForm;
