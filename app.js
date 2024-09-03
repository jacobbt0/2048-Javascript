document.addEventListener('DOMContentLoaded', () => {
    const scoreBar = document.querySelector("#score")
    const gameBoard = document.querySelector("#gameboard")
    const start = document.querySelector("#start").addEventListener('click',restart)
    let squares = []
    let score = 0

    function restart(){
        for(let i=0; i<16; i++){
            squares[i].innerHTML = ""
           
        }
        generateNum()
        generateNum()
    }

    function createSquare() {
        for (let i = 0; i < 16; i++) {
            const square = document.createElement("div")
            square.classList.add('square')
            square.id = i
            square.innerHTML = ""
            gameBoard.appendChild(square)
            squares.push(square)
        }

        generateNum()
        generateNum()
    }

    createSquare()

    function generateNum() {

        win()
        let num = Math.floor(Math.random() * 16)
        if (squares[num].innerHTML == "") {
            squares[num].innerHTML = 2
            gameOver()
        } else generateNum()


    }

    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let one = squares[i].innerHTML
                let two = squares[i + 1].innerHTML
                let three = squares[i + 2].innerHTML
                let four = squares[i + 3].innerHTML
                let row = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)]

                let filteredRow = row.filter(num => num)
                let balance = 4 - filteredRow.length
                let nullArr = Array(balance).fill("")
                let newRow = nullArr.concat(filteredRow)

                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]

            }

        }
    }

    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let one = squares[i].innerHTML
                let two = squares[i + 1].innerHTML
                let three = squares[i + 2].innerHTML
                let four = squares[i + 3].innerHTML
                let row = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)]

                let filteredRow = row.filter(num => num)
                let balance = 4 - filteredRow.length
                let nullArr = Array(balance).fill("")
                let newRow = filteredRow.concat(nullArr)

                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }

    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let one = squares[i].innerHTML
            let two = squares[i + 4].innerHTML
            let three = squares[i + 8].innerHTML
            let four = squares[i + 12].innerHTML
            let column = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)]

            let filteredcolumn = column.filter(num => num)
            let balance = 4 - filteredcolumn.length
            let nullArr = Array(balance).fill("")
            let newColumn = filteredcolumn.concat(nullArr)

            squares[i].innerHTML = newColumn[0]
            squares[i + 4].innerHTML = newColumn[1]
            squares[i + 8].innerHTML = newColumn[2]
            squares[i + 12].innerHTML = newColumn[3]
        }
    }

    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let one = squares[i].innerHTML
            let two = squares[i + 4].innerHTML
            let three = squares[i + 8].innerHTML
            let four = squares[i + 12].innerHTML
            let column = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)]

            let filteredcolumn = column.filter(num => num)
            let balance = 4 - filteredcolumn.length
            let nullArr = Array(balance).fill("")
            let newColumn = nullArr.concat(filteredcolumn)

            squares[i].innerHTML = newColumn[0]
            squares[i + 4].innerHTML = newColumn[1]
            squares[i + 8].innerHTML = newColumn[2]
            squares[i + 12].innerHTML = newColumn[3]
        }
    }

    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML && i%4 !=3 ) {
                let one = squares[i].innerHTML
                let two = squares[i + 1].innerHTML
                let row = [parseInt(one), parseInt(two)]
                if (Number.isInteger(row[0] && row[1])) {

                    let combinedValue = row[0] + row[1]
                    score = score + combinedValue
                    scoreBar.innerHTML = "SCORE "+score
                    squares[i].innerHTML = combinedValue
                    squares[i + 1].innerHTML = ""

                }

            }

        }

    }

    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + 4].innerHTML) {
                let one = squares[i].innerHTML
                let two = squares[i + 4].innerHTML
                let column = [parseInt(one), parseInt(two)]
                if (Number.isInteger(column[0] && column[1])) {

                    let combinedValue = column[0] + column[1]
                    score = score + combinedValue
                    scoreBar.innerHTML = "SCORE "+score
                    squares[i].innerHTML = combinedValue
                    squares[i + 4].innerHTML = ""

                }

            }

        }

    }
    function controls(e) {

        if (e.keyCode === 37) {
            leftKey()
        } else if (e.keyCode === 38) {
            upKey()
        } else if (e.keyCode === 39) {
            rightKey()
        } else if (e.keyCode === 40) {
            downKey()
        }


    }

    function upKey() {
        moveUp()
        combineColumn()
        moveUp()
        generateNum()
    }

    function downKey() {
        moveDown()
        combineColumn()
        moveDown()
        generateNum()
    }

    function rightKey() {
        moveRight()
        combineRow()
        moveRight()
        generateNum()
    }

    function leftKey() {
        moveLeft()
        combineRow()
        moveLeft()
        generateNum()
    }

    function win() {
        for (let i = 0; i < 16; i++) {
            if (squares[i].innerHTML == 2048) {
                document.removeEventListener('keyup', controls)
                return alert("YOU WIN")
            }
        }
    }

    function gameOver() {
        let nul = 0
        for (let i = 0; i < 16; i++) {
            if (squares[i].innerHTML == "")     
        {
                nul++
            }
            
        }
        for (let i = 0; i < 15; i++) {
            if(squares[i].innerHTML == squares[i+1].innerHTML){
                nul++
            }
        }
        for (let i =0; i< 12; i++) {
            if(squares[i].innerHTML == squares[i+4].innerHTML){
                nul++
            }
        }
        if (nul === 0) {
            return alert("GAME OVER")
            document.removeEventListener('keyup', controls)
        }

    }

    document.addEventListener('keyup', controls)

    function addColour() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#afa192'
            else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = 'rgb(100, 73, 10)'
            else if (squares[i].innerHTML == 4) squares[i].style.backgroundColor = 'rgb(114, 43, 10)'
            else if (squares[i].innerHTML == 8) squares[i].style.backgroundColor = '#d60f0f'
            else if (squares[i].innerHTML == 16) squares[i].style.backgroundColor = '#990505'
            else if (squares[i].innerHTML == 32) squares[i].style.backgroundColor = '#790404'
            else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#3a0202'
            else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#180101'
            else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = ''
            else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = ''
            else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = ''
            else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = ''
        }
    }

    setInterval(addColour, 100)
})