const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Nếu phần tử có class 'from-left' thì animate trái, ngược lại animate phải
      if (entry.target.classList.contains("from-left")) {
        entry.target.classList.add("animate-hide-left");
      } else {
        entry.target.classList.add("animate-hide-right");
      }
    }
  });
});

document
  .querySelectorAll(".scroll-animate")
  .forEach((el) => observer.observe(el));
