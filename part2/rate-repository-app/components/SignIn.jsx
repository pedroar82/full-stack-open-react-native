import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import * as yup from 'yup'
import theme from '../theme'

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

const SignIn = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
    },
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
      backgroundColor:  theme.colors.primary,
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

  const userNameError = formik.touched.username && formik.errors.username
  const passError = formik.touched.password && formik.errors.password

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        style={[styles.input, userNameError && styles.inputError]}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
      />
      {userNameError && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={[styles.input, passError && styles.inputError]}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {passError && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  )
}

export default SignIn
