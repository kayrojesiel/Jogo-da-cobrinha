const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const size = 30

const snake = [
    {x:270, y:240},
   
   
]

let direção,   loopId = ""

const drawSnake = () => {
    ctx.fillStyle = "#ddd"

    snake.forEach( (position, index) => {
        if(index == snake.length-1){
            ctx.fillStyle = "green"
        }

        ctx.fillRect(position.x, position.y, size , size)
    })
        
}

const movimentação = () => {
    if(!direção) return

    const cabeça = snake[snake.length-1]

    if (direção == "right"){
        snake.push({x:cabeça.x + size, y:cabeça.y})
    }
    if (direção == "left"){
        snake.push({x:cabeça.x - size, y:cabeça.y})
    }
    if (direção == "down"){
        snake.push({x:cabeça.x , y:cabeça.y + size})
    }
    if (direção == "up"){
        snake.push({x:cabeça.x, y:cabeça.y - size})
    }

    snake.shift()
}

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "red"

    ctx.lineTo(300,0)
    ctx.lineTo(300,600)

    ctx.stroke()
}

drawGrid()

const GameLoop = () => {
    clearInterval(loopId)

    ctx.clearRect(0, 0, 600, 600)

    movimentação()
    drawSnake()

    loopId = setTimeout(() => {
        GameLoop()
    }, 300)
}
// GameLoop()

document.addEventListener("keydown",({key}) => {
    if(key == "ArrowRight" && direção != "left"){
        direção = "right"
    }
    if(key == "ArrowLeft" && direção != "right"){
        direção = "left"
    }
    if(key == "ArrowDown" && direção != "up"){
        direção = "down"
    }
    if(key == "ArrowUp" && direção != "down"){
        direção = "up"
    }
})

