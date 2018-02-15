const {Image} = require('../models');
const path = require('path');
const cloudinary = require('cloudinary');
const config = require('../config/config');

console.log('apakah lewat sini');

cloudinary.config({
	cloud_name: config.cloudinary.cloudName,
	api_key: config.cloudinary.apiKey,
	api_secret: config.cloudinary.apiSecret
})

module.exports = {
	async cek (req, res) {
		try {
			const imagesDB = await Image.findAll()
								.map(image => image.toJSON());
			res.send(imagesDB)
		} catch (err) {
			console.log(err);
		}
	},

	// async index (req, res) {
	// 	const images = await Image.findAll().map(image => path.join(__dirname, './public/uploads/' + image.fileName));
	// 	res.send(images)
	// },

	// async view (req, res) {
	// 	try {
	// 		const image = await Image.findById(req.params.id);
	// 		res.send(image);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// },

	async view (req, res) {
		try {
			console.log('find ava')
			const image = await Image.findOne({where: {UserId: req.user.id}});
			res.send(image);
		} catch (err) {
			res.send(err);
			console.log(err);
		}
	},

	async put (req, res) {
		try {
			console.log(req.file);
			const avatar = await Image.findOne({where: {UserId: req.user.id}});

			if(!avatar) {
				const cloudResult = await cloudinary.uploader.upload(req.file.path);
				console.log(cloudResult);
				console.log('no avatar');
				const image = await Image.create({
					UserId: req.user.id,
					fileName: req.file.filename,
					url: cloudResult.secure_url,
					mimetype: req.file.mimetype
				})
				res.send(image);
			} else {
				const cloudResult = await cloudinary.uploader.upload(req.file.path);
				console.log(cloudResult);
				console.log('have avatar');
				const image = await Image.update({
					UserId: req.user.id,
					fileName: req.file.filename,
					url: cloudResult.secure_url,
					mimetype: req.file.mimetype
				}, {where: {UserId: req.user.id}})
				res.send(image);
			}
		} catch (err) {
			console.log(err);
		}
	}
}