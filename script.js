async function getCurrentImageOfTheDay(enteredDate) {
  try {
    const api_key = 'ns1lz2ihZbdW64R0qKXsDYxxb21dJ12vLhcqMGCP';
    const today = new Date();
    const date = enteredDate||today.toISOString().split('T')[0]; 

    const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${api_key}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Set the image source
    document.getElementById('imageContainer').src = data.url;
    document.getElementById('imageTitle').textContent = data.title; // Optionally display the title
    document.getElementById('imageDescription').textContent = data.explanation; // Optionally display the description
  } catch (error) {
    console.error('Error fetching the image:', error);
  }
}

function getImageOfTheDay(){
  const date=document.getElementById('searchedDate').value;
  
  getCurrentImageOfTheDay(date);
  window.localStorage.setItem('date',date);

  document.getElementById('prevSearches').innerText=date;
}

document.getElementById('searchButton').addEventListener('click',getImageOfTheDay);

getCurrentImageOfTheDay();
