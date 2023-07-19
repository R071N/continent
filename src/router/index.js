import { createRouter, createWebHashHistory } from 'vue-router'
import Home from "../pages/Home.vue";
import Category from "../pages/Category.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/category/:slug/:categoryName",
      name: "category",
      component: Category,
      props: true,
    },
  ]
})

export default router
