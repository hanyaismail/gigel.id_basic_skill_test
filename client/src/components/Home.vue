<template>
	<div>
		<v-layout>
			<v-flex xs9 offset-xs2>
				<panel title="profile">

				</panel>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
import {mapState} from 'vuex'
import UserService from '@/services/UserService'

export default {
	data () {
		return {
		}
	},

	computed: {
		...mapState([
			'isUserLoggedin',
			'user'
		])
	},

	async mounted () {

	}
}
</script>

<style>
	
</style>