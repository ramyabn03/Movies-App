import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';
import {styles} from './TrendingMovies';
import {useNavigation} from '@react-navigation/native';
import {image185} from '../Api/movieDb';
import { fallBackMoviePoster } from '../constants';

var {width, height} = Dimensions.get('window');

const MovieList = ({title, data, hideSeeAll}) => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={ownstyles.container}>
        <Text style={ownstyles.textSubHeading}>{title}</Text>
        {!hideSeeAll ? (
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 10, marginBottom: 10}}>
        {data?.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push('Movie', item)}>
              <View style={ownstyles.upcomingContainer}>
                <Image
                  source={{
                    uri: image185(item?.poster_path) || fallBackMoviePoster,
                  }}
                  style={{
                    width: width * 0.33,
                    height: height * 0.22,
                    borderRadius: 10,
                  }}
                />
                <Text style={ownstyles.movieTitle}>
                  {item?.title?.length > 14
                    ? `${item?.title?.slice(0, 14)}...`
                    : item?.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};
export default MovieList;

const ownstyles = StyleSheet.create({
  container: {
    marginVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  upcomingContainer: {
    paddingRight: 12,
  },
  textSubHeading: {
    fontSize: 20,
    color: 'white',
    marginHorizontal: 10,
  },
  movieTitle: {
    fontSize: 16,
    color: '#C7C8CC',
    textAlign: 'center',
    marginTop: 5,
  },
});
