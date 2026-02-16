import { View, StyleSheet,  Image } from 'react-native'
import Text from './Text';
import theme from '../../theme';

  const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 4,
    backgroundColor: 'white',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
    paddingLeft: 20,
    paddingBottom: 10,
    flex: 1,
  },
  fulName: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    paddingBottom: 10,
    
  },
  desc: {
    fontWeight: theme.fontWeights.normal,
    color: theme.colors.textSecondary, 
    paddingBottom: 10,
  },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  stats: {
    width: '25%',
    textAlign: 'center',
    fontWeight: theme.fontWeights.bold,
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  statsDesc: {
    width: '25%',
    fontWeight: theme.fontWeights.normal,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});

const RepositoryItem = ({ item }) => {
  const thousandsFormat = (value) => {
    return value <= 1000 ? value : `${value / 1000}k`
  }

  return (
    <View style={theme.content} testID="repositoryItem">
      <View style={styles.row}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: item.ownerAvatarUrl,
          }}
        />
        <View style={styles.col}>
          <Text style={styles.fulName}>{item.fullName}</Text>
          <Text style={styles.desc}>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.stats} >
          {thousandsFormat(item.stargazersCount)}
        </Text>
        <Text style={styles.stats}>{thousandsFormat(item.forksCount)}</Text>
        <Text style={styles.stats}>{item.reviewCount}</Text>
        <Text style={styles.stats}>{item.ratingAverage}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.statsDesc}>Stars</Text>
        <Text style={styles.statsDesc}>Forks</Text>
        <Text style={styles.statsDesc}>Reviews</Text>
        <Text style={styles.statsDesc}>Rating</Text>
      </View>
    </View>
  )
}

export default RepositoryItem
