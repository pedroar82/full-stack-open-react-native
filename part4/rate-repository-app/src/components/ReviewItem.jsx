import { View, Text, StyleSheet } from 'react-native';
import theme from '../../theme'
import { format } from 'date-fns';

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
})

const ReviewItem = ({ review }) => {
  // Single review item
  return (
    <View style={{ backgroundColor: 'white', padding: 10 }}>
      <View style={styles.row}>
        <View style={styles.circle}>
            <Text style={styles.circleText}>{review.rating}</Text>
          </View>
        <View style={styles.col}>
          <Text style={styles.fullName}>{review.user.username}</Text>
           <Text style={styles.date}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
          <Text style={styles.text}>{review.text}</Text> 
        </View>
      </View>
    </View>
  )
};

export default ReviewItem