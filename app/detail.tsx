import { View, Text ,ImageBackground, TouchableOpacity, StyleSheet ,SafeAreaView, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { fetchCocktailDetails } from './api';
import { ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HeartIcon } from 'react-native-heroicons/solid';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { router } from 'expo-router';
import { Dimensions } from 'react-native';
import { addToFavorites, removeFromFavorites, isFavorite } from './favoriteRepo';


const { width, height } = Dimensions.get('window');

const Detail = () => {
  const [details, setCocktailDetail] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { cocktailId } = useLocalSearchParams();
  const [isFavoriteStatus, setIsFavoriteStatus] = useState(false);
 

  useEffect(() => {
    const loadCocktailDetail = async () => {
      try {
        setLoading(true);
        const data = await fetchCocktailDetails(cocktailId);
  
        // Non null data filter
        const ingredients = [];  
        for (let i = 1; i <= 15; i++) {
          const ingredient = data[`strIngredient${i}`];
          const measure = data[`strMeasure${i}`];
          if (ingredient && measure) {
            ingredients.push({ ingredient, measure });
          }
        }
  
        setCocktailDetail({
          ...data,
          ingredients, 
        
        });
  
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




  useEffect(() => {
    const checkFavorite = async () => {
      if (details) {
        const favorite = await isFavorite(details);
        setIsFavoriteStatus(favorite);
      }
    };
    
    checkFavorite();
  }, [details]);





    const handleFavoriteToggle = async (details) => {
      if (isFavoriteStatus) {

        await removeFromFavorites(details);
        setIsFavoriteStatus(false); 
      } else {

        await addToFavorites(details);
        setIsFavoriteStatus(true); 
      }
    };


  


  if (error) {
    return <Text>{error}</Text>;
  }




  return (

  isLoading ? (
    <ActivityIndicator size="xlarge" color="#f97316" />
  ) : (
    
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className='flex-1 bg-neutral-900'>
      <View className="w-full">
        <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center p-7">
        <TouchableOpacity 
        style={{
          backgroundColor: '#EBDEF0', // Arka planı beyaz yapıyoruz
          borderRadius: 50, 
          padding: 5, 
          alignItems: 'center', 
          justifyContent: 'center', 
          width: 50, 
          height: 50 
        }}
        onPress={() => router.back()} 
      >
        <ChevronLeftIcon size={24} strokeWidth={2.5} color="black" />
      </TouchableOpacity>




      
          <TouchableOpacity 
            onPress={() => handleFavoriteToggle(details)}
            style={{ backgroundColor: '#274ab3', borderRadius: 14, padding: 7 }}
          >
            <HeartIcon size={35} color={isFavoriteStatus  ? "#ed2100" : "white"} />
          </TouchableOpacity>
      
      
          
      
      
          </SafeAreaView>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: details?.strDrinkThumb }}
            style={{ width: '100%', height: height * 0.55 ,borderRadius: 20}}
          />
          <LinearGradient
            colors={['transparent', 'rgba(20,20,20,0.7)', 'rgba(20,20,20,1)']}
            style={{ width, height: height * 0.40 }}
            start={{ x: 0.3, y: 0 }}
            end={{ x: 0.3, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
      </View>

      
      {/*cocktail details*/}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
 
        <Text className="text-neutral-200 text-center font-bold text-5xl ">{details?.strDrink}</Text>
        
        <View className="flex-row justify-between items-center">
        <Text className="text-neutral-300 font-semibold text-xl pl-5 pt-5">
            {details?.strAlcoholic === 'Alcoholic' ? 'Alcoholic' : 'Non-Alcoholic'}
          </Text>
          <Text className="text-neutral-300 font-semibold text-xl  pr-5 pt-5">
            {details?.strCategory}
          </Text>
       
      </View>

    </View>



        
    <View className="w-full">
    <View className="p-4">
      <Text className="text-white font-semibold text-2xl pt-5 ">Ingredients</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {details?.ingredients && details.ingredients.length > 0 ? (
          details.ingredients.map((item, index) => (
            <View
              style={styles.card}
              key={index}
            >
            <LinearGradient
            colors={[ '#e65c00','#F09819']} // Gradyan renkler
            start={{ x: 0.3, y: 0 }}
            end={{ x: 0.7, y: 1 }}
            style={styles.gradientBackground}
          >
              <Text className="text-white text-lg font-semibold">
                {item.ingredient} - {item.measure}
              </Text>
              </LinearGradient>
            </View>
          ))
        ) : (
          <Text className="text-white text-base mt-2">No ingredients available</Text>
        )}
      </ScrollView>
    </View>
  </View>




        
        {/*Instructions*/}
        <View className="w-full">
          <View className="p-4">
          <Text className="text-white font-extrabold text-3xl pt-5">🟠 Instructions</Text>
            <Text 
              className="text-neutral-300 text-base mt-4 leading-relaxed" 
              style={{
                letterSpacing: 0.5, // Harf aralığını artırma
                lineHeight: 22, // Satır aralığını artırma
              }}>
              {details?.strInstructions}
             </Text>
             </View>
        </View>


    </ScrollView>
  )
  );
}




const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: 10,
  },
  card: {
    marginRight: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    minWidth: 170, // Kart genişliği
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    height: height * 0.55,
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30,
    overflow: 'hidden', 
  },
  gradientBackground: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // İçeriği konumlandırmak için padding ekliyoruz
  },
});






export default Detail;
