import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';
import theme from '../../theme'
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
    paddingLeft: 20,
    paddingBottom: 10,
    flex: 1,
  },
  fullName: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    paddingBottom: 10,
  },
  text: {
    fontWeight: theme.fontWeights.normal,
    fontSize: theme.fontSizes.body,
    paddingBottom: 10,
  },
  date: {
    width: '25%',
    fontWeight: theme.fontWeights.normal,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#0366d6',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0366d6',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  buttonViewRepo: {
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
    flex: 1,
  },
  buttonDelete: {
    flex: 1,
    backgroundColor: '#d73a4a',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    fontWeight: '700',
  },
})

const ReviewItem = ({ review, showButtons = false, refetch }) => {
  const navigate = useNavigate()
  const [deleteReview] = useDeleteReview()

  const handleViewRepository = () => {
    navigate(`/${review.repositoryId}`)
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteReview({ deleteReviewId: review.id })
              if (refetch) refetch()
            } catch (e) {
              console.log(e)
            }
          },
          style: 'destructive',
        },
      ],
    )
  }
  // Single review item
  return (
    <View style={{ backgroundColor: 'white', padding: 10 }}>
      <View style={styles.row}>
        <View style={styles.circle}>
          <Text style={styles.circleText}>{review.rating}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.fullName}>{review.user.username}</Text>
          <Text style={styles.date}>
            {format(new Date(review.createdAt), 'dd.MM.yyyy')}
          </Text>
          <Text style={styles.text}>{review.text}</Text>
        </View>
      </View>
      {showButtons && (
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.buttonViewRepo}
            onPress={handleViewRepository}
          >
            <Text style={styles.buttonText}>View repository</Text>
          </Pressable>
          <Pressable style={styles.buttonDelete} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete review</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default ReviewItem