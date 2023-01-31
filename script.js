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
            row.appendChild(cell)
        }
        canvas.appendChild(row);
    }
}

function changeGrid(size){
    const canvas = document.querySelector(".canvas-container");
    canvas.textContent = '';
    initGrid(canvas, size)
}

function colorMode(){
    const btn = document.querySelectorAll(".btn")[0];
    btn.classList.add("active-btn");
}

function rainbowMode(){
    const btn = document.querySelectorAll(".btn")[1];
    btn.classList.add("active-btn");
}

function eraserMode(){
    const btn = document.querySelectorAll(".btn")[2];
    btn.classList.add("active-btn");
}

function clearGrid(){
    const btn = document.querySelectorAll(".btn")[3];
    
}

function btnHandler(btnType){
    console.log("test");
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

const gridSize = document.querySelector(".slider");
gridSize.value = gridSize.defaultValue;
initGrid(document.querySelector(".canvas-container"), gridSize.defaultValue);