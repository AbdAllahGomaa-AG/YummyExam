// extension jquery

// getElement
let DisplayMeal = document.getElementById("DisplayMeal");
let Categories = document.getElementById("Categories");
let Area = document.getElementById("Area");
let Ingredients = document.getElementById("Ingredients");
let searchClick = document.getElementById("searchClick");
let searchInput = document.getElementById("searchInput");
let ContactUs = document.getElementById("ContactUs");
let loaderSpiner = document.getElementById("loaderSpiner");

// console.log(ContactUs);

// call function

// <!-- =========================================================================== -->
// <!-- =========================loadingScreen ================================== -->
// <!-- =========================================================================== -->

$(document).ready(() => {
  SearchByName("").then(() => {
    $(".loadingScreen").fadeOut(300);
    $("body").css("overflow", "visible");
  });
});

// <!-- =========================================================================== -->
// <!-- =========================Start Nav ================================== -->
// <!-- =========================================================================== -->
// function is best solution when open website call function  close
// close or Open
//
function openNave() {
  $(".Nav-menu").animate({ left: 0 }, 500);
  // remove icon and add
  $(".open-icon").addClass("fa-x");
  $(".open-icon").removeClass("fa-align-justify");
  //animation li
  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 100);
  }
  //
}
//
function closeNave() {
  let width = $(".Nav-menu .nav-tab").outerWidth();
  $(".Nav-menu").animate({ left: -width },);
  // remove icon and add
  $(".open-icon").removeClass("fa-x");
  $(".open-icon").addClass("fa-align-justify");
  //animation li
  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate({ top: 300 }, (i + 5) * 100);
  }
}
function mainOpen() {
  $(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
      closeSideNav();
    } else {
      openSideNav();
    }
  });
}




//
$(".nav-header i.open-icon").on("click", function () {
  if ($(".Nav-menu").css("left") == "0px") {
    closeNave();
  } else {
    openNave();
  }
});
// <!-- =========================================================================== -->
// <!-- =========================End-Nav=========================================== -->
// <!-- =========================================================================== -->

