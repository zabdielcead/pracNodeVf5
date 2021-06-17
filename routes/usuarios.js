const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorId} = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const role = require('../models/role');



const router = Router();


router.get('/', usuariosGet);

router.put('/:id', [
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPut ); //parametros pasan por la url

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y mas de 6 letras').isLength({ min:6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido ),  //  (rol) =>  esRoleValido(rol)
    //check('rol').custom( esRoleValido ),  //  (rol) =>  esRoleValido(rol)
    validarCampos

], usuariosPost);

router.delete('/:id', [
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete);

module.exports = router;