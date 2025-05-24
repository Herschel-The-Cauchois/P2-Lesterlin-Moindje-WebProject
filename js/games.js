const game1 = new Event("first_game"); //Declares event to signal 
const game2 = new Event("second_game");
const game3 = new Event("third_game");
const end = new Event("final_screen");
var game = 0;
//Game method : create events for each game

window.addEventListener("load", function() { //When page fully loaded, puts only html to start the game
    document.getElementById("inspect").style.display = "none";
    document.getElementById("sliders").style.display = "none";
    document.getElementById("skip").style.display = "none";
    document.getElementById("quiz").style.display = "none";
    document.querySelector("form").reset(); //Resets quiz form
    document.getElementById("init").style.display = "flex"; //Makes initial stuff appear, disappears other sections
    document.getElementById("init").classList.add("hello"); //Appearing animation

    document.getElementById("skip").addEventListener("click", () => {
        const displayArray = [document.getElementById("init"), document.getElementById("sliders"), document.getElementById("inspect"), document.getElementById("end"), document.getElementById("quiz")]; //Array of displayable game elements
        displayArray.forEach((elem) => { // For each game element, triggers fading out animation
            elem.classList.remove("hello");
            elem.classList.add("bye-bye");
            setTimeout(() => {
                elem.style.display = "none"; //Then removes them after a certain time
            }, 1800);
        });

        setTimeout(() => { //To prevent overlap of fading in with removal of other elements, puts a delay
            switch (game) { //Dispatch next game event
                case 1:
                    document.dispatchEvent(game2);
                    break;
                case 2:
                    document.dispatchEvent(game3);
                    break;
                case 3:
                    document.dispatchEvent(end);
                    break;
                default:
                    console.log("this isn't supposed to happen.");
                    break;
            }
        }, 2000)
    });

    document.getElementById("ready").addEventListener("click", function() { //button triggers game start
        console.log("Game start");
        document.dispatchEvent(game1);
        document.getElementById("skip").style.display = "block";
    });

})

document.addEventListener("first_game", () => { //First game event, manages code related to the first game in the chain
    console.log("Game starts too !");
    game = 1;
    document.getElementById("init").classList.remove("hello");
    document.getElementById("init").classList.add("bye-bye"); //Adds init section to bye bye which triggers fading out animation

    setTimeout(function() { //After animation execution replaces with game

        document.getElementById("init").style.display = "none";
        document.getElementById("inspect").style.display = "flex";
        document.getElementById("inspect").classList.add("hello");

        document.getElementById("inspect_f").addEventListener("click", function() { //Event listener for the second game

            const answ1 = document.getElementById("2text").value; //Retrieves textbox value

            var good_answer = document.createElement("p"); //Creates answer elements, whether the player is right or wrong
            good_answer.style.color = "green";
            good_answer.textContent = "Correct ! This is a hex code for the specie Vaquita, a small mexican cetacean. Only 10 individuals remains in the wild sadly. Let's move on...";
            good_answer.style.margin = "auto";
            var wrong_answer = document.createElement("p");
            wrong_answer.style.color = "red";
            wrong_answer.textContent = "Wrong ! Search more in depth. Hint : look out with inspect element...";
            wrong_answer.style.margin = "auto";

            if (answ1 === '0x76 0x61 0x71 0x75 0x69 0x74 0x61') { //If good answer
                document.querySelector("#inspect > div").appendChild(good_answer);
                document.querySelector("#inspect > div").style.left = "17%"; //Changes alignement because when adding the child, it decenters the content
                setTimeout(function() {
                    setTimeout(function() {
                        document.querySelector("#inspect").style.display = "none";
                        document.dispatchEvent(game2);
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

document.addEventListener("second_game", () => {
    game = 2;
    document.querySelector("#sliders").style.display = "flex";
    document.getElementById("sl_f").style.display = "inline-block";
    document.getElementById("sliders").classList.add("hello");

    document.querySelector("input[name='CO2']").oninput = function() { //Automatic slider value displayer, we need to put it here because we need the page to be loaded
        document.getElementById("CO2disp").textContent = this.value + " ppm"
    }

    document.querySelector("input[name='Acid']").oninput = function() { //Automatic slider value displayer, we need to put it here because we need the page to be loaded
        document.getElementById("Aciddisp").textContent = "-0." + this.value + " pH"
    }

    //Threshold for coral death : 500 ppm, -0.426 pH
    document.getElementById("sl_f").addEventListener("click", () => { //On click, retrieves user entered values
        const answ2a = document.querySelector("input[name='CO2']").value;
        const answ2b = document.querySelector("input[name='Acid']").value;
        console.log(answ2a);
        console.log(answ2b);
        document.getElementById("sl_f").style.display = "none"; //Removes now useless button

        const imageg2 = document.createElement("img"); //Creates a container for the site's answer
        const resultsec = document.createElement("section");
        const presponse = document.createElement("p");
        const head = document.createElement("h2");
        const next = document.createElement("button");
        resultsec.appendChild(head);
        resultsec.appendChild(imageg2);
        resultsec.appendChild(presponse);
        resultsec.appendChild(next);
        document.querySelector("#sliders > div").appendChild(resultsec);
        resultsec.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; //Gives the elements a little style
        resultsec.style.marginTop = "2em";
        resultsec.style.padding = "1em";
        resultsec.style.borderRadius = "4px";
        resultsec.style.color = "white";
        resultsec.style.width = "40%";
        resultsec.style.display = "inline-block";
        imageg2.style.objectFit = "contain"; //Make the future image contained inside the container
        imageg2.style.borderRadius = "4px";
        imageg2.style.maxHeight = "60%";
        imageg2.style.maxWidth = "70%";
        next.textContent = "Next Game";

        if (answ2a >= 500 && answ2b >= 426) {
            imageg2.src = "https://th.bing.com/th/id/OIP.-lO2NDmY1mcAHllMALUckQHaFj?rs=1&pid=ImgDetMain";
            imageg2.placeholder = "Image of dead corals in the sea";
            head.textContent = "Well, well, your coral is dead...";
            presponse.textContent = "As climate change goes on, CO2 concentration in the atmosphere increases, which not only makes temperatures but also acidification of the water goes up... Deadly cocktail for our biodiversity rich friends.";
        } else {
            imageg2.src = "https://th.bing.com/th/id/R.49ff8b5b8246616daa83163e0d1a2468?rik=ZNaVu4XKw8oQmQ&pid=ImgRaw&r=0";
            imageg2.placeholder = "Image of living corals in the sea";
            head.textContent = "And yet, it lives !";
            presponse.textContent = "If we succeed to contain our CO2 emissions, we might prevent the oceans becoming too hot and acid, which might make our coral friend go extinct. A Victory for biodiversity !";
        }

        next.addEventListener("click", () => {
            console.log("Tik tok !");
            setTimeout(function() {
                setTimeout(function() {
                    document.getElementById("sliders").style.display = "none"; //Masks the sliders part once the game is done
                    document.dispatchEvent(game3); //removes child
                } ,1800)
                document.getElementById("sliders").classList.remove("hello");
                document.getElementById("sliders").classList.add("bye-bye"); //Launches animation
            }, 1800); //timeout to let the player long enough time to read
        });
    });
})

document.addEventListener("third_game", () => {
    game = 3;
    document.querySelector("#quiz").style.display = "block";
    document.querySelector("#quiz").classList.add("hello");
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
