import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Images from '@/components/Images'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import Profile from '@/components/Profile'
// import EditProfile from '@/components/EditProfile'
// import ChangePassword from '@/components/ChangePassword'
// import Upload from '@/components/Upload'

Vue.use(Router)

export default new Router({
  routes: [
  	// {
  	// 	path: '*',
  	// 	redirect: 'upload'
  	// },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    // {
    //   path: '/profile/edit',
    //   name: 'edit',
    //   component: EditProfile
    // },
    // {
    // 	path: '/upload',
    // 	name: 'upload',
    // 	component: Upload
    // },
    {
    	path: '/images',
    	name: 'images',
    	component: Images
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    // {
    //   path: '/changepassword',
    //   name: 'changepass',
    //   component: ChangePassword
    // },
  ]
})
