import { Random, Console } from "@woowacourse/mission-utils";

const COMPUTER = [];
while (COMPUTER.length < 3) {
  const number = Random.pickNumberInRange(1, 9);
  if (!COMPUTER.includes(number)) {
    COMPUTER.push(number);
  }
}

Console.print("숫자 야구 게임을 시작합니다.");

while (true) {
  let inputNumber = [];
  let strike = 0;
  let ball = 0;
  // USER_INPUT_NUMBER()
  const USER_INPUT = Console.readLineAsync(
    "숫자를 입력해주세요.",
    (USER_INPUT) => {
      try {
        if (isNaN(USER_INPUT) || USER_INPUT.length != 3) {
          throw new Error("잘못된 값입니다.");
        }
        inputNumber.push(parseInt(USER_INPUT / 100));
        USER_INPUT = USER_INPUT % 100;
        inputNumber.push(parseInt(USER_INPUT / 10));
        USER_INPUT = USER_INPUT % 10;
        inputNumber.push(USER_INPUT);
      } catch (err) {
        console.error(err.message);
        return false;
      }
    }
  );

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

    let answer = Console.readLineAsync(
      "게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.",
      (answer) => {
        if (answer === 1) {
          // continue;
        } else if (answer === 2) {
          // break;
        } else {
          Console.print("잘못된 숫자를 입력하셨습니다.");
          // break;
        }
      }
    );
  } else if (ball === 0 && strike === 0) Console.print("낫싱");
  else {
    Console.print(ball > 0 ? `${ball}볼 ` : " ");
    Console.print(strike > 0 ? `${strike}스트라이크` : " ");
  }
}
