function ScrollAnimation() {
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
}
// phần products
const rocket = document.getElementById("rocket");
fetch("https://api.spacexdata.com/v4/rockets?")
  .then((res) => res.json())
  .then((data) => {
    const rk = data;
    rocket.innerHTML = rk
      .map(
        (rk) => `
            <div class="relative flex shadow-2xl rounded-xl content-center  ">
              <div class="flex-1"><img class="p-5 h-70 rounded-4xl " src="${rk.flickr_images[0]}" ></div>
            <div class="flex-1  pt-7 w-full">
            <h1 class="text-2xl font-bold">${rk.name}</h1>
            <ul class="p-1">
            <li class="pt-1">Country : ${rk.country}</li>
            <li class="pt-1">Height : ${rk.height.meters} meters</li>
            <li class="pt-1">Diameters : ${rk.diameter.meters} meters</li>
            <li class="pt-1">First flight : ${rk.first_flight} </li>
            <li class="pt-1">Active : ${rk.active} </li>
            </ul>
            <a href="" class="absolute text-amber-300 bottom-6">Read more</a>
            </div>
        </div>
    `
      )
      .join("");
  });

// phần features
const feat = document.getElementById("feat");
fetch("https://api.spaceflightnewsapi.net/v4/articles?limit=4")
  .then((res) => res.json())
  .then((data) => {
    const articles = data.results;
    feat.innerHTML = articles
      .map(
        (articles) => `
    <div class="scroll-animate flex pl-4 h-full max-sm:border-black/5 max-sm:border-b-2 shadow-lg p-5 rounded-2xl xl:scale-90">
          <div class="flex-1 \">
            <img
              src="${articles.image_url}"
              class="scroll-animate from-left rounded-2xl w-full h-full "
              alt=""
            />
          </div>
          <div class="flex-1 pl-5 scroll-animate from-left max-sm:pt-0 relative">
            <div class="w-full text-3xl pb-5 font-bold max-sm:pb-0 max-sm:text-[16px]">${articles.title.slice(
              0,
              45
            )}...</div>
            <div class="text-gray-400 font-sans max-sm:text-[13px]">${articles.summary.slice(
              0,
              90
            )}...</
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
    ScrollAnimation();
  });

// LOGIN AND REGISTER
if (window.location.pathname.includes("login.html")) {
  const body = document.getElementById("main");

  // active là biến để chuyển đổi giữa form register và login
  // true là register, false là login
  let active = true;

  function render() {
    body.innerHTML = "";

    // render giao diện theo trạng thái
    if (active) {
      body.innerHTML = `
          <div class="w-[80%] max-sm:w-[90%]">
            <div>
              <div class="text-5xl mb-5">Create an account</div>
              <div class="text-[13px] p-4 pl-0 text-white/40">
                Already an account ?
                <button id="changeLR" class="text-amber-200">login</button>
              </div>
              <input
                class="bg-[rgb(60,54,76)] w-full pl-5 h-10 rounded-[5px] mt-5 outline-purple-800"
                type="text"
                id="name"
                placeholder="Full Name"
                required
              /><br />
              <input
                class="bg-[rgb(60,54,76)] w-full pl-5 h-10 rounded-[5px] mt-5 outline-purple-800"
                type="text"
                id="password"
                placeholder="Password"
                required
              /><br />
              <input
                class="bg-[rgb(60,54,76)] w-full pl-5 h-10 rounded-[5px] mt-5 outline-purple-800"
                type="text"
                id="email"
                placeholder="Email"
                required
              /><br />
              <div class="mt-5 items-center flex">
                <input
                  class="bg-[rgb(60,54,76)] w-5 h-5"
                  type="checkbox"
                  name=""
                  id="check"
                  required
                />
                <p class="text-[14px] pl-3">I agree to the</p>
                <br />
              </div>
              <button
                class="bg-purple-800 w-full pl-5 h-10 rounded-[5px] mt-7"
                id="register"
              >
                SUBMIT
              </button>
            </div>
            <ul class="flex items-center mt-5">
              <hr class="flex-1 bg-white/30" />
              <p class="pl-2 pr-2 text-white/40 text-[12px] text-center">
                Or register with
              </p>
              <hr class="flex-1 bg-white/30" />
            </ul>
            <div class="w-full h-11 flex justify-center gap-x-5 mt-5">
              <button class="w-full border-2 border-white/30 rounded-[5px]">
                Google
              </button>
              <button class="w-full border-2 border-white/30 rounded-[5px]">
                Apple
              </button>
            </div>
          </div>
      `;
      document.getElementById("register").addEventListener("click", () => {
        const name = document.getElementById("name").value.trim();
        const password = document.getElementById("password").value;
        const email = document.getElementById("email").value.trim();
        const check = document.getElementById("check");
        const User = { name, password, email };
        if (!name || !password || !email || !check) {
          alert("pls fill full ");
          return;
        }
        // Oject chuyển qua String để lưu và localstor
        const StrU = localStorage.getItem("User");
        if (StrU) {
          const checkU = JSON.parse(StrU);
          checkU.push(User);
          localStorage.setItem("User", JSON.stringify(checkU));
        } else {
          localStorage.setItem("User", JSON.stringify([User]));
        }
        alert("Register success");
        active = false;
        render();
      });
    } else {
      body.innerHTML = `
          <div class="w-[80%] max-sm:w-[90%]">
            <div>
              <div class="text-5xl mb-5">LOGIN</div>
              <div class="text-[13px] p-4 pl-0 text-white/40">
                No have account ?
                <button id="changeLR" class="text-amber-200">Create</button>
              </div>
              <input
                class="bg-[rgb(60,54,76)] w-full pl-5 h-10 rounded-[5px] mt-5 outline-purple-800"
                type="text"
                id="name"
                placeholder="Full Name"
                required
              /><br />
              <input
                class="bg-[rgb(60,54,76)] w-full pl-5 h-10 rounded-[5px] mt-5 outline-purple-800"
                type="text"
                id="password"
                placeholder="Password"
                required
              /><br />
              <div class="mt-5 items-center flex">
                <br />
              </div>
              <button
                class="bg-purple-800 w-full pl-5 h-10 rounded-[5px] mt-7"
                id="login"
              >
                SUBMIT
              </button>
            </div>
            <ul class="flex items-center mt-5">
              <hr class="flex-1 bg-white/30" />
              <p class="pl-2 pr-2 text-white/40 text-[12px] text-center">
                Or with
              </p>
              <hr class="flex-1 bg-white/30" />
            </ul>
            <div class="w-full h-11 flex justify-center gap-x-5 mt-5">
              <button class="w-full border-2 border-white/30 rounded-[5px]">
                Google
              </button>
              <button class="w-full border-2 border-white/30 rounded-[5px]">
                Apple
              </button>
            </div>
          </div>
      `;
      document.getElementById("login")?.addEventListener("click", () => {
        const name = document.getElementById("name").value.trim();
        const password = document.getElementById("password").value;

        // lấy thông tin trong local
        const outUser = localStorage.getItem("User");

        // từ dạng string -> object
        const registerUser = JSON.parse(outUser);

        // tìm user
        const foundUser = registerUser.find((User) => {
          return User.name === name && User.password === password;
        });

        if (!foundUser) {
          alert("User does not exist");
          return;
        }
        if (foundUser) {
          localStorage.setItem("StatusLogin", "true");
          localStorage.setItem("nameUser", name);
          window.location.href = "index.html";
        } else {
          alert("Name or Password wrong !");
        }
      });
    }

    // gắn lại sự kiện cho nút mới vừa được tạo
    document.getElementById("changeLR").addEventListener("click", () => {
      active = !active;
      render();
    });
  }
  render();
}

// thay đổi khung avata khi đăng nhập
if (localStorage.getItem("StatusLogin") === "true") {
  const shellUser = document.getElementById("shellUser");
  const settingUser = document.getElementById("settingUser");
  const nameUser = localStorage.getItem("nameUser");
  shellUser.innerHTML = `<div class="md:w-30 content-center">
                      <p class="text-white text-xl max-sm:text-[15px]">${nameUser}</p>
                    </div>
                    <img src="src/img/astronaut.png" class="lg:scale-110" />
                  </div>`;
  settingUser.innerHTML = `
  <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:outline-hidden">
    Your profile</a>
  <a href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:outline-hidden">
    Settings</a>
  <a id="singOut" href="#" class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:outline-hidden">
    Sign out</a`;
}

// set lại trạng thái đăng nhập
if (window.location.pathname.includes("index.html")) {
  document.getElementById("singOut").addEventListener("click", () => {
    localStorage.setItem("StatusLogin", "false");
    window.location.reload();
  });
}
