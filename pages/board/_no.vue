<template>
  <div>
    <ul>
      <li>no: {{board.no}}</li>
      <li>작성자: {{board.writer}}</li>
      <li>제목: {{board.title}}</li>
      <li>내용: {{board.content}}</li>
      <li>시간: {{board.at}}</li>
    </ul>

  </div>
</template>

<script>
  export default {
    name: "boardNo",
    computed: {
      board: function() {
        return this.$store.getters.boardOne(this.$route.params.no);
      }
    }

  }
</script>

<style scoped>

</style>
