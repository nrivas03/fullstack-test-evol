import type { Task } from '../../types';
import TaskCard from './TaskCard';

interface Props {
  tasks: Task[];
  loading: boolean;
}

const TaskList = ({ tasks, loading }: Props) => {
  if (loading) return <p>Cargando...</p>;
  if (!tasks.length) return <p>No hay tareas</p>;

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