// <!-- ======================================================================================== -->
// <!-- =========================Start SearchByName && Latter ================================== -->
// <!-- ======================================================================================== -->
// SearchByName
async function SearchByName(meal) {
  loaderSpiner.classList.remove("d-none");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
  );
  let data = await response.json();
  loaderSpiner.classList.add("d-none");

  data.meals ? DisplaySearchByName(data.meals) : DisplaySearchByName([]);
}
// SearchByLatter
async function SearchByLatter(value) {
    loaderSpiner.classList.remove("d-none");

  value == "" ? (value = "g") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`
  );
  let data = await response.json();
    loaderSpiner.classList.add("d-none");


  data.meals ? DisplaySearchByName(data.meals) : DisplaySearchByName([]);
}
//
function DisplaySearchByName(arr) {
  let DisplayContainer = ``;
  for (let i = 0; i < arr.length; i++) {
    DisplayContainer += `
            <div class="col-md-3 g-4 py-2">
              <div onclick="details(${arr[i].idMeal})" class="meal position-relative overflow-hidden rounded-4">
              <img
                  src="${arr[i].strMealThumb}"
                  alt="item"
                  class="w-100 ag-cursor"
                  />
                  <div
                  class="meal-layer ag-cursor d-flex  align-items-center  position-absolute"
                  >
                  <h3 class="ms-3">${arr[i].strMeal}</h3>
                  </div>
              </div>
              </div>
              `;
  }
  DisplayMeal.innerHTML = DisplayContainer;
}

// <!-- =========================Start searchClickShow  ================================== -->
function searchClickShow() {
  let searchCliContainer = `
          <div class="container w-50" >
          <div class="row py-4">
            <div class="col-md-6">
              <input
              onkeyup =" SearchByName(this.value)"
                type="text"
                class="form-control bg-transparent"
                placeholder="search by Name "
              />
            </div>
            <div class="col-md-6">
              <input
              onkeyup =" SearchByLatter(this.value)"
                type="text"
                class="form-control bg-transparent text-white"
                placeholder="search by First latter "
               maxlength="1"
              />
            </div>
          </div>
        </div>
  
  `;
  searchInput.innerHTML = searchCliContainer;
  DisplayMeal.innerHTML = "";
  closeNave();
}
searchClick.addEventListener("click", searchClickShow);
// <!-- =========================End searchClickShow  ============================= -->
// <!-- =========================================================================== -->
// <!-- =========================END SearchByName================================== -->
// <!-- =========================================================================== -->

// <!-- =========================================================================== -->
// <!-- =========================Start categories ================================== -->
// <!-- =========================================================================== -->
async function categories() {
  $(".loadingScreen").fadeIn(300);
  searchInput.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let data = await response.json();
  $(".loadingScreen").fadeOut(300);
  DisplayCategories(data.categories);
  closeNave();
  // console.log(data.categories);
}
function DisplayCategories(arr) {
  let DisplayContainer = ``;
  for (let i = 0; i < arr.length; i++) {
    DisplayContainer += `
            <div class="col-md-3 g-4 py-2  cursor-ag "">
              <div onclick="categoriesFilter('${
                arr[i].strCategory
              }')" class="meal position-relative overflow-hidden rounded-4    ">
              <img
                  src="${arr[i].strCategoryThumb}"
                  alt="item"
                  class="w-100"
                  />
                  <div
                  class="meal-layer d-flex  flex-column justify-content-center align-items-center text-center position-absolute"
                  >
                  <h3>${arr[i].strCategory}</h3>
                  <p>${arr[i].strCategoryDescription
                    .split(" ")
                    .slice(0, 20)
                    .join(" ")}</p>
                  </div>
              </div>
              </div>
              `;
  }
  DisplayMeal.innerHTML = DisplayContainer;
  
}
Categories.addEventListener("click", categories);

// <!-- =========================Filter ================================== -->
async function categoriesFilter(categories) {
   $(".loadingScreen").fadeIn(300);

  // $(".loadingScreen").fadeIn(200);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories}`
  );
  let data = await response.json();
   $(".loadingScreen").fadeOut(300);

  // $(".loadingScreen").fadeOut(200);

  DisplaySearchByName(data.meals.slice(0, 20));
  // console.log(data);
}
// <!-- =========================================================================== -->
// <!-- =========================END categories==================================== -->
// <!-- =========================================================================== -->

// <!-- =========================================================================== -->
// <!-- =========================Start Area ====================================== -->
// <!-- =========================================================================== -->
async function area() {
  $(".loadingScreen").fadeIn(300);

  searchInput.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let data = await response.json();
  $(".loadingScreen").fadeOut(300);

  DisplayArea(data.meals);
  closeNave();
}
function DisplayArea(arr) {
  let DisplayContainer = ``;
  for (let i = 0; i < arr.length; i++) {
    DisplayContainer += `
            <div onclick="areaFilter('${arr[i].strArea}')" class="col-md-3 g-4 py-2 text-center cursor-ag">
              <i class="fa-solid fa-earth-asia text-white fs-1 "></i>
              <h3 class= "text-white">${arr[i].strArea}</h3>
            </div>
              `;
  }
  DisplayMeal.innerHTML = DisplayContainer;
}
Area.addEventListener("click", area);
// <!-- =========================Filter ================================== -->
async function areaFilter(Area) {
  $(".loadingScreen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`
  );
  let data = await response.json();
  $(".loadingScreen").fadeOut(300);

  DisplaySearchByName(data.meals.slice(0, 20));
  // console.log(data);
}
// <!-- =========================================================================== -->
// <!-- =========================END Area=========================================== -->
// <!-- =========================================================================== -->

