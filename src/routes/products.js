// ************ Require's ************
const path = require('path');
const express = require('express');
const router = express.Router();

const multer = require('multer')

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/images/products')
	},

    filename: function (req, file, cb) {
		return file.fieldname + '-' + Date.now() + path.extname(file.originalname)
	},
})

const upload = multer({storage: storage})

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

router.get('/', productsController.root); /* GET - All products */
router.get('/detail/:id/', productsController.detail); /* GET - Product detail */

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); /* GET - Form to create */
router.post('/create/', upload.any(), productsController.store); /* POST - Store in DB */

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); /* GET - Form to edit */
router.put('/edit/:id', productsController.update); /* PUT - Update in DB */

/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:productId', productsController.destroy); /* DELETE - Delete from DB */

module.exports = router;
