import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native'
import { useNavigate } from 'react-router-native'
import { useFormik } from 'formik'
import * as yup from 'yup'
import theme from '../../theme'

import useSignIn from '../hooks/useSignIn'
import useAuthStorage from '../hooks/useAuthStorage'
import { useApolloClient } from '@apollo/client'

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

const styles = StyleSheet.create({
  container: { gap: 10, padding: 16, backgroundColor: 'white' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    fontWeight: '700',
  },
  inputError: {
    borderColor: '#d73a4a',
  },
})

export const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        style={[
          styles.input,
          formik.touched.username &&
            formik.errors.username &&
            styles.inputError,
        ]}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        testID="usernameField"
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={[
          styles.input,
          formik.touched.password &&
            formik.errors.password &&
            styles.inputError,
        ]}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        testID="passwordField"
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.password}</Text>
      )}
      <Pressable
        style={styles.button}
        onPress={formik.handleSubmit}
        testID="submitButton"
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const authStorage = useAuthStorage()
  const [signIn] = useSignIn()
  const apolloClient = useApolloClient()
  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    const { username, password } = values
    try {
      const data = await signIn({ username, password })
      await authStorage.setAccessToken(data.authenticate.accessToken)
      await apolloClient.resetStore()
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  return <SignInContainer onSubmit={handleSubmit} />
}

export default SignIn
