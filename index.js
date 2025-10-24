const $ = s => document.querySelector(s)
const $all = s => document.querySelectorAll(s)
  
  
const w = $("#win")
const l = $("#lose")
const t = $("#tie")
  
const playground = $(".playground")
const player = $("#player")
const computer = $("#computer")
  
const score = JSON.parse(localStorage.getItem('score')) || {
    win : 0,
    lose : 0,
    tie : 0
  }
  
const MOVES = ["Rock","Paper","Scissor"]
  
var computerMove = MOVES[0]
  
const messages = {
  win : "🎉 you won",
  lose : "🥲 you lose",
  tie :"🤝 it's a tie"
}
  
const emojiMove = {
  "Rock" : "✊",
  "Paper" : "🖐️",
  "Scissor" : "✌️"
}
  
const computerEmoji = emojiMove[computerMove.toString()]
  
const updateScore = () => {
  w.textContent = score.win
  l.textContent = score.lose
  t.textContent = score.tie
    
  localStorage
    .setItem('score', JSON.stringify(score))
}
  
updateScore()
  
//reset scores
const reset = () => {
  localStorage.removeItem('score')
  score.win = score.lose = score.tie = 0
  updateScore()
}
  
//animated showcase
const showMovesOnPlayground = (move,computerMove) => {
  computer.innerHTML = `
    <center><h2>Computer</h2></center>
    <div>${emojiMove[computerMove]}</div>
  `
    
  player.innerHTML = `
    <center><h2>You</h2></center>
    <div>${emojiMove[move]}</div>
  `
}

// determine winner 
const determineWinner = (move,computerMove) => {
  if(move === computerMove) return 'tie'
  
  let rockWinCase = (move === 'Rock' && computerMove === 'Scissor')
  let paperWinCase = (move === 'Paper' && computerMove === 'Rock')
  let scissorWinCase = (move === 'Scissor' && computerMove === 'Paper')
  
  if(rockWinCase || paperWinCase || scissorWinCase) {
    return 'win'
  }
  return 'lose'
}
  
// make move by player
const makePlayerMove = move => {
  let idx = Math.floor(Math.random()*3)
  computerMove = MOVES[idx]
  
  const CASE = determineWinner(move,computerMove)
  
  
  if(CASE === 'win') {
    score.win += 1
  } else if(CASE === 'lose') {
    score.lose += 1
  } else {
    score.tie += 1
  }
  
  let msg = messages[CASE]
  
  $(".message").innerHTML = `<center><div class='txt'>${msg}</div></center>`
  console.log(msg)

  updateScore()
  showMovesOnPlayground(move,computerMove)
    
}
  
  