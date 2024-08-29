import { View, Text ,ImageBackground, TouchableOpacity, SafeAreaView} from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router';
import {fetchCocktailDetails} from './api'
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import {HeartIcon } from 'react-native-heroicons/solid';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';






const detail = () => {

  const [details, setCocktailDetail] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { cocktailId } = useLocalSearchParams();
  


  useEffect(() => {
    const loadCocktailDetail = async () => {
      try {
        setLoading(true);
        const data = await fetchCocktailDetails(cocktailId); 
        setCocktailDetail(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load details');
        setLoading(false);
      }
    };
        
    if (cocktailId) {
      loadCocktailDetail();
    }
  }, [cocktailId]);



  if (isLoading) {
    return <ActivityIndicator size="large" color="#f97316" />;
  }
  
  if (error) {
    return <Text>{error}</Text>;
  }

  return (

    <LinearGradient
    colors={['rgb(10, 20, 20)', 'rgb(30, 30, 50)']}
    start={{ x: 0.5, y: 0.5 }} 
    end={{ x: 0.5, y: 1 }}   
    locations={[0.068, 1.31]} 
    style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}
  >  


  <ScrollView contentContainerStyle={{ paddingBottom: 30 }} className='flex-1 bg-neutral-900'>
        <View className='w-full'>
          <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center p-4">
            <TouchableOpacity 
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 12, padding: 4 }}
              onPress={() => router.back()} // Go back to the previous screen
            >
              <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 12, padding: 4 }}
            >
              <HeartIcon size={30} color="white" />
            </TouchableOpacity>
          </SafeAreaView>

          <ImageBackground
            source={{ uri: details.strDrinkThumb }}
            style={{
              width: '100%',
              height: '30%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            imageStyle={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 24,
                fontWeight: '700',
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 10,
              }}
            >
              {details.strDrink}
            </Text>
          </ImageBackground>
        </View>

        {/* Your scrollable content goes here */}
        <View style={{ padding: 20 }}>
          <Text style={{ color: 'white', fontSize: 18, marginBottom: 10 }}>
            Cocktail Details
          </Text>
          {/* Add other details here */}
        </View>
      </ScrollView>






     
    </LinearGradient>
     
  );
}

export default detail