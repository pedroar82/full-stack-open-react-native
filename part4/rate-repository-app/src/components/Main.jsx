import { Route, Routes, Navigate } from 'react-router-native';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList'
import RepositorySingleItem from './RepositorySingleItem';
import AppBar from './AppBar';
import SignIn from './SignIn';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import MyReview from './MyReview';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/creview" element={<CreateReview />} />
        <Route path="/myreviews" element={<MyReview />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/:id" element={<RepositorySingleItem />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  )
}

export default Main;