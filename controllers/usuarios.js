const { response, request  } = require('express');



const usuariosGet = (req=request, res = response)  => {
    //res.send('Hello World')
    const query = req.query;

    //desestructurando
    const {q, nombre='no name'} = req.query;

    res.status("200").json({
        ok:true,
        msg:"get Api controladors",
        query,
        q,
        nombre
    })
  }

  const usuariosPut = (req, res = response)  => {
    //res.send('Hello World')

    //const id = req.params.id;
    const { id } = req.params;
    console.log('ids=',id);


        res.status("200").json({
            ok:true,
            msg:"put Api controladorss",
            id
        })
  }

  const usuariosPost = (req, res = response)  => {
    //res.send('Hello World')

    const body = req.body;

    const {nombre,edad} = req.body;

        res.status("200").json({
            ok:true,
            msg:"post Api controladors",
            nombre,
            edad

        })
  }

  const usuariosDelete = (req, res = response)  => {
    //res.send('Hello World')
        res.status("200").json({
            ok:true,
            msg:"delete Api controladors"
        })
  }
 



  module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete

  }