function fetchNews(category) {
  const apiKey = 'f3470f7ee7214b56a3f39ae0671618e7';
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

  // Create an AJAX request
  const xhr = new XMLHttpRequest();
  xhr.open('GET', apiUrl, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      displayNews(data.articles);
    } else {
      console.error('Error fetching news:', xhr.status);
    }
  };

  xhr.onerror = function () {
    console.error('Request failed');
  };

  xhr.send();
}

// Function to display news articles as cards
function displayNews(articles) {
  if (!Array.isArray(articles)) {
    console.error('Invalid articles data');
    return;
  }

  const cardsContainer = document.getElementById('cards-container');
  cardsContainer.innerHTML = ''; // Clear existing cards

  // Loop through the articles and create cards dynamically
  articles.forEach(article => {
    const template = document.getElementById('template-news-card');
    const cardClone = template.content.cloneNode(true);

    // Set the data for each card
    const newsImg = cardClone.querySelector('#news-img');
    newsImg.src = article.urlToImage || 'https://via.placeholder.com/400x200';

    const newsTitle = cardClone.querySelector('#news-title');
    newsTitle.textContent = article.title;

    const newsSource = cardClone.querySelector('#news-source');
    newsSource.textContent = `${article.source.name} ${article.publishedAt}`;

    const newsDesc = cardClone.querySelector('#news-desc');
    newsDesc.textContent = article.description;

    const cardButton = cardClone.querySelector('.card-button');
    cardButton.addEventListener('click', () => {
      window.open(article.url, '_blank');
    });

    cardsContainer.appendChild(cardClone);
  });
}

// Function to handle navigation item clicks
function onNavItemClick(category) {
  fetchNews(category);
}

// Function to handle search button click
function onSearchButtonClick() {
  const searchText = document.getElementById('search-text').value;
  searchNews(searchText);
}

// Function to reload the page
function reload() {
  location.reload();
}

// Event listeners
document.getElementById('search-button').addEventListener('click', onSearchButtonClick);

// Fetch initial news data on page load
fetchNews('business');
