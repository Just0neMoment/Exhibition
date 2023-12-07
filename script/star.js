$(document).ready(function () {
  createStars();
});

function createStars() {
  const starsContainer = $(".stars");

  for (let i = 0; i < 100; i++) {
    const star = $("<div>").addClass("star");
    setStarPosition(star);
    setStarAnimation(star);
    starsContainer.append(star);
  }
}

function setStarPosition(star) {
  const x = Math.random() * $(window).width();
  const y = Math.random() * $(window).height();

  star.css("transform", `translate(${x}px, ${y}px)`);
}

function setStarAnimation(star) {
  const animationDuration = Math.random() * 2 + 1;

  star.css("animation", `twinkling ${animationDuration}s infinite`);
}