<template>
  <div class="login">
    <div class="text-center pt-5 pb-3">
      <!-- ログイン前 -->
      <h2 v-if="!signin" class="pb-3">Welcome !</h2>
      <p v-if="!signin" class="pb-5">本サービスのご利用には<br>Google アカウントが必要です</p>
      <button v-if="!signin" class="btn btn-outline-dark" type="button" @click="loginWithGoogle()">Google で ログイン</button>
      <!-- ログイン後 -->
      <a href="https://ja.gravatar.com/" target="_blank" rel="noopener noreferrer">
        <img v-if="signin" class="img-thumbnail mb-4" :src="'https://www.gravatar.com/avatar/' + md5 + '?s=120'">
      </a>
      <h4 v-if="signin" class="mb-4">{{ userdata.displayName }}</h4>
      <p v-if="signin" class="mb-5">{{ userdata.email }}</p>
      <button v-if="signin" class="btn btn-outline-dark" @click="logout()">ログアウト</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import forge from "node-forge";

export default {
  data(){
    return{
      signin: false,
      userdata: "",
      md5: ""
    }
  },
  created() {
    // ログイン状態のチェック
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.userdata = user
        const md = forge.md.md5.create();
        md.update(user.email);
        this.md5 = md.digest().toHex()
        //これより前に色々なデータを取得する必要がある。(非表示になっちゃうから)
        this.signin = true;
      } else {
        this.signin = false;
      }
    })
  },
  methods: {
    async loginWithGoogle() {
      // アカウント登録で使うプロバイダーを選択
      const provider = new firebase.auth.GoogleAuthProvider();
      try {
        // ログインに成功したら
        const userCredential = await firebase.auth().signInWithPopup(provider);
        // userCredential.user にいろんなユーザーの情報が入ってる
        const user = userCredential.user;

        // ログイン情報をローカルストレージに保存する
        localStorage.setItem('currentUser', JSON.stringify(user));
        // localStorage.setItem(x, y) として
        // x はデータを保存するためのキー
        // y は user が json状態 だから、JSON.stringify()で json形式型文字列 にする。

      } catch (error) {
        // ログインに失敗したら
        alert("Error: " + error)
      }
    },
    async logout() {
      await firebase.auth().signOut();
    }
  }
}
</script>

