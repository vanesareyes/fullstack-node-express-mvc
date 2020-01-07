const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	root: (req, res) => {
		res.render('products', {
			products: products
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let product = products.find(function (p) {
			return p.id == req.params.id
		})

		res.render('detail', {product: product})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res, next) => {
		console.log(req.files)

		products.push({
			...req.body,
			...{img: req.files.photo}
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(products))

		res.redirect('/')
	},

	// Update - Form to edit
	edit: (req, res) => {
		let product = products.find(function (p) {
			return p.id == req.params.id
		})

		res.render('product-edit-form', {
			product: product
		})
	},

	update: (req, res) => {
		let arrayIndex

		let product = products.find(function (p, index) {
			if (p.id == req.params.id) {
				arrayIndex = index
				return true
			}

			return false
		})

		let editado = {
			...product,
			...req.body
		}

		products[arrayIndex] = editado

		fs.writeFileSync(productsFilePath, JSON.stringify(products))

		res.send('listo!')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;