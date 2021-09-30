const bingoBoard = () => {
    const bingoNode = document.getElementById("bingo-board")
    console.log(bingoNode);
    for (let i = 1; i <= 76; i++) {
        let numberNode = document.createElement("div")
        numberNode.classList.add("number")
        numberNode.id = "num" + i
        numberNode.innerText = i
        bingoNode.appendChild(numberNode)

    }
}

let previousResult 
const fixPrevious = () => {
    let pre = document.getElementById("num" + previousResult)
    pre.style.background = "#2f2f2f"
}

const play = () => {
    let result = Math.floor(Math.random() * 76 + 1)
    if (previousResult === result ) {
        play()
        return
    }
    previousResult && fixPrevious()
    let win = document.getElementById("num" + result)
    win.style.background = "#c0d8d8"
    previousResult = result
}

window.onload = () => {
    bingoBoard()
}