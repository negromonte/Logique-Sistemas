const connection = require('../database/connection');


module.exports = {
    async index(request, response) {
 
     const code =request.params.code;
     console.log(code);
    
     const resultado = await connection('urls')
     .where('urlEncurtada', code);
        
     console.log('resultado', resultado);
    
     if(!resultado) {
        return response.status(404);
    }
    
    const url = resultado.length > 0 ? resultado[0] : [];

    console.log('resultado.urlOriginal > ', url.urlOriginal);

    response.redirect(url.urlOriginal);
}
}