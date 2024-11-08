import { useState, useEffect, useMemo } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskSearch from './components/TaskSearch';
import TaskStats from './components/TaskStats';
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
    <div className="relative min-h-screen bg-gradient-to-r from-slate-900 to-slate-700 py-8 px-4">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <img
          src={squiggly}
          className="absolute w-full h-full object-cover opacity-70"
        />
      </div>
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-0 md:space-y-8">
          <h1 className="text-5xl font-light text-center text-white tracking-tight drop-shadow-lg transform hover:scale-105 transition-transform duration-300">
            <span className="hidden md:block bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-600">
              TO-DO LIST
            </span>
          </h1>

          <div className="backdrop-blur-sm bg-white/90 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] p-8 space-y-8">
            
            <div>
              <TaskForm onAddTask={handleAddTask} />
            </div>
  
            {/* Поиск */}
            <div>
              <TaskSearch onSearch={handleSearch} />
            </div>
  
            {/* Фильтр */}
            <TaskStats 
              tasks={tasks}
              filterType={filterType}
              setFilterType={setFilterType}
            />
  
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
  
          <footer className="text-center text-white/80 text-sm">
            <p>Created with ❤️ {new Date().getFullYear()}</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;