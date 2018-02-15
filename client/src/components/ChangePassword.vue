<template>
	<div class="mt-4">
				<panel title="Change Password">
					<v-form v-model="valid" ref="form" lazy-validation>
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
				    <v-text-field
				      label="Confirm New Password"
				      type="password"
				      v-model="confpassword"
				      :rules="confPassRules"
				      required
				    ></v-text-field>
				  </v-form>
				  
	  			<v-alert type="error" :value="validpass">
      			{{error}}
    			</v-alert>

					<v-alert type="success" :value="success">
      			Password changed
    			</v-alert>
				  <v-btn @click="change" :disabled="!valid">Change</v-btn>
			  </panel>
	</div>
</template>

<script>
import UserService from '@/services/UserService'

export default {
	data () {
		return {
			success: false,
			validpass: false,
			password: "",
			newpassword: "",
			passRules: [
				(v) => !!v || 'Password is required',
				(v) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v) || 'password must be more than 8 characters and contains letters and numbers'
			],

			confpassword: "",
			confPassRules: [
				(v) => !!v || 'Confirm Password is required',
				(v) => (v == this.newpassword) || 'Password not valid'
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
					this.success = true
				}

				// this.$router.push({name: 'edit'})
			} catch (err) {
				this.validpass = true
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