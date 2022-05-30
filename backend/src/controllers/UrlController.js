const crypto = require('crypto');
const connection = require('../database/connection');

function generateCode(){
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function generateDate() {
    let date_ob = new Date();
    let dataHora = '';
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    dataHora = (date + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds);

    return dataHora;
}

module.exports = {
    async index(request, response) {
      // return response.redirect("https://^www.google.com")
        
        const urls = await connection('urls').select('*');
    
        return response.json(urls);
     },

    async create(request, response) {
        const {urlOriginal} = request.body;
        const urlEncurtada = generateCode();
        const dataHora = generateDate();
        const user_id = request.headers.authorization;
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('urls').insert({
            id,
            urlOriginal,
            urlEncurtada,
            dataHora,
            user_id
           // timestamps
        });
        return response.json({id});
    }
};