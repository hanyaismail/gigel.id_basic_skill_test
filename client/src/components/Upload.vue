<template>
	<!-- <div>
		<div>
			<form enctype="multipart/form-data" @submit.prevent="upload()">
				<div>
					<label for="avatar">Upload Here</label>
					<input type="file" name="avatar" accept="image/*" @change="previewImage($event.target.files)">
				</div>
				<button>Upload</button>
			</form>
		</div>
		<div v-if="imagePreview.length>0">
			<img :src="imagePreview" alt="Image Preview" style="width: 200px" />
		</div>

		<div v-if="imageSuccess.length>0">
			<img :src="imageSuccess" alt="Image Preview" style="width: 300px" />
		</div>
	</div> -->

	<div class="mt-4">
		<!-- <v-layout justify-center>
			<v-flex xs3> -->
				<panel title="Change Avatar">
				<div>
					<form enctype="multipart/form-data" @submit.prevent="upload()">
						<div>
							<!-- <label for="avatar">Upload Here</label> -->
							<input type="file" name="avatar" accept="image/*" @change="previewImage($event.target.files)">
						</div>
						<!-- <button>Upload</button> -->
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

		    <v-btn @click="upload">Upload</v-btn>
				
				<!-- <div v-if="imagePreview.length>0">
					<img :src="imagePreview" alt="Image Preview" style="width: 200px" />
				</div> -->

				<!-- <div v-if="imageSuccess.length>0">
					<img :src="imageSuccess" alt="Image Preview" style="width: 300px" />
				</div> -->
	 			</panel>
			<!-- </v-flex>
		</v-layout> -->
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
			imageSuccess: ""
		}
	},

	methods: {
		previewImage (files) {
			
			if(files && files[0]) {
				
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
				const files = new FormData()
				files.append("avatar", this.imageUpload)
				console.log('upload')
				// console.log(this.files)
				// const res = (await axios.post("http://localhost:3000/upload", files, {headers: { 'Content-Type': 'multipart/form-data' } })).data
				const res = (await ProfPictService.upload(files)).data
				this.imageSuccess = res.url
				this.$router.push({name: 'profile'}) 
			} catch (err) {
				console.log(err)
			}
		}
	}
}
</script>

<style scoped>
	
</style>