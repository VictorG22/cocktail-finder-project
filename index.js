
// const homeUserSearch = document.querySelector(".search__input")

// function showUserSearch(indexSearch){
//     localStorage.setItem('search', indexSearch.value)

//     window.location.href = `${window.location.origin}/cocktail.html`;
// }

const homeForm = document.querySelector('.home__search');
const homeInput = document.querySelector('.search__input');

homeForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Stop page refresh
  const query = homeInput.value.trim();
  if (query) {
    localStorage.setItem('search', query); // Save for next page
    window.location.href = `${window.location.origin}/cocktail.html`; // Redirect
  }
});