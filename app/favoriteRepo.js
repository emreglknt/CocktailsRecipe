import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITE_KEY = 'favorites';

// Favorilere ekleme fonksiyonu
const addToFavorites = async (cocktailId) => {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITE_KEY);
    let favoriteList = favorites ? JSON.parse(favorites) : [];
    if (!favoriteList.includes(cocktailId)) {
      favoriteList.push(cocktailId);
      await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(favoriteList));
    }
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};

// Favorilerden kaldırma fonksiyonu
const removeFromFavorites = async (cocktailId) => {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITE_KEY);
    if (favorites !== null) {
      let favoriteList = JSON.parse(favorites);
      favoriteList = favoriteList.filter((id) => id !== cocktailId);
      await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(favoriteList));
    }
  } catch (error) {
    console.error('Error removing from favorites:', error);
  }
};

// Favori kontrol fonksiyonu
const isFavorite = async (cocktailId) => {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITE_KEY);
    if (favorites !== null) {
      const favoriteList = JSON.parse(favorites);
      return favoriteList.includes(cocktailId);
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error checking favorite:', error);
    return false;
  }
};

// Favorileri alma fonksiyonu
const getFavorites = async () => {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITE_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export {
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  getFavorites,
};
