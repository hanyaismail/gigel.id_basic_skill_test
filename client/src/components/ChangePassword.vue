<template>
	<div class="mt-4">
				<panel title="Change Password">
					<v-form v-model="valid" ref="form">
				    <v-text-field
				      label="Current Password"
				      type="password"
				      v-model="password"
				      :rules="passRules"
				      required
				    ></v-text-field>
				    <v-text-field
				      label="New Password"
				      type="password"
				      v-model="newpassword"
				      :rules="passRules"
				      required
				    ></v-text-field>
				  </v-form>

				  <div 
         	class="danger-alert" 
         	v-html="error"
         ></div>

				  <v-btn @click="change" :disabled="!valid">Change</v-btn>
			  </panel>
	</div>
</template>

<script>
import UserService from '@/services/UserService'

export default {
	data () {
		return {
			password: "",
			newpassword: "",
			passRules: [
				(v) => !!v || 'Password is required',
				(v) => /^[a-zA-Z0-9]{8,32}$/.test(v) || 'password must be more than 8 characters and contains letters and numbers'
			],

			error: null,

			valid: true
		}
	},

	methods: {
		async change () {
			try {
				if (this.$refs.form.validate()) {
					console.log(this.password, this.newpassword)
					const response = await UserService.changepass({
						password: this.password,
						newpassword: this.newpassword
					})
				}

				this.$router.push({name: 'edit'})
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