import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { styles } from './OnboardingScreen.styles';
import { Button } from '@/components/atoms/Button';

const OnboardingScreen = ({ navigation }: any) => {
  const [step, setStep] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Step {step}</Text>
        <Text style={styles.description}>Simulating professional structure...</Text>
      </View>

      <View style={styles.footer}>
        <Button 
          title={step === 4 ? "GET STARTED" : "NEXT"} 
          onPress={() => step === 4 ? navigation.replace('Main') : setStep(step + 1)} 
        />
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;