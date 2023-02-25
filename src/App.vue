<template>
  <div id="app">

    <div class="container-fluid mt-5">
      
      <ul class="nav justify-content-center mb-5">
        <li class="nav-item">
          <router-link class="nav-link" to="/">
            <button class="btn btn-dark">
              <i class="bi bi-house-door-fill"></i>
            </button>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/home/user">
            <button class="btn btn-dark">
              <i class="bi bi-person-circle"></i>
            </button>
          </router-link>
        </li>
      </ul>
      
      <router-view />
    
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Yomogi&display=swap');

html, body {
  background: #ffffff;
  font-family: 'Yomogi', cursive;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

a {
  text-decoration: none;
  font-weight: bold;
  color: #4e7295;
}

a.router-link-exact-active {
  color: #42b983;
}

.container-fluid {
  margin-right: auto;
  margin-left: auto;
  max-width: 700px;
}
*:focus {
outline: none;
}

.form-control:focus, textarea:focus, input:focus, input[type]:focus, .uneditable-input:focus {
  outline: none;
  box-shadow: none;
  border: #8c8c8c98 1px solid;
}
</style>
