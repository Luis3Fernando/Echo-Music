import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import { Button } from '@components/atoms/Button';
import { styles } from './OnboardingScreen.styles';

const STEPS = [
  { title: "Your Title Goes", highlight: "Here", desc: "You can schedule your work with us more easily" },
  { title: "Smart Local", highlight: "Player", desc: "Organize your music library automatically" },
  { title: "High Quality", highlight: "Audio", desc: "Experience your FLAC and MP3 files like never before" },
  { title: "Ready to", highlight: "Start?", desc: "Give us permissions to scan your music" },
];

const OnboardingScreen = ({ navigation }: any) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.replace('Main');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={require('@/assets/img/handset.jpg')} 
          style={styles.image} 
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>
          {STEPS[currentStep].title}{'\n'}
          <Text style={styles.titleAccent}>{STEPS[currentStep].highlight}</Text>
        </Text>
        
        <Text style={styles.description}>
          {STEPS[currentStep].desc}
        </Text>
        <View style={styles.pagination}>
          {STEPS.map((_, i) => (
            <View 
              key={i} 
              style={[styles.dot, currentStep === i && styles.activeDot]} 
            />
          ))}
        </View>
      </View>
      <SafeAreaView style={styles.footer}>
        <Button 
          title={currentStep === STEPS.length - 1 ? "GET STARTED" : "Next"} 
          onPress={handleNext}
          style={styles.buttonOverride}
          textColor='white'
        />
      </SafeAreaView>
    </View>
  );
};

export default OnboardingScreen;