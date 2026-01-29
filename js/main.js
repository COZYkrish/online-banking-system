// STATS COUNTER
const counters = document.querySelectorAll(".stat h2");
let started = false;

window.addEventListener("scroll", () => {
  const statsSection = document.querySelector(".stats");
  const sectionTop = statsSection.getBoundingClientRect().top;

  if (sectionTop < window.innerHeight && !started) {
    counters.forEach(counter => {
      const target = +counter.dataset.count;
      let count = 0;
      const speed = target / 100;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.floor(count);
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
    started = true;
  }
});
