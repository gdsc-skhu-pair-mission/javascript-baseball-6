import { Random, Console } from "@woowacourse/mission-utils";
import { NUM_DIGITS } from "./constants.js";

export { playGame };

const generateRandomNumber = () => {
  const computerNumber = [];
  while (computerNumber.length < NUM_DIGITS) {
    const number = Random.pickNumberInRange(1, 9);
    if (!computerNumber.includes(number)) {
      computerNumber.push(number);
    }
  }
  return computerNumber;
};

const getUserInput = async () => {
  let inputNumber = [];
  let userInput = await Console.readLineAsync("숫자를 입력해주세요: ");

  if (isNaN(userInput) || userInput.length != NUM_DIGITS || userInput < 0) {
    throw new Error("[ERROR] 잘못 입력하셨습니다.");
  }

  inputNumber.push(parseInt(userInput / 100));
  userInput = userInput % 100;
  inputNumber.push(parseInt(userInput / 10));
  userInput = userInput % 10;
  inputNumber.push(parseInt(userInput));

  if (new Set(inputNumber).size !== 3) {
    throw new Error("[ERROR] 숫자를 중복하여 입력하셨습니다.");
  }

  return inputNumber;
};

const playGame = async () => {
  Console.print("숫자 야구 게임을 시작합니다.");
  const computerNumber = generateRandomNumber();

  while (true) {
    let inputNumber = await getUserInput();
    let strike = 0;
    let ball = 0;

    for (let i = 0; i < NUM_DIGITS; i++) {
      if (computerNumber.includes(inputNumber[i])) {
        if (inputNumber[i] === computerNumber[i]) {
          strike++;
        } else {
          ball++;
        }
      }
    }

    if (strike === NUM_DIGITS) {
      Console.print("3스트라이크!");
      Console.print("3개의 숫자를 모두 맞히셨습니다! 게임 종료");

      let answer = await Console.readLineAsync(
        "게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요: "
      );

      if (answer === "1") {
        continue;
      } else if (answer === "2") {
        break;
      } else {
        throw new Error("[ERROR]");
      }
    } else if (ball === 0 && strike === 0) {
      Console.print("낫싱");
    } else {
      Console.print(
        (ball > 0 ? `${ball}볼 ` : "") +
          (strike > 0 ? `${strike}스트라이크` : "")
      );
    }
  }
};

const checkGameScore = (strike, ball) => {
  if (ball === 0 && strike === 0) {
    Console.print("낫싱");
  } else if (ball > 0 && strike === 0) {
    Console.print(`${ball}볼`);
  } else if (strike > 0 && ball === 0) {
    Console.print(`${strike}스트라이크`);
  } else {
    Console.print(`${ball}볼 ${strike}스트라이크`);
  }
};
