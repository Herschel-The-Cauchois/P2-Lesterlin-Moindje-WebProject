const game1 = new Event("first_game");
//Game method : add event listeners & reveal other divs step by step

window.addEventListener("load", function() { //When page fully loaded, puts only html to start the game
    document.getElementById("inspect").style.display = "none";
    document.getElementById("sliders").style.display = "none";
    document.getElementById("init").style.display = "flex"; //Makes initial stuff appear, disappears other sections
    document.getElementById("init").classList.add("hello"); //Appearing animation

    document.getElementById("ready").addEventListener("click", function() { //button triggers game start

        console.log("Game start");
        document.dispatchEvent(game1);
    });
})

document.addEventListener("first_game", () => {
    console.log("Game starts too !");
        document.getElementById("init").classList.remove("hello");
        document.getElementById("init").classList.add("bye-bye"); //Adds init section to bye bye which triggers fading out animation

        setTimeout(function() { //After animation execution replaces with game

            document.getElementById("init").style.display = "none";
            document.getElementById("inspect").style.display = "flex";
            document.getElementById("inspect").classList.add("hello");

            document.getElementById("inspect_f").addEventListener("click", function() { //Event listener for the second game

                const answ2 = document.getElementById("2text").value; //Retrieves textbox value

                var good_answer = document.createElement("p"); //Creates answer elements, whether the player is right or wrong
                good_answer.style.color = "green";
                good_answer.textContent = "Correct ! This is a hex code for the specie Vaquita, a small mexican cetacean. Only 10 individuals remains in the wild sadly. Let's move on...";
                good_answer.style.margin = "auto";
                var wrong_answer = document.createElement("p");
                wrong_answer.style.color = "red";
                wrong_answer.textContent = "Wrong ! Search more in depth. Hint : look out with inspect element...";
                wrong_answer.style.margin = "auto";

                if (answ2 === '0x76 0x61 0x71 0x75 0x69 0x74 0x61') { //If good answer
                    document.querySelector("#inspect > div").appendChild(good_answer);
                    document.querySelector("#inspect > div").style.left = "17%"; //Changes alignement because when adding the child, it decenters the content
                    setTimeout(function() {
                        setTimeout(function() {
                            document.querySelector("#inspect").style.display = "none";
                            document.querySelector("#sliders").style.display = "flex";

                            document.getElementById("sliders").classList.add("hello");
                        } ,1800)
                        document.getElementById("inspect").classList.remove("hello");
                        document.querySelector("#inspect").classList.add("bye-bye");
                    }, 3000); //timeout to let the player long enough time to read, longer here since longer answer
                } else { //Wrong answer
                    document.querySelector("#inspect > div").appendChild(wrong_answer);
                    setTimeout(function() {
                        setTimeout(function() {
                            document.querySelector("#inspect > div").removeChild(wrong_answer); //removes child
                        } ,1800)
                        wrong_answer.classList.add("bye-bye"); //Launches animation
                    }, 1800); //timeout to let the player long enough time to read
                }
            });
        }, 1800);
});

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
