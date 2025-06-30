import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { fetchTasks } from '../../store/slices/taskSlice';
import { api } from '../../services/api';
import type { Tag } from '../../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

const TaskFilters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [status, setStatus] = useState<'all' | 'completed' | 'pending'>('all');
  const [dueDate, setDueDate] = useState<string>('');
  const [sortBy, setSortBy] = useState<'dueDate' | 'createdAt' | 'title'>('dueDate');
  const [title, setTitle] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    api.get('/tags').then((res) => setTags(res.data));
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const filters: {
        completed?: boolean;
        tags?: string;
        dueDate?: string;
        sort?: 'dueDate' | 'createdAt' | 'title';
        title?: string;
      } = {};

      if (status !== 'all') filters.completed = status === 'completed';
      if (selectedTags.length > 0) filters.tags = selectedTags.join(',');
      if (dueDate) filters.dueDate = dueDate;
      if (sortBy) filters.sort = sortBy;
      if (title.trim()) filters.title = title.trim();

      dispatch(fetchTasks(filters));
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [title, status, selectedTags, dueDate, sortBy, dispatch]);

  return (
    <div className="bg-white shadow-sm border border-gray-200 p-4 rounded-2xl space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Filtros</h2>
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
        >
          {showFilters ? 'Ocultar' : 'Mostrar'} filtros
          {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {showFilters && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar por título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Comprar leche"
              className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'all' | 'completed' | 'pending')}
              className="w-full rounded-md border border-gray-300 p-2"
            >
              <option value="all">Todas</option>
              <option value="completed">Completadas</option>
              <option value="pending">Pendientes</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Etiquetas</label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <label key={tag.name} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag.name)}
                    onChange={(e) => {
                      setSelectedTags((prev) =>
                        e.target.checked
                          ? [...prev, tag.name]
                          : prev.filter((name) => name !== tag.name)
                      );
                    }}
                    className="accent-indigo-600"
                  />
                  <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full font-medium">
                    #{tag.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha límite</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'dueDate' | 'createdAt' | 'title')}
              className="w-full rounded-md border border-gray-300 p-2"
            >
              <option value="dueDate">Fecha Límite</option>
              <option value="createdAt">Fecha de Creación</option>
              <option value="title">Título</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskFilters;
