import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Employees/i);
  expect(linkElement).toBeInTheDocument();
});

test('Test table header id', () => {
render(<App />);
  const idElement = screen.getByText(/Id/i);
  expect(idElement).toBeInTheDocument();
});

test('Test table header login', () => {
render(<App />);
  const loginElement = screen.getByText(/Login/i);
  expect(loginElement).toBeInTheDocument();
});

test('Test table header name', () => {
render(<App />);
  const nameElement = screen.getByText(/Name/i);
  expect(nameElement).toBeInTheDocument();
});

test('Test table header salary', () => {
render(<App />);
  const salaryElement = screen.getByText(/Salary/i);
  expect(salaryElement).toBeInTheDocument();
});

test('Test table header actions', () => {
render(<App />);
  const actionsElement = screen.getByText(/Actions/i);
  expect(actionsElement).toBeInTheDocument();

});

test('Test user name', () => {
render(<App />);
  const userElement = screen.getByText(/Harry Potter/i);
  expect(userElement).toBeInTheDocument();
});

test('Test search min', () => {
render(<App />);
  const minElement = screen.getByText(/Minimum salary /i);
  expect(minElement).toBeInTheDocument();
});

test('Test search max', () => {
render(<App />);
  const maxElement = screen.getByText(/Maximum salary /i);
  expect(maxElement).toBeInTheDocument();
});

test('Test Function 1', () => {
render(<App />);
  const fun1Element = screen.getByText(/Function 1/i);
  expect(fun1Element).toBeInTheDocument();
});

test('Test Function 2', () => {
render(<App />);
  const fun2Element = screen.getByText(/Function 2/i);
  expect(fun2Element).toBeInTheDocument();
});

test('Test Function 3', () => {
render(<App />);
  const fun3Element = screen.getByText(/Function 3/i);
  expect(fun3Element).toBeInTheDocument();
});

test('Test Function 4', () => {
render(<App />);
  const fun4Element = screen.getByText(/Function 4/i);
  expect(fun4Element).toBeInTheDocument();

});

