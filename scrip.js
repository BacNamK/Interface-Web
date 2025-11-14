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

const feat = document.getElementById("feat");

fetch("https://api.spaceflightnewsapi.net/v4/articles?limit=4")
  .then((res) => res.json())
  .then((data) => {
    const articles = data.results;
    console.log(articles);
    feat.innerHTML = articles
      .map(
        (articles) => `
    <div class=" flex pl-4 h-[80%] max-sm:border-black/5 max-sm:border-b-2 shadow-lg p-5 rounded-2xl xl:scale-90">
          <div class="flex-1">
            <img
              src="${articles.image_url}"
              class="scroll-animate from-left rounded-2xl w-full h-full "
              alt=""
            />
          </div>
          <div class="flex-1 pl-5 scroll-animate from-left max-sm:pt-0 relative">
            <p class="w-full text-3xl pb-5 font-bold max-sm:pb-0 max-sm:text-[16px]">${articles.title.slice(
              0,
              50
            )}...</p>
            <p class="text-gray-400 font-sans max-sm:text-[13px]">${articles.summary.slice(
              0,
              100
            )}...</p
            >
            <a href="${
              articles.url
            }" class="absolute text-[rgb(193,112,81)] pt-5 bottom-0 right-0 content-end">Learn more</a>
          </div>
        </div>
        </div>
    `
      )
      .join("");
  });
