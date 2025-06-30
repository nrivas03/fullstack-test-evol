import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import { updateTask, fetchTasks } from '../../store/slices/taskSlice';
import type { Task, Tag } from '../../types';
import { api } from '../../services/api';

interface Props {
  task: Task;
  onClose: () => void;
}
const TaskFormModal = ({ task, onClose }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    api.get('/tags').then((res) => setTags(res.data));
  }, []);

  const validationSchema = Yup.object({
    title: Yup.string().required('El título es obligatorio'),
    description: Yup.string().required('La descripción es obligatoria'),
    dueDate: Yup.string().required('La fecha es obligatoria'),
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">✖</button>
        <h2 className="text-xl font-bold mb-4">Editar Tarea</h2>

        <Formik
          initialValues={{
            title: task.title,
            description: task.description,
            dueDate: task.dueDate?.slice(0, 10) ?? '',
            tags: task.tags.map(t => t.name),
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              await dispatch(updateTask({
                id: task.id,
                updates: {
                  ...values,
                  tags: tags.filter(tag => values.tags.includes(tag.name)),
                },
              }) as unknown as ReturnType<typeof updateTask>);
              dispatch(fetchTasks({}));
              onClose();
            } catch (err) {
              console.error('Error al actualizar tarea:', err);
            }
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <label className="block font-medium">Título</label>
                <Field name="title" className="w-full p-2 border rounded" />
                <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block font-medium">Descripción</label>
                <Field as="textarea" name="description" className="w-full p-2 border rounded" />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block font-medium">Fecha Límite</label>
                <Field type="date" name="dueDate" className="w-full p-2 border rounded" />
                <ErrorMessage name="dueDate" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block font-medium">Etiquetas</label>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <label key={tag.id} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={values.tags.includes(tag.name)}
                        onChange={(e) => {
                          const updatedTags = e.target.checked
                            ? [...values.tags, tag.name]
                            : values.tags.filter(t => t !== tag.name);
                          setFieldValue('tags', updatedTags);
                        }}
                      />
                      <span className="bg-gray-200 px-2 py-1 rounded-full">#{tag.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Guardar Cambios
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TaskFormModal;
