import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/CategoryPieChart', () => () => <div>Диаграмма категорий</div>);
jest.mock('./components/MonthlyLineChart', () => () => <div>График по месяцам</div>);

beforeEach(() => {
  localStorage.clear();
});

test('renders the expense tracker', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /expense tracker/i })).toBeInTheDocument();
  expect(screen.getByText(/нет расходов для отображения/i)).toBeInTheDocument();
});

test('adds an expense and updates the total', () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/название расхода/i), { target: { value: 'Продукты' } });
  fireEvent.change(screen.getByLabelText(/сумма расхода/i), { target: { value: '1250' } });
  fireEvent.click(screen.getByRole('button', { name: /добавить расход/i }));

  expect(screen.getByText('Продукты')).toBeInTheDocument();
  expect(screen.getByText(/всего:/i)).toHaveTextContent('1 250 ₽');
});
