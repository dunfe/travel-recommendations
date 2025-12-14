// Global variable to store fetched data
let travelData = null;

// Fetch data from the JSON file when page loads
async function fetchTravelData() {
  try {
    const response = await fetch("travel_recommendation_api.json");
    if (!response.ok) {
      throw new Error("Failed to fetch travel data");
    }
    travelData = await response.json();
    console.log("Travel data loaded:", travelData);
  } catch (error) {
    console.error("Error fetching travel data:", error);
  }
}

// Normalize keyword to handle variations
function normalizeKeyword(keyword) {
  const normalized = keyword.toLowerCase().trim();

  // Handle singular/plural variations
  const keywordMap = {
    beach: "beaches",
    beaches: "beaches",
    temple: "temples",
    temples: "temples",
    country: "countries",
    countries: "countries",
  };

  return keywordMap[normalized] || normalized;
}

// Search for recommendations based on keyword
function searchRecommendations(keyword) {
  if (!travelData) {
    console.error("Travel data not loaded yet");
    return [];
  }

  const normalizedKeyword = normalizeKeyword(keyword);
  let results = [];

  // Search based on normalized keyword
  if (normalizedKeyword === "beaches") {
    results = travelData.beaches || [];
  } else if (normalizedKeyword === "temples") {
    results = travelData.temples || [];
  } else if (normalizedKeyword === "countries") {
    // For countries, we need to flatten the cities array
    results = [];
    if (travelData.countries) {
      travelData.countries.forEach((country) => {
        if (country.cities) {
          country.cities.forEach((city) => {
            results.push(city);
          });
        }
      });
    }
  }

  return results;
}

// Display recommendations in the DOM
function displayRecommendations(recommendations) {
  const container = document.getElementById("recommendations");
  const defaultHero = document.getElementById("defaultHero");

  // Hide default hero content
  if (defaultHero) {
    defaultHero.style.display = "none";
  }

  if (!recommendations || recommendations.length === 0) {
    container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No recommendations found. Try searching for "beaches", "temples", or "countries".</p>
            </div>
        `;
    return;
  }

  // Create HTML for each recommendation
  let html = '<div class="results-grid">';

  recommendations.forEach((item) => {
    html += `
            <div class="recommendation-card glass-card">
                <div class="card-image">
                    <img src="${item.imageUrl}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/400x300?text=Image+Not+Found'">
                </div>
                <div class="card-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <button class="visit-btn">Visit Now</button>
                </div>
            </div>
        `;
  });

  html += "</div>";
  container.innerHTML = html;
}

// Clear recommendations
function clearRecommendations() {
  const container = document.getElementById("recommendations");
  const defaultHero = document.getElementById("defaultHero");

  // Show default hero content again
  container.innerHTML = `
    <div class="hero-content glass-card" id="defaultHero">
      <h1>Explore the World</h1>
      <p>Discover your next adventure with our curated travel guides and tips. Search for beaches, temples, or countries!</p>
    </div>
  `;

  document.getElementById("searchInput").value = "";
}

// Handle search button click
function handleSearch() {
  const searchInput = document.getElementById("searchInput");
  const keyword = searchInput.value.trim();

  if (!keyword) {
    alert("Please enter a search term (beaches, temples, or countries)");
    return;
  }

  // Check if data is loaded
  if (!travelData) {
    alert("Travel data is still loading. Please try again in a moment.");
    // Try to fetch again
    fetchTravelData();
    return;
  }

  console.log("Searching for:", keyword);
  console.log("Travel data available:", travelData);

  const results = searchRecommendations(keyword);
  console.log("Search results:", results);

  displayRecommendations(results);
}

// Handle reset/clear button click
function handleReset() {
  clearRecommendations();
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  // Fetch travel data
  fetchTravelData();

  // Add event listeners
  const searchBtn = document.getElementById("btnSearch");
  const resetBtn = document.getElementById("btnReset");
  const searchInput = document.getElementById("searchInput");

  if (searchBtn) {
    searchBtn.addEventListener("click", handleSearch);
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", handleReset);
  }

  // Allow Enter key to trigger search
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    });
  }
});
