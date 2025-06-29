'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    await queryInterface.bulkInsert('Tasks', [
      {
        title: 'Completar presentación del proyecto',
        description: 'Preparar las diapositivas finales para la presentación del próximo viernes',
        completed: false,
        dueDate: nextWeek,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Revisar código del backend',
        description: 'Hacer code review del pull request de autenticación',
        completed: true,
        dueDate: lastWeek,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Comprar ingredientes para la cena',
        description: 'Lista: pollo, verduras, arroz, especias',
        completed: false,
        dueDate: today,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Llamar al dentista',
        description: 'Agendar cita para limpieza dental',
        completed: false,
        dueDate: tomorrow,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Estudiar para examen de matemáticas',
        description: 'Repasar capítulos 5-8 del libro de cálculo',
        completed: false,
        dueDate: nextWeek,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Configurar servidor de producción',
        description: 'Instalar y configurar Nginx, PM2 y SSL',
        completed: true,
        dueDate: lastWeek,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Limpiar el garaje',
        description: 'Organizar herramientas y donar cosas que no uso',
        completed: false,
        dueDate: null, // Sin fecha límite
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Actualizar documentación API',
        description: 'Agregar ejemplos de uso para los nuevos endpoints',
        completed: false,
        dueDate: tomorrow,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};