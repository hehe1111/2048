function showNumberWithAnimation(i, j, number) {
    let numberCell = $(`#number-cell-${i}-${j}`)
    numberCell.css('background-color', getNumberBackgroundColor(number))
    numberCell.css('color', getNumberColor(number))
    numberCell.text(number)
    numberCell.animate({
        width: '100px',
        height: '100px',
        top: getPositionTop(i),
        left: getPositionLeft(j)
    }, 100)
}

function showMoveAnimation(fromX, fromY, toX,toY) {
    let numberCell = $(`#number-cell-${fromX}-${fromY}`)
    numberCell.animate({
        top: getPositionTop(toX),
        left: getPositionLeft(toY)
    }, 200)
    
}