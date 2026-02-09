import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    gap: 10
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
      <Pressable style={styles.tab}>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        <Link to="/signin">
          <Text style={styles.text}>Sign In</Text>
        </Link>
      </Pressable>
    </View>
  )
}

export default AppBar;