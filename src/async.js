import { Random, Console } from "@woowacourse/mission-utils";

class GameManager {
  constructor() {
    this.COMPUTER = this.generateRandomNum();
  }

  gameStart() {
    Console.print("숫자 야구 게임을 시작합니다.");
  }

  generateRandomNum() {
    const COMPUTER = [];
    while (COMPUTER.length < 3) {
      const number = Random.pickNumberInRange(1, 9);
      if (!COMPUTER.includes(number)) {
        COMPUTER.push(number);
      }
    }
    console.log(COMPUTER);
    return COMPUTER;
  }

  async getUserInput() {
    try {
      let inputNumber = [];
      let userInput = await Console.readLineAsync("숫자를 입력해주세요: ");
      if (isNaN(userInput) || userInput.length != 3 || userInput < 0) {
        throw new Error("[ERROR] 잘못된 값입니다.");
      } else {
        inputNumber.push(Math.floor(userInput / 100));
        userInput = userInput % 100;
        inputNumber.push(Math.floor(userInput / 10));
        userInput = userInput % 10;
        inputNumber.push(Math.floor(userInput));

        if (new Set(inputNumber).size != 3) {
          throw new Error("[ERROR] 중복된 숫자를 입력하셨습니다.");
        }
        console.log(inputNumber);
        return inputNumber;
      }
    } catch (err) {
      Console.print(err.message);
      return this.getUserInput();
    }
  }

  async startGame(userInput) {
    while (true) {
      let inputNumber = userInput;
      let strike = 0;
      let ball = 0;

      for (let i = 0; i < 3; i++) {
        if (this.COMPUTER.includes(inputNumber[i])) {
          if (inputNumber[i] === this.COMPUTER[i]) {
            strike++;
          } else {
            ball++;
          }
        }
      }
      if (strike === 3) {
        Console.print("3스트라이크!");
        Console.print("3개의 숫자를 모두 맞히셨습니다! 게임 종료");
        this.askForRestart();
        break;
      } else if (ball === 0 && strike === 0) {
        Console.print("낫싱");
      } else {
        Console.print(
          `${ball > 0 ? `${ball}볼` : ""} ${
            strike > 0 ? `${strike}스트라이크` : ""
          }`
        );
      }
    }
  }

  async askForRestart() {
    let answer = await Console.readLineAsync(
      "게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요: "
    );
    if (answer === "1") {
      this.COMPUTER = this.generateRandomNum();
      await this.startGame();
    } else if (answer === "2") {
      Console.print("게임 종료");
    } else {
      Console.print("잘못된 숫자를 입력하셨습니다.");
    }
  }
}

export default GameManager;
