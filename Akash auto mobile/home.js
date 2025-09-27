document.addEventListener('DOMContentLoaded', () => {
    // Image Slider Logic
    const sliderImages = document.getElementById('slider-images');
    const images = sliderImages.children;
    let currentIndex = 0;

    function updateSlider() {
        // Move to the next image
        currentIndex = (currentIndex + 1) % images.length;
        sliderImages.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Start the slider animation every 3 seconds
    setInterval(updateSlider, 3000);

    // Visitor Count Logic (Simulated)
    const visitorCountElement = document.getElementById('visitor-count');
    // Generate a random visitor count for demonstration purposes
    const randomCount = Math.floor(Math.random() * 10000) + 1000;
    visitorCountElement.textContent = randomCount;
});
