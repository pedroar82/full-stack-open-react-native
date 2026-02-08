import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.tab }>
        <Text style={styles.text}>Repositories</Text>
      </Pressable>
    </View>
  )
}

export default AppBar;