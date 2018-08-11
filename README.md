仿 2048 游戏

- 项目来源：[慕课网2048私人订制](https://www.imooc.com/learn/76)

```javascript
// 初始化棋盘格：用 JS 定位格子
// - main.js -
function init() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let gridCell = $(`#grid-cell-${i}-${j}`)
            gridCell.css('top', getPositionTop(i))
            gridCell.css('left', getPositionLeft(j))
        }
    }
}

// - support.js -
function getPositionTop(i) {
    return 20 + i * 120
}

function getPositionLeft(j) {
    return 20 + j * 120
}
```

### 捕捉触摸事件

- `touchstart` 与 `touchend` 在不同的对象上捕获
- `touches` 在多点触摸（多个手指）时，记录不同手指与屏幕的接触
- `changedTouches` 也同理
- 在此处，`event.touches[0].pageX` 和 `event.touches[0].clientX` 两者的值相等。
- **在屏幕坐标中，Y 轴的正方向是朝下的**
- 判断滑动的方向
    - 先判断是 X 轴还是 Y 轴上的滑动：通过比较 `|endX - startX|` 与 `|endY - startY|` 的大小
    - 然后依据 `endX - startX` 或 `endY - startY` 差值的正负判断是左或右还是上或下

```javascript
// event.touches[0]
document.addEventListener('touchstart', (event) => {
    startX = event.touches[0].pageX
    startY = event.touches[0].pageY
})

// event.changedTouches[0]
document.addEventListener('touchend', (event) => {
    endX = event.changedTouches[0].pageX
    endY = event.changedTouches[0].pageY

    deltaX = endX - startX
    deltaY = endY - startY

    // 单击也会产生 touchend 事件，通过给定一个域值，来确保确实发生了滑动
    if (Math.abs(deltaX) < 0.1 * documentWidth && Math.abs(deltaY) < 0.1 * documentWidth) { return }

    if (Math.abs(deltaX) >= Math.abs(deltaY)) {
        // x 轴方向的滑动
        if (deltaX > 0) {
            // 右移
            if (moveRight(board)) {
                triggerNextActionAfterMoveDone()
            }
        } else {
            // 左移
            if (moveLeft(board)) {
                triggerNextActionAfterMoveDone()
            }
        }

    } else {
        // y 轴方向的滑动
        if (deltaY > 0) {
            // 下移
            if (moveDown(board)) {
                triggerNextActionAfterMoveDone()
            }
        } else {
            // 上移
            if (moveUp(board)) {
                triggerNextActionAfterMoveDone()
            }
        }
    }
})
```

### 解决安卓 4.0 的 Bug

```javascript
document.addEventListener('touchmove', (event) => {
    event.preventDefault()
})
```