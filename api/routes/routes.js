// MySQL pool connection
const pool = require('../data/config');

const router = app => {
    // Получение записей
    app.get('/users', (request, response) => {
        pool.query(`SELECT * FROM users`, (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    // Получение записей c фильтрацией по телефону
    app.get('/users/:tell', (request, response) => {
        const tell = request.params.tell;
        pool.query(`SELECT * FROM users WHERE tells LIKE '%${tell}%'`, (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    // Удаление пользователя
    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;
        pool.query('DELETE FROM users WHERE id = ?', id, (error) => {
            if (error) throw error;
            response.send('User deleted.');
        });
    });

    // Update an existing user
    app.put('/users/:id', (request, response) => {
        const id = request.params.id;
        pool.query(`UPDATE users SET ? WHERE id=?`, [request.body, id], (error) => {
            if (error) throw error;

            response.send('User updated successfully.');
        });
    });

    // Дабавление записи
    app.post('/users', (request, response) => {
        pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
            if (error) throw error;
            response.send(`${result.insertId}`);
        });
    });
}

module.exports = router;
