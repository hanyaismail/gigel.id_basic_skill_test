const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config  = require('../config/config')
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

function jwtSignUser (user) {
	const ONE_WEEK = 60 * 60 * 24 * 7;
	return jwt.sign(user, config.authentication.jwtSecret, {
		expiresIn: ONE_WEEK
	})
}

module.exports = {
	async register (req, res) {
		try {
			console.log('lewat registrasi')
			console.log(req.body);
			const user = await User.create(req.body);
			const userJson = user.toJSON();
			res.send({
				message: 'registration succeed'
			})

		} catch(err) {

				switch (err.fields[0]) {
					case 'email':
						res.status(400).send({
							error: 'Email is already used'
						})
						break
					case 'phone':
						res.status(400).send({
							error: 'Phone number is already used'
						})
						break
					default:
						res.status(400).send({
							error: 'Invalid registration information'
						})
				}
		}
	},

	async login (req, res) {
		try {
			const{email, password} = req.body

			//find user based on email
			const user = await User.findOne({
				where: {
					email: email
				}
			});

			//if user doesn't exists
			if(!user) {
				res.status(403).send({
					error: 'The email was incorrect'
				})
			}

			//check the password with comparePassword function
			const isPasswordValid = await user.comparePassword(password);
			if(!isPasswordValid) {
				res.status(403).send({
					error: 'The password is invalid'
				})
			}

			// make token and send it as the response
			const userJson = user.toJSON();
			res.send({
				user: userJson,
				token: jwtSignUser(userJson)
			})

			// if an error occured
		} catch(err) {
			res.status(500).send({
				error: 'An error was occured trying to log in'
			})
		}
	},

	async edit (req, res, next) {
		try {
			const userId = req.user.id
			const user = await User.update(req.body, {
					where: {
						id: userId
					}
				});
			next();
		} catch (err) {
			console.log(err);
			res.send(err);
		}
	},

	async comparePass (req, res, next) {
		const{password} = req.body;
			const user = await User.findById(req.user.id);
			const isPasswordValid = await user.comparePassword(password);
			
			console.log(isPasswordValid);
			if(!isPasswordValid) {
				res.status(403).send({
					error: 'Current password is invalid'
				})
			}
			console.log('got the user');
			next()
	},

	async changePass (req, res) {
		try {
			console.log(req.body.newpassword)
			await bcrypt
				.genSaltAsync(8)
				.then(salt => bcrypt.hashAsync(req.body.newpassword, salt, null))
				.then(hash => {
					console.log(hash);
					User.update({password: hash}, {
						where: {
							id: req.user.id
						}
					});
					console.log('updating');
				});
			console.log('after update')
			res.send({message: 'Change password success'})
		} catch (err) {

		}
	},

	async get (req, res) {
		try {
			if (req.params.id == undefined || req.params.id == null) {
				console.log('no params')
				const user = await User.findById(req.user.id);
				res.send(user);
			} else {
				console.log('with params')
				const user = await User.findById(req.params.id);
				res.send(user);
			}
		} catch (err) {
			console.log(err);
			res.send(err);
		}
	}
}