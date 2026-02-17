import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from "react-router-native";
import theme from '../../theme';
import useMe from '../hooks/useMe';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from "react-router-native";

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

  const { user } = useMe();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await authStorage.removeAccessToken(); 
    apolloClient.resetStore();
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable style={styles.tab}>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
          {user && (
            <Link to="/creview">
              <Text style={styles.text}>Create Review</Text>
            </Link>
          )}
          {!user && (
            <Link to="/signup">
              <Text style={styles.text}>Sign Up</Text>
            </Link>
          )}
          {user ? (
            <Pressable onPress={handleSignOut}>
              <Text style={styles.text}>Sign out</Text>
            </Pressable>
          ) : (
            <Link to="/signin">
              <Text style={styles.text}>Sign In</Text>
            </Link>
          )}
        </Pressable>
      </ScrollView>
    </View>
  )
}

export default AppBar;