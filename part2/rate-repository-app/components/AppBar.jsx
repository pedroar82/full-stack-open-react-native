import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from "react-router-native";
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    gap: 20
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
      <ScrollView horizontal>
        <Pressable style={styles.tab}>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
          <Link to="/signin">
            <Text style={styles.text}>Sign In</Text>
          </Link>
        </Pressable>
      </ScrollView>
    </View>
  )
}

export default AppBar;