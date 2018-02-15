<template>
	<div class="mt-4">
				<panel title="Change Profile">
					<v-form v-model="valid" ref="form">
				    <v-text-field
				      label="Display Name"
				      v-model="user.displayname"
				      :rules="nameRules"
				      :counter="20"
				      required
				    ></v-text-field>
				    <v-text-field
				      label="Occupation"
				      v-model="user.occupation"
				    ></v-text-field>
				    <v-text-field
				      label="Bio"
				      v-model="user.bio"
							multi-line
				      :rules="bioRules"
				      :counter="200"
				      required
				    ></v-text-field>
				    <v-text-field
				      label="Location"
				      v-model="user.location"
				      :rules="locationRules"
				      required
				    ></v-text-field>
				  </v-form>

				  <div 
         	class="danger-alert" 
         	v-html="error"
        	></div>
					
					<v-alert type="success" :value="success">
      			Profile changed
    			</v-alert>
				  
				  <v-btn @click="save">Save</v-btn>
			  </panel>
	</div>
</template>

<script>
import UserService from '@/services/UserService'
import {mapGetters} from 'vuex'

export default {
	data () {
		return {
			success: false,
			user: {
				displayname: null,
				occupation: null,
				bio: null,
				location: null
			},

			nameRules: [
				(v) => !!v || 'Name is required!',
				(v) => (v && v.length <= 20) || 'Display name must be less than 20 characters'
			],

			bioRules: [
				(v) => (v && v.length <= 200) || 'Bio must be less than 200 characters'
			],
			
			locationRules: [
				(v) => !!v || 'Location is required'
			],

			error: null,
			valid: true
		}
	},

	methods: {
		async save () {
			try {
				if (this.$refs.form.validate()) {
					console.log(this.user)
					const response = (await UserService.edit(this.user)).data
					console.log(response)
					this.$store.dispatch('setUser', response)
					this.$router.push({name: 'profile'})
					this.success = true
				}
			} catch (err) {
				this.error = err.response.data.error
			}
		}
	},

	async mounted() {
		try {
			this.user = (await UserService.user()).data	
		} catch (err) {
			console.log(err);
		}
	}
}
</script>

<style scoped>
	.error {
  color: red;
 }
</style>