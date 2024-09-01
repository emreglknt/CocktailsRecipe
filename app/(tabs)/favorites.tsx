import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { getFavorites } from '../favoriteRepo';
import Animated, { FadeInDown } from 'react-native-reanimated';



const favorites = () => {



  const [favCocktails, setfavCocktails] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    const fetchFavorites = async () => {
      try {
            
        setLoading(true);
        const data = await getFavorites();
        setfavCocktails(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load favorites'); 
      }
    };

    fetchFavorites();
  }, []);





  return (
   
    <LinearGradient
    colors={['#FFA500', '#800080']} // Turuncu (#FFA500) ile mor (#800080) renkleri
    style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}
    >


    
      
    <Animated.View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
          <Text style={{ paddingLeft: 16, color: 'white', fontSize: 24, fontWeight: 'bold' }}>
           Favourite Cocktails
          </Text>
          
         
        </View>

        </Animated.View>



  </LinearGradient>


  )
}

export default favorites