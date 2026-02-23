import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function App() {
  const nameOpacity = useRef(new Animated.Value(0)).current;
  const nameTranslateY = useRef(new Animated.Value(24)).current;
  const heartScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(nameOpacity, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(nameTranslateY, {
        toValue: 0,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(heartScale, {
          toValue: 1.15,
          duration: 550,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(heartScale, {
          toValue: 1,
          duration: 550,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    pulse.start();
    return () => pulse.stop();
  }, [heartScale, nameOpacity, nameTranslateY]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFEFF5" />
      <View style={styles.container}>
        <Animated.Text style={[styles.heart, { transform: [{ scale: heartScale }] }]}>
          {'\u2764\uFE0F'}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.name,
            { opacity: nameOpacity, transform: [{ translateY: nameTranslateY }] },
          ]}
        >
          линочка, я тебя очень люблю {'\u2764\uFE0F'}
          спасибо что ты у меня есть {`\u2764\uFE0F`}
        </Animated.Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFEFF5',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heart: {
    position: 'absolute',
    top: 90,
    fontSize: 64,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#C2185B',
    letterSpacing: 1,
    textAlign: 'center',
  },
});

export default App;
