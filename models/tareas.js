const Tarea = require('./tarea');
const colors = require('colors/safe');

class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];
        // Esto transforma un objeto a un array el id es la llave ( key ), dada la estructura del objeto.
        Object.keys(this._listado).forEach(id => {

            const tarea = this._listado[id];
            listado.push(tarea);
        });

        return listado;

    }

    constructor() {
        this._listado = {};
    }

    cargarTareasFromArray = (tareas = []) => {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea = (desc) => {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto = () => {

        console.log('\n');
        let i = 1;
        for (let tarea of this.listadoArr) {

            let completado = (tarea.completadoEn !== null) ? 'Completado'.green : 'pendiente'.red;

            let iString = parseFloat(i++);
            console.log(`${colors.green(iString)} ${tarea.desc} :: ${completado} `);
        }

        //Otra forma

        // this.listadoArr.forEach( ( tarea, i ) => {

        //     const idx = `${ i + 1}`.green;
        //     const {desc, completadoEn } = tarea;
        //     const estado = ( completadoEn ) 
        //                     ? 'Completada'.green 
        //                     : 'Pendiente'.red;

        //     console.log(`${ idx } ${ desc } :: ${ estado }`);
        // });
    }

    listarPendientesCompletadas = (completadas = true) => {

             let idx = 0;
         this.listadoArr.forEach((tarea, i) => {
            const { desc, completadoEn } = tarea;
             const estado = (completadoEn)
                 ? 'Completada'.green
                 : 'Pendiente'.red;
            if (completadas) {
                 if (tarea.completadoEn) {
                      idx += 1;
                     console.log(`${ (idx + '.').green } ${ desc } ${ completadoEn.green }`);
                }
            } else if (!completadas) {
                 if (!tarea.completadoEn) {
                      idx += 1;
                     console.log(`${ (idx + '.').green } ${ desc } ${ estado }`);
                }
             }
         });

        
        // let i = 1;
        // for( let tarea of this.listadoArr ) {
        //     let completado = (tarea.completadoEn !== null) ? 'Completado'.green : 'pendiente'.red;
           
        //     if ( completadas ){
        //         if( tarea.completadoEn ) {
        //             let iString = parseInt( i++ );
        //             console.log(`${ colors.green( iString ) } ${ tarea.desc } :: ${ completado }`);

        //     }


        //     } else if ( !completadas ) {
        //         if( !tarea.completadoEn ) {
                    
        //             let iString = parseInt( i++ );
        //             console.log(`${ colors.green( iString ) } ${ tarea.desc } :: ${ completado }`);
                    
        //         }
        //     }
        
        // }
    }

    borrarTarea = ( id = '' ) => {
        if( this._listado[ id ]){
            delete this._listado[ id ];
        }
    }

    toggleCompletado = ( ids = [] ) => {

        ids.forEach( id => {
            const tarea = this._listado[id];
            tarea.completadoEn = new Date().toISOString();
        })


        this.listadoArr.forEach( tarea => {

            if( !ids.includes( tarea.id ) ) {
                this._listado[ tarea.id ].completadoEn = null;
            }
        });
    }
}




module.exports = Tareas;