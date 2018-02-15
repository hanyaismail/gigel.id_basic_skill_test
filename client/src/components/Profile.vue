<template>
	<div>
		<v-layout justify-center>
			<v-flex xs9>
				<panel title="profile">
					<v-layout>
						
						<v-dialog v-model="avachange" max-width="290">
							<Upload />
    				</v-dialog>

    				<v-dialog v-model="editprofile" max-width="350">
							<EditProfile />
    				</v-dialog>

    				<v-dialog v-model="passchange" max-width="290">
							<ChangePassword />
    				</v-dialog>

						<v-flex class="white elevation-1 mr-2"xs3>
							<v-avatar
		          size="150px"
		          class="grey lighten-4"
		          >
		          	<img :src="avatar" alt="avatar">
		        	</v-avatar>
		        	<div @click.stop="avachange = true" class="edit">Change Avatar</div>
		        	<div v-if="user.displayname"><h1>{{user.displayname}}</h1></div>
		        	<div v-else><h1>{{user.name}}</h1></div>

		          <div v-if="user.occupation"><h2>{{user.occupation}}</h2></div>
		          <div v-else @click.stop="editprofile = true" class="edit">Add Occupation</div>
						</v-flex>

						<v-flex xs9>
							<div class="white elevation-1 full left mb-4 px-2">
								<h1>Bio</h1>
								<p v-if="user.bio">{{user.bio}}</p>
								<p v-else @click.stop="editprofile = true" class="edit">Add Bio</p>
							</div>
							
							<div class="white elevation-1 left full px-2">
								<h1>Personal Info</h1>
								<div>
									<v-icon medium color="teal darken-2">email</v-icon>
									{{user.email}}
								</div>
								<div>
									<v-icon medium color="teal darken-2">home</v-icon>
									<span v-if="user.bio">{{user.location}}</span>
									<span v-else @click.stop="editprofile = true" class="edit">Add Location</span>
								</div>
								<div>
									<v-icon medium color="teal darken-2">email</v-icon>
								</div>
							</div>

								<v-btn 
				         	class="cyan" 
				         	@click.native.stop="editprofile = true" 
				         	dark>Edit
				         </v-btn>

				         <v-btn 
				         	class="cyan" 
				         	@click.native.stop="passchange = true" 
				         	dark>Change Password
				         </v-btn>
						</v-flex>
					</v-layout>
				</panel>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
import {mapState} from 'vuex'
import UserService from '@/services/UserService'
import ProfPictService from '@/services/ProfPictService'
import Upload from '@/components/Upload'
import EditProfile from '@/components/EditProfile'
import ChangePassword from '@/components/CHangePassword'

export default {
	data () {
		return {
			avatar: "../assets/logo.png",
			avachange: false,
			editprofile: false,
			passchange: false,
		}
	},

	components: {
		Upload,
		EditProfile,
		ChangePassword
	},

	computed: {
		...mapState([
			'isUserLoggedin',
			'user'
		])
	},

	methods: {
		edit: function() {
			this.$router.push({name: 'edit'})
		},

		changeAvatar: function() {
			this.$router.push({name: 'upload'})
		}
	},

	async mounted () {
		try {
			console.log('profile mounted')
			const ava = (await ProfPictService.view()).data
			if (ava == null || ava == undefined || ava == '') {
				console.log('no ava');
				console.log(ava)
				// this.avatar = '../assets/logo.png'
				console.log(this.avatar)
			} else {
				console.log(ava)
				this.avatar = ava.url
				console.log(this.avatar);
			}
		} catch(err) {
			console.log(err);
		}
	}
}
</script>

<style>
	.left{
		text-align: left;
	}

	.full{
		width: 100%;
	}

	.edit{
	cursor: pointer;
}

	.edit:hover {
	color: #e9e;
}
</style>