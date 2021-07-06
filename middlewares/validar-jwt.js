const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario')

const validarJWT = async (req= request, res = response, next) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    try{


       const { uid} =   jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        //console.log(payload);


        // leer el usuario

        //req.usuario = await Usuario.findById(uid);
        const usuario = await Usuario.findById(uid);


        if(!usuario){
            return res.status(401).json({
                msg: ' usuario no existe bd'
            });
        }

        //verificar si el uid tiene estado en true
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'token no valido - usuario estado: false'
            });
        }

        req.usuario = usuario;



        //req.uid = uid;
        next();

    }catch(error){
        console.log(error);
        res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    //console.log(token);

    
}


module.exports = {
    validarJWT
}