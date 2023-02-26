<template>
  <div class="home">
    <form v-if="signin" @submit.prevent="submitForm">
      <div class="mb-3">
        <textarea
          v-model="tweet"
          class="form-control"
          rows="3"
          placeholder="ゆったりとした時間も大切です。"
        >
        </textarea>

        <p>{{ tweet.length }} / 120字 まで</p>

        <div class="d-grid gap-2">
          <button type="submit" v-if="textLine" class="btn btn-dark">
            これで投稿する！
          </button>
        </div>
      </div>
    </form>

    <div v-if="loading" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div class="flex-container">
      <div class="item" v-for="post in posts" :key="post.id">
        <table>
          <td>
            <img
              class="user-icon"
              :src="'https://1.gravatar.com/avatar/' + post.email + '?s=200'"
            />
          </td>
          <td class="td">
            <p class="user-name">{{ post.username }}</p>
            <p>{{ post.tweet }}</p>
            <p class="time">{{ post.postdate }}</p>
          </td>
        </table>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";

export default {
  data() {
    return {
      signin: false,
      textLine: false,
      tweet: "",
      posts: [],
      currentUser: null,
      username: "",
      email: "",
      loading: true,
    };
  },
  watch: {
    tweet: function (newVal) {
      if (newVal.length > 0) {
        this.textLine = true;
      } else {
        this.textLine = false;
      }
      if (newVal.length > 120) {
        this.textLine = false;
      }
    },
  },
  created() {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      this.currentUser = JSON.parse(currentUser);
      this.username = this.currentUser.displayName;
      this.email = this.currentUser.email;
    }

    // ログイン状態のチェック
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.signin = true;
      } else {
        this.signin = false;
      }
    });
  },
  mounted() {
    axios
      .get("https://teal-backend-api.glitch.me/tweet")
      .then((response) => {
        this.posts = response.data;
        this.loading = false;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    submitForm() {
      axios
        .post(
          "https://teal-backend-api.glitch.me/post?username=" +
            this.username +
            "&email=" +
            this.email +
            "&tweet=" +
            this.tweet
        )
        .then((response) => {
          console.log(response.data);
          alert("投稿しました！");
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true,
          });
        })
        .catch((error) => {
          console.log(error);
          alert("投稿に失敗しました...");
        });
    },
  },
};
</script>

<style>
textarea,
.form-control {
  resize: none;
  padding: 20px;
  font-size: 20px;
  border-radius: 20px;
  outline: none;
}
.flex-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.item {
  width: 100%;
  padding: 15px;
  margin-top: 20px;
  word-break: break-all;
  background: rgb(255, 255, 255);
  border-radius: 20px;
  border: solid #bababa88 1px;
}
.user-icon {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  margin-left: 5px;
  margin-right: 15px;
  border: solid #cecece88 2px;
}
.user-name {
  font-weight: bold;
  font-size: 18px;
}
.time {
  font-size: 13px;
}
</style>
