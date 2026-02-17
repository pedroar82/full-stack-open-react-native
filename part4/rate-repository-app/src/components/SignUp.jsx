import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-native'
import useSignUp from '../hooks/useSignUp'
import useSignIn from '../hooks/useSignIn'
import useAuthStorage from '../hooks/useAuthStorage'
import { useApolloClient } from '@apollo/client'
import theme from '../../theme'

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

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
})

const SignUp = () => {
  const [signUp] = useSignUp()
  const [signIn] = useSignIn()
  const navigate = useNavigate()
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const handleSubmit = async (values) => {
    const { username, password } = values
    try {
      await signUp({ username, password })
      const data = await signIn({ username, password })
      await authStorage.setAccessToken(data.authenticate.accessToken)
      await apolloClient.resetStore()
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
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
        <Text style={styles.errorText}>{formik.errors.username}</Text>
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
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}

      <TextInput
        placeholder="Password confirmation"
        secureTextEntry
        style={[
          styles.input,
          formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation &&
            styles.inputError,
        ]}
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
        testID="passwordConfirmationField"
      />
      {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation && (
          <Text style={styles.errorText}>
            {formik.errors.passwordConfirmation}
          </Text>
        )}

      <Pressable
        style={styles.button}
        onPress={formik.handleSubmit}
        testID="submitButton"
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  )
}

export default SignUp
