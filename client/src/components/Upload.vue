<template>
	<div class="mt-4">
		<panel title="Change Avatar">
			<div>
				<form enctype="multipart/form-data" @submit.prevent="upload()">
					<div>
						<input type="file" name="avatar" accept="image/*" @change="previewImage($event.target.files)">
					</div>
				</form>
			</div>
			<div>
				<v-avatar
	      size="150px"
	      class="grey lighten-4"
	      >
	        <img :src="imagePreview">
		    </v-avatar>
	  	</div>

	    <v-btn @click="upload" :disabled="!available">Upload</v-btn>
	    <div v-show="loading">
	    	<v-progress-linear indeterminate></v-progress-linear>
	  	</div>
			
			<div v-show="success">
		  	<v-alert type="success" :value="true">
	      	Reload page to see the change.
	    	</v-alert>
    	</div>
		</panel>
 	</div>
</template>

<script>
// import axios from 'axios'
import ProfPictService from '@/services/ProfPictService'

export default {
	data() {
		return {
			imagePreview: "../assets/logo.png",
			imageUpload: "",
			imageSuccess: "",
			available: false,
			loading: false,
			success: false
		}
	},

	methods: {
		previewImage (files) {
			
			if(files && files[0]) {
				this.available = true
				this.imageUpload = files[0]
				console.log(this.imageUpload)
				
				console.log('im here')
				const reader = new FileReader()

				reader.onload = (e) => {
					this.imagePreview = e.target.result
					console.log(e.target.result)
					// console.log(this.imageData)
				}

				reader.readAsDataURL(files[0])
			}
		},

		async upload () {
			try {
				this.loading = true
				this.available = false
				const files = new FormData()
				files.append("avatar", this.imageUpload)
				console.log('upload')
				const res = (await ProfPictService.upload(files)).data
				this.imageSuccess = res.url
				this.loading = false
				this.success = true
				this.$router.push({path: '/'}) 
			} catch (err) {
				console.log(err)
			}
		}
	}
}
</script>

<style scoped>
	
</style>