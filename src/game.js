import { Random, Console } from "@woowacourse/mission-utils";
import { NUM_DIGITS } from "./constants.js";
export { playGame };

const generateRandomNumber = () => {
  const RANDOM_NUMBER = [];
  while (RANDOM_NUMBER.length < NUM_DIGITS) {
    const GENERATE_NUMBER = Random.pickNumberInRange(1, 9);
    if (!RANDOM_NUMBER.includes(GENERATE_NUMBER)) {
      RANDOM_NUMBER.push(GENERATE_NUMBER);
    }
  }
  return RANDOM_NUMBER;
};

const getUserInput = async () => {
  let inputNumber = [];
  let user_input = await Console.readLineAsync("숫자를 입력해주세요: ");
  checkUserInputNumber(inputNumber, user_input);
  return inputNumber;
};

const checkUserInputNumber = async (inputNumber, user_input) => {
  const CHECK_USER_INPUT = /^[0-9]+$/;

  if (!CHECK_USER_INPUT.test(user_input)) {
    throw new Error("[ERROR] 잘못된 입력입니다.");
  } else {
    for (const INPUT_NUM of user_input) {
      inputNumber.push(Number(INPUT_NUM));
    }
    if (user_input.length !== NUM_DIGITS) {
      throw new Error("[ERROR] 3자리 수를 입력해주세요.");
    }
    if (new Set(inputNumber).size !== NUM_DIGITS) {
      throw new Error("[ERROR] 중복된 입력입니다.");
    }
  }
};
const playGame = async () => {
  Console.print("숫자 야구 게임을 시작합니다.");
  const RANDOM_NUMBER = generateRandomNumber();
  while (true) {
    let inputNumber = await getUserInput();
    let strike = 0;
    let ball = 0;

    for (let i = 0; i < NUM_DIGITS; i++) {
      if (RANDOM_NUMBER.includes(inputNumber[i])) {
        if (inputNumber[i] === RANDOM_NUMBER[i]) {
          strike++;
        } else {
          ball++;
        }
      }
    }
    if (strike === NUM_DIGITS) {
      Console.print("3스트라이크!");
      Console.print("3개의 숫자를 모두 맞히셨습니다! 게임 종료");
      askForRePlay();
      break;
    }
    checkGameScore(strike, ball);
  }
};

const checkGameScore = (strike, ball) => {
  if (ball === 0 && strike === 0) {
    Console.print("낫싱");
  } else {
    if (ball > 0 && strike === 0) {
      Console.print(`${ball}볼`);
    } else if (strike > 0 && ball === 0) {
      Console.print(`${strike}스트라이크`);
    } else {
      Console.print(`${ball}볼 ${strike}스트라이크`);
    }
  }
};

const askForRePlay = async () => {
  const ANSWER = await Console.readLineAsync(
    "게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요. "
  );
  if (ANSWER === "1") {
    await playGame();
  } else if (ANSWER === "2") {
  } else {
    throw new Error("[ERROR]");
  }
};
