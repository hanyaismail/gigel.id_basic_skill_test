import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
	//strict true => never change the state except with mutation or action
	strict: true,
	
	plugins: [
		createPersistedState()
	],

	state: {
		token: null,
		user: null,
		isUserLoggedIn: false
	},

	getters: {
		user: state => {
			return state.user
		}
	},

	mutations: {
		setToken (state, token) {
			state.token = token

			if(token) {
				state.isUserLoggedIn = true
			} else {
				state.isUserLoggedIn = false
			}
		},

		setUser (state, user) {
			state.user = user
		}
	},
	
	actions: {
		setToken ({commit}, token) {
			commit('setToken', token)
		},

		setUser ({commit}, user) {
			commit('setUser', user)
		}
	}
})

// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
// 	strict: true,

// 	state: {
// 		user: null,
// 		token: null,
// 		isUserLoggedIn: false
// 	},

// 	mutations: {
// 		setUser (state, user) {
// 			state.user = user
// 		},

// 		setToken (state, token) {
// 			state.token = token

// 			if (token) {
// 				state.isUserLoggedIn = true
// 			} else {
// 				state.isUserLoggedIn = false
// 			}
// 		}
// 	},

// 	actions: {
// 		setUser ({commit}, user) {
// 			commit('setUser', user)
// 		},

// 		setToken ({commit}, token) {
// 			commit('setToken', token)
// 		}
// 	}
// })