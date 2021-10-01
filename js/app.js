document.getElementById("error-message").style.display = "none";

// search for books
const searchBook = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // clear search keyword
  searchField.value = "";
  if (searchText === "") {
  } else {
    // load api data
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data.docs, data.numFound));
  }
};

// showing error message
const displayError = () => {
  document.getElementById("result-message").style.display = "none";
  document.getElementById("error-message").style.display = "block";
};

// showing number of results found
const displayTotalResult = (total) => {
  document.getElementById("error-message").style.display = "none";
  document.getElementById("result-message").style.display = "block";
  const totalResult = document.getElementById("result-message");
  totalResult.textContent = `${total} results found`;
};

// display search result
const displaySearchResult = (books, totalSearch) => {
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";
  if (books.length === 0) {
    displayError();
  } else {
    displayTotalResult(totalSearch);
  }
  books?.forEach((book) => {
    // default image setting if image is not found
    let source;
    if (book.cover_i !== undefined) {
      source = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    } else {
      source = "images/cover.jpg";
    }

    // display books on website
    const div = document.createElement("div");
    div.classList.add("col");

    div.innerHTML = `
    <div class="d-flex align-items-center">
    <div class="">
    <img src="${source}" width="300" height="300"/>
    <p><span class="fw-bold text-white">Book Title: </span>${
      book.title ? book.title : ""
    }</p>
    <p><span class="fw-bold text-white">Author: </span>${
      book.author_name?.[0] || ""
    }</p>
    <p><span class="fw-bold text-white">Publisher: </span>${
      book.publisher?.[0] || ""
    }</p>
    <p><span class="fw-bold text-white">First Published Year: </span>${
      book.publish_year?.[0] || ""
    }</p>
    </div>
    </div>
    `;
    searchResult.appendChild(div);
  });
};
