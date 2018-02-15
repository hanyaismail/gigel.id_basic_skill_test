import Api from './Api'

export default {
	upload(files) {
		return Api().put('/upload', files, {headers: { 'Content-Type': 'multipart/form-data' }})
	},

	view() {
		return Api().get('/photo')
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