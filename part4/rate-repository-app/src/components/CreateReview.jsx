import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native'
import { useNavigate } from 'react-router-native'
import { useFormik } from 'formik'
import * as yup from 'yup'
import theme from '../../theme'
import useCreateReview from '../hooks/useCreateReview'

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: 0,
  review: ''
}

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Owner Name is required'),
  repositoryName: yup.string().required(`Repository's name is required`),
  rating: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === '' ? undefined : value,
    )
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  review: yup.string().optional(),
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

const CreateReview = () => {
  const [createReview] = useCreateReview()
  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    const reviewData = {
      ...values,
      rating: Number(values.rating),
    }
    try {
      const data = await createReview(reviewData)

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
          formik.touched.ownerName &&
            formik.errors.ownerName &&
            styles.inputError,
        ]}
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        testID="ownerName"
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        placeholder="Repository Name"
        style={[
          styles.input,
          formik.touched.repositoryName &&
            formik.errors.repositoryName &&
            styles.inputError,
        ]}
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        testID="repositoryName"
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        placeholder="Rating between 0 and 100"
        keyboardType="numeric"
        style={[
          styles.input,
          formik.touched.rating && formik.errors.rating && styles.inputError,
        ]}
        value={formik.values.rating.toString()}
        onChangeText={formik.handleChange('rating')}
        testID="ratingField"
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}
      <TextInput
        placeholder="Review"
        multiline
        numberOfLines={4}
        style={[
          styles.input,
          styles.textArea,
          formik.touched.text && formik.errors.text && styles.inputError,
        ]}
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        textAlignVertical="top"
        testID="reviewField"
      />
      {formik.touched.text && formik.errors.text && (
        <Text style={styles.errorText}>{formik.errors.text}</Text>
      )}
      <Pressable
        style={styles.button}
        onPress={formik.handleSubmit}
        testID="submitButton"
      >
        <Text style={styles.buttonText}>Create a Review</Text>
      </Pressable>
    </View>
  )
}

export default CreateReview