import { Random, Console } from '@woowacourse/mission-utils';

class App {
  async play() {
    Console.print('숫자 야구 게임을 시작합니다.');
  }
}

function RandomAnswer() {
  const CORRECT_ANSWER = [];

  while (CORRECT_ANSWER.length < 3) {
    const number = Random.pickNumberInRange(1, 9);
    if (!CORRECT_ANSWER.includes(number)) {
      CORRECT_ANSWER.push(number);
    }
  }
  return CORRECT_ANSWER;
}

async function InputAnswer() {
  let userInput;
  let userAnswer;

  userInput = await Console.print('숫자를 입력해주세요 : ');
  if (isNaN(parseInt(userInput))) {
    throw new Error('숫자가 아닌 것을 입력하시면 안됩니다.');
  }
  if (userInput.length !== 3) {
    throw new Error('3자리 수를 입력해주세요.');
  }

  userAnswer = Array.from(userInput).map(Number);

  if (new Set(userAnswer).size !== userAnswer.length) {
    throw new Error('중복된 수를 입력하시면 안됩니다.');
  }
  if (userAnswer.some(number => number < 1 || number > 9)) {
    throw new Error('1 ~ 9 사이의 수를 입력해주세요.');
  }

  return userAnswer;
}

const game = new App();
game.play();

export default App;
