const router = require('express').Router()
const authMiddleware = require("../middleware/auth.middleware")
const {tryCatchWrapper} = require('../middleware/errorHandler.middleware')

const {createAddress,
    getAllAddresses,
    getAddressById,
    updateAddress,
    deleteAddress} = require('../controllers/address.controller');

router.post('/',authMiddleware, tryCatchWrapper(createAddress));
router.get('/',authMiddleware,  tryCatchWrapper(getAllAddresses));
router.get('/:id', authMiddleware, tryCatchWrapper(getAddressById));
router.put('/:id',authMiddleware, tryCatchWrapper(updateAddress));
router.delete('/:id',authMiddleware, tryCatchWrapper(deleteAddress));

module.exports = router;
