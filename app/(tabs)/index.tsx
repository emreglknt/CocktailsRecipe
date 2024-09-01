import React, { useState, useEffect } from 'react';
import {ActivityIndicator,Image,Pressable, ImageBackground,Text, View, ScrollView,FlatList, TextInput} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchCocktailsByCategory,fetchCocktailsByFirstLetter,fetchCocktailsBySearch} from '../api';
import { LinearGradient } from 'expo-linear-gradient';
import {router} from 'expo-router';





interface Category {
  name: string;
  icon: string;

  
}


interface Cocktail {
  id: string;
  name: string;
  icon: string;
}


const categories = [
  { id: "1", name: "Cocktail", icon: "wine-outline" },
  { id: "2", name: "Ordinary Drink", icon: "beer-outline" },
  { id: "3", name: "Punch / Party Drink", icon: "happy-outline" },
  { id: "4", name: "Shot", icon: "wine-outline" },
  { id: "5", name: "Shake", icon: "cafe-outline" },
  { id: "6", name: "Beer", icon: "beer-outline" },
  { id: "7", name: "Homemade Liqueur", icon: "wine-outline" },
  { id: "8", name: "Cocoa", icon: "cafe-outline" },
  { id: "9", name: "Coffee / Tea", icon: "cafe-outline" },
  { id: "10", name: "Soft Drink", icon: "beer-outline" },
  { id: "11", name: "Other / Unknown", icon: "help-circle-outline" },
];





export default function HomeScreen() {

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cocktails, setCocktails] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');





  useEffect(() => {
    const loadCocktails = async () => {
      try {
        setLoading(true);
        const data = await fetchCocktailsByFirstLetter(); // Fetch recipes starting with 'A'
        setCocktails(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load cocktail recipes');
      }
    };

    loadCocktails();
  }, [])






  useEffect(() => {
    if (selectedCategory) {
      const loadCocktails = async () => {
        try {
          setLoading(true);
          const data = await fetchCocktailsByCategory(selectedCategory);
          setCocktails(data);
          setLoading(false);
        } catch (error) {
          setError('Failed to load cocktails');
        }
      };

      loadCocktails();
    }
  }, [selectedCategory]);



  // searchQuery useEffect 
  useEffect(() => {
    if (searchQuery) {
      const loadCocktails = async () => {
        try {
          setLoading(true);
          const data = await fetchCocktailsBySearch(searchQuery);
          setCocktails(data);
          setLoading(false);
        } catch (error) {
          setError('Failed to load cocktails');
        }
      };

      loadCocktails();
    }
  }, [searchQuery]);



 



  const renderCategory = (category: Category) => (
    <Pressable
      key={category.name}
      onPress={() => setSelectedCategory(category.name)}
      style={{
        marginRight: 16,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 999,
        borderColor: selectedCategory === category.name ? '#1d4ed8' : '#ccc',
        borderWidth: 2,
        backgroundColor: selectedCategory === category.name ? '#e0f2ff' : 'white',
      }}
    >
      <Ionicons
        name={category.icon}
        size={24}
        color={selectedCategory === category.name ? '#1d4ed8' : 'gray'}
      />
      <Text
        style={{
          paddingLeft: 12,
          fontSize: 14,
          fontWeight: selectedCategory === category.name ? 'bold' : 'normal',
        }}
      >
        {category.name}
      </Text>
    </Pressable>
  );






  const renderCocktail = ({ item }) => (
    <CoctailCard key={item.idDrink} cocktail={item} />
  );






  const CoctailCard = ({ cocktail }: { cocktail: Cocktail }) => (
    <Pressable
    onPress={() => router.push(`/detail?cocktailId=${cocktail.idDrink}`)}

    style={{
      width: '50%',
      margin: 6,
      borderRadius: 15,
      overflow: 'hidden',
      shadowColor: '#152343', 
      shadowOpacity: 0.5,      
      shadowRadius: 10,        
      shadowOffset: { width: 0, height: 4 },  
      elevation: 15,  
    }}
  >
    <ImageBackground
      source={{ uri: cocktail.strDrinkThumb }}
      style={{ height: 240, justifyContent: 'flex-end' }}
    >
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={{ height: '25%', justifyContent: 'flex-end', padding: 8 }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 20,
            fontWeight: '600',
          }}
        >
          {cocktail.strDrink}
        </Text>
      </LinearGradient>
    </ImageBackground>
  </Pressable>


  );
  





  

  if(error){
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    )
  }
  
 

  




  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ paddingTop: 16, paddingBottom: 6, backgroundColor: '#f97316' }}>
        
      
      <Animated.View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
            <Text style={{ paddingLeft: 16, color: 'white', fontSize: 24, fontWeight: 'bold' }}>
              Welcome to Journey!
            </Text>
            
           
          </View>
        </Animated.View>


      
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: 22, padding: 16, margin: 16 }}>
          <MaterialCommunityIcons name="magnify" size={24} color="white" />
          <TextInput
            placeholder="Search Cocktails"
            clearButtonMode="always"
            placeholderTextColor="white"
            style={{ marginLeft: 12, color: 'white', flex: 1 }}
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
      </View>

     
    
   


        <Animated.View
          entering={FadeInDown.duration(500).delay(200)}
          style={{ gap: 24, borderWidth: 1 }}
        >
          {/* Categories */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 16, alignItems: 'center' }}>
            <Text style={{ fontSize: 20 ,fontWeight: '300'}}>Categories</Text>
          </View>

          {/* Categories List */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}  style={{ marginBottom: 16, paddingLeft: 16 }}>
            {categories.map((category) => renderCategory(category))}
          </ScrollView>
          
          </Animated.View>
    

            {/* FlatList for Cocktails */}
            <View style={{ flex: 1 }}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#f97316" />
            ) : (
              <FlatList
                data={cocktails}
                showsVerticalScrollIndicator={false}
                renderItem={renderCocktail}
                keyExtractor={(item) => item.idDrink}
                numColumns={2} // Grid layout with 2 columns
                contentContainerStyle={{ paddingHorizontal: 10 }}
                columnWrapperStyle={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}
              />
            )}
            </View>
            </View>
  );
}
