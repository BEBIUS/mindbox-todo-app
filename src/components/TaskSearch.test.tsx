import { render, screen, fireEvent } from '@testing-library/react';
import TaskSearch from './TaskSearch';
import '@testing-library/jest-dom';

describe('TaskSearch Component', () => {
  test('рендерит поле ввода и вызывает onSearch с правильным значением', () => {
    const mockOnSearch = jest.fn();
    render(<TaskSearch onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText('Task search...');
    
    expect(inputElement).toBeInTheDocument();
    
    fireEvent.change(inputElement, { target: { value: 'test query' } });
    
    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });
});
