const content = document.querySelector(".filter__content");
const userSearchEl = document.querySelector(".user__results");
const userForm = document.querySelector("#user__search");
const userInput = document.querySelector(".cocktail__search--input");
const searchName = document.querySelector(".user-search");
const loadingEl = document.querySelector(".loading");
const loadingBarEl = document.querySelector(".loading-line");
const filterValue = document.querySelector("#sort");
let homeSearch = localStorage.getItem("search");
let response;
let result;
let searchInput;


function openMenu() {
    document.body.classList.add("modal-on");
}

function closeMenu() {
    document.body.classList.remove("modal-on");
}

if (homeSearch) {
  // searchInput =
  fetchCocktails(homeSearch);
  localStorage.removeItem("search"); // removes the stored search term
}

userForm.addEventListener("submit", (e) => e.preventDefault()); //prevents the page from refreshing

async function fetchCocktails(userSearch) {
  //resetting select element to its original
  filterValue.value = "default";
  homeSearch = userSearch;
  
  // Show loading
  loadingBarEl.classList.add("display");
  loadingEl.classList.add("display");
  userSearchEl.innerHTML = ""; // clear previous results
  
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    
    response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${
        userSearch || homeSearch
      }`
    );
    result = await response.json();
    
    //checks if user search a cocktail name
    if (result.drink === "no data found") {
      response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${
          userSearch || homeSearch
        }`
      );
      result = await response.json();
    }
    
    
    displaySearch(filterValue.value);
    
    
  } catch (error) {
    loadingEl.style.display = "none";
    userSearchEl.innerHTML = "<p>Error fetching data.</p>";
    console.error(error);
  }
}

async function displaySearch(filter) {
  // Hide loading
  loadingBarEl.classList.remove("display");
  loadingEl.classList.remove("display");
  
  //to check if user sorts their results
  if(!(filter === "default")){
    sortSearch(filter)
  }

  if (result.drinks && result.drinks !== "no data found") {
    searchName.textContent = homeSearch;
    userSearchEl.innerHTML = result.drinks
      .map((drink) => resultsHTML(drink))
      .join("");

    const cards = document.querySelectorAll(".result");
    cards.forEach((card, i) => {
      setTimeout(() => card.classList.add("show"), i * 80); // staggered fade
    });
  } else {
    searchName.textContent = homeSearch;
    userSearchEl.innerHTML = `<h2 class="no-results">No results found for ${
      homeSearch
    }.</h2>`;
  }
}

function sortSearch(filter) {
  if (filter === "A_TO_Z") {
    result.drinks.sort((a, b) => a.strDrink.localeCompare(b.strDrink));
  } else if (filter === "Z_TO_A") {
    result.drinks.sort((a, b) => b.strDrink.localeCompare(a.strDrink));
  }
  return 
}

function resultsHTML(results) {
  return `<div class="result">
  <img class="result__img" src="${results.strDrinkThumb}" alt="">
  <div class="result__name">${results.strDrink}</div>
  </div>`;
}

