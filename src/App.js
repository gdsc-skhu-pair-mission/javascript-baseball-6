import { Random, Console } from '@woowacourse/mission-utils';

function createRandomNumbers() {
  const RANDOM_NUMBERS = [];
  const NUMBER_DIGITS = 3;

  while (RANDOM_NUMBERS.length < NUMBER_DIGITS) {
    const number = Random.pickNumberInRange(1, 9);
    if (!RANDOM_NUMBERS.includes(number)) {
      RANDOM_NUMBERS.push(number);
    }
  }
  return RANDOM_NUMBERS;
}

async function validateUserInput() {
  const USER_INPUT = await Console.readLineAsync('숫자를 입력해주세요 : ');
  const USER_VALUE = Array.from(USER_INPUT).map(Number);

  if (Number.isNaN(Number(USER_INPUT))) {
    throw new Error('[ERROR] 숫자가 아닌 것을 입력하시면 안됩니다.');
  }
  if (USER_INPUT.length !== 3) {
    throw new Error('[ERROR] 3자리 수를 입력해주세요.');
  }

  if (new Set(USER_VALUE).size !== USER_VALUE.length) {
    throw new Error('[ERROR] 중복된 수를 입력하시면 안됩니다.');
  }
  if (USER_VALUE.some((number) => number < 1 || number > 9)) {
    throw new Error('[ERROR] 1 ~ 9 사이의 수를 입력해주세요.');
  }

  return USER_VALUE;
}

function CompareUserValue(CORRECT_ANSWER, USER_VALUE) {
  let strike = 0;
  let ball = 0;
  const NUMBER_DIGITS = 3;

  for (let i = 0; i < NUMBER_DIGITS; i++) {
    if (USER_VALUE[i] === CORRECT_ANSWER[i]) strike++;
    else if (CORRECT_ANSWER.includes(USER_VALUE[i])) ball++;
  }
  return [strike, ball];
}

async function askForRestart() {
  const CHECK_RESTART_NUMBER = await Console.readLineAsync(
    '게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.\n',
  );

  if (CHECK_RESTART_NUMBER === '1') {
    // eslint-disable-next-line no-use-before-define
    await playNumberGame();
  } else if (CHECK_RESTART_NUMBER === '2') {
    Console.print('게임을 종료합니다.');
  } else {
    throw new Error('[ERROR] 잘못된 입력입니다.');
  }
}

async function playNumberGame() {
  const ANSWER = createRandomNumbers();
  // 테스트 할 때 정답을 알기위한 로그
  // Console.print(ANSWER);

  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const USER_INPUT_VALUE = await validateUserInput();
    // eslint-disable-next-line no-await-in-loop
    const [strike, ball] = await CompareUserValue(ANSWER, USER_INPUT_VALUE);
    let resultMessage = '';

    if (ball > 0) {
      resultMessage += `${ball}볼 `;
    }
    if (strike > 0) {
      resultMessage += `${strike}스트라이크`;
    }
    if (strike === 0 && ball === 0) {
      resultMessage = '낫싱';
    }
    Console.print(resultMessage);
    if (strike === 3) {
      Console.print('3개의 숫자를 모두 맞히셨습니다! 게임 종료');
      break;
    }
  }

  await askForRestart();
}

class App {
  // 아직 this를 사용하지않아서 임시로 에러를 해결하기 위해 eslint-disable를 사용하였습니다.
  // eslint-disable-next-line class-methods-use-this
  async play() {
    Console.print('숫자 야구 게임을 시작합니다.');
    await playNumberGame();
  }
}
const game = new App();
game.play();

export default App;
