import { StatusBar } from 'expo-status-bar'
import { FlatList, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import ListItem from './components/list-item'

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />

        <GestureHandlerRootView>
          <FlatList data={data} renderItem={() => <ListItem />} />
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
})
