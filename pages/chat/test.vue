<template>
  <div>
    <button @click="disconnect" v-if="status==='connected'">연결끊기</button>
    <button @click="connect" v-else>연결</button>{{ status }}
    <br><br>
    <div v-if="status === 'connected'">
      <form @submit.prevent="sendMessage" action="#">
        <input v-model="message"><button type="submit">메시지 전송</button>
      </form>
      <ul id="logs">
        <li v-for="log in logs" class="log" :key="log.data">
          {{ log.event }}: {{ log.data }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "test",
    data() {
      return {
        message: "",
        logs: [],
        status: "disconnected"
      }
    },
    methods: {
      connect() {
        this.socket = new WebSocket("wss://echo.websocket.org");
        this.socket.onopen = () => {
          this.status = "connected";
          this.logs.push({ event: "연결 완료: ", data: 'wss://echo.websocket.org'})


          this.socket.onmessage = ({data}) => {
            this.logs.push({ event: "메세지 수신", data });
          };
        };
      },
      disconnect() {
        this.socket.close();
        this.status = "disconnected";
        this.logs = [];
      },
      sendMessage(e) {
        this.socket.send(this.message);
        this.logs.push({ event: "메시지 전송", data: this.message });
        this.message = "";
      }
    }
  }
</script>

<style scoped>

</style>
