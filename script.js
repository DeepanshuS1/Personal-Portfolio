let multiText = document.getElementById("changing_text");

let texts = ["Ayush Yadav", "business Owner", "Fitness Lover"]
let i = 1;

setInterval(() => {
    multiText.style.opacity = 0;
    setTimeout(() => {
        multiText.innerHTML = texts[i];
        i++;
        multiText.style.opacity = 1;
    },500)
    if (i > 2) {
        i = 0
    }
}, 3000)