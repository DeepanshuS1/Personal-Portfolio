let multiText = document.getElementById("changing_text");

let texts = ["Ayush Yadav", "business Owner", "Fitness Lover"]
let i = 1;

setInterval(() => {
    multiText.style.opacity = 0;
    setTimeout(() => {
        multiText.innerHTML = texts[i];
        i++;
        multiText.style.opacity = 1;
    }, 500)
    if (i > 2) {
        i = 0
    }
}, 3000)

let sections = document.querySelectorAll("section")
let homeSec = document.getElementById('home').offsetHeight
let menuLinks = document.querySelectorAll('header nav a');
let header = document.querySelector('header')

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offSet = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top > offSet && top < offSet + height) {
            menuLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            })
        }
        header.classList.toggle('header', window.scrollY > homeSec -10);
    });
}