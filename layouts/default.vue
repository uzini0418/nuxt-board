<template>
  <div>
    <header>
      <nav class="d-flex flex-column">
        <div class="text-center title-wrap"><nuxt-link to="/" class="title">HOME PAGE</nuxt-link></div>
        <div class="d-flex justify-content-center gnb-wrap">
          <nuxt-link to="/board">게시판</nuxt-link>
        </div>
      </nav>
    </header>
    <nuxt/>
  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 500;
  font-size: 50px;
  color: #35495e;
  letter-spacing: 1px;
}

header {
  height: 150px;
  background-color: #F37970;
}
header > nav > .title-wrap {
  height: 100px;
}
header > nav > .gnb-wrap {

}
</style>

