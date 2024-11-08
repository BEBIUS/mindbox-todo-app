import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';
import '@testing-library/jest-dom';

// Мокируем функцию onAddTask
const mockOnAddTask = jest.fn();

describe('TaskForm', () => {
  test('рендерит форму и поле ввода', () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);
    
    const inputElement = screen.getByPlaceholderText('Enter a new task');
    const buttonElement = screen.getByRole('button', { name: /Add/i });
    
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('добавление задачи при отправке формы с валидным вводом', () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);
    
    const inputElement = screen.getByPlaceholderText('Enter a new task');
    const buttonElement = screen.getByRole('button', { name: /Add/i });
    
    fireEvent.change(inputElement, { target: { value: 'New Task' } });
    fireEvent.click(buttonElement);

    expect(mockOnAddTask).toHaveBeenCalledWith('New Task');
    expect(inputElement).toHaveValue('');
  });

  test('кнопка "Add" неактивна, если поле ввода пустое', () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);
    
    const buttonElement = screen.getByRole('button', { name: /Add/i });
    
    expect(buttonElement).toBeDisabled();
  });

  test('ограничение на количество символов в задаче', () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);
    
    const inputElement = screen.getByPlaceholderText('Enter a new task');
    fireEvent.change(inputElement, { target: { value: 'a'.repeat(51) } });
    
    expect(inputElement).toHaveValue('a'.repeat(50));
  });
});
