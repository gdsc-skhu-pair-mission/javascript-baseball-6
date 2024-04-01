import { startGame } from "./async.js";

class App {
  async play() {
    await startGame(); // startGame 함수가 완료될 때까지 기다림
    // console.log("게임이 종료되었습니다."); // 게임 종료 후에 실행될 코드 추가
  }
}

// startGame();
const app = new App();
app.play();

export default App;
