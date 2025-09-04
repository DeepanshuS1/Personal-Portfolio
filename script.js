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

function sendme(){

}

document.querySelector('.menu').addEventListener('click', () => {
    document.querySelector('header nav').classList.toggle('nav-active');
});

document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('header nav').classList.remove('nav-active');
});

// ===== Portfolio: Filter & Lightbox =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox ? lightbox.querySelector('.lightbox__img') : null;
const lbIframe = lightbox ? lightbox.querySelector('.lightbox__iframe') : null;

// Filtering
if (filterBtns.length) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const target = btn.dataset.filter;
            document.querySelectorAll('.portfolio-item').forEach(item => {
                if (target === 'all' || item.classList.contains(target)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Lightbox helpers
function openLightbox(type, src) {
    if (!lightbox) return;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    if (type === 'image') {
        if (lbIframe) {
            lbIframe.src = '';
            lightbox.querySelector('.lightbox__video-wrap').style.display = 'none';
        }
        if (lbImg) {
            lbImg.src = src;
            lbImg.style.display = 'block';
        }
    } else if (type === 'video') {
        if (lbImg) {
            lbImg.src = '';
            lbImg.style.display = 'none';
        }
        if (lbIframe) {
            lbIframe.src = `https://www.youtube.com/embed/${src}?autoplay=1&rel=0`;
            lightbox.querySelector('.lightbox__video-wrap').style.display = 'block';
        }
    }
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    if (lbIframe) lbIframe.src = '';
}

if (portfolioItems.length) {
    portfolioItems.forEach(item => {
        const type = item.dataset.type;
        item.addEventListener('click', () => {
            if (type === 'image') {
                openLightbox('image', item.dataset.imgSrc);
            } else if (type === 'video') {
                openLightbox('video', item.dataset.videoId);
            }
        });
        item.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                item.click();
            }
        });
    });
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target.hasAttribute('data-close')) {
            closeLightbox();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
}