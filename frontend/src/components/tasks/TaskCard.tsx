import { api } from '../../services/api';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../../store/slices/taskSlice';
import type { AppDispatch } from '../../store/store';
import type { Task } from '../../types';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>();

  const toggleCompleted = async () => {
    try {
      await api.patch(`/tasks/toggle/${task.id}`);
      dispatch(fetchTasks({}));
    } catch (err) {
      console.error('Error al cambiar estado:', err);
    }
  };

  return (
<div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div className="flex-1">
      <h3 className={`text-xl font-semibold tracking-tight ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
        {task.title}
      </h3>
      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
      <div className="text-xs text-gray-400 mt-1">
        Vence: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Sin fecha'}
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {task.tags.map((tag) => (
          <span
            key={tag.id}
            className="text-xs bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-medium"
          >
            #{tag.name}
          </span>
        ))}
      </div>
    </div>

    <button
      onClick={toggleCompleted}
      className={`px-4 py-2 rounded-full text-sm font-medium shadow transition-colors ${
        task.completed
          ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          : 'bg-green-500 text-white hover:bg-green-600'
      }`}
    >
      {task.completed ? 'Hecha' : 'Marcar hecha'}
    </button>
  </div>
</div>


  );
};

export default TaskCard;
