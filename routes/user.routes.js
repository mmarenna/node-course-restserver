const { Router } = require('express');
const { check } = require('express-validator');

const { getUser, postUser, putUser, deleteUser, getUserByName } = require('../controllers/user.controller');
const { validRole, validateDuplicatedEmail, validateId } = require('../helpers/db-validations');
const { validateFields } = require('../middlewares/validate-fields');


const router = Router();

router.get('/', getUser);

router.get('/:name', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], getUserByName);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password tiene que tener mas de 6 letras').isLength({min: 6}),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(validateDuplicatedEmail),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(validRole), // Check customizado
    validateFields
], postUser);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(validateId),
    check('rol').custom(validRole),
    validateFields
], putUser);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(validateId),
    validateFields
], deleteUser);

module.exports = router;