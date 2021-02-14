// selecting all required elements 
const selectBox = document.querySelector(".select-box"),
selectXBtn = selectBox.querySelector(".playerX"),
selectOBtn = selectBox.querySelector(".playerO");

playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players");


window.onload = () =>{ // once window loaded 
    for (let i = 0; i < allBox.length; i++) { //add onclick attributes in all available section's spans 
            allBox[i].setAttribute("onclick", "clickedBox(this)");
    }

    selectXBtn.onclick = ()=>{
        selectBox.classList.add("hide"); //hide the select box on playerX button clicked
        playBoard.classList.add("show"); //show the playboard section on playerX button clicked 
    }
    selectOBtn.onclick = ()=>{
        selectBox.classList.add("hide"); //hide the select box on playerO button clicked
        playBoard.classList.add("show"); //show the playboard section on playerO button clicked 
        players.setAttribute("class", "players active");
    }
}

let playerXIcon = "fas fa-times"; //class name of fontawesome cross icon 
let playerOIcon = "fas fa-circle"; //class name of fontawesome circle icon

function clickedBox(element){

}