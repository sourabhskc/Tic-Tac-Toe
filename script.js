// selecting all required elements 
const selectBox = document.querySelector(".select-box"),
    selectXBtn = selectBox.querySelector(".playerX"),
    selectOBtn = selectBox.querySelector(".playerO");

playBoard = document.querySelector(".play-board"),
    allBox = document.querySelectorAll("section span"),
    players = document.querySelector(".players"),
    resultBox = document.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replayBtn = resultBox.querySelector("button");

window.onload = () => { // once window loaded 
    for (let i = 0; i < allBox.length; i++) { //add onclick attributes in all available section's spans 
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }

    selectXBtn.onclick = () => {
        selectBox.classList.add("hide"); //hide the select box on playerX button clicked
        playBoard.classList.add("show"); //show the playboard section on playerX button clicked 
    }
    selectOBtn.onclick = () => {
        selectBox.classList.add("hide"); //hide the select box on playerO button clicked
        playBoard.classList.add("show"); //show the playboard section on playerO button clicked 
        players.setAttribute("class", "players active player"); //adding three class name in player element
    }
}

let playerXIcon = "fas fa-times"; //class name of fontawesome cross icon 
let playerOIcon = "far fa-circle"; //class name of fontawesome circle icon
let playerSign = "X"; //suppose player will X
let runBot = true;

// user click function 
function clickedBox(element) {
    //console.log(element);
    if (players.classList.contains("player")) { //if players element has contains .player
        element.innerHTML = `<i class="${playerOIcon}"></i>`; //adding circle icon tag inside user clicked element
        players.classList.add("active");
        // if player select O then we'll change the playerSign value to O
        playerSign = "O";
        element.setAttribute("id", playerSign);
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon tag inside user clicked element
        players.classList.add("active");
        playerSign = "X";
        element.setAttribute("id", playerSign);
    }
    selectWinner(); //calling the winner function
    playBoard.style.pointerEvents = "none"; //once user select then user can't select any other box untill box select
    element.style.pointerEvents = "none"; //once user select any box then that box can't be selected again 
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed(); //generating random time delay so bot will delay randomly to select box
    //  console.log(randomDelayTime);
    setTimeout(() => {
        bot(runBot); //calling bot function 
    }, randomDelayTime); //passing random delay time 
}

// bot click function
function bot(runBot) {
    if (runBot) { //if runBot is true then run the following codes 
        let array = []; // creating empty array...we'll store unselected box index in this array
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) { //if span has no any child element 
                array.push(i); //inserting unclicked or unselected boxes inside array means that span has no children  
                //console.log(i + " " + "has no children");
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)]; //getting random index from array so bot will select random unselected box
        //  console.log("randomBox " + randomBox);
        if (array.length > 0) {
            if (players.classList.contains("player")) { //if players element has contains .player
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon tag inside bot clicked element
                players.classList.remove("active");
                // if user is O then the box id value will be X
                playerSign = "X";
                allBox[randomBox].setAttribute("id", playerSign);
            } else {
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; //adding circle icon tag inside bot clicked element
                players.classList.remove("active");
                playerSign = "O";
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner(); //calling the winner
        }
        //console.log(array);
        allBox[randomBox].style.pointerEvents = "none"; //once bot select any box then user can't select or click on that box 
        playBoard.style.pointerEvents = "auto";
    }
}

// let work on select the winner
function getId(idname) {
    return document.querySelector(".box" + idname).id; //returning id name 
}

function checkClass(val1, val2, val3, sign) {
    if (getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
        return true;
    }
}

function selectWinner() { //if one combination of them matched then select the winner
    if (checkClass(1, 2, 3, playerSign) || checkClass(4, 5, 6, playerSign) || checkClass(7, 8, 9, playerSign) || checkClass(1, 4, 7, playerSign) || checkClass(2, 5, 8, playerSign) || checkClass(3, 6, 9, playerSign) || checkClass(1, 5, 9, playerSign) || checkClass(3, 5, 7, playerSign)) {
        console.log(playerSign + " " + "is the winner");
        //once match won by someone then stop the bot
        runBot = false;
        bot(runBot);
        setTimeout(() => {
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700); //700 ms delay

        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    } else {
        //If match has drawn 
        // first we'll check all id...if all span has id and no one won the game then we'll draw the game 
        if (getId(1) != "" && getId(2) != "" && getId(3) != "" && getId(4) != "" && getId(5) != "" && getId(6) != "" && getId(7) != "" && getId(8) != "" && getId(9) != "") {
            runBot = false;
            bot(runBot);
            setTimeout(() => {
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            }, 700); //700 ms delay

            wonText.textContent = `Match has been drawn!`;
        }
    }
}

// working of Replay button
replayBtn.onclick = ()=>{
    window.location.reload(); //reload the current page
}