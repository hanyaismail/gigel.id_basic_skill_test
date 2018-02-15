<template>
	<v-toolbar fixed dark class="cyan px-4">
		<v-toolbar-title>Gigel.id</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-toolbar-items>
			
			<v-btn v-if="!isUserLoggedIn" flat dark :to="{name: 'login'}">
				Login
			</v-btn>

			<v-btn v-if="!isUserLoggedIn" flat dark :to="{name: 'register'}">
				Sign Up
			</v-btn>

			<v-btn v-if="isUserLoggedIn" flat dark @click="logout">
				Log Out
			</v-btn>
		</v-toolbar-items>
	</v-toolbar>
</template>

<script>
import {mapState} from 'vuex'
export default {
	methods: {
		logout() {
			this.$store.dispatch('setUser', null)
			this.$store.dispatch('setToken', null)
			this.$router.push({
				name: 'login'
			})
		}
	},

	computed: {
		...mapState([
				'isUserLoggedIn'
		])
	}
}
</script>

<style>
	
</style>