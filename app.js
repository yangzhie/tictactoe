const playerOne = {
    name: '',
    avatar: '',
    hearts: 0,
    choicesArr: [],
    matchesArr: [],
    winOrLoss: []
}

const playerTwo = {
    name: null,
    avatar: null,
    hearts: 0,
    choicesArr: [],
    matchesArr: [],
    winOrLoss: []
}

let currentPlayer = null
let roundCount = 1

// player details
const playerOneNameElem = document.querySelector('.player1 input')
const playerTwoNameElem = document.querySelector('.player2 input')
const playerOneAvatarElem = document.querySelector('.player1-avatar')
const playerTwoAvatarElem = document.querySelector('.player2-avatar')
const playerOneHpElems = document.querySelectorAll('.player1 .active-hearts')
const playerTwoHpElems = document.querySelectorAll('.player2 .active-hearts')

// setup details
const messageWrapperElem = document.querySelector('.message-wrapper')
const avatarWrapperElem = document.querySelector('.avatar-wrapper')
const avatarChoicesElems = document.querySelectorAll('.avatar-choices')
const messageElem = document.querySelector('.message')
const playerOneTurnElem = document.querySelector('#player1-turn')
const playerTwoTurnElem = document.querySelector('#player2-turn')
const nextRoundElem = document.querySelector('.next-round-btn')
const resetElem = document.querySelector('.reset-btn')
const boxElems = document.querySelectorAll('.board div')
const boardElem = document.querySelector('.board')
const roundCountElem = document.querySelector('#round-count')
const backgroundMusicElem = document.querySelector('#background-music')
const playMusicElem = document.querySelector('#play-music')
const muteMusicElem = document.querySelector('#mute-music')

// event listeners
for (let avatarChoiceElem of avatarChoicesElems) {
    avatarChoiceElem.addEventListener('click', handleSetPlayerAvatar)
}
playerOneNameElem.addEventListener('blur', isPlayerOneNameFilled)
playerTwoNameElem.addEventListener('blur', isPlayerTwoNameFilled)
playerOneTurnElem.addEventListener('click', handlePickFirstTurn)
playerTwoTurnElem.addEventListener('click', handlePickFirstTurn)
nextRoundElem.addEventListener('click', handleNextRound)
resetElem.addEventListener('click', handleReset)
playerOneNameElem.addEventListener('focus', handleBackgroundMusic)
playMusicElem.addEventListener('click', handleBackgroundMusic)
muteMusicElem.addEventListener('click', handleMuteMusic)

function handleMuteMusic() {
    backgroundMusicElem.muted = true
}

function handleBackgroundMusic() {
    backgroundMusicElem.play()
    backgroundMusicElem.muted = false
    backgroundMusicElem.volume = 0.3
}


function isPlayerOneNameFilled() {
    if (!playerOneNameElem.value) {
        return
    }
    playerOne.name = playerOneNameElem.value
    toggleAvatarPointerEvent(avatarWrapperElem)
    playerOneNameElem.setAttribute('disabled', true)
    messageElem.textContent = 'Player 1 choose your avatar'
}

function isPlayerTwoNameFilled() {
    if (!playerTwoNameElem.value) {
        return
    }
    playerTwo.name = playerTwoNameElem.value
    toggleAvatarPointerEvent(avatarWrapperElem)
    playerTwoNameElem.setAttribute('disabled', true)
    messageElem.textContent = 'Player 2 choose your avatar'
}

function handleSetPlayerAvatar(event) {
    if (!playerOne.avatar) {
        playerOne.avatar = event.target.src
        playerOneAvatarElem.src = playerOne.avatar
        playerOneAvatarElem.style.display = 'block'
        playerTwoNameElem.removeAttribute('disabled')
        toggleAvatarPointerEvent(avatarWrapperElem)
        messageElem.textContent = 'Player 2 enter your name below'
    } else {
        playerTwo.avatar = event.target.src
        toggleAvatarPointerEvent(avatarWrapperElem)
        playerTwoAvatarElem.src = playerTwo.avatar
        playerTwoAvatarElem.style.display = 'block'
        playerOneTurnElem.src = playerOne.avatar
        playerTwoTurnElem.src = playerTwo.avatar
        avatarWrapperElem.style.display = 'none'
        playerOneTurnElem.style.display = 'inline'
        playerTwoTurnElem.style.display = 'inline'
        messageElem.textContent = 'Who will go first?'
        handlePickFirstTurn
    }
    event.target.style.display = 'none'
}

function handlePickFirstTurn(event) {

    if (event.target.src === playerOne.avatar) {
        currentPlayer = playerOne
    } else {
        currentPlayer = playerTwo
    }
    if (event.target.src !== playerOneTurnElem.src) {
        playerOneTurnElem.style.display = 'none'
    } else {
        playerTwoTurnElem.style.display = 'none'
    }
    messageElem.textContent = `${currentPlayer.name} will go first`
    setTimeout(startGame, 2000)
}

function handlePlayerChoice(event) {
    let choiceElem = event.target
    choiceElem.style.pointerEvents = 'none'
    choiceElem.style.backgroundImage = `url(${currentPlayer.avatar})`
    let numberChoice = Number(choiceElem.dataset.num)
    currentPlayer.choicesArr.push(numberChoice)
    if (currentPlayer.choicesArr.length >= 3) {
        checkForWinningPattern(currentPlayer)
        decideWinOrDraw(playerOne, playerTwo)
    }
    switchPlayer()
}

function handleNextRound() {
    roundCount++
    roundCountElem.textContent = roundCount
    toggleMessageElemDisplay()
    messageElem.textContent = ''
    resetBoxElems()
    resetPlayersChoices()
    resetPlayersMatchesArr()
    for (let boxElem of boxElems) {
        boxElem.style.pointerEvents = 'auto'
    }
    handlePlayerChoice
}

function handleReset() {

    resetElem.style.display = 'none'
    messageElem.textContent = ''
    playerOne.name = ''
    playerTwo.name = ''
    playerOne.avatar = ''
    playerTwo.avatar = ''
    avatarWrapperElem.style.display = 'block'
    playerOneHpElems.forEach(elem => elem.style.display = 'inline')
    playerTwoHpElems.forEach(elem => elem.style.display = 'inline')
    resetPlayersChoices()
    resetPlayersMatchesArr()
    resetBoxElems()
    roundCount = 1
    roundCountElem.textContent = roundCount
    playerOneAvatarElem.setAttribute('src', '')
    playerTwoAvatarElem.setAttribute('src', '')
    playerOneTurnElem.src = ''
    playerTwoTurnElem.src = ''
    playerOneNameElem.removeAttribute('disabled')
    playerTwoNameElem.removeAttribute('disabled')
    playerOneNameElem.value = null
    playerTwoNameElem.value = null
    avatarChoicesElems.forEach(elem => elem.style.display = 'inline')
    messageElem.textContent = 'Player 1 enter your name below'
    playerTwoNameElem.setAttribute('disabled', true)
    toggleAvatarPointerEvent()

    isPlayerOneNameFilled()
}