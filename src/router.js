import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home';
import Login from '@/views/Login';
import SignUp from '@/views/SignUp';
import ShowBoard from '@/views/ShowBoard';
import AddBoard from '@/views/AddBoard';
import EditBoard from '@/views/EditBoard';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/show-board/:id',
      name: 'ShowBoard',
      component: ShowBoard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/add-board',
      name: 'AddBoard',
      component: AddBoard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-board/:id',
      name: 'EditBoard',  
      component: EditBoard,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('login');
  else if (['show-board', 'add-board', 'edit-board'].includes(to.name) && !requiresAuth && currentUser) next(to.name)
  else if (!requiresAuth && currentUser) next();
  else next();
});

export default router;