<template>
	<div class="mt-4">
		<v-layout column>
			<v-flex xs6 offset-xs3>
				<panel title="Login">
				<v-form>
			    <v-text-field
			      label="Email"
			      v-model="email"
			      :rules="required"
			      required
			    ></v-text-field>
			    <v-text-field
			      label="Password"
			      type="password"
			      v-model="password"
			      :rules="required"
			      required
			    ></v-text-field>
	  		</v-form>

	  <div 
	   	class="danger-alert" 
	   	v-html="error"
	   ></div>

	 	<v-btn @click="login">Login</v-btn>
	 			</panel>
			</v-flex>
		</v-layout>
 	</div>
</template>

<script>
import UserService from '@/services/UserService'

export default {
	data () {
		return {
			email: "",
			password: "",
			required: [
				(v) => !!v || "required"
			],
			error: null
		}
	},

	methods: {
		// async login () {
		// 	try {
		// 		const response = (await UserService.login({
		// 			email: this.email,
		// 			password: this.password
		// 		})).data

		// 		console.log(response.user)
		// 		console.log(response.token)
		// 		this.$store.dispatch('setUser', response.user)
		// 		console.log('setUser')
		// 		this.$store.dispatch('setToken', response.token)
		// 		console.log('setToken')
		// 		this.$router.push({name: 'profile'})
		// 		console.log('push')
		// 	} catch (error) {
		// 		console.log('is ther any error')
		// 			this.error = error.response.error
		// 	}
		// }

		async login () {
	      try {
	        const response = await UserService.login({
	          email: this.email,
	          password: this.password
	        })
	        console.log(response.data)
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.$router.push({name: 'profile'})
          
	      } catch (error) {
	        this.error = error.response.data.error  
	      }
  	}
  }
}
</script>

<style scoped>

</style>