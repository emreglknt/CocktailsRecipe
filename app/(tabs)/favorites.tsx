import { View, Text, Pressable, ImageBackground, StyleSheet, FlatList,Image} from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { getFavorites } from '../favoriteRepo';
import Animated from 'react-native-reanimated';
import {router} from 'expo-router';


const Favorites = () => {
  const [favCocktails, setFavCocktails] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);





  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const data = await getFavorites();
        setFavCocktails(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load favorites');
      }
    };

    fetchFavorites();
  }, []);




  return (
    <LinearGradient
      colors={['#FFA500', '#800080']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Favourite Cocktails</Text>
      </View>

                   
      <View style={styles.contentContainer}>
      <FlatList
        data={favCocktails}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.idDrink}
        renderItem={({ item }) => (

          <View style={styles.cocktailContainer}>
            <Image
              source={{ uri: item.strDrinkThumb }}
              style={styles.image}
            />
            <Text style={styles.cocktailName}>{item.strDrink}</Text>
            
            <View style={styles.textRow}>
            <Text style={styles.cocktailDetail1}>{item.strAlcoholic}</Text>
            <Text style={styles.cocktailDetail2}>{item.strCategory}</Text>
          </View>

            <Text style={styles.cocktailDetail1}>{item.strInstructions}</Text>
          </View>

        )}
      />
  </View> 
    </LinearGradient>
  );


}





const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    alignItems: 'center',
     marginTop: 20,
  },

  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
    cocktailContainer: {
    width: 250, 
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    alignItems: 'center', 
    padding: 10,
    marginHorizontal: 10, 
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
  },
  image: {
    width: '100%',
    height: 250, // Set a fixed height for the image
    borderRadius: 10,
  },
  headerText: {
    paddingLeft: 16,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  textRow: {
    flexDirection: 'row', // Align the text in a row
    justifyContent: 'space-between', // Space between for left and right text
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  cardContainer: {
    width: '50%',
    margin: 6,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#152343',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 15,
  },
  imageBackground: {
    height: 240,
    justifyContent: 'flex-end',
  },
  gradient: {
    height: '25%',
    justifyContent: 'flex-end',
    padding: 8,
  },
  cocktailName: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: '300',
  },
  cocktailDetail1:{
    textAlign: 'left',
    color: 'black',
    fontSize: 18,
    fontWeight: '300',

  },  
   cocktailDetail2:{
    textAlign: 'right',
    color: 'black',
    fontSize: 18,
    fontWeight: '300',

  },
  
});

export default Favorites;
