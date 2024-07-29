import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ChevronLeftIcon, HeartIcon} from 'react-native-heroicons/solid';
import MovieList from './MovieList';
import LoadingComponent from './Loading';
import {fetchPersonDetails, fetchPersonMovies, image342} from '../Api/movieDb';
import {fallBackProfileImage} from '../constants';

var {height, width} = Dimensions.get('window');

const PersonScreen = () => {
  const {params: item} = useRoute();
  const navigation = useNavigation();
  const [favourite, setFavourite] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [personDetails, setPersonDetails] = useState({});

  useEffect(() => {
    setIsloading(true);
    getPersonDetails(item?.id);
    getPersonMovies(item?.id);
  }, [item]);

  const getPersonDetails = async id => {
    const data = await fetchPersonDetails(id);
    if (data) setPersonDetails(data);
    setIsloading(false);
  };

  const getPersonMovies = async id => {
    const data = await fetchPersonMovies(id);
    if (data && data?.cast) setPersonMovies(data?.cast);
    setIsloading(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 20}}
      style={styles.movieScreen}>
      <SafeAreaView style={styles.backBtnContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={28} strokeWidth={2.5} color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFavourite(!favourite)}>
          <HeartIcon
            size={35}
            strokeWidth={2}
            color={favourite ? '#E4003A' : '#fff'}
          />
        </TouchableOpacity>
      </SafeAreaView>

      {isLoading ? (
        <LoadingComponent />
      ) : (
        <View>
          <View style={styles.imageContainer}>
            <View style={styles.imageStyle}>
              <Image
                source={{
                  uri:
                    image342(personDetails?.profile_path) ||
                    fallBackProfileImage,
                }}
                style={{width: width * 0.74, height: height * 0.35}}
              />
            </View>
          </View>
          <Text style={styles.name}>{personDetails?.name}</Text>
          <Text style={styles.location}>{personDetails?.place_of_birth}</Text>
          <View style={styles.divider}>
            <View
              style={{
                borderColor: '#999',
                borderRightWidth: 2,
                paddingRight: 10,
              }}>
              <Text style={styles.dividerTitle}>Gender</Text>
              <Text style={styles.dividerDescription}>
                {personDetails?.gender === 1 ? 'Female' : 'Male'}
              </Text>
            </View>
            <View
              style={{
                borderColor: '#999',
                borderRightWidth: 2,
                paddingRight: 10,
              }}>
              <Text style={styles.dividerTitle}>Birthday</Text>
              <Text style={styles.dividerDescription}>
                {personDetails?.birthday}
              </Text>
            </View>
            <View
              style={{
                borderColor: '#999',
                borderRightWidth: 2,
                paddingRight: 10,
              }}>
              <Text style={styles.dividerTitle}>Know for</Text>
              <Text style={styles.dividerDescription}>
                {personDetails?.known_for_department}
              </Text>
            </View>
            <View>
              <Text style={styles.dividerTitle}>Popularity</Text>
              <Text style={styles.dividerDescription}>
                {personDetails?.popularity?.toFixed(2)} %
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.topcastTitle}>Biography</Text>
            <Text
              style={[styles.greyText, {marginTop: 10, marginHorizontal: 10}]}>
              {personDetails?.biography || 'N/A'}
            </Text>
          </View>
          <MovieList title="Movies" data={personMovies} hideSeeAll={true} />
        </View>
      )}
    </ScrollView>
  );
};

export default PersonScreen;

const styles = StyleSheet.create({
  movieScreen: {
    flex: 1,
    backgroundColor: '#000',
  },
  backBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  backButton: {
    backgroundColor: '#FFA823',
    padding: 2,
    borderRadius: 5,
  },
  imageContainer: {
    alignItems: 'center',
    shadowColor: '#C7C8CC',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 5,
  },
  imageStyle: {
    overflow: 'hidden',
    height: 250,
    width: 250,
    borderRadius: 250,
    borderWidth: 3,
    borderColor: '#C7C8CC',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 25,
  },
  location: {
    color: '#999',
    textAlign: 'center',
    marginTop: 6,
    fontSize: 17,
  },
  divider: {
    backgroundColor: '#333',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 50,
    margin: 15,
    paddingVertical: 18,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  dividerTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dividerDescription: {
    color: '#C7C8CC',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 2,
  },
  topcastTitle: {
    fontSize: 17,
    color: '#C7C8CC',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  greyText: {
    color: '#999',
    fontSize: 15,
  },
});
