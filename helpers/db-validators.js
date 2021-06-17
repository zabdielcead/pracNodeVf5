const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {

    console.log('rol',rol)
    const existeRol = await Role.findOne({ rol });

    console.log(existeRol);
    if(!existeRol){
        throw new Error(`El rol ${rol}, no est registrado en BD`);
    }
}

const emailExiste = async (correo = '') => {

    const existeEmail = await Usuario.findOne({ correo});
    console.log('correo', correo);
    console.log('existeEmail', existeEmail);

    
    if(existeEmail){
        throw new Error(`Este correo ${correo} ya esta registrado`);
    }

}



const existeUsuarioPorId = async( id = '' ) => {

    console.log('idval',id);
        const existeUsuario = await  Usuario.findById( id );

        console.log('existeUsuario',existeUsuario);
        if( !existeUsuario ){
            throw new Error(`El id no existe ${ id }`);
        }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}