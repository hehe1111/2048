let board = []
let score = 0
let hasConflicted = []

$(document).ready(function () {
    newGame()
})

function newGame() {
    // 初始化棋盘格
    init()

    // 随机在两个格子中生成数字
    generateOneNumber()
    generateOneNumber()
}

function init() {
    // 初始化所有格子
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let gridCell = $(`#grid-cell-${i}-${j}`)
            gridCell.css('top', getPositionTop(i))
            gridCell.css('left', getPositionLeft(j))
        }
    }

    // 初始化二维数组 board、hasConflicted
    for (let i = 0; i < 4; i++) {
        board[i] = []
        hasConflicted[i] = []
        for (let j = 0; j < 4; j++) {
            board[i][j] = 0
            hasConflicted[i][j] = false
        }
    }

    updateBoardView()
    score = 0
}

function updateBoardView() {
    $('.number-cell').remove()
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            $('.grid-container').append(`<div class="number-cell" id="number-cell-${i}-${j}"></div>`)
            let numberCell = $(`#number-cell-${i}-${j}`)
            if (board[i][j] === 0) {
                numberCell.css('width', '0px')
                numberCell.css('height', '0px')
                numberCell.css('top', getPositionTop(i) + 50)
                numberCell.css('left', getPositionLeft(j) + 50)
            } else {
                numberCell.css('width', '100px')
                numberCell.css('height', '100px')
                numberCell.css('top', getPositionTop(i))
                numberCell.css('left', getPositionLeft(j))
                numberCell.css('background-color', getNumberBackgroundColor(board[i][j]))
                numberCell.css('color', getNumberColor(board[i][j]))
                numberCell.text(board[i][j])
            }

            // 重置
            hasConflicted[i][j] = false
        }
    }
}

function generateOneNumber() {
    if (noSpace(board)) { return false }

    // 随机生成一个位置
    let randomX = parseInt(Math.floor(Math.random() * 4)) // 0, 1, 2, 3
    let randomY = parseInt(Math.floor(Math.random() * 4)) // 0, 1, 2, 3
    // 如果位置上已经有数字，就重新生成随机位置
    let times = 0
    while (times < 20) {
        if (board[randomX][randomY] === 0) { break }
        randomX = parseInt(Math.floor(Math.random() * 4))
        randomY = parseInt(Math.floor(Math.random() * 4))

        times += 1
    }

    // 如果计算机试了 20 次之后，仍没有得到可用的随机位置，就人工生成位置
    if (times === 20) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === 0) {
                    randomX = i
                    randomY = j
                }                
            }
        }
    }

    // 随机生成一个数字：2 或 4，生成概率各为 50%
    let randomNumber = Math.random() < 0.5 ? 2 : 4

    // 在生成的随机位置上显示生成的随机数字
    board[randomX][randomY] = randomNumber
    showNumberWithAnimation(randomX, randomY, randomNumber)
    
    return true
}

$(document).keydown((event) => {
    switch (event.keyCode) {
        case 37: // left
            if (moveLeft(board)) { triggerNextActionAfterMoveDone() }
            break
        case 38: // up
            if (moveUp(board)) { triggerNextActionAfterMoveDone() }
            break
        case 39: // right
            if (moveRight(board)) { triggerNextActionAfterMoveDone() }
            break
        case 40: // down
            if (moveDown(board)) { triggerNextActionAfterMoveDone() }
            break
        default:
            break
    }
})

