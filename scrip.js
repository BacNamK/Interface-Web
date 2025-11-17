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
if (window.location.pathname.includes("index.html")) {
  const rocket = document.getElementById("rocket");
  const products = document.getElementById("products"); // Thêm biến cho container modal
  let allRocket = []; // Khai báo biến lưu trữ dữ liệu

  // 1. Fetch dữ liệu
  fetch("https://api.spacexdata.com/v4/rockets?")
    .then((res) => res.json())
    .then((data) => {
      allRocket = data;
      // 2. Render danh sách tên lửa
      rocket.innerHTML = allRocket
        .map(
          (rk) => `
          <div class="relative flex shadow-2xl rounded-xl content-center">
            <div class="flex-1"><img class="p-5 h-70 rounded-4xl" src="${rk.flickr_images[0]}" alt="${rk.name}"></div>
            <div class="flex-1 pt-7 w-full">
              <h1 class="text-2xl font-bold">${rk.name}</h1>
              <ul class="p-1">
                <li class="pt-1">Country : ${rk.country}</li>
                <li class="pt-1">Height : ${rk.height.meters} meters</li>
                <li class="pt-1">Diameters : ${rk.diameter.meters} meters</li>
                <li class="pt-1">First flight : ${rk.first_flight} </li>
                <li class="pt-1">Active : ${rk.active} </li>
              </ul>
              <div onclick="detail('${rk.id}')" class="absolute text-amber-300 bottom-6 cursor-pointer">Read more</div>
            </div>
          </div>
        `
        )
        .join("");
    })
    .catch((error) => console.error("Error fetching data:", error)); // Thêm xử lý lỗi

  let changeRB = false;
  let currentRocketId = null;
  function notifi() {
    alert("finish!");
  }
  // Hàm hiển thị chi tiết (toàn cục)
  function detail(rocketId) {
    document.body.style.overflow = "hidden";
    if (rocketId) {
      currentRocketId = rocketId;
      changeRB = false;
    }
    const selectedRocket = allRocket.find((r) => r.id === rocketId);
    products.innerHTML = `
    <div class="fixed inset-0 z-50 modal-overlay" onclick="closeDetail(event)">
      <div class="bg-gray-600/50 w-full h-screen flex items-center justify-center">
        <div class="bg-white w-[90%] h-[90%] rounded-2xl shadow-2xl p-6 xl:flex relative" onclick="event.stopPropagation()">
          <div class="flex-1">
            <div class="flex"><h2 class="w-[70%] text-3xl max-sm:text-[xl] font-bold mb-4">${selectedRocket.name}</h2><div class="w-[30%]" id="in_buy"></div> </div>
            <img src="${selectedRocket.flickr_images[0]}" alt="${selectedRocket.name}" class="w-full h-[90%] object-cover rounded-xl mb-4">
          </div>
          <div class="flex-1 justify-items-center">
          <div id="infor_buy" class="h-auto w-[90%]  "></div>
          </div>
          <button onclick="closeDetail()" class="absolute xl:top-5 top-5 xl:right-10 right-5 text-gray-500 hover:text-gray-800 text-2xl">
            &times;
          </button>
        </div>
      </div>
    </div>
  `;
    updateModalContent(selectedRocket);
  }
  function updateModalContent(rocket) {
    const type = document.getElementById("in_buy");
    const infor = document.getElementById("infor_buy");

    if (changeRB) {
      // Trạng thái BUY: Hiển thị nút 'Information' và nội dung BUY
      type.innerHTML = `<button id="btn_toggle" class="bg-red-500 text-white p-2 rounded w-25">Information</button>`;
      infor.innerHTML = `
            <div>
              <h3 class="text-2xl font-semibold mb-3">Launch Configuration</h3>
              <div class="w-full h-10"><p class="bg-gray-200 rounded-2xl text-xl content-center h-full pl-3 w-fit pr-3">Cost per launch: $${rocket.cost_per_launch.toLocaleString()}</p></div>
              <p class="pt-3">
  Please make sure you read all the information we provide. We will email you what you need to complete the transaction.</p>
            </div>
          <div class=" absolute bottom-8  h-[8%] max-sm:w-[80%] xl:w-[40%] flex justify-center"><button onclick="notifi()" class="text-center h-full w-50 content-center rounded-2xl bg-green-500 text-white">BUY</button></div>
        `;
    } else {
      // Trạng thái INFO: Hiển thị nút 'BUY' và nội dung Information
      type.innerHTML = `<button id="btn_toggle" class="bg-green-500 text-white p-2 rounded w-25">BUY</button>`;
      infor.innerHTML = `
            <h3 class="text-2xl font-semibold mb-3">General Information</h3>
            <p>${rocket.description}</p>
            <div class="max-sm:hidden mt-3">
              <ul class="mt-1 list-disc list-inside">
                  <li>ID: ${rocket.id}</li>
                  <li>Company: ${rocket.company}</li>
                  <li>Country: ${rocket.country}</li>
                  <li>First Flight: ${rocket.first_flight}</li>
                  <li>Active: ${rocket.active ? "Yes" : "No"}</li>
                  <li>Stages: ${rocket.stages}</li>
                  <li>Boosters: ${rocket.boosters}</li>
                  <li>success rate: ${rocket.success_rate_pct}%</li>
                  <li>Wikipedia: <a href="${
                    rocket.wikipedia
                  }" class="text-blue-500">${rocket.wikipedia}</a></li>
              </ul>
            </div>
            <div class="w-full h-[35%] flex mt-5 gap-x-5 max-sm:hidden">
                <div class="flex-1 bg-gray-200 rounded-xl">
                <h2 class="text-xl p-3">First Stage</h2>
                <ol class="ml-5">
                  <li>Reusable: ${rocket.first_stage.reusable}</li>
                  <li>Engines: ${rocket.first_stage.engines}</li>
                  <li>Fuel amount: ${rocket.first_stage.fuel_amount_tons}T</li>
                  <li>Burn time sec: ${rocket.first_stage.burn_time_sec}/s</li>
                  <li>Thrust sea level: ${
                    rocket.first_stage.thrust_sea_level.kN
                  }kN</li>
                  <li>Thust vacuum: ${
                    rocket.first_stage.thrust_vacuum.kN
                  }kN</li>
                </ol>
                </div>
              <div class="flex-1 bg-gray-200 rounded-xl">
                <h2 class="text-xl p-2">Second Stage</h2>
                <ul class="ml-5">
                  <p>Reusable: ${rocket.second_stage.reusable}</p>
                  <p>Engines: ${rocket.second_stage.engines}</p>
                  <p>Fuel amount: ${rocket.second_stage.fuel_amount_tons}T</p>
                  <p>Burn time sec: ${rocket.second_stage.burn_time_sec}/s</p>
                  <p>payloads option: ${
                    rocket.second_stage.payloads.option_1
                  }</p>
                  </div>
                </ul>
            </div>
        `;
    }

    // 5. Thêm Event Listener cho nút toggle (phải được thêm sau khi nút được tạo)
    document.getElementById("btn_toggle").addEventListener("click", () => {
      changeRB = !changeRB; // Đảo trạng thái
      updateModalContent(rocket); // Gọi lại hàm cập nhật nội dung, KHÔNG gọi lại detail()
    });
  }

  // Hàm đóng modal
  function closeDetail(event) {
    // Nếu sự kiện được truyền vào VÀ không click vào nền overlay, thì không làm gì cả
    if (event && !event.target.classList.contains("modal-overlay")) {
      return;
    }

    // Mở khóa scroll
    document.body.style.overflow = "auto";
    products.innerHTML = "";
  }
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
}
// LOGIN AND REGISTER
if (window.location.pathname.includes("login.html")) {
  const body = document.getElementById("formLS");

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
if (
  window.location.pathname.includes("index.html") &&
  localStorage.getItem("StatusLogin") === "true"
) {
  document.getElementById("singOut").addEventListener("click", () => {
    localStorage.setItem("StatusLogin", "false");
    window.location.reload();
  });
}
