const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('manager_tasks', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Соединение с базой установлено');
    } catch (error) {
        console.error('Не удается подключиться к базе данных:', error);
    }
})();

module.exports = sequelize;