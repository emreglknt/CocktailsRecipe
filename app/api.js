import axios from 'axios';

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

// API çağrıları



// 1-  ilk sayfa için yüklenecek coctailler
export const fetchCocktailsByFirstLetter = async () => {
  try {
    const response = await axios.get(`${BASE_URL}search.php?f=a`);
    return response.data.drinks;
  } catch (error) {
    console.error('Error fetching cocktails: ', error);
    throw error;
  }
};



// 2-  ilk sayfa için yüklenecek cocktailler
export const fetchCocktailsBySearch = async (searchQuery) => {
  try {
    const response = await axios.get(`${BASE_URL}search.php?s=${searchQuery}`);
    return response.data.drinks;
  } catch (error) {
    console.error('Error fetching cocktails: ', error);
    throw error;
  }
};



// 3-  cocktaillerin detay bilgileri
export const fetchCocktailDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}lookup.php?i=${id}`);
    return response.data.drinks[0];
  } catch (error) {
    console.error('Error fetching cocktail details: ', error);
    throw error;
  }
};

// 4-  rastgele coctail
export const fetchRandomCocktail = async () => {
  try {
    const response = await axios.get(`${BASE_URL}random.php`);
    return response.data.drinks[0];
  } catch (error) {
    console.error('Error fetching random cocktail: ', error);
    throw error;
  }
};




// 5-  kategorilere göre coctailler
export const fetchCocktailsByCategory = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}filter.php?c=${category}`);
    return response.data.drinks;
  } catch (error) {
    console.error('Error fetching cocktails by category: ', error);
    throw error;
  }
};


  