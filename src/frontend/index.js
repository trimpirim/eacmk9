import Vue from 'vue'
import app from './app.vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import OurDogs from './our-dogs/our-dogs.component.vue'
import OurDog from './our-dog/our-dog.component.vue'
import Home from './home/home.component.vue'
import Puppy from './puppy/puppy.component.vue'
import Services from './services/services.component.vue'

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  {path: '/our-dogs', name: 'our-dogs', component: OurDogs},
  {path: '/', name: 'index', component: Home},
  {path: '/home', name: 'home', component: Home},
  {path: '/puppy/:id', name: 'puppy', component: Puppy},
  {path: '/our-dog/:dog', name: 'our-dog', component: OurDog},
  {path: '/services', name: 'services', component: Services}
]

const router = new VueRouter({
  routes,
  mode: 'history'
})


new Vue({
  router,
  render: createEl => createEl(app),
}).$mount('#app')