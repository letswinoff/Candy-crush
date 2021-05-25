document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 8
    const squares = []
    let score = 0


    const candyColors = [
        'url(images/red-candy.png)',
        'url(images/yellow-candy.png)',
        'url(images/orange-candy.png)',
        'url(images/purple-candy.png)',
        'url(images/green-candy.png)',
        'url(images/blue-candy.png)'
    ]
    function createBoard() 
    {
        for(let i = 0; i < width*width; i++) 
        {
            const square = document.createElement('div')
            square.setAttribute('draggable', true)
            square.setAttribute('id', i)
            let randomColor = Math.floor(Math.random() * candyColors.length)
            square.style.backgroundImages = candyColors[randomColor]
            grid.appendChild(square)
            squares.push(square)
        }
    }

    createBoard()

    let colorBeingDragged
    let colorBeingReplaced
    let squareIdBeingDragged
    let squareIdBeingReplaced

    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))

    function dragStart()
    {
        colorBeingDragged = this.style.backgroundImages
        squareIdBeingDragged = parseInt(this.id)
        console.log(colorBeingDragged)
        console.log(this.id, 'dragstart')
    }

    function dragOver(e)
    {
        e.preventDefault()
        console.log(this.i, 'dragover')
    }

    function dragEnter(e)
    {
        e.preventDefault()
        console.log(this.id, 'dragenter')
    }

    function dragLeave()
    {
        console.log(this.id, 'dragleave')
    }

    function dragDrop()
    {
        console.log(this.id, 'dragdrop')
        colorBeingReplaced = this.style.backgroundImages
        squareIdBeingReplaced = parseInt(this.id)
        this.style.backgroundImages = colorBeingDragged
        squares[squareIdBeingDragged].style.backgroundImages = colorBeingReplaced
    }

    function dragEnd()
    {
        console.log(this.id, 'dragend')
        let validMoves = [squareIdBeingDragged -1, squareIdBeingDragged -width, squareIdBeingDragged +1, squareIdBeingDragged +width]
        
        let validMove = validMoves.includes(squareIdBeingReplaced)
        if(squareIdBeingReplaced && validMove)
        {
            squareIdBeingReplaced = null
        }
        else if(squareIdBeingReplaced && !validMove)
        {
            squares[squareIdBeingReplaced].style.backgroundImages = colorBeingReplaced
            squares[squareIdBeingDragged].style.backgroundImages = colorBeingDragged
        }
        else
            squares[squareIdBeingDragged].style.backgroundImages = colorBeingDragged
    }


    function moveDown() {
        for (i = 0; i < 55; i++) 
        {
            if(squares[i + width].style.backgroundImages === '') {
                squares[i + width].style.backgroundImages = squares[i].style.backgroundImages
                squares[i].style.backgroundImages = ''
                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
                const isFirstRow = firstRow.includes(i)
                if (isFirstRow && squares[i].style.backgroundImages === '') {
                  let randomColor = Math.floor(Math.random() * candyColors.length)
                  squares[i].style.backgroundImages = candyColors[randomColor]
                }
            }
        }
    }
    
    

    function checkRowforFour() {
        for(i=0; i < 60; i++){
            let rowOfFour = [i, i+1, i+2, i+3]
            let decidedColor = squares[i].style.backgroundImages
            const isBlank = squares[i].style.backgroundImages === ''

            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
            if (notValid.includes(i)) continue

            if (rowOfFour.every(index => squares[index].style.backgroundImages === decidedColor && !isBlank)) {
                score += 4
                scoreDisplay.innerHTML = score
                rowOfFour.forEach(index => {
                    squares[index].style.backgroundImages = ''
                })
            }
                
        }
    }
    checkRowforFour()


    function checkColumnForFour() {
        for (i = 0; i < 47; i ++) {
            let columnOfFour = [i, i+width, i+width*2, i+width*3]
            let decidedColor = squares[i].style.backgroundImages
            const isBlank = squares[i].style.backgroundImages === ''
    
            if(columnOfFour.every(index => squares[index].style.backgroundImages === decidedColor && !isBlank)) {
                score += 4
                scoreDisplay.innerHTML = score
                columnOfFour.forEach(index => {
                    squares[index].style.backgroundImages = ''
                })
            }
        }
    }
    checkColumnForFour()


    function checkRowforThree() {
        for(i=0; i < 61; i++){
            let rowOfThree = [i, i+1, i+2]
            let decidedColor = squares[i].style.backgroundImages
            const isBlank = squares[i].style.backgroundImages === ''

            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
            if (notValid.includes(i)) continue

            if (rowOfThree.every(index => squares[index].style.backgroundImages === decidedColor && !isBlank)) {
                score += 3
                scoreDisplay.innerHTML = score
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundImages = ''
                })
            }
                
        }
    }
    checkRowforThree()


    function checkColumnForThree() {
        for (i = 0; i < 47; i ++) {
            let columnOfThree = [i, i+width, i+width*2]
            let decidedColor = squares[i].style.backgroundImages
            const isBlank = squares[i].style.backgroundImages === ''
    
            if(columnOfThree.every(index => squares[index].style.backgroundImages === decidedColor && !isBlank)) {
                score += 3
                scoreDisplay.innerHTML = score
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundImages = ''
                })
            }
        }
    }
    checkColumnForThree()


    window.setInterval(function(){
        checkRowforFour()
        checkColumnForFour()
        checkRowforThree()
        checkColumnForThree()
        moveDown()
    }, 100)


})