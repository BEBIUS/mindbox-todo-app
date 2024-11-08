import { useState } from 'react';

interface TaskFormProps {
  onAddTask: (task: string) => void;
}

const MAX_TASK_LENGTH = 50;

const TaskForm = ({ onAddTask }: TaskFormProps) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTask = task.trim();
    if (trimmedTask && trimmedTask.length <= MAX_TASK_LENGTH) {
      onAddTask(trimmedTask);
      setTask('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= MAX_TASK_LENGTH) {
      setTask(newValue);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <label htmlFor="taskInput" className="sr-only">
          Enter a new task
        </label>
        <input
          id="taskInput"
          type="text"
          value={task}
          onChange={handleChange}
          placeholder="Enter a new task"
          aria-label="Enter a new task"
          className="w-full p-2 border rounded-lg transition duration-300 outline-none
            border-gray-300 placeholder:text-gray-400
            focus:border-transparent focus:ring-2 focus:ring-purple-200"
        />
        <button
          type="submit"
          disabled={!task.trim()}
          className={`px-6 py-2.5 rounded-lg font-medium text-white
            bg-gradient-to-r from-blue-500 to-indigo-600
            hover:from-blue-600 hover:to-indigo-700
            active:scale-95 transform transition-all duration-200 shadow-lg hover:shadow-xl
            ${!task.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Add
        </button>
      </form>
      <div className="text-sm text-gray-500">
        Characters left: {MAX_TASK_LENGTH - task.length}
      </div>
    </div>
  );
};

export default TaskForm;