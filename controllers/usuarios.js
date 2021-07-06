const { response, request  } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');






const usuariosGet = async (req=request, res = response)  => {
    //res.send('Hello World')
    const query = req.query;


   
    //desestructurando
    const {nombre='no name', limite=5, desde=0} = req.query;
    const querie =  {estado:true}
    // const usuarios = await Usuario.find( querie )
    // .skip(Number(desde))
    // .limit(Number(limite)); //nos manda los registros 

  

    // const total = await Usuario.countDocuments(querie);


    const [total, usuarios] =  await Promise.all([
      Usuario.countDocuments(querie),
      Usuario.find( querie )
                    .skip(Number(desde))
                    .limit(Number(limite))
    ])


    res.status("200").json({
        ok:true,
        total,
        usuarios
        // total,
        // msg:"get Api controladors",
        // nombre,
        // usuarios
    })
  }

  const usuariosPut = async (req, res = response)  => {
    //res.send('Hello World')

    //const id = req.params.id;
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    console.log('resto', resto);

    if( password ){

      const salt = bcryptjs.genSaltSync(); //vueltas para generar la encriptacion
      resto.password = bcryptjs.hashSync(password,salt);
  

    }

    //const uid = req.uid;
    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new:true});
    const usuarioAutenticado = req.usuario;



    console.log('ids=',id);


        res.status("200").json({
            ok:true,
            msg:"put Api controladorss",
            usuario,
            usuarioAutenticado
            //uid
        })
  }

  const usuariosPost = async (req, res = response)  => {
    //res.send('Hello World')
    // const errors  = validationResult(req);

    // if(!errors.isEmpty()){
    //   return res.status(400).json(errors);
    // }


    const body = req.body;

    


    const {nombre, correo, password, rol } = req.body;

    const usuario = new Usuario({nombre, correo, password, rol});

    // verificar si el corrreo existe
   

    //
    

    //encriptar la contraseña

    const salt = bcryptjs.genSaltSync(); //vueltas para generar la encriptacion
    usuario.password = bcryptjs.hashSync(password,salt);


    await usuario.save();

    //const {nombre,edad} = req.body;

        res.status("200").json({
            ok:true,
            msg:"post Api controladors",
            usuario
            // nombre,
            // edad

        })
  }

  const usuariosDelete = async (req, res = response)  => {
    //res.send('Hello World')

    const { id } = req.params;

    //fisicamente lo borramos
      //const udsuario = await Usuario.findByIdAndDelete(id);

      const udsuario = await Usuario.findByIdAndUpdate(id, {estado:false});


        res.status("200").json({
            ok:true,
            udsuario
        })
  }
 



  module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete

  }