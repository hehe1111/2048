function getPositionTop(i) {
    return 20 + i * 120
}

function getPositionLeft(j) {
    return 20 + j * 120
}

function getNumberBackgroundColor(number) {
    switch (number) {
        case 2: return '#eee4da'; break;
        case 4: return '#ede0c8'; break;
        case 8: return '#f2b179'; break;
        case 16: return '#f59563'; break;
        case 32: return '#f67c5f'; break;
        case 64: return '#f65e3b'; break;
        case 128: return '#edcf72'; break;
        case 256: return '#edcc61'; break;
        case 512: return '#99cc00'; break;
        case 1024: return '#33b5e5'; break;
        case 2048: return '#0099cc'; break;
        case 4096: return '#aa66cc'; break;
        case 8192: return '#9933cc'; break;
        default: return '#000000'
    }
}

function getNumberColor(number) {
    if (number <= 4) { return '#776e65' }
    return '#ffffff'
}

function nospace(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) { return false }
        }
    }
    return true
}

// 仅判断是否存在可以移动的元素
function canMoveLeft(board) {
    for (let i = 0; i < 4; i++) {
        // j 从 1 开始，因为第 0 列肯定不能再往左移了
        for (let j = 1; j < 4; j++) {
            // 如果当前格子存在数字
            if (board[i][j] !== 0) {
                // 如果左侧格子为空或与左侧格子数字相等（可合并），即可左移
                if (board[i][j - 1] === 0 || board[i][j - 1] === board[i][j]) {
                    return true
                }
            }
        }
    }
    return false
}
