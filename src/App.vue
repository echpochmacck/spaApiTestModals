<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link active" to="/" v-if="!$token.value">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register" v-if="!$token.value">Register</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/catalog">Catalog</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="logout" v-if="$token.value">logout</a>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/profile" v-if="$token.value">Profile</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin"
                v-if="$token.value && $role.value == 'admin'">Admin</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <RouterView class="new-screen" />
</template>
<script>
  export default {
    methods: {
      async logout() {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + this.$token.value);


        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };

        localStorage.clear()
        const result = await fetch(`${this.$url}/logout`, requestOptions);
        this.$token.value = '';
        this.$router.push('/');

      }
    }
  }
</script>
<style>
  @keyframes newScreen {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  .new-screen {
    animation: newScreen 1s linear 1;
  }
</style>