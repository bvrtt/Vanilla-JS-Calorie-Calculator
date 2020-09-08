const calcContainer = document.querySelector(".calculator-container");
const arrowDesktop = document.querySelector(".arrow-desktop");
const arrowMobile = document.querySelector(".arrow-mobile");
let screenWidth = window.innerWidth;

//Get window width when resized
window.addEventListener("resize", () => {
  screenWidth = window.innerWidth;
});

//Back to calories info when arrow clicked for desktop
arrowDesktop.addEventListener("click", () => {
  if (screenWidth > 850) {
    calcContainer.classList.remove("container-active");
    arrowDesktop.classList.remove("show-arrow");
  }
});

//Back to calories info when arrow clicked for mobile
arrowMobile.addEventListener("click", () => {
  if (screenWidth < 850) {
    calcContainer.classList.remove("container-active-mobile");
    arrowMobile.classList.remove("show-arrow");
  }
});

//Main counting calories function
function caloriesCalc() {
  //Show calories container and arrow
  function showCalories() {
    if (screenWidth < 850) {
      calcContainer.classList.add("container-active-mobile");
      arrowMobile.classList.add("show-arrow");
    } else {
      calcContainer.classList.add("container-active");
      arrowDesktop.classList.add("show-arrow");
    }
  }

  const age = document.querySelector(".age-input").value;
  const weight = document.querySelector(".weight-input").value;
  const height = document.querySelector(".height-input").value;

  //If data is invalid show alerts and if data is valid show calories container
  if (isNaN(age) || !age || age > 130) {
    alert("Enter valid age");
  } else if (isNaN(weight) || !weight || weight > 250) {
    alert("Enter valid weight");
  } else if (isNaN(height) || !height || height > 270) {
    alert("Enter valid height");
  } else {
    showCalories();
  }

  //Calculating calories
  let calories = Math.round(weight * 10 + height * 6.25 - age * 5);

  //Changing amount of calories by activity
  const activityValue = document.querySelectorAll(".activity-input");

  activityValue.forEach((activity) => {
    if (activity.checked) {
      calories *= activity.value;
    }
  });

  //Changing amount of calories by gender
  const genders = document.querySelectorAll(".gender-input");

  genders.forEach((gender) => {
    if (gender.checked) {
      parseInt((calories += parseInt(gender.value)));
    }
  });

  //Show calories
  const result = document.querySelector(".calories-result");
  result.innerHTML = Math.round(calories);

  //Show proteins
  const proteinNumber = document.querySelector(".protein-number");
  const protein = weight * 2;
  proteinNumber.innerHTML = `${protein} grams`;

  //Show fat
  const fatNumber = document.querySelector(".fat-number");
  const fat = Math.round(weight * 0.9);
  fatNumber.innerHTML = `${fat} grams`;

  //Show carbs
  const carbsNumber = document.querySelector(".carbs-number");
  const carbs = Math.round((calories - fat * 9 - protein * 4) / 4);
  carbsNumber.innerHTML = `${carbs} grams`;
}

//Call calories counting function when button clicekd
const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", caloriesCalc);
