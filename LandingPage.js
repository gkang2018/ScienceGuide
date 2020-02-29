import React from 'react';
import { StyleSheet, Image, Text, Button, View, Alert } from 'react-native';

export default function LandingPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Science Guide</Text>
      <Image style={{width: 250, height: 250, marginBottom: 100}} source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} />
     <View style={styles.smallTextContainer}>
      <Button
        title="Let's get started!"
        onPress={() => Alert.alert('Button pressed')}
      />
      <Text style={styles.smallText}>Already have an account?</Text>
	<Text>Sign In</Text>
     </View>
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
  smallTextContainer: {
   marginBottom: 60,
   alignItems: 'center',
  },
  smallText: {
    marginTop: 20,
  },
  title: {
    flex: 1,
    marginTop: 60,
    fontWeight: 'bold',
    fontSize: 30,
    color: '#a9a9a9'
  },
  
});
