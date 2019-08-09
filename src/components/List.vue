<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Board List
        <b-link href="#/add-board">(Add Board)</b-link>
      </h2>
      <b-table striped hover :items="boards" :fields="fields">
        <template slot="actions" scope="row">
          <b-btn size="sm" @click.stop="details(row.item)">Details</b-btn>
        </template>
      </b-table>
    </b-col>
  </b-row>
</template>

<script>

import firebase from 'firebase'
import router from '../router';

export default {
  name: 'List',
  data () {
    return {
      fields: {
        name: { label: 'Name', sortable: true, 'class': 'text-left' },
        dob: { label: 'Dob', 'class': 'text-left' },
        fathername: {label: 'Father Name', 'class': 'text-left'},
        gender: { label: 'Gender', 'class': 'text-left' },
        address: {label: 'Address', 'class': 'text-left'},
        actions: { label: 'Action', 'class': 'text-center' }
      },
      boards: [],
      errors: [],
      ref: firebase.firestore().collection('boards'),
    }
  },
  created () {
    this.ref.onSnapshot((querySnapshot) => {
      this.boards = [];
      querySnapshot.forEach((doc) => {
        this.boards.push({
          key: doc.id,
          name: doc.data().name,
          fathername: doc.data().fathername,
          dob: doc.data().dob,
          gender: doc.data().gender,
          address: doc.data().address
        });
      });
    });
  },
  methods: {
    details (board) {
      router.push({ name: 'ShowBoard', params: { id: board.key }})
    }
  }
}
</script>

<style>
  .table {
    width: 96%;
    margin: 0 auto;
  }
</style>
