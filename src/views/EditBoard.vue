<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Board
        <router-link :to="{ name: 'ShowBoard', params: { id: key } }">(Show Board)</router-link>
      </h2>
      <b-jumbotron>
        <b-form @submit="onSubmit">
          <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Enter Name">
            <b-form-input id="name" v-model.trim="board.name"></b-form-input>
          </b-form-group>
          <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Enter DOB">
            <b-form-input id="dob" v-model.trim="board.dob"></b-form-input>
          </b-form-group>
          <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Enter Gender">
            <b-form-input id="dob" v-model.trim="board.gender"></b-form-input>
          </b-form-group>
          <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Enter Father Name">
            <b-form-input id="fathername" v-model.trim="board.fathername"></b-form-input>
          </b-form-group>
          <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Enter Address">
              <b-form-textarea id="description"
                         v-model="board.address"
                         placeholder="Enter something"
                         :rows="2"
                         :max-rows="6">{{board.address}}</b-form-textarea>
          </b-form-group>
          <b-button type="submit" variant="primary">Update</b-button>
        </b-form>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

import firebase from 'firebase'
import router from '../router'

export default {
  name: 'EditBoard',
  data () {
    return {
      key: this.$route.params.id,
      board: {}
    }
  },
  created () {
    const ref = firebase.firestore().collection('boards').doc(this.$route.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.board = doc.data();
      } else {
        alert("No such document!");
      }
    });
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      const updateRef = firebase.firestore().collection('boards').doc(this.$route.params.id);
      updateRef.set(this.board).then((docRef) => {
        this.board.name = ''
        this.board.dob = ''
        this.board.address = ''
        this.board.fathername = ''
        this.board.gender = ''
        router.push({ name: 'ShowBoard', params: { id: this.$route.params.id }})
      })
      .catch((error) => {
        alert("Error adding document: ", error);
      });
    }
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
</style>