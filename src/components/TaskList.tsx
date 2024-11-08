
interface Task {
    id: number;
    text: string;
    completed: boolean;
    important: boolean;
}

interface TaskListProps {
    tasks: Task[];
    onToggleComplete: (id: number) => void;
    onToggleImportant: (id: number) => void;
    onDeleteTask: (id: number) => void;
}

const TaskList = ({ tasks, onToggleComplete, onToggleImportant, onDeleteTask }: TaskListProps) => {
    return (
        <ul className="mt-6 space-y-3">
            {tasks.map((task) => (
                <li
                    key={task.id}
                    className={`
                        group
                        p-4 rounded-lg shadow-sm
                        transition-all duration-300 ease-in-out
                        hover:shadow-md hover:-translate-y-0.5
                        ${task.completed ? 'bg-gray-50' : 'bg-white'}
                        ${task.important ? 'border-l-4 border-yellow-400' : ''}
                    `}
                >
                    {/* Контейнер для содержимого */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                        <span
                            className={`
                                cursor-pointer select-none
                                transition-all duration-200
                                break-words whitespace-pre-wrap
                                ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}
                                ${task.important ? 'font-semibold' : ''}
                            `}
                            onClick={() => onToggleComplete(task.id)}
                        >
                            {task.text}
                        </span>

                        {/* Кнопки действий */}
                        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">

                            <button
                                onClick={() => onToggleImportant(task.id)}
                                className={`
                                    px-3 py-1 rounded-full text-sm
                                    transition-all duration-200
                                    ${task.important
                                        ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                                    sm:opacity-0 sm:group-hover:opacity-100
                                `}
                            >
                                {task.important ? '⭐' : '☆'}
                            </button>

                            <button
                                onClick={() => onDeleteTask(task.id)}
                                className={`
                                    p-2 rounded-full
                                    transition-all duration-200
                                    text-gray-400 hover:text-red-500
                                    hover:bg-red-50
                                    sm:opacity-0 sm:group-hover:opacity-100
                                `}
                                aria-label="Delete task"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </li>
            ))}

            {/* Сообщение, если нет задач */}
            {tasks.length === 0 && (
                <li className="text-center py-8 text-gray-500">
                    The task list is empty
                </li>
            )}
        </ul>
    );
};

export default TaskList;