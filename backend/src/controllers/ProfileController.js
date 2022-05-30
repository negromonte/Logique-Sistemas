const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        console.log(request.headers)
        const user_id = request.headers.authorization;
        console.log('test userid',user_id)
        const urls = await connection('urls')
        .where('user_id', user_id)
        .select('*');

        return response.json(urls);
    }
}