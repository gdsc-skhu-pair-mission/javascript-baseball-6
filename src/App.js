import { playGame } from "./game.js";

class App {
  async play() {
    await playGame();
  }
}

const app = new App();
app.play();

export default App;
