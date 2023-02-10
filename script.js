function initGrid(canvas, size){
    const title = document.querySelector(".size-text");
    title.textContent = size + "x" + size;
    totalGridSize = size;

    for (let j = 0; j < size; j++){
        const row = document.createElement("div");
        row.classList.add("row");
        row.classList.add(j.toString());
        i = 0;
        for (let i = 0; i < size; i++){
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.classList.add(i.toString());

            cell.style.border = "1px solid #453c38";
            cell.style.backgroundColor = "white";
            cell.style.flex = "1"; 

            cell.addEventListener('click', function(){
                if(isDarker)
                    changeBackgroundShade(this, -0.1);
                else if(isLighter)
                    changeBackgroundShade(this, 0.2);
                else if(isRandom && !isEraser)
                    this.style.backgroundColor = getRandomColor();
                else if(isEraser)
                    eraseBackground(this);
                else 
                    this.style.backgroundColor = chosenColor;
            });

            cell.addEventListener('mouseout', function(){
                if (isEraser)
                    resetHighlight(this);
            });

            cell.addEventListener('mouseover', function(){
                if (isEraser)
                    highlightElementsToErase(this);
            });

            row.appendChild(cell)
        }
        canvas.appendChild(row);
    }
}

function highlightElementsToErase(element){
    let parent = element.parentElement;
    let parentId = Number(parent.className[4]);
    if(parent.className.length === 6){
        parentId = Number(parent.className[4] + parent.className[5]);
    }

    let cellId = Number(element.className[5]);
    if(element.className.length === 7){
        cellId = Number(element.className[5] + element.className[6]);
    }
    console.log(totalGridSize);

    if (eraserMode === 1){
            for (let i=-1; i<2; i++){
                canvas = document.querySelector(".canvas-container");
                if(parentId - i >= 0 && parentId - i <= totalGridSize - 1){
                    parent = canvas.children[parentId-i]
                    siblingCells = parent.children;

                    for(let j=-1; j<2; j++){
                        if (cellId - j >= 0 && cellId - j <= totalGridSize - 1) {
                            let gridNewWidth = (Number(siblingCells[cellId - j].style.borderWidth[0]) + 1).toString();
                            siblingCells[cellId - j].style.borderWidth = `${gridNewWidth}px`;
                        }
                    }
                }
            }
    }
    else if (eraserMode === 2){
        for (let i=-2; i<3; i++){
            canvas = document.querySelector(".canvas-container");
            if(parentId - i >= 0 && parentId - i <= totalGridSize - 1){
                parent = canvas.children[parentId-i]
                siblingCells = parent.children;
                
                for(let j=-2; j<3; j++){
                    if (cellId - j >= 0 && cellId - j <= totalGridSize - 1) {
                        let gridNewWidth = (Number(siblingCells[cellId - j].style.borderWidth[0]) + 1).toString();
                        siblingCells[cellId - j].style.borderWidth = `${gridNewWidth}px`;
                    }
                }
            }
            
        }
    }
}

function resetHighlight(element){
    let parent = element.parentElement;
    let parentId = Number(parent.className[4]);
    if(parent.className.length === 6){
        parentId = Number(parent.className[4] + parent.className[5]);
    }

    let cellId = Number(element.className[5]);
    if(element.className.length === 7){
        cellId = Number(element.className[5] + element.className[6]);
    }

    if (eraserMode === 1){
            for (let i=-1; i<2; i++){
                canvas = document.querySelector(".canvas-container");
                if(parentId - i >= 0 && parentId - i <= totalGridSize - 1){
                    parent = canvas.children[parentId-i]
                    siblingCells = parent.children;

                    for(let j=-1; j<2; j++){
                        if (cellId - j >= 0 && cellId - j <= totalGridSize - 1) {
                            let gridNewWidth = (Number(siblingCells[cellId - j].style.borderWidth[0]) - 1).toString();
                            siblingCells[cellId - j].style.borderWidth = `${gridNewWidth}px`;
                        }
                    }
                }
            }
    }
    else if (eraserMode === 2){
        for (let i=-2; i<3; i++){
            canvas = document.querySelector(".canvas-container");
            if(parentId - i >= 0 && parentId - i <= totalGridSize - 1){
                parent = canvas.children[parentId-i]
                siblingCells = parent.children;
                
                for(let j=-2; j<3; j++){
                    if (cellId - j >= 0 && cellId - j <= totalGridSize - 1) {
                        let gridNewWidth = (Number(siblingCells[cellId - j].style.borderWidth[0]) - 1).toString();
                        siblingCells[cellId - j].style.borderWidth = `${gridNewWidth}px`;
                    }
                }
            }
            
        }
    }
}

function eraseBackground(element){
    let parent = element.parentElement;
    let parentId = Number(parent.className[4]);
    let cellId = Number(element.className[5]);

    if (eraserMode === 0)
        element.style.backgroundColor = chosenColor;
    else if (eraserMode === 1){
            for (let i=-1; i<2; i++){
                canvas = document.querySelector(".canvas-container");
                if(parentId - i >= 0 && parentId - i <= totalGridSize){
                    parent = canvas.children[parentId-i]
                    siblingCells = parent.children;

                    for(let j=-1; j<2; j++){
                        if (cellId - j >= 0 && cellId - j <= totalGridSize) 
                            siblingCells[cellId - j].style.backgroundColor = chosenColor;
                    }
                }
                
            }
    }
    else if (eraserMode === 2){
        for (let i=-2; i<3; i++){
            canvas = document.querySelector(".canvas-container");
            if(parentId - i >= 0 && parentId - i <= totalGridSize){
                parent = canvas.children[parentId-i]
                siblingCells = parent.children;
                
                for(let j=-2; j<3; j++){
                    if (cellId - j >= 0 && cellId - j <= totalGridSize) 
                        siblingCells[cellId - j].style.backgroundColor = chosenColor;
                }
            }
            
        }
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
    console.log(r);
    if(darkenPercent > 0 && r <= 0 && g <= 0 && b <= 0)
    {
        r = 5;
        g = 5;
        b = 5;
    }
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
    eraserMode = 0;
}

function eraserMediumMode(){
    btn[7].classList.add("active-btn");
    chosenColor = "white";
    resetBool();
    isEraser = true;
    eraserMode = 1;
}

function eraserBigMode(){
    btn[8].classList.add("active-btn");
    chosenColor = "white";
    resetBool();
    isEraser = true;
    eraserMode = 2;
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

const gridSize = document.querySelector(".slider");
gridSize.value = gridSize.defaultValue;
const palette = document.querySelector(".color-panel");
let chosenColor = palette.value;
let isRandom = false;
let isEraser = false;
let isDarker = false;
let isLighter = false;
let eraserMode = 0;
let totalGridSize = gridSize.defaultValue;
const btn = document.querySelectorAll(".btn");

palette.addEventListener('input', function(){
    chosenColor = this.value;
});



initGrid(document.querySelector(".canvas-container"), gridSize.defaultValue);