<template>
	<div class="mt-4">
		<v-layout column>
			<v-flex xs6 offset-xs3>
				<panel title="Register">
					<v-form v-model="valid" ref="form">
				    <v-text-field
				      label="Name"
				      v-model="name"
				      :rules="nameRules"
				      :counter="15"
				      required
				    ></v-text-field>
				     <v-text-field
				      label="Phone Number"
				      v-model="phone"
				      :rules="phoneRules"
				      required
				    ></v-text-field>
				    <v-text-field
				      label="E-mail"
				      v-model="email"
				      :rules="emailRules"
				      required
				    ></v-text-field>
				    <v-text-field
				      label="Password"
				      type="password"
				      v-model="password"
				      :rules="passRules"
				      required
				    ></v-text-field>
				  </v-form>

				  <div 
         	class="danger-alert" 
         	v-html="error"
         ></div>

				  <v-btn @click="register" :disabled="!valid">Register</v-btn>
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
			name: "",
			nameRules: [
				(v) => !!v || 'Name is required!',
			],

			phone: "",
			phoneRules: [
				(v) => !!v || 'Phone is required',
				(v) => /^\d+$/.test(v) || 'Phone number must be valid'
			],
			
			email: "",
			emailRules: [
				(v) => !!v || 'E-mail is required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
			],

			password: "",
			passRules: [
				(v) => !!v || 'Password is required',
				(v) => /^[a-zA-Z0-9]{8,32}$/.test(v) || 'password must be more than 8 characters and contains letters and numbers'
			],

			error: null,

			valid: true
		}
	},

	methods: {
		async register () {
			try {
				if (this.$refs.form.validate()) {
					const response = await UserService.register({
						name: this.name,
						phone: this.phone,
						email: this.email,
						password: this.password
					})
				}

				this.$router.push({name: 'login'})
			} catch (err) {
				this.error = err.response.data.error
			}
		}
	}
}
</script>

<style scoped>
	.error {
  color: red;
 }
</style>