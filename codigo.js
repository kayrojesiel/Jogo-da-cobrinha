const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const size = 30

const snake = [
    {x:270, y:240},
   
   
]

const numeroaleatorio = (min, max) => {
    return Math.round (Math.random() * (max-min) + min)
}

const posiçãoaleatoria = () => {
    const number = numeroaleatorio(0, canvas.width - size)
    return Math.round (number / 30) * 30
}

const coraleatoria = () =>  {
    const red = numeroaleatorio(0, 255)
    const green = numeroaleatorio(0, 255)
    const blue = numeroaleatorio(0, 255)

    return `rgb(${red},${green},${blue})`
}

const comida = {
    x:posiçãoaleatoria(),
    y:posiçãoaleatoria(), 
    color:coraleatoria()
}

let direção,   loopId = ""

const drawcomida = () => {
    
    const { x, y, color} = comida

    ctx.shadowColor = color
    ctx.shadowBlur = 50
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0
}

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
    ctx.strokeStyle = "#191919"

    for(let i = 30; i < canvas.width; i += 30){
        ctx.beginPath()
        ctx.lineTo(0,i)
        ctx.lineTo(600,i)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(i,0)
        ctx.lineTo(i,600)
        ctx.stroke()
    }

}

const checarcomida = () => {
    const cabeça = snake[snake.length-1]
    if(cabeça.x == comida.x && cabeça.y == comida.y){
        snake.push(cabeça)

     let x = posiçãoaleatoria()
     let y = posiçãoaleatoria()

     while (snake.find((position) => position.x == x && position.y == y)){
        x = posiçãoaleatoria()
        y = posiçãoaleatoria()
     }
     comida.x = x
     comida.y = y
     comida.color = coraleatoria()
    }
}

const GameLoop = () => {
    clearInterval(loopId)

    ctx.clearRect(0, 0, 600, 600)
    drawGrid()
    drawcomida()
    movimentação()
    drawSnake()
    checarcomida()

    loopId = setTimeout(() => {
        GameLoop()
    }, 300)
}

 GameLoop()

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

