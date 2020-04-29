import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/fish",
    name: "Fish",
    component: () => import("../views/Fish.vue")
  },
  {
    path: "/insects",
    name: "Insekten",
    component: () => import("../views/Insects.vue")
  },
  {
    path: "/shells",
    name: "Shells",
    component: () => import("../views/Shells.vue")
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
