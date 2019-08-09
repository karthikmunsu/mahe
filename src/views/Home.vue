<template>
  <div class="home">
    <header>
        <button @click="logout">Logout</button>
    </header>
    <List msg="adfas"/>
  </div>
</template>

<script>
import firebase from 'firebase';
// @ is an alias to /src
import List from '@/components/List.vue'

export default {
  name: 'home',
  components: {
    List
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
};
</script>

<style>
.home {
  padding: 20px;
}
</style>

