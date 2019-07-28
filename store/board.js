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
    },
    boardOne: (state) => (no) => {
      return state.boardList.find(board => board.no === parseInt(no));
    }
  },
  mutations: {
    "BOARD_ADD": (state, board) => {
      board.no = state.boardList.length+1; // board no 추가
      state.boardList.push(board);
    }
  },
  actions: {
    boardSubmit({commit, state}, data) {
      // 현재시각 계산
      let date = new Date();
      date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      // 삽입할 board
      let board = {
        "writer": data.user.name,
        "title": data.title,
        "content": data.content,
        "at": date
      };
      return new Promise(function (resolve, reject) {
          setTimeout(function() {
            commit("BOARD_ADD", board);
            resolve();
          }, 2000);
      });

    }


  }
}
