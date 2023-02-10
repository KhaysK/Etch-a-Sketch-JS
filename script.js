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

            cell.style.border = "1px solid #453c38";
            cell.style.flex = "1"; 

            cell.addEventListener('click', function(){
                if(isDarker){
                    changeBackgroundShade(this, -0.10);
                }
                else if (isLighter){
                    changeBackgroundShade(this, 0.10);
                }
                else if (isRandom && !isEraser)
                    this.style.backgroundColor = getRandomColor();
                else {
                    this.style.backgroundColor = chosenColor;
                }
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

function changeBackgroundShade(element, darkenPercent) {
    let originalColor = window.getComputedStyle(element).backgroundColor;
    let colorComponents = originalColor.match(/\d+/g);
    let r = colorComponents[0];
    let g = colorComponents[1];
    let b = colorComponents[2];
    r = Math.floor(r * (1 + darkenPercent));
    g = Math.floor(g * (1 + darkenPercent));
    b = Math.floor(b * (1 + darkenPercent));
    let newColor = "rgb(" + r + "," + g + "," + b + ")";
    element.style.backgroundColor = newColor;
  }

function changeGrid(size){
    const canvas = document.querySelector(".canvas-container");
    canvas.textContent = '';
    initGrid(canvas, size);
}

function colorMode(){
    btn[0].classList.add("active-btn");
    chosenColor = palette.value;    
    resetBool();
}

function rainbowMode(){
    btn[3].classList.add("active-btn");
    resetBool();
    isRandom = true;
}

function eraserSmallMode(){
    btn[6].classList.add("active-btn");
    chosenColor = "white";
    resetBool();
    isEraser = true;
}

function clearGrid(){
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = "white";
    }
}

function gridBorderSwitcher(){
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].style.borderWidth == "1px"){
            cells[i].style.borderWidth = "0px";
        }
        else {
            cells[i].style.borderWidth = "1px";
        }
            
    }
}
function resetBool(){
    isRandom = false;
    isEraser = false;
    isDarker = false;
    isLighter = false;
}

function darkerBackgroundColor(){
    btn[2].classList.add("active-btn");
    resetBool();
    isDarker = true;
}

function lighterBackgroundColor(){
    btn[1].classList.add("active-btn");
    resetBool();
    isLighter = true;
}

function btnHandler(btnType){
    const activeBtn = document.querySelector(".active-btn");

    if(btnType != "clear" && btnType != "grid")
        activeBtn.classList.remove("active-btn");

    switch(btnType){
        case 'color':
            colorMode();
            break;
        case 'rainbow':
            rainbowMode();
            break;
        case 'eraserSmall':
            eraserSmallMode();
            break;
        case 'eraserMedium':
            eraserMediumMode();
            break;
        case 'eraserBig':
            eraserBigMode();
            break;
        case 'clear':
            clearGrid();
            break;
        case 'darker':
            darkerBackgroundColor();
            break;
        case 'lighter':
            lighterBackgroundColor();
            break;
        case 'grid':
            gridBorderSwitcher();
            break;
    }
}

const palette = document.querySelector(".color-panel");
let chosenColor = palette.value;
let isRandom = false;
let isEraser = false;
let isDarker = false;
let isLighter = false;
const btn = document.querySelectorAll(".btn");

palette.addEventListener('input', function(){
    chosenColor = this.value;
});

const gridSize = document.querySelector(".slider");
gridSize.value = gridSize.defaultValue;
initGrid(document.querySelector(".canvas-container"), gridSize.defaultValue);