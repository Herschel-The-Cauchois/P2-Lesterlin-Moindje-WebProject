var game = 0;
var complete = 0;
//Game method : add event listeners & reveal other divs step by step

window.addEventListener("load", function() { //When page fully loaded, puts only html to start the game
    document.getElementById("inspect").style.display = "none";
    document.getElementById("init").style.display = "flex"; //Makes initial stuff appear, disappears other sections
    document.getElementById("ready").addEventListener("click", function() { //button triggers game start
        console.log("Game start");
        document.getElementById("init").classList.add("bye-bye"); //Adds init section to bye bye which triggers fading out animation
        setTimeout(function() { //After animation execution replaces with game
            document.getElementById("init").style.display = "none";
            document.getElementById("inspect").style.display = "flex";
        }, 1800);
    });
})



/* while (complete != 1) { //Loop that will run the program until all the games are done
    switch(game) {
        case 0:
            console.log("Tabasco de poire");
            break;
        default:
            console.log("Eh !!!!");
            break;
    }
} */ //Deprecated, just to show that i tried to make it work by a while loop but it makes the page crash.
