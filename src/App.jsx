import React, { useEffect, useState, useMemo } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Summary from './components/Summary';
import CategoryPieChart from './components/CategoryPieChart';
import MonthlyLineChart from './components/MonthlyLineChart';
const LS_KEY = 'expenses_v1';
const createExpenseId = () => window.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
function App() {
  const [expenses, setExpenses] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState({ type: 'all' }); 
  const [range, setRange] = useState({ from: '', to: '' }); 
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(expenses));
  }, [expenses]);
  const addExpense = (expense) => {
    setExpenses(prev => [{ ...expense, id: createExpenseId() }, ...prev]);
  };
  const updateExpense = (id, data) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, ...data } : e));
  };
  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };
  const filteredExpenses = useMemo(() => {
    if (filter.type === 'all') return expenses;
    const now = new Date();
    if (filter.type === 'month') {
      return expenses.filter(e => {
        const d = new Date(e.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      });
    }
    if (filter.type === 'year') {
      return expenses.filter(e => {
        const d = new Date(e.date);
        return d.getFullYear() === now.getFullYear();
      });
    }
    if (filter.type === 'range') {
      if (!range.from || !range.to) return expenses;
      const from = new Date(range.from);
      const to = new Date(range.to);
      to.setHours(23,59,59,999);
      return expenses.filter(e => {
        const d = new Date(e.date);
        return d >= from && d <= to;
      });
    }
    return expenses;
  }, [expenses, filter, range]);

  return (
    <div className="container">
      <header>
        <h1>Expense Tracker</h1>
        <p className="subtitle">Добавляй расходы, смотри аналитику и диаграммы</p>
      </header>
      <main>
        <section className="left">
          <ExpenseForm onSubmit={addExpense} />
          <div className="filter-row">
            <div className="filters">
              <button className={filter.type==='all'?'active':''} aria-pressed={filter.type === 'all'} onClick={() => setFilter({ type: 'all' })}>Все</button>
              <button className={filter.type==='month'?'active':''} aria-pressed={filter.type === 'month'} onClick={() => setFilter({ type: 'month' })}>Текущий месяц</button>
              <button className={filter.type==='year'?'active':''} aria-pressed={filter.type === 'year'} onClick={() => setFilter({ type: 'year' })}>Текущий год</button>
              <button className={filter.type==='range'?'active':''} aria-pressed={filter.type === 'range'} onClick={() => setFilter({ type: 'range' })}>Диапазон</button>
            </div>
            {filter.type === 'range' && (
              <div className="range-inputs">
                <input aria-label="Начало периода" type="date" value={range.from} onChange={e => setRange(r => ({...r, from: e.target.value}))} />
                <input aria-label="Конец периода" type="date" value={range.to} onChange={e => setRange(r => ({...r, to: e.target.value}))} />
              </div>
            )}
          </div>
          <ExpenseList
            expenses={filteredExpenses}
            onDelete={deleteExpense}
            onUpdate={updateExpense}
          />
        </section>
        <aside className="right">
          <Summary expenses={filteredExpenses} />
          <CategoryPieChart expenses={filteredExpenses} />
          <MonthlyLineChart expenses={filteredExpenses} />
        </aside>
      </main>
      <footer>
        <small>Данные хранятся в localStorage — ничего не отправляется на сервер.</small>
      </footer>
    </div>
  );
}

export default App;
