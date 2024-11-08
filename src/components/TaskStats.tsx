interface Task {
  id: number;
  text: string;
  completed: boolean;
  important: boolean;
}

interface TaskStatsProps {
  tasks: Task[];
  filterType: 'all' | 'completed' | 'important' | 'uncompleted';
  setFilterType: (type: 'all' | 'completed' | 'important' | 'uncompleted') => void;
}

const TaskStats: React.FC<TaskStatsProps> = ({ tasks, filterType, setFilterType }) => {
  return (
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
  );
};

export default TaskStats;
