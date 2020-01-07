const path = require('path');
const multer = require('multer')

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
        // console.log(__dirname, path.join('public', 'images', 'products'))
		cb(null, 'public/images/products')
	},

    filename: function (req, file, cb) {
		return file.fieldname + '-' + Date.now() + path.extname(file.originalname)
	},
})

module.exports = storage