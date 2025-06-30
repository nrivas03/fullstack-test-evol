import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import type { Tag } from '../../types';

interface FormValues {
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
}

const TaskForm = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState<string>(''); // 👈 estado para etiqueta personalizada
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/tags').then((res) => setTags(res.data));
  }, []);

  const initialValues: FormValues = {
    title: '',
    description: '',
    dueDate: '',
    tags: [],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('El título es obligatorio'),
    description: Yup.string().required('La descripción es obligatoria'),
    dueDate: Yup.string(),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await api.post('/tasks', {
        ...values,
        completed: false,
      });
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Crear Nueva Tarea</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="space-y-4">
            <div>
              <label className="block font-medium">Título</label>
              <Field
                name="title"
                className="w-full mt-1 p-2 border rounded"
                placeholder="Ej: Comprar leche"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-medium">Descripción</label>
              <Field
                as="textarea"
                name="description"
                className="w-full mt-1 p-2 border rounded"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-medium">Fecha Límite</label>
              <Field type="date" name="dueDate" className="w-full mt-1 p-2 border rounded" />
              <ErrorMessage name="dueDate" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-medium mb-1">Etiquetas</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <label key={tag.id ?? tag.name} className="flex items-center gap-1 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={values.tags.includes(tag.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFieldValue('tags', [...values.tags, tag.name]);
                        } else {
                          setFieldValue(
                            'tags',
                            values.tags.filter((name) => name !== tag.name)
                          );
                        }
                      }}
                    />
                    <span className="bg-gray-200 px-2 py-1 rounded-full">#{tag.name}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Nueva etiqueta"
                  className="border p-2 rounded w-full"
                />
                <button
                  type="button"
                  onClick={() => {
                    const trimmed = newTag.trim();
                    if (trimmed && !values.tags.includes(trimmed)) {
                      setFieldValue('tags', [...values.tags, trimmed]);
                      setTags((prev) => [...prev, { id: Date.now(), name: trimmed }]); // 👈 se agrega a los tags visibles
                      setNewTag('');
                    }
                  }}
                  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                >
                  Agregar
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Crear Tarea
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaskForm;
