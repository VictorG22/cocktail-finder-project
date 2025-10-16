const content = document.querySelector(".filter__content");
const userSearchEl = document.querySelector(".user__results");
const userForm = document.querySelector("#user__search");
const userInput = document.querySelector(".cocktail__search--input");
const searchName = document.querySelector(".user-search");
const homeSearch = localStorage.getItem("search");
const searchTerm = localStorage.getItem("search");
const loadingEl = document.querySelector(".loading");
const loadingBarEl = document.querySelector(".loading-line");
const filterValue = document.querySelector("#sort");
let response;
let result;

if (searchTerm) {
  fetchCocktails(searchTerm);
  localStorage.removeItem("search"); // removes the stored search term
}

userForm.addEventListener("submit", (e) => e.preventDefault());

async function fetchCocktails(userSearch) {
  //resetting select element to its original
  filterValue.value = "default";

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
      return displaySearch(results, userSearch);
    }

    displaySearch(result, userSearch);
  } catch (error) {
    loadingEl.style.display = "none";
    userSearchEl.innerHTML = "<p>Error fetching data.</p>";
    console.error(error);
  }
}

async function displaySearch(results, search) {
  // Hide loading
  loadingBarEl.classList.remove("display");
  loadingEl.classList.remove("display");

  if (results.drinks && results.drinks !== "no data found") {
    searchName.textContent = search;
    userSearchEl.innerHTML = results.drinks
      .map((drink) => resultsHTML(drink))
      .join("");

    const cards = document.querySelectorAll(".result");
    cards.forEach((card, i) => {
      setTimeout(() => card.classList.add("show"), i * 80); // staggered fade
    });
  } else {
    searchName.textContent = search;
    userSearchEl.innerHTML = `<h2 class="no-results">No results found for ${
      search || homeSearch
    }.</h2>`;
  }
}

function sortSearch(filter) {
  if (filter === "A_TO_Z") {
    // console.log(results.drinks.sort((a, b) => a.strDrink.localeCompare(b.strDrink)))
    sortedSearch.drinks.sort((a, b) => a.strDrink.localeCompare(b.strDrink));
  } else if (filter === "Z_TO_A") {
    sortedSearch.drinks.sort((a, b) => b.strDrink.localeCompare(a.strDrink));
  }
  return (userSearchEl.innerHTML = sortedSearch.drinks
    .map((drink) => resultsHTML(drink))
    .join(""));
}

function resultsHTML(results) {
  return `<div class="result">
  <img class="result__img" src="${results.strDrinkThumb}" alt="">
  <div class="result__name">${results.strDrink}</div>
  </div>`;
}
