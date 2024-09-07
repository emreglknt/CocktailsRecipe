import { View, Text, ActivityIndicator, StyleSheet, Image, Touchable } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { TouchableOpacity, ImageBackground,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchRandomCocktail } from '../api';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated'
import {router} from 'expo-router';




const random = () => {


  const [randomCocktail, setRandomCocktail] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);





    const loadRandomCocktail = async () => {
      setLoading(true);
      setError(''); // Clear previous errors
      try {
        const data = await fetchRandomCocktail(); 
        setRandomCocktail(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load cocktail ');
      }finally {
        setLoading(false); // Ensure loading state is reset
      }
    };












  return (

    
    <LinearGradient
    colors={['#c31432', '#240b36']} // Turuncu (#FFA500) ile mor (#800080) renkleri
    style={{ flex: 1, width: '100%'}}
  >
    <View className="w-full">
    <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center p-7">
  
   
   
   
    <Animated.View
    className="w-full"
    entering={FadeInDown.duration(300).springify()}
    style={{ paddingHorizontal: 16 }} // Adjust padding here
  >
    <TouchableOpacity
      onPress={loadRandomCocktail}
      style={{
        width: '100%',
        maxWidth: 340, // Adjust the maximum width of the card
        marginVertical: 20,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#152343',
        shadowOpacity: 0.5,
        shadowRadius: 10,

        justifyContent: 'center',
        shadowOffset: { width: 0, height: 4 },
        elevation: 20,
        alignSelf: 'center', // Center the card horizontally
      }}
    >
      <ImageBackground
        source={require('../../assets/cardcocktail.png')}
        style={{ height: 220, width: '100%' }} // Ensure the image background fits the card width
        imageStyle={{ resizeMode: 'contain' }} // Ensure the image is not cropped and maintains aspect ratio
      >
        {/* Add any additional content here if needed */}
      </ImageBackground>
    </TouchableOpacity>
  </Animated.View>
  
  


                  
          <View style={styles.contentContainer}>
  
       {isLoading ? (
          <ActivityIndicator size="large" color="#f97316" />
        ) : (
        
            <TouchableOpacity 
            onPress={() => router.push(`/detail?cocktailId=${randomCocktail.idDrink}`)}
            
            style={styles.cardContainer}>

                <Image
                  source={{ uri: randomCocktail.strDrinkThumb }}
                  style={styles.image}
                />
                <Text style={styles.cocktailName}>{randomCocktail.strDrink}</Text>
                <Text style={styles.cocktailtext}>{randomCocktail.strAlcoholic}</Text>
                <Text style={styles.cocktailtext2}>{randomCocktail.strCategory}</Text>

              </TouchableOpacity>

        )}

         </View>
  





    
    </SafeAreaView>
    </View>
     
    
    </LinearGradient>
  );
};



const styles = StyleSheet.create({


  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentContainer: {
    width: '100%',
    alignItems: 'center',
     marginTop: 20,
  },


  image: {
    width: '100%',
    height: 260,
    resizeMode: 'cover',
    borderRadius: 10,
  },


  cardContainer: {
    width: '90%',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },

  cocktailName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  cocktailtext:{
    marginTop: 10,
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'center',
    color: 'white'
  },
  cocktailtext2:{
    marginTop: 10,
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'center',
    color: 'white'
  },
  

  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },

})

export default random;
