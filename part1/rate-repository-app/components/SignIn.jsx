import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native'
import { useFormik } from 'formik'

const initialValues = {
  username: '',
  password: '',
}

const SignIn = () => {
  const formik = useFormik({
    initialValues,
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
      backgroundColor: '#0165D4',
      
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
  })

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  )
}

export default SignIn
