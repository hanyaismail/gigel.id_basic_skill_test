import Api from './Api'

export default {
	register(credentials) {
		return Api().post('/register', credentials)
	},

	login(credentials) {
		return Api().post('/login', credentials)
	},

	edit(credentials) {
		return Api().put('/users/edit', credentials)
	},

	changepass(credentials) {
		return Api().put('/changepass', credentials)
	},

	user() {
		return Api().get('/user')
	}
}