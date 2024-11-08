interface TaskSearchProps {
  onSearch: (query: string) => void;
}

const TaskSearch = ({ onSearch }: TaskSearchProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      onChange={handleChange}
      placeholder="Task search..."
      className="w-full p-3 border border-gray-300 rounded-lg 
                 focus:ring-2 focus:ring-purple-200 focus:border-transparent
                 transition-all duration-300 outline-none
                 placeholder-gray-400"
    />
  );
};

export default TaskSearch;