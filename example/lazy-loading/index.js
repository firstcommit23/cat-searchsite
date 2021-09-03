//https://www.youtube.com/watch?v=BmRZi4ryiMQ

const images = document.querySelectorAll("img");

const imgOptions = {};
const imgObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const img = entry.target;
    const data = img.dataset.img
    img.src = data
    imgObserver.unobserve(entry.target);
  });
}, imgOptions);

images.forEach((img) => {
  imgObserver.observe(img);
});
