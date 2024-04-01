import GameManager from "./async.js";

class App {
  async play() {
    const GAMEMANAGER = new GameManager();
    GAMEMANAGER.gameStart();
    const USER_NUM = await GAMEMANAGER.getUserInput();
    const RESULT = await GAMEMANAGER.startGame(USER_NUM);
    if (!RESULT) {
      await GAMEMANAGER.askForRestart();
    }
  }
}
const app = new App();
app.play();

export default App;
