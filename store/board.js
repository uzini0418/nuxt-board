export default {
  state: {
    boardList: [
      {
        "no": 1,
        "writer": '홍길동',
        "title": '제목쓰',
        "content": '내용',
        "at": '2019-07-25 11:30:00'
      },
      {
        "no": 2,
        "writer": '송유진',
        "title": '글올리기',
        "content": '내용테스트',
        "at": '2019-07-25 15:00:00'
      },
    ]
  },
  getters: {
    boards(state) {
      return state.boardList;
    }
  },
  mutations: {
  },
  actions: {
    boardSubmit({commit, state}, payload) {
      // 사용자 계정 가져옴
      console.log(payload.user);
      console.log(payload.title);
      console.log(payload.content);

    }

  }
}
