<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Add Board
        <b-link href="#/home">(Board List)</b-link>
      </h2>
      <div>
        <!-- <input type="file" @click="selectFile" v-if="!uploadEnd && !uploading" name="add_a_photo"/> -->
    <form ref="form">
      <input
      id="files"
      type="file"
      name="file"
      ref="uploadInput"
      accept="image/*"
      :multiple="false"
      @change="detectFiles($event)" />
    </form>
      <img
        v-if="uploadEnd"
        :src="downloadURL"
        width="100%" />
      <div v-if="uploadEnd">
        <button
          class="ma-0"
          dark
          small
          color="error"
          @click="deleteImage()"
          >
          Delete
        </button>
      </div>
  </div>
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
                         placeholder="Enter Address"
                         :rows="2"
                         :max-rows="6">{{board.address}}</b-form-textarea>
          </b-form-group>
          <b-button type="submit" variant="primary">Save</b-button>
        </b-form>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

import firebase from 'firebase'
import firestorage from 'firebase/firestore';
import router from '../router.js'

export default {
  name: 'AddBoard',
  data () {
    return {
      ref: firebase.firestore().collection('boards'),
      board: {},
      progressUpload: 0,
      fileName: '',
      uploadTask: '',
      uploading: false,
      uploadEnd: false,
      downloadURL: ''
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.board.filename = this.fileName;
      this.ref.add(this.board).then((docRef) => {
        this.board.name = ''
        this.board.dob = ''
        this.board.address = ''
        this.board.fathername = ''
        this.board.gender = ''
        this.board.filename = ''
        router.push({
          name: 'Home'
        })
      })
      .catch((error) => {
        alert("Error adding document: ", error);
      });
    },
    selectFile () {
      this.$refs.uploadInput.click()
    },
    detectFiles (e) {
      let fileList = e.target.files || e.dataTransfer.files
      Array.from(Array(fileList.length).keys()).map(x => {
        this.upload(fileList[x])
      })
    },
    upload (file) {
      this.fileName = file.name
      this.uploading = true
      this.uploadTask = firebase.storage().ref('images/' + file.name).put(file)
    },
    deleteImage () {
      fires.storage()
        .ref('images/' + this.fileName)
        .delete()
        .then(() => {
          this.uploading = false
          this.uploadEnd = false
          this.downloadURL = ''
        })
        .catch((error) => {
          console.error(`file delete error occured: ${error}`)
        })
      this.$refs.form.reset()
    }
  },
  watch: {
    uploadTask: function () {
      this.uploadTask.on('state_changed', sp => {
        this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
      },
      null,
      () => {
        this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.uploadEnd = true
          this.downloadURL = downloadURL
          this.$emit('downloadURL', downloadURL)
        })
      })
    }
  }
}
</script>

<style>
    .jumbotron {
        padding: 2rem;
    }
    .progress-bar {
        margin: 10px 0;
    }
    input[type="file"] {
        clip: rect(0,0,0,0);
    }
</style>
