import { StatusBar } from 'expo-status-bar'
import { Dimensions, StyleSheet, View } from 'react-native'
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

const SCREEN_WIDTH = Dimensions.get('screen').width
const SNAP_OPEN = SCREEN_WIDTH * 0.3

export default function App() {
  const isPressed = useSharedValue(false)
  const translateX = useSharedValue(0)
  const lastPosition = useSharedValue(0)

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX + lastPosition.value
    })
    .onEnd(() => {
      const endPosition = translateX.value < -SNAP_OPEN ? -SNAP_OPEN : 0
      translateX.value = withSpring(endPosition)
      lastPosition.value = endPosition
    })

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      backgroundColor: isPressed.value ? 'gray' : 'lightgray',
    }
  })

  return (
    <GestureHandlerRootView>
      <StatusBar style="auto" />

      <View style={styles.container}>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.ball, animatedStyles]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ball: {
    width: '100%',
    height: 100,
    borderRadius: 16,
    backgroundColor: 'blue',
    alignSelf: 'center',
  },
})
