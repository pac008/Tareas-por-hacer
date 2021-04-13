require('colors');


const { guardarDB, leerDB } = require('./helpers/guardar-archivo');
const { inquirerMenu,
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        listadoCheckbox
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');





const main = async () => {

    let opc = '';

    const tareas = new Tareas();

    const tareaDB = leerDB();

    if( tareaDB ){
      
        tareas.cargarTareasFromArray( tareaDB );
    }

    do{
        opc = await inquirerMenu();
        switch ( opc ) {
            case '1':
                const desc = await leerInput('Descripción:');
                tareas.crearTarea( desc );
            break;

            case '2': //listar todas
                tareas.listadoCompleto();
            break;

            case '3'://listar completadas
                tareas.listarPendientesCompletadas( true );
            break;
            
            case '4'://Listar pendientes
                tareas.listarPendientesCompletadas( false );
            break;
            
            case '5'://completar o incompletar
               let ids = await listadoCheckbox( tareas.listadoArr );
               tareas.toggleCompletado( ids );
            break;
            
            case '6': //borrar
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if( id !== '0'){

                    const ok = await confirmar('¿Está seguro?');
                    if( ok ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada correctamente');
                    }
                }
            break;
                
        }
        
        guardarDB( tareas.listadoArr );
        
        if( opc !== '0' ) await pausa();

    }while( opc !== '0' );
}


main();