function moveLeft(board) {
    if (!canMoveLeft(board)) { return false }
    
    // moveLeft
    // 移动具体的元素：哪个元素可移动？可以移动到具体哪个位置？
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (let k = 0; k < j; k++) {
                    if (board[i][k] === 0 && noBlockHorizontal(i, k, j, board)) {
                        // move
                        showMoveAnimation(i, j, i, k)
                        board[i][k] = board[i][j]
                        board[i][j] = 0
                        continue
                    } else if (board[i][k] === board[i][j]
                        && noBlockHorizontal(i, k, j, board)
                        && !hasConflicted[i][k]) {
                            //move
                            showMoveAnimation(i, j, i, k)
                            //add
                            board[i][k] += board[i][j]
                            board[i][j] = 0
                            // add score
                            score += board[i][k]
                            updateScore(score)
                            hasConflicted[i][k] = true
                            continue
                    }
                }
            }
        }
    }

    // 刷新视图：从 M 到 V，将数据变更反映到视图上
    // 待移动动画 showMoveAnimation 完成后，再刷新视图
    // 否则动画尚未完成就被视图刷新动作覆盖掉了
    updateAfterMoveDone()
    return true
}

function moveUp(board) {
    if (!canMoveUp(board)) { return false }
    
    // moveUp
    for (let i = 1; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (let k = 0; k < i; k++) {
                    if (board[k][j] === 0 && noBlockVertical(j, k, i, board)) {
                        // move
                        showMoveAnimation(i, j, k, j)
                        board[k][j] = board[i][j]
                        board[i][j] = 0
                        continue
                    } else if (board[k][j] === board[i][j]
                        && noBlockVertical(j, k, i, board)
                        && !hasConflicted[k][j]) {
                            //move
                            showMoveAnimation(i, j, k, j)
                            //add
                            board[k][j] += board[i][j]
                            board[i][j] = 0
                            // add score
                            score += board[k][j]
                            updateScore(score)
                            hasConflicted[k][j] = true
                            continue
                    }
                }
            }
        }
    }

    updateAfterMoveDone()
    return true
}

function moveRight(board) {
    if (!canMoveRight(board)) { return false }
    
    // moveRight
    for (let i = 0; i < 4; i++) {
        // for (let j = 0; j < 3; j++) {
        for (let j = 2; j >= 0; j--) {
            if (board[i][j] !== 0) {
                for (let k = 3; k > j; k--) {
                    if (board[i][k] === 0 && noBlockHorizontal(i, j, k, board)) {
                        // move
                        showMoveAnimation(i, j, i, k)
                        board[i][k] = board[i][j]
                        board[i][j] = 0
                        continue
                    } else if (board[i][k] === board[i][j]
                        && noBlockHorizontal(i, j, k, board)
                        && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k)
                        //add
                        board[i][k] += board[i][j]
                        board[i][j] = 0
                        // add score
                        score += board[i][k]
                        updateScore(score)
                        hasConflicted[i][k] = true
                        continue
                    }
                }
            }
        }
    }

    updateAfterMoveDone()
    return true
}

function moveDown(board) {
    if (!canMoveDown(board)) { return false }
    
    // moveDown
    // for (let i = 0; i < 3; i++) {
    for (let i = 2; i >= 0; i--) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (let k = 3; k > i; k--) {
                    if (board[k][j] === 0 && noBlockVertical(j, i, k, board)) {
                        // move
                        showMoveAnimation(i, j, k, j)
                        board[k][j] = board[i][j]
                        board[i][j] = 0
                        continue
                    } else if (board[k][j] === board[i][j]
                        && noBlockVertical(j, i, k, board)
                        && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j)
                        //add
                        board[k][j] += board[i][j]
                        board[i][j] = 0
                        // add score
                        score += board[k][j]
                        updateScore(score)
                        hasConflicted[k][j] = true
                        continue
                    }
                }
            }
        }
    }

    updateAfterMoveDone()
    return true
}

function isGameOver() {
    if (noSpace(board) && noMove(board)) {
        gameOver()
    }
}

function gameOver() {
    alert('Game Over!')
}

function updateAfterMoveDone() {
    setTimeout(updateBoardView, 200)
}

function triggerNextActionAfterMoveDone() {
    setTimeout(generateOneNumber, 210)
    setTimeout(isGameOver, 300)
}