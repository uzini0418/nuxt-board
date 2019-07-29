<template>
  <div>
    <ul>
      <li>no: {{board.no}}</li>
      <li>작성자: {{board.writer}}</li>
      <li>제목: {{board.title}}</li>
      <li>내용: {{board.content}}</li>
      <li>시간: {{board.at}}</li>
    </ul>
    <div class="btn-wrap">
      <input type="button" value="돌아가기" class="back" @click="back" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "boardNo",
    methods: {
      back: function() {
        this.$router.push('/board');
      }
    },
    computed: {
      board: function() {
        return this.$store.getters.boardOne(this.$route.params.no);
      }
    }

  }
</script>

<style scoped>
  ul {
    width: 50%;
    margin: 30px auto;
  }
  ul > li {
    border: 1px solid black;
    list-style-type: none;
  }

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
