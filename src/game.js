import { Random, Console } from "@woowacourse/mission-utils";
export { startGame };

function generateRandomNumber() {
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

Console.print("숫자 야구 게임을 시작합니다.");

async function getUserInput() {
  // try {
  let inputNumber = [];
  let USER_INPUT = await Console.readLineAsync("숫자를 입력해주세요: ");

  if (isNaN(USER_INPUT) || USER_INPUT.length != 3 || USER_INPUT < 0) {
    throw new Error("[ERROR] 잘못 입력하셨습니다.");
  }

  inputNumber.push(parseInt(USER_INPUT / 100));
  USER_INPUT = USER_INPUT % 100;
  inputNumber.push(parseInt(USER_INPUT / 10));
  USER_INPUT = USER_INPUT % 10;
  inputNumber.push(parseInt(USER_INPUT));

  if (new Set(inputNumber).size !== 3) {
    throw new Error("[ERROR] 숫자를 중복하여 입력하셨습니다.");
  }

  return inputNumber;
  // } catch (err) {
  // Console.print(err.message);
  // return getUserInput(); // process.exit() 안 쓰고 어떻게 처리해야 하는지 모르겠다.
  // }
}

async function startGame() {
  let COMPUTER = generateRandomNumber();
  while (true) {
    let inputNumber = await getUserInput();
    let strike = 0;
    let ball = 0;

    for (let i = 0; i < 3; i++) {
      if (COMPUTER.includes(inputNumber[i])) {
        if (inputNumber[i] === COMPUTER[i]) {
          strike++;
        } else {
          ball++;
        }
      }
    }

    if (strike === 3) {
      Console.print("3스트라이크!");
      Console.print("3개의 숫자를 모두 맞히셨습니다! 게임 종료");

      let answer = await Console.readLineAsync(
        "게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요: "
      );
      if (answer === "1") {
        COMPUTER = generateRandomNumber();
        continue;
      } else if (answer === "2") {
        break;
      } else {
        throw new Error("[ERROR]");
        // break;
      }
    } else if (ball === 0 && strike === 0) {
      Console.print("낫싱");
    } else {
      if (ball > 0 && strike === 0) {
        Console.print(`${ball}볼 `);
      } else if (strike > 0 && ball === 0) {
        Console.print(`${strike}스트라이크`);
      } else {
        Console.print(`${ball}볼 ${strike}스트라이크`);
      }
    }
  }
}
