const fs = require('fs');

const archivo = './db/nota1.json';

const guardarDB = ( data ) => {

    fs.writeFileSync( archivo , JSON.stringify( data ) );

}

const leerDB = () => {

    if( !fs.existsSync( archivo ) ){
        return null;
    }

    const leer = fs.readFileSync( archivo, { encoding : 'utf-8' } );
    const data = JSON.parse( leer );
    
    return data;
}

module.exports = {
    guardarDB,
    leerDB
}