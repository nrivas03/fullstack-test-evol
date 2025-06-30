import { useDispatch } from "react-redux";
import { fetchTasks, deleteTask } from "../../store/slices/taskSlice";
import type { AppDispatch } from "../../store/store";
import type { Task } from "../../types";
import { toggleTaskCompleted } from "../../services";
import { useState } from "react";
import TaskFormModal from "../modals/TaskFormModal";
import { Trash } from "lucide-react";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [editing, setEditing] = useState(false);

  const toggleCompleted = async () => {
    try {
      await toggleTaskCompleted(task.id);
      dispatch(fetchTasks({}));
    } catch (err) {
      console.error("Error al cambiar estado:", err);
    }
  };

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de eliminar esta tarea?")) {
      await dispatch(deleteTask(task.id));
      dispatch(fetchTasks({}));
    }
  };

  return (
    <>
      {editing && (
        <TaskFormModal task={task} onClose={() => setEditing(false)} />
      )}

      <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3
              className={`text-xl font-semibold tracking-tight ${
                task.completed ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {task.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            <div className="text-xs text-gray-400 mt-1">
              Vence:{" "}
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "Sin fecha"}
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
                ? "bg-gray-200 text-gray-600 hover:bg-gray-300"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {task.completed ? "Hecha" : "Marcar hecha"}
          </button>
        </div>

        <div className="flex justify-end mt-6 gap-2">
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-sm"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-full hover:bg-red-100 text-red-500 hover:text-red-600 transition"
            title="Eliminar tarea"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
