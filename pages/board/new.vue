<template>
  <div class="container">
    <div class="row my-3">
      <h1 class="sub-title my-3">글 작성</h1>
      <form class="w-100 my-3" @submit.prevent="send">
        <div class="form-group">
          <label for="exampleFormControlInput1">타이틀</label>
          <input v-model.trim="title" type="text" class="form-control" id="exampleFormControlInput1" placeholder="타이틀 작성">
        </div>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">글 내용</label>
          <textarea v-model.trim="content" class="form-control" id="exampleFormControlTextarea1" rows="10" style="resize: none;" placeholder="내용을 입력하세요."></textarea>
        </div>
        <div class="btn-wrap">
          <input type="button" value="취소" class="back" @click="back" />
          <input type="submit" value="완료"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "new",
    data: function() {
      return {
        title: "",
        content: "",
        user: this.$store.state.user
      }
    },
    methods: {
      back: function() {
        this.$router.push('/board');
      },
      send: function() {
        // 완료동작action
       this.$store.dispatch('boardSubmit', this.$data);
        console.log('완료');

      }
    }
  }
</script>

<style scoped>
.back {
  background-color: #f69f98;
}
.back:hover {
  background-color: #F37970;
}
.btn-wrap {
  display: flex;
  justify-content: center;
}
</style>
