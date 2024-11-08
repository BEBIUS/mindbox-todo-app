import { useState, useEffect, useMemo } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskSearch from './components/TaskSearch';
import squiggly from './assets/sssquiggly.svg'

interface Task {
  id: number;
  text: string;
  completed: boolean;
  important: boolean;
}

const EMPTY_STATE_EMOJI = {
  all: '🎉',
  completed: '✅',
  important: '⭐',
  uncompleted: '📝'
} as const;

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'completed' | 'important' | 'uncompleted'>('all');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      setTasks(parsedTasks);
    }
    setIsInitialized(true);
  }, []);
  
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, isInitialized]);

  const handleAddTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
      important: false,
    };
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      return updatedTasks;
    });
  };

  const handleToggleComplete = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleToggleImportant = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, important: !task.important } : task
      )
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {
        if (filterType === 'completed') return task.completed;
        if (filterType === 'uncompleted') return !task.completed;
        if (filterType === 'important') return task.important;
        return true; // 'all'
      })
      .filter(task =>
        task.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [tasks, filterType, searchQuery]);
    
  return (
    <div className="relative min-h-screen bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 py-8 px-4">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={squiggly}
          className="absolute w-full h-full object-cover opacity-30"
          alt=""
          aria-hidden="true"
        />
      </div>
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-0 md:space-y-8">
          {/* Заголовок */}
          <h1 className="text-5xl font-light text-center text-white
                       tracking-tight drop-shadow-lg
                       transform hover:scale-105 transition-transform duration-300">
            <span className="hidden md:block bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-600">
              TO-DO LIST
            </span>
          </h1>

          {/* Основной контент */}
          <div className="backdrop-blur-sm bg-white/90 rounded-2xl 
                        shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]
                        p-8 space-y-8">
            
            {/* Форма добавления */}
            <div>
              <TaskForm onAddTask={handleAddTask} />
            </div>

            {/* Поиск */}
            <div>
              <TaskSearch onSearch={handleSearch} />
            </div>

{/* Статистика */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  <div 
    className="bg-blue-50 rounded-xl p-4 text-center transition-transform hover:scale-105 cursor-pointer"
    onClick={() => setFilterType('all')}
  >
    <span className="block text-2xl font-bold text-blue-600">
      {tasks.length}
    </span>
    <span className={`text-sm text-blue-500 ${filterType === 'all' ? 'font-bold' : ''}`}>
      Total
    </span>
  </div>
  <div 
    className="bg-green-50 rounded-xl p-4 text-center transition-transform hover:scale-105 cursor-pointer"
    onClick={() => setFilterType('completed')}
  >
    <span className="block text-2xl font-bold text-green-600">
      {tasks.filter(task => task.completed).length}
    </span>
    <span className={`text-sm text-green-500 ${filterType === 'completed' ? 'font-bold' : ''}`}>
      Completed
    </span>
  </div>
  <div 
    className="bg-orange-50 rounded-xl p-4 text-center transition-transform hover:scale-105 cursor-pointer"
    onClick={() => setFilterType('uncompleted')}
  >
    <span className="block text-2xl font-bold text-orange-600">
      {tasks.filter(task => !task.completed).length}
    </span>
    <span className={`text-sm text-orange-500 ${filterType === 'uncompleted' ? 'font-bold' : ''}`}>
      Not Completed
    </span>
  </div>
  <div 
    className="bg-purple-50 rounded-xl p-4 text-center transition-transform hover:scale-105 cursor-pointer"
    onClick={() => setFilterType('important')}
  >
    <span className="block text-2xl font-bold text-purple-600">
      {tasks.filter(task => task.important).length}
    </span>
    <span className={`text-sm text-purple-500 ${filterType === 'important' ? 'font-bold' : ''}`}>
      Important
    </span>
  </div>
</div>

            {/* Список задач */}
            <div className="animate-slide-up">
              {filteredTasks.length > 0 ? (
                <TaskList
                  tasks={filteredTasks}
                  onToggleComplete={handleToggleComplete}
                  onToggleImportant={handleToggleImportant}
                  onDeleteTask={handleDeleteTask}
                />
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">
                    {EMPTY_STATE_EMOJI[filterType]}
                  </div>
                  <h3 className="text-xl font-medium text-gray-600">
                    {filterType === 'all' 
                      ? 'No tasks yet!' 
                      : filterType === 'completed'
                      ? 'No completed tasks'
                      : filterType === 'uncompleted'
                      ? 'No uncompleted tasks'
                      : 'No important tasks'}
                  </h3>
                  <p className="text-gray-400">
                    {filterType === 'all' 
                      ? 'Add a new task to get started and accomplish your goals!'
                      : 'Tasks will appear here when marked as ' + filterType}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Подвал */}
          <footer className="text-center text-white/80 text-sm">
            <p>Created with ❤️  {new Date().getFullYear()}</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;