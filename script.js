function fetchNews(category) {
   const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
    const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';

const url = `${corsProxyUrl}${apiUrl}`;
    // Make an HTTP GET request
    fetch(url)
      .then(response => response.json())
      .then(data => {
        displayNews(data.articles);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
      });
  }
  
  // Function to fetch news data from the API based on search term
  function searchNews(searchTerm) {
    const apiKey = 'f3470f7ee7214b56a3f39ae0671618e7'; // Replace with your actual API key
    const url = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${apiKey}`;
  
    // Make an HTTP GET request
    fetch(url)
      .then(response => response.json())
      .then(data => {
        displayNews(data.articles);
      })
      .catch(error => {
        console.error('Error searching news:', error);
      });
  }
  
  // Function to display news articles as cards
  function displayNews(articles) {
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
        window.open(article.url, '_blank'); // Open the full article in a new tab
      });
  
      cardsContainer.appendChild(cardClone); // Append the card to the container
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
  
