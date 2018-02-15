const AuthenticationControllerPolicies = require('./policies/AuthenticationControllerPolicies');
const ImagesController = require('./controllers/ImagesController');
const UserControllers = require('./controllers/UserControllers');
const uploadHandler = require('./uploadHandler');
const isAuthenticated = require('./policies/isAuthenticated');

module.exports = (app) => {

	// app.get('/photos', 
	// 	ImagesController.index
	// );

	app.put('/upload',
		isAuthenticated,
		uploadHandler, 
		ImagesController.put);

	app.get('/photo',
		isAuthenticated,
		ImagesController.view);


	app.post('/register',
		AuthenticationControllerPolicies.register,
		UserControllers.register);

	app.post('/login', 
		UserControllers.login);

	app.put('/users/edit',
		isAuthenticated,
		UserControllers.edit,
		UserControllers.get);

	app.get('/user',
		isAuthenticated,
		UserControllers.get);

	app.put('/changepass',
		isAuthenticated, 
		UserControllers.comparePass,
		UserControllers.changePass)

	// ------------------------------------TEST------------------------------------//

	// Check image database
	app.get('/cek', 
		ImagesController.cek);

	// Check user database
	// app.get('/users',
	// 	UserControllers.get);

}