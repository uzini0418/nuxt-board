<template>
  <BoardList :news="news"></BoardList>
</template>

<script>
  import BoardList from '~/components/board/boardList.vue';
  export default {
    name: "index",
    components: { BoardList },
    async asyncData(context) {
      console.log("asyncData");
      console.log(context);
      // const data = await context.$axios.$get('~/data.js');
      let news = await context.$axios.$get('https://hacker-news.firebaseio.com/v0/item/2921983.json?print=pretty');

      return {
        news
        //userAgent,
        //ip
      }
    }
  }
</script>

<style scoped>

</style>
