import { Dimensions, StyleSheet, Text } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

const SCREEN_WIDTH = Dimensions.get('screen').width
const SNAP_OPEN = SCREEN_WIDTH * 0.3

const ListItem = () => {
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
    .activeOffsetX([-20, 20])

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      backgroundColor: isPressed.value ? 'gray' : 'lightgray',
    }
  })

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, animatedStyles]} />
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    borderRadius: 16,
    margin: 16,
  },
})

export default ListItem
