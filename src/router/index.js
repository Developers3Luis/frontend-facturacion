import Vue from "vue";
import VueRouter from "vue-router";
import '../../public/Home.css'


Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: 'facturacion',},
  { path: '/facturacion/', redirect:'/facturacion/Home'},
  { path: "/facturacion/Home",name: "Home", component: () => import("../views/Home.vue"),},
  { path: '/facturacion/'}
];

const router = new VueRouter({

  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
