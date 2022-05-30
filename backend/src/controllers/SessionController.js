const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { email } = request.body;
        const { senha } = request.body;

        const user = await connection('users')
            .where('email', email)
            .where('senha', senha)
            .select('name','id')
            .first();

        if (!user) {
            return response.status(400).json({ error: 'No USER found with this ID' });
        }

        return response.json(user);
    }
}