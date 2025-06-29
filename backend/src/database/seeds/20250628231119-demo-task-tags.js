'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Primero obtenemos los IDs reales de tags y tasks
    const [tags] = await queryInterface.sequelize.query(
      "SELECT id, name FROM \"Tags\" ORDER BY id"
    );
    
    const [tasks] = await queryInterface.sequelize.query(
      "SELECT id, title FROM \"Tasks\" ORDER BY id"
    );

    // Crear un map para fácil acceso por nombre
    const tagMap = {};
    tags.forEach(tag => {
      tagMap[tag.name] = tag.id;
    });

    // Verificar que tenemos los tags necesarios
    const requiredTags = ['urgente', 'trabajo', 'personal', 'estudios', 'salud', 'casa', 'compras', 'proyecto'];
    const missingTags = requiredTags.filter(tagName => !tagMap[tagName]);
    
    if (missingTags.length > 0) {
      throw new Error(`Los siguientes tags no existen: ${missingTags.join(', ')}`);
    }

    if (tasks.length < 8) {
      throw new Error(`Se necesitan al menos 8 tasks, pero solo hay ${tasks.length}`);
    }

    // Insertar las relaciones usando los IDs reales
    await queryInterface.bulkInsert('TaskTags', [
      // Task 1: "Completar presentación del proyecto" 
      { taskId: tasks[0].id, tagId: tagMap['urgente'], createdAt: new Date(), updatedAt: new Date() },
      { taskId: tasks[0].id, tagId: tagMap['trabajo'], createdAt: new Date(), updatedAt: new Date() },
      { taskId: tasks[0].id, tagId: tagMap['proyecto'], createdAt: new Date(), updatedAt: new Date() },

      // Task 2: "Revisar código del backend"
      { taskId: tasks[1].id, tagId: tagMap['trabajo'], createdAt: new Date(), updatedAt: new Date() },
      { taskId: tasks[1].id, tagId: tagMap['proyecto'], createdAt: new Date(), updatedAt: new Date() },

      // Task 3: "Comprar ingredientes para la cena"
      { taskId: tasks[2].id, tagId: tagMap['urgente'], createdAt: new Date(), updatedAt: new Date() },
      { taskId: tasks[2].id, tagId: tagMap['personal'], createdAt: new Date(), updatedAt: new Date() },
      { taskId: tasks[2].id, tagId: tagMap['compras'], createdAt: new Date(), updatedAt: new Date() },

      // Task 4: "Llamar al dentista"
      { taskId: tasks[3].id, tagId: tagMap['urgente'], createdAt: new Date(), updatedAt: new Date() },
      { taskId: tasks[3].id, tagId: tagMap['salud'], createdAt: new Date(), updatedAt: new Date() },
      { taskId: tasks[3].id, tagId: tagMap['personal'], createdAt: new Date(), updatedAt: new Date() },

      // Task 5: "Estudiar para examen de matemáticas"
      { taskId: tasks[4].id, tagId: tagMap['urgente'], createdAt: new Date(), updatedAt: new Date() },
      { taskId: tasks[4].id, tagId: tagMap['estudios'], createdAt: new Date(), updatedAt: new Date() },

      // Task 6: "Configurar servidor de producción"
      { taskId: tasks[5].id, tagId: tagMap['trabajo'], createdAt: new Date(), updatedAt: new Date() },
      { taskId: tasks[5].id, tagId: tagMap['proyecto'], createdAt: new Date(), updatedAt: new Date() },

      // Task 7: "Limpiar el garaje"
      { taskId: tasks[6].id, tagId: tagMap['personal'], createdAt: new Date(), updatedAt: new Date() },
      { taskId: tasks[6].id, tagId: tagMap['casa'], createdAt: new Date(), updatedAt: new Date() },

      // Task 8: "Actualizar documentación API"
      { taskId: tasks[7].id, tagId: tagMap['trabajo'], createdAt: new Date(), updatedAt: new Date() },
      { taskId: tasks[7].id, tagId: tagMap['proyecto'], createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TaskTags', null, {});
  }
};