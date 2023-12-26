const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const size = 30

const snake = [
    {x:200, y:200},
    {x:230, y:200},
   
]

let direção 

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
setInterval(() => {
    ctx.clearRect(0,0,600,600)

    movimentação()
    drawSnake()
}, 300)