// <!-- ============================================================================ -->
// <!-- =========================Start Ingredients ================================== -->
// <!-- ============================================================================= -->
async function ingredients() {
  $(".loadingScreen").fadeIn(300);

  searchInput.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let data = await response.json();
  $(".loadingScreen").fadeOut(300);

  // console.log(data.meals);
  DisplayIngredients(data.meals.slice(0, 20));
  closeNave();
}
function DisplayIngredients(arr) {
  let DisplayContainer = ``;
  for (let i = 0; i < arr.length; i++) {
    DisplayContainer += `
            <div onclick="IngredientsFilter('${
              arr[i].strIngredient
            }')" class="col-md-3 g-4 py-2 text-center">
              <i class="fa-solid fa-earth-asia text-white fs-1"></i>
              <h3 class= "text-white">${arr[i].strIngredient}</h3>
               <p class ="text-white"> ${arr[i].strDescription
                 .split(" ")
                 .slice(0, 10)
                 .join(" ")}</p>
            </div>
              `;
  }

  DisplayMeal.innerHTML = DisplayContainer;
}
Ingredients.addEventListener("click", ingredients);
// <!-- =========================Filter ================================== -->
async function IngredientsFilter(ingredients) {
  $(".loadingScreen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  let data = await response.json();
  $(".loadingScreen").fadeOut(300);

  DisplaySearchByName(data.meals.slice(0, 20));
  // console.log(data);
}
// <!-- =========================================================================== -->
// <!-- =========================END Ingredients=================================== -->
// <!-- =========================================================================== -->

// <!-- =========================================================================== -->
// <!-- =========================Start details  ================================== -->
// <!-- =========================================================================== -->
async function details(id) {
   $(".loadingScreen").fadeIn(300);
    loaderSpiner.classList.remove("d-none");


  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let data = await response.json();
   loaderSpiner.classList.add("d-none");

  $(".loadingScreen").fadeOut(300);

  // console.log(data.meals[0]);
  DisplayDetails(data.meals[0]);
  closeNave();
}

function DisplayDetails(itemDetails) {
  // DetailsRecipes alert
  let DetailsRecipes = ``;
  for (let i = 0; i < 20; i++) {
    if (itemDetails[`strIngredient${i}`]) {
      DetailsRecipes += ` <li class="alert alert-primary m-2"> ${
        itemDetails[`strMeasure${i}`]
      } ${itemDetails[`strIngredient${i}`]}</li>`;
    }
  }
  // Tags alert

  let tags = itemDetails.strTags?.split(",");
  if (!tags) tags = [];
  let DetailsTags = ``;
  for (let i = 0; i < tags.length; i++) {
    if (itemDetails[`strIngredient${i}`]) {
      DetailsTags += `
         <li class="alert alert-danger m-2">${tags[i]}</li>
        `;
    }
  }

  // console.log(DetailsRecipes);

  let DisplayContainer = `
              <div class="col-md-4 mt-5 ">
              <img
                src="${itemDetails.strMealThumb}"
                alt="pic"
                class="w-100 rounded-4"
              />
              <h2 class="text-white text-center mt-3">${itemDetails.strMeal}</h2>
            </div>
            <div class="col-md-8 mt-5">
              <h2 class="fw-bold text-white">Instructions</h2>
              <p class="text-white">
                ${itemDetails.strInstructions}
              </p>
              <h3 class="text-white">
                <span class="fw-bold text-white">Area :</span> ${itemDetails.strArea}
              </h3>
              <h3 class="text-white">
                <span class="fw-bold text-white">Category :</span> ${itemDetails.strCategory}
              </h3>
              <h3 class="text-white">
                <span class="fw-bold text-white">Recipes :</span>
              </h3>
              <ul class="list-unstyled d-flex g-4 flex-wrap">
              ${DetailsRecipes}
              </ul>
              <h3 class="text-white mb-3">Tags :</h3>
              <ul class="list-unstyled d-flex g-4 flex-wrap">
               
            ${DetailsTags}
              </ul>
              <a href="${itemDetails.strSource}" class="btn btn-success"> source</a>
              <a href="${itemDetails.strYoutube}" class="btn btn-danger"> Youtube</a>
            </div>
  `;

  DisplayMeal.innerHTML = DisplayContainer;
}
// <!-- =========================================================================== -->
// <!-- =========================END details ====================================== -->
// <!-- =========================================================================== -->

// <!-- =========================================================================== -->
// <!-- ===============================star contact US============================= -->
// <!-- =========================================================================== -->
function clickContactUs() {
  let ContactUsContainer = `
      <section   class="contact min-vh-100 d-flex justify-content-center align-items-center " id="">
        <div class="container w-75">
          <div class="row gy-3">
            <div class="col-md-6">
            
              <input
              onkeyup =" nameValidation()"
                type="text"
                class="form-control bg-transparent text-white"
                placeholder="please Enter Name "
                id="NameContact"
              />
          <div class="alert alert-danger mt-3 w-100 py-3 fs-6 d-none "  id="NameContactId" >
          Special characters and numbers not allowed
        </div>
            </div>
            <div class="col-md-6">
              <input
              onkeyup =" emailValidation()"
                type="email"
                class="form-control bg-transparent text-white"
                placeholder="please Enter Email "
                id="EmailContact"
              />
          <div class="alert alert-danger mt-3 w-100 py-3 fs-6 d-none "  id="EmailContactId" >
          Email not valid *exemple@yyy.zzz
        </div>
            </div>
            <div class="col-md-6">
              <input
              onkeyup =" numberValidation()"
                type="number"
                class="form-control bg-transparent text-white"
                placeholder="please Enter phone Number "
                id="NumberContact"
              />
          <div class="alert alert-danger mt-3 w-100 py-3 fs-6 d-none "  id="NumberContactId" >
        Enter valid Phone Number
        </div>
            </div>
            <div class="col-md-6">
              <input
              onkeyup =" ageValidation()"
                type="number"
                class="form-control bg-transparent text-white"
                placeholder="please Enter phone age "
                id="ageContact"
              />
        <div class="alert alert-danger mt-3 w-100 py-3 fs-6 d-none "  id="ageContactId" >
      Enter valid age
        </div>
            </div>
            <div class="col-md-6">
              <input
              onkeyup =" passwordValidation()"
                type="password"
                class="form-control bg-transparent text-white"
                placeholder="please Enter phone Password "
                id="PasswordContact"
              />
      <div class="alert alert-danger mt-3 w-100 py-3 fs-6 d-none "  id="PasswordContactId" >
      Enter valid password *Minimum eight characters, at least one letter and one number:*
        </div>
            </div>
            <div class="col-md-6">
              <input
              onkeyup =" repassedValidation()"
                type="password"
                class="form-control bg-transparent text-white"
                placeholder="please Enter phone RePassword "
                id="RePasswordContact"
              />
                 <div class="alert alert-danger mt-3 w-100 py-3 fs-6 d-none "  id="RePasswordContactId" >
                  Enter valid RePassword     </div>

            </div>
        <button  class="btn-danger btn disabled " id="btnContact"  > summit</button>
            <div class="alert alert-danger mt-3 w-100 py-3 fs-6 d-none "  id="btnContactId" >
                 good    </div>

          </div>
        </div>
      </section>
`;
  DisplayMeal.innerHTML = ContactUsContainer;
  closeNave();

  let NameContact = document.getElementById("NameContact");
  let NameContactId = document.getElementById("NameContactId");
  //
  let EmailContactId = document.getElementById("EmailContactId");
  let EmailContact = document.getElementById("EmailContact");

  //
  let NumberContactId = document.getElementById("NumberContactId");
  let NumberContact = document.getElementById("NumberContact");

  //
  let ageContactId = document.getElementById("ageContactId");
  let ageContact = document.getElementById("ageContact");
  //
  let PasswordContactId = document.getElementById("PasswordContactId");
  let PasswordContact = document.getElementById("PasswordContact");

  //
  let RePasswordContact = document.getElementById("RePasswordContact");
  let RePasswordContactId = document.getElementById("RePasswordContactId");
  //
  let btnContact = document.getElementById("btnContact");
  // console.log(btnContact);
}
ContactUs.addEventListener("click", clickContactUs);

// 1
function nameValidation() {
  if (/^[a-zA-Z ]+$/.test(document.getElementById("NameContact").value)) {
    NameContact.classList.add("is-valid");
    NameContact.classList.remove("is-invalid");

    NameContactId.classList.add("d-none");
    NameContactId.classList.remove("d-block");
  } else {
    NameContact.classList.add("is-invalid");
    NameContact.classList.remove("is-valid");

    NameContactId.classList.remove("d-none");
    NameContactId.classList.add("d-block");
  }
}
// 2
function emailValidation() {
  if (
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(
      document.getElementById("EmailContact").value
    )
  ) {
    EmailContact.classList.add("is-valid");
    EmailContact.classList.remove("is-invalid");

    EmailContactId.classList.add("d-none");
    EmailContactId.classList.remove("d-block");
  } else {
    EmailContact.classList.add("is-invalid");
    EmailContactId.classList.remove("is-valid");

    EmailContactId.classList.remove("d-none");
    EmailContactId.classList.add("d-block");
  }
  return;
}
// 3
function numberValidation() {
  if (
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
      document.getElementById("NumberContact").value
    )
  ) {
    NumberContact.classList.add("is-valid");
    NumberContact.classList.remove("is-invalid");

    NumberContactId.classList.add("d-none");
    NumberContactId.classList.remove("d-block");
  } else {
    NumberContact.classList.add("is-invalid");
    NumberContactId.classList.remove("is-valid");

    NumberContactId.classList.remove("d-none");
    NumberContactId.classList.add("d-block");
  }
  return;
}
// 4
function ageValidation() {
  if (
    /^(0?[0-9]{1,2}|1[01][0-9]|120)$/.test(
      document.getElementById("ageContact").value
    )
  ) {
    ageContact.classList.add("is-valid");
    ageContact.classList.remove("is-invalid");

    ageContactId.classList.add("d-none");
    ageContactId.classList.remove("d-block");
  } else {
    ageContact.classList.add("is-invalid");
    ageContact.classList.remove("is-valid");

    ageContactId.classList.remove("d-none");
    ageContactId.classList.add("d-block");
  }
}
//5
function passwordValidation() {
  if (
    /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
      document.getElementById("PasswordContact").value
    )
  ) {
    PasswordContact.classList.add("is-valid");
    PasswordContact.classList.remove("is-invalid");

    PasswordContactId.classList.add("d-none");
    PasswordContactId.classList.remove("d-block");
  } else {
    PasswordContact.classList.add("is-invalid");
    PasswordContact.classList.remove("is-valid");

    PasswordContactId.classList.remove("d-none");
    PasswordContactId.classList.add("d-block");
  }
}
//6
function repassedValidation() {
  if (
    document.getElementById("PasswordContact").value ==
    document.getElementById("RePasswordContact").value
  ) {
    RePasswordContact.classList.add("is-valid");
    RePasswordContact.classList.remove("is-invalid");

    RePasswordContactId.classList.add("d-none");
    RePasswordContactId.classList.remove("d-block");
  } else {
    RePasswordContact.classList.add("is-invalid");
    RePasswordContact.classList.remove("is-valid");

    RePasswordContactId.classList.remove("d-none");
    RePasswordContactId.classList.add("d-block");
  }
  mainContactUs();
}
function mainContactUs() {
  if (
    NameContact.classList.contains("is-valid") &&
    EmailContact.classList.contains("is-valid") &&
    NumberContact.classList.contains("is-valid") &&
    ageContact.classList.contains("is-valid") &&
    PasswordContact.classList.contains("is-valid") &&
    RePasswordContact.classList.contains("is-valid")
  ) {
    btnContact.classList.remove("disabled");
    console.log("hello 1");
  } else {
    btnContact.classList.add("disabled");
    console.log("hello 2");
  }
}
// <!-- =========================================================================== -->
// <!-- ===============================End contact US============================= -->
// <!-- =========================================================================== -->
