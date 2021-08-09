
//#region data
// DATA 
let clickCount = 0
let height = 120
let width = 100
let inflationRate = 20
let maxsize = 300
let highestPopCount = 0
let currentPopCount = 0
let gameLength = 5000
let clockId = 0
let timeremaining = 0
let currentPlayer = {}

function startGame() {
  document.getElementById("game-controls").classList.remove("hidden")
  document.getElementById("main-controls").classList.add("hidden")
  startclock()
  setTimeout(stopGame, gameLength)
}

function startclock() {
  timeremaining = gameLength
  drawClock()
  clockId = setInterval(drawClock, 1000)
}

function stopclock() {
  clearInterval(clockId)
}

function drawClock() {
  let countdownElem = document.getElementById("countdown")
  countdownElem.innerText = (timeremaining / 1000).toString()
  timeremaining -= 1000
}

function inflate() {
  clickCount++
  height += inflationRate
  width += inflationRate

  if (height > maxsize) {
    console.log("pop the balloon")
    currentPopCount++
    height = 0
    width = 0
  }
  draw()


}

function draw() {
  let balloonElement = document.getElementById("balloon")
  let clickCountElem = document.getElementById("click-count")
  let popCountElem = document.getElementById("pop-count")
  let highestPopCountElem = document.getElementById("high-pop-count")

  let playerNameElem = document.getElementById("player-Name") 

  balloonElement.style.width = width + "px"
  balloonElement.style.height = height + "px"

  clickCountElem.innerText = clickCount.toString()
  popCountElem.innerText = currentPopCount.toString()
  highestPopCountElem.innerText = currentPlayer.topScore.toString()
  playerNameElem.innerText = currentPlayer.name
}

function stopGame() {
  console.log("The game is over")
  document.getElementById("main-controls").classList.remove("hidden")
  document.getElementById("game-controls").classList.add("hidden")
 
  clickCount = 0
  height = 120
  width = 100
  if (currentPopCount > currentPlayer.topScore) {
    currentPlayer.topScore = currentPopCount
    savePlayers()
  }
  stopclock()
  draw()

}

//#endregion data
let players = []
loadPlayers()

function setPlayer(event) {
  event.preventDefault()
  let form = event.target

  let playerName = form.playerName.value

  currentPlayer = players.find(player => player.name == playerName)

  if (!currentPlayer) {
    currentPlayer = { name: playerName, topScore: 0 }
    players.push(currentPlayer)
    savePlayers()
  }


  console.log(currentPlayer)


  form.reset()
  document.getElementById("game").classList.remove("hidden")
  form.classList.add("hidden")
  draw()
}
function changePlayer() {
  document.getElementById("player-form").classList.remove("hidden")
  document.getElementById("game").classList.add("hidden")
}

function savePlayers() {
  window.localStorage.setItem("players", JSON.stringify(players))
}
function loadPlayers() {
  let playersData = JSON.parse(window.localStorage.getItem("players"))
  if (playersData) {
    players = playersData
  }
}
