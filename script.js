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
        players.setAttribute("class", "players active player"); //adding three class name in player element
    }
}

let playerXIcon = "fas fa-times"; //class name of fontawesome cross icon 
let playerOIcon = "far fa-circle"; //class name of fontawesome circle icon
let playerSign = "X"; //suppose player will X

// user click function 
function clickedBox(element){ 
    //console.log(element);
    if(players.classList.contains("player")){ //if players element has contains .player
        element.innerHTML = `<i class="${playerOIcon}"></i>`; //adding circle icon tag inside user clicked element
        players.classList.add("active");
        // if player select O then we'll change the playerSign value to O
        playerSign = "O";
        element.setAttribute("id", playerSign);      
    }else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon tag inside user clicked element
        players.classList.add("active");
        playerSign = "X";
        element.setAttribute("id", playerSign);
    }
    element.style.pointerEvents = "none"; //once user select any box then that box can't be selected again 
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed(); //generating random time delay so bot will delay randomly to select box
  //  console.log(randomDelayTime);
    setTimeout(()=>{
        bot(); //calling bot function 
    }, randomDelayTime); //passing random delay time 
}

// bot click function
function bot(){
    // first change the playerSign...so if user has X value in id then bot will have O
  //  playerSign = "O";
    let array = []; // creating empty array...we'll store unselected box index in this array
    for(let i = 0; i < allBox.length; i++){
        if(allBox[i].childElementCount == 0){ //if span has no any child element 
            array.push(i); //inserting unclicked or unselected boxes inside array means that span has no children  
            //console.log(i + " " + "has no children");
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)]; //getting random index from array so bot will select random unselected box
  //  console.log("randomBox " + randomBox);
    if(array.length > 0){
        if(players.classList.contains("player")){ //if players element has contains .player
            allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon tag inside bot clicked element
            players.classList.remove("active");
            // if user is O then the box id value will be X
            playerSign = "X";
            allBox[randomBox].setAttribute("id", playerSign);
        }else{
            allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; //adding circle icon tag inside bot clicked element
            players.classList.remove("active");
            playerSign = "O";
            allBox[randomBox].setAttribute("id", playerSign);
        }
    }
    //console.log(array);
    allBox[randomBox].style.pointerEvents = "none"; //once bot select any box then user can't select or click on that box 
}