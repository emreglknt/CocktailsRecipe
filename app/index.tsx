import Button from '@/components/Button'
import React, { useRef } from 'react'
import { Text,View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import {router} from 'expo-router'
import LottieView from 'lottie-react-native'
import { LinearGradient } from 'expo-linear-gradient';




const Welcome = () => {

    const animation = useRef<LottieView>(null);

  return (

    <LinearGradient
    colors={['#FFA500', '#800080']} // Turuncu (#FFA500) ile mor (#800080) renkleri
    style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}
  >
    <View className ="gap-4 flex-1 w-full items-center justify-center">
    

    <Animated.View className ="w-full"
    entering = {FadeInDown.duration(400).springify()}
    >
                <LottieView 
                ref={animation}
                source={require('../assets/cocktail.json')}
                autoPlay
                loop
                style={{width:"300",height:250}}
                />
    </Animated.View>





    <Animated.View className="w-full"
    entering={FadeInDown.duration(400).delay(200).springify()}
  >
    <Text className="text-3xl font-bold text-center leading-[3.5rem] text-[#EBDEF0]">
      Discover Your New Favorite Cocktail
    </Text>
  </Animated.View>
  



    <Animated.View
      style={{ width: '100%' }}
      entering={FadeInDown.duration(400).delay(200).springify()} 
    >
      <Text
        style={{
          color: '#FADBD8',
          fontSize: 18, // equivalent to text-xl
          fontWeight: 'bold',
          textAlign: 'center',
          lineHeight: 40, // equivalent to leading-[2.5rem]
        }}
      >
      Shake Up Your Night with the Perfect Mix 🥂
      </Text>
    </Animated.View>





    
    <Animated.View
      style={{ width: '100%' }}
      entering={FadeInDown.duration(400).delay(200).springify()} // 'springify' typo corrected if it was 'springify' before
    >
      
    <Button
    title="Discover !"
    action={() => router.push('/(tabs)')}
  />
  
  </Animated.View>


    
    
    
    
      </View>
  </LinearGradient>
  )
}

export default Welcome
