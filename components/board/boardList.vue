<template>
  <div class="container">
    <div class="row">
      <nuxt-link to="/board/new" class="my-3">글쓰기</nuxt-link>
      <table class="table table-hover border">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">작성자</th>
          <th scope="col">제목</th>
          <th scope="col">작성일</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="b in boards" :key="b.no">
          <th scope="row">{{ b.no }}</th>
          <td>{{ b.writer }}</td>
          <td>{{ b.title }}</td>
          <td>{{ b.at }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: "boardList",
    computed: {
      ...mapGetters(['boards'])
    }
  }
</script>

<style scoped>

</style>
