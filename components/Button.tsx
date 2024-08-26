import React from 'react';
import { Pressable, Text, StyleSheet, GestureResponderEvent } from 'react-native';

interface ButtonProps {
  title: string;
  action: (event: GestureResponderEvent) => void;
}

const Button: React.FC<ButtonProps> = ({ title, action }) => {
  return (
    <Pressable onPress={action} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFA500', 
    borderRadius: 22, // Rounded corners
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16, // Equivalent to py-5
    width: '65%',
    alignSelf: 'center', // Equivalent to w-3/4
  },
  buttonText: {
    color: 'white',
    fontSize: 20, // Equivalent to text-5xl
    fontWeight: 'bold',
  },
});

export default Button;
