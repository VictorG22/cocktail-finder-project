
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

function openMenu() {
    document.body.classList.add("modal-on");
}

function closeMenu() {
    document.body.classList.remove("modal-on");
}