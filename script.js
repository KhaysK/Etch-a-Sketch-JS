function initGrid(canvas, size){
    const title = document.querySelector(".size-text");
    title.textContent = size + "x" + size;

    for (let j = 0; j < size; j++){
        const row = document.createElement("div");
        row.classList.add("row");
        i = 0;
        for (let i = 0; i < size; i++){
            let cell = document.createElement("div");
            cell.classList.add("cell");

            cell.addEventListener('click', function(){
                if (isRandom)
                    this.style.backgroundColor = getRandomColor();
                else this.style.backgroundColor = chosenColor;
            });

            cell.addEventListener("dblclick", function(event) {
                
              });

            row.appendChild(cell)
        }
        canvas.appendChild(row);
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeGrid(size){
    const canvas = document.querySelector(".canvas-container");
    canvas.textContent = '';
    initGrid(canvas, size);
}

function colorMode(){
    const btn = document.querySelectorAll(".btn")[0];
    btn.classList.add("active-btn");
    chosenColor = palette.value;    
    isRandom = false;
}

function rainbowMode(){
    const btn = document.querySelectorAll(".btn")[1];
    btn.classList.add("active-btn");
    isRandom = true;
}

function eraserMode(){
    const btn = document.querySelectorAll(".btn")[2];
    btn.classList.add("active-btn");
    chosenColor = "white";
}

function clearGrid(){
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = "white";
    }
}

function btnHandler(btnType){
    const activeBtn = document.querySelector(".active-btn");

    if(btnType != "clear")
        activeBtn.classList.remove("active-btn");

    switch(btnType){
        case 'color':
            colorMode();
            break;
        case 'rainbow':
            rainbowMode();
            break;
        case 'eraser':
            eraserMode();
            break;
        case 'clear':
            clearGrid();
            break;
    }
}

const palette = document.querySelector(".color-panel");
let chosenColor = palette.value;
let isRandom = false;

palette.addEventListener('input', function(){
    chosenColor = this.value;
});

const gridSize = document.querySelector(".slider");
gridSize.value = gridSize.defaultValue;
initGrid(document.querySelector(".canvas-container"), gridSize.defaultValue);