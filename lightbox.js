// Get all portfolio items
const portfolioItems = document.querySelectorAll('.portfolio-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox__img');
const lightboxVideo = lightbox.querySelector('.lightbox__video-wrap');
const lightboxIframe = lightbox.querySelector('.lightbox__iframe');
const closeBtn = lightbox.querySelector('.lightbox__close');
const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
const nextBtn = lightbox.querySelector('.lightbox__nav--next');
const counter = lightbox.querySelector('.lightbox__counter');

let currentIndex = 0;
let images = [];

// Collect all image items
portfolioItems.forEach((item, index) => {
    if (item.dataset.type === 'image') {
        images.push({
            src: item.dataset.imgSrc,
            index: index
        });
    }
});

// Update counter
function updateCounter() {
    if (images.length > 1) {
        const current = images.findIndex(img => img.index === currentIndex) + 1;
        counter.querySelector('.current').textContent = current;
        counter.querySelector('.total').textContent = images.length;
        counter.style.display = 'block';
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    } else {
        counter.style.display = 'none';
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }
}

// Show image in lightbox
function showImage(index) {
    const item = portfolioItems[index];
    
    if (item.dataset.type === 'image') {
        lightboxImg.src = item.dataset.imgSrc;
        lightboxImg.style.display = 'block';
        lightboxVideo.style.display = 'none';
        setTimeout(() => lightboxImg.classList.add('active'), 50);
    } else {
        lightboxImg.style.display = 'none';
        lightboxVideo.style.display = 'none';
    }
    
    currentIndex = index;
    updateCounter();
}

// Event Listeners
portfolioItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        if (item.dataset.type === 'image') {
            lightbox.classList.add('active');
            showImage(index);
        } else if (item.dataset.type === 'video') {
            window.open(item.href, '_blank');
        }
    });
});

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.classList.remove('active');
    setTimeout(() => {
        lightboxImg.src = '';
        lightboxIframe.src = '';
    }, 300);
}

closeBtn.addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox__backdrop').addEventListener('click', closeLightbox);

// Navigate between images
prevBtn.addEventListener('click', () => {
    let prevIndex = currentIndex;
    do {
        prevIndex = prevIndex > 0 ? prevIndex - 1 : portfolioItems.length - 1;
    } while (portfolioItems[prevIndex].dataset.type !== 'image' && prevIndex !== currentIndex);
    
    if (prevIndex !== currentIndex) {
        showImage(prevIndex);
    }
});

nextBtn.addEventListener('click', () => {
    let nextIndex = currentIndex;
    do {
        nextIndex = nextIndex < portfolioItems.length - 1 ? nextIndex + 1 : 0;
    } while (portfolioItems[nextIndex].dataset.type !== 'image' && nextIndex !== currentIndex);
    
    if (nextIndex !== currentIndex) {
        showImage(nextIndex);
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
});
