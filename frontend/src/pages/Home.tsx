import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchTasks } from '../store/slices/taskSlice';
import TaskList from '../components/tasks/TaskList';
import TaskFilters from '../components/tasks/TaskFilters';

const Home = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks({}));
  }, [dispatch]);

  return (
<div className="p-6 max-w-5xl mx-auto">
  <h1 className="text-3xl font-bold text-gray-800 mb-6">Mis Tareas</h1>
  <TaskFilters />
  <br />
  <TaskList tasks={tasks} loading={loading} />
</div>

  );
};

export default Home;
