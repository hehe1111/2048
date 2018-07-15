let board = []
let score = 0

$(document).ready(function () {
    newGame()
})

function newGame() {
    // 初始化棋盘格
    init()

    // 随机在两个格子中生成数字

}

function init() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let gridCell = $(`#grid-cell-${i}-${j}`)
            gridCell.css('top', getPositionTop(i))
            gridCell.css('left', getPositionLeft(j))
        }
    }
}

for (let i = 0; i < 4; i++) {
    board[i] = []
    for (let j = 0; j < 4; j++) {
        board[i][j] = 0
    }
}

updateBoardView()

function updateBoardView() {
    $('.number-cell').remove()
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            $('.grid-container').append(`<div class="number-cell" id="number-cell-${i}-${j}"></div>`)
            let numberCell = $('.number-cell-${i}-${j}')

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
        }
    }
}

function generateOneNumber() {
    if (nospace(board)) { return false }

    // 随机生成一个位置
    let randomX = parseInt(Math.floor(Math.random() * 4)) // 0, 1, 2, 3
    let randomY = parseInt(Math.floor(Math.random() * 4)) // 0, 1, 2, 3
    // 如果位置上已经有数字，就重新生成随机位置
    while (true) {
        if (board[randomX][randomY] === 0) { break }
        randomX = parseInt(Math.floor(Math.random() * 4))
        randomY = parseInt(Math.floor(Math.random() * 4))
    }

    // 随机生成一个数字：2 或 4，生成概率各为 50%
    let randomNumber = Math.random() < 0.5 ? 2 : 4

    // 在生成的随机位置上显示生成的随机数字
    board[randomX][randomY] = randomNumber
    showNumberWithAnimation(randomX, randomY, randomNumber)
    
    return true
}