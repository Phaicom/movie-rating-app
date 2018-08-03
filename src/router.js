import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./components/Contacts.vue";
import AddMovies from "./components/AddMovie.vue";
import Movie from "@/components/Movie";
import Register from "@/components/Register";
import Login from "@/components/Login";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/contacts",
      name: "Contacts",
      component: About
    },
    {
      path: "/movies/add",
      name: "AddMovie",
      component: AddMovies
    },
    {
      path: "/movies/:id",
      name: "Movie",
      component: Movie
    },
    {
      path: "/users/register",
      name: "Register",
      component: Register
    },
    {
      path: "/users/login",
      name: "Login",
      component: Login
    }
  ]
});
