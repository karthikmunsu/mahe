<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Board
        <b-link href="#/home">(Board List)</b-link>
      </h2>
      <b-jumbotron>
        <template slot="header">
          {{board.title}}
        </template>
        <img style="height:200px;width:200px" :src="board.filename" />
        <template slot="lead">
          Name: {{board.name}}<br>
          Date Of Birth: {{board.dob}}<br>
          Gender: {{board.gender}}<br>
          Father Name: {{board.fathername}}<br>
          Address: {{board.address}}<br>
        </template>
        <hr class="my-4">
        <b-btn class="edit-btn" variant="success" @click.stop="editboard(key)">Edit</b-btn>
        <b-btn variant="danger" @click.stop="deleteboard(key)">Delete</b-btn>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

import firebase from 'firebase';
import router from '../router.js'

export default {
  name: 'ShowBoard',
  data () {
    return {
      key: '',
      board: {}
    }
  },
  created () {
    const ref = firebase.firestore().collection('boards').doc(this.$route.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.key = doc.id;
        this.board = doc.data();
        firebase.storage().ref().child('images/'+doc.data().filename).getDownloadURL()
          .then(res => { this.board.filename = res })
          .catch(err => err);
      } else {
        alert("No such document!");
      }
    });
  },
  methods: {
    editboard (id) {
      router.push({
        name: 'EditBoard',
        params: { id: id }
      })
    },
    deleteboard (id) {
      firebase.firestore().collection('boards').doc(id).delete().then(() => {
        router.push({
          name: '/home'
        })
      }).catch((error) => {
        alert("Error removing document: ", error);
      });
    }
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
  .edit-btn {
    margin-right: 20px;
    width: 70px;
  }
</style>