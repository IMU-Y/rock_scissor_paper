const beginBtn = document.querySelector('#begin-btn');
const selectDialog = document.querySelector('#select-dialog');
const selectForm = document.querySelector('#select-form');
const selectBtn = document.querySelector('#select-btn');
// 手势图片
const GestureImg = {
  rock: './images/rock.png',
  scissor: './images/scissor.png',
  paper: './images/paper.png',
}
// 手势
const Gesture = ['rock', 'scissor', 'paper'];
// 总回合数
const MaxRound = 3;
// 当前回合数
let currentRound = 1;
// 当前战绩
const score = {
  robot_win: 0,
  robot_lose: 0,
  player_win: 0,
  player_lose: 0,
};

// 渲染玩家的手势
const renderPlayerGesture = (selectedGesture) => {
  const imgUrl = GestureImg[selectedGesture];
  document.querySelector('.player .title').innerHTML = `<img class='player-img' src=${imgUrl}>`;
}

// 渲染机器人的手势
const renderRobotGesture = () => {
  const random = Math.floor(Math.random() * 3);
  const imgUrl = GestureImg[Gesture[random]];
  document.querySelector('.robot .title').innerHTML = `<img class='robot-img' src=${imgUrl}>`;
  return Gesture[random];
}
// 记录输赢
const resultGame = (robot, player) => {
  let currentRes = "";
  let isPlayerWin = "";
  if (robot === player) {
    currentRes = "本回合平";
    const p = document.querySelector('.current-result');
    p.innerHTML = currentRes;
    return;
  } else {
    if (robot === "rock") {
      if (player !== "scissor") {
        isPlayerWin = true;
      } else {
        isPlayerWin = false;
      }
    } else if (robot === "scissor") {
      if (player === "paper") {
        isPlayerWin = false;
      } else {
        isPlayerWin = true;
      }
    } else if (robot === "paper") {
      if (player === "scissor") {
        isPlayerWin = true;
      } else {
        isPlayerWin = false;
      }
    }
  }
  if (isPlayerWin) {
    score.player_win++;
    score.robot_lose++;
    currentRes = "本回合头号玩家赢";
  } else if (!isPlayerWin) {
    score.player_lose++;
    score.robot_win++;
    currentRes = "本回合机器人赢";
  }

  const p = document.querySelector('.current-result');
  p.innerHTML = currentRes;
  const player_score = document.querySelector('.player .score');
  player_score.innerHTML = `胜：${score.player_win} | 负：${score.player_lose}`;

  const robot_score = document.querySelector('.robot .score');
  robot_score.innerHTML = `胜：${score.robot_win} | 负：${score.robot_lose}`;
}
// 渲染标题
const renderTitle = () => {
  const round = document.querySelector('.round');
  round.innerHTML = `第${currentRound}回合（共${MaxRound}回合）`;
}

// 初始化游戏
const initGame = () => {
  beginBtn.addEventListener('click', () => {
    selectDialog.showModal();
  });
  selectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    renderTitle();
    const playerGesture = e.target.gesture.value;
    renderPlayerGesture(playerGesture);
    const robotGesture = renderRobotGesture();
    selectDialog.close();
    resultGame(robotGesture, playerGesture);
    if (score.player_win >= 2 || score.robot_win >= 2 || currentRound >= 3) {
      if (score.player_win > score.robot_win) {
        judgeWinner("头号玩家");
      } else if (score.player_win < score.robot_win) {
        judgeWinner("机器人");
      } else {
        judgeWinner();
      }
    }
    currentRound++;
  });
}

// 判断最终胜利者
const judgeWinner = (winner) => {
  const resultP = document.querySelector('.total-result');
  beginBtn.style.display = "none";
  if (!winner) {
    resultP.innerHTML = '平局！';
  } else {
    resultP.innerHTML = `${winner}获得胜利！`;
  }
}

initGame();