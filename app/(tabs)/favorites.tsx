import { View, Text, Pressable, ImageBackground, StyleSheet, FlatList,Image} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { getFavorites } from '../favoriteRepo';
import Animated from 'react-native-reanimated';
import 'react-native-gesture-handler';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { removeFromFavorites } from '../favoriteRepo';




const Favorites = () => {


  
  const [favCocktails, setFavCocktails] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);




  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const data = await getFavorites(); 
      setFavCocktails(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Failed to load favorites');
    }
  };


  useFocusEffect(
    useCallback(() => {
      fetchFavorites(); 
    }, [])
  );




  const renderRightActions = (item) => (
    <View style={styles.deleteContainer}>
      <Text style={styles.deleteText}>Delete 🗑️</Text>
    </View>
  );




  const handleSwipe = async (item) => {
    const updatedFavorites = await removeFromFavorites(item);
    
    if (updatedFavorites) {
      setFavCocktails(updatedFavorites); 
    }

  };





  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

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

        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.idDrink}

        renderItem={({ item }) => (





          <Swipeable
            renderRightActions={() => renderRightActions(item)}
            onSwipeableRightOpen={() => handleSwipe(item)}en 
          >

              <View style={styles.cocktailContainer}>
                    <Image
                      source={{ uri: item.strDrinkThumb }}
                      style={styles.image} />
                      
                    <Text style={styles.cocktailName}>{item.strDrink}</Text>
                    
                    <View style={styles.textRow}>
                        <Text style={styles.cocktailDetail1}>{item.strAlcoholic}</Text>
                        <Text style={styles.cocktailDetail2}>{item.strCategory}</Text>
                    </View>

                    <Text style={styles.cocktailInstructions}>{item.strInstructions}</Text>
                </View>
                


          </Swipeable>
        
        
        )}
      />
  </View> 
    </LinearGradient>
    </GestureHandlerRootView>

  );


}





const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    alignItems: 'center',
     marginTop: 20,
     paddingBottom: 80, 
  },

  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    alignSelf: 'center', 
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20, 
  },

    cocktailContainer: {
    width: 280,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 4 },
    elevation: 7,
    alignItems: 'center', 
    padding: 10,
    marginHorizontal: 10, 
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
  },
  image: {
    width: '100%',
    height: 250, 
    borderRadius: 20,
  },
  headerText: {
    paddingLeft: 16,
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 80, 
  },
  textRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
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
    color: '#5B2C6F',
    fontSize: 24,
    fontWeight: '600',
    marginTop: 10,

  },
  cocktailDetail1:{
    textAlign: 'left',
    color: '#922B21',
    fontSize:19,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 10,

  },  
   cocktailDetail2:{
    textAlign: 'right',
    color: '#922B21',
    fontSize: 19,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 10,

  },
  cocktailInstructions: {
    textAlign: 'left',
    color: 'black',
    fontSize: 18,
    fontWeight: '400',
    marginTop: 5,
    marginBottom: 10,
  
  },


  deleteContainer: {
    backgroundColor: '#e84b3d',
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 250,
    borderRadius: 20,
    marginTop: 50,
    paddingTop: 10,
    marginRight: 10,
    padding: 5,
  },

  deleteText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 20,
    textAlign: 'center',
  },
  
});

export default Favorites;
