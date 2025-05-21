var stats = [220, 100, 46, 500, 97];
var facts = [" million tons of plastic waste has been created in 2024", " million marine animals die each year from plastic waste alone", "% of the plastic items we create is in the ocean", " 'dead ocean zones' across the world, covering a zone greater than the UK", "% of the ocean's surface is unprotected from fishing"];
var sources = ["https://www.condorferries.co.uk/marine-ocean-pollution-statistics-facts", "https://reef-world.org/blog/sad-facts"];

function displayOnLoad() {
    var factno = Math.floor(Math.random() * facts.length);
    var headtext = document.querySelector("#headstat > p");
    headtext.style.fontSize = "250px";

    var timer = 100;
    var numberAnimation = 0;
    var interval = setInterval(function() {
        timer--;
        console.log(timer);
        numberAnimation += stats[factno]/100;
        headtext.textContent = Math.floor(numberAnimation);
        if (timer == 0) {
            headtext.textContent = stats[factno];
            document.getElementById("headstattext").textContent = facts[factno];
            clearInterval(interval);
        }
    }, 10);
}