import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [number, setNumber] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>결과 : {number}</Text>
      <View style={{flexDirection: 'row'}}>
        <Button 
        title="증가"
        onPress={() => {
          setNumber(number + 1);
        }}
      />
        <Button 
          title="감소"
          onPress={() => {
            setNumber(number - 1);
          }}
      />
      </View>
      <StatusBar style="auto" />  // style: "auto" | "inverted" | "light" | "dark"
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',    
  },
});
