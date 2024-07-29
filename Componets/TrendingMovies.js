import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {image500} from '../Api/movieDb';

var {width, height} = Dimensions.get('window');

const MovieCard = ({item, handleClick}) => {
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <Image
        source={{
          uri: image500(item?.poster_path),
        }}
        style={{width: width * 0.6, height: height * 0.4, borderRadius: 10}}
      />
    </TouchableWithoutFeedback>
  );
};

const TrendingMovies = ({data}) => {
  const navigation = useNavigation();

  const handleClick = item => {
    navigation.navigate('Movie', item);
  };

  return (
    <View>
      <Text style={styles.textSubHeading}>Trending</Text>
      <Carousel
        data={data}
        renderItem={({item}) => (
          <MovieCard item={item} handleClick={() => handleClick(item)} />
        )}
        sliderWidth={width}
        itemWidth={width * 0.6}
        inactiveSlideOpacity={0.4}
        slideStyle={{display: 'flex', alignItems: 'center'}}
        firstItem={1}
      />
    </View>
  );
};

export default TrendingMovies;

export const styles = StyleSheet.create({
  textSubHeading: {
    fontSize: 24,
    color: 'white',
    paddingBottom: 15,
    paddingLeft: 5,
  },
  seeAllText: {
    fontSize: 19,
    color: '#FFA823',
  },
});
