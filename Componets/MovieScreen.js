import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ChevronLeftIcon, HeartIcon} from 'react-native-heroicons/solid';
import LinearGradient from 'react-native-linear-gradient';
import Cast from './Cast';
import MovieList from './MovieList';
import LoadingComponent from './Loading';
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from '../Api/movieDb';
import {fallBackMoviePoster} from '../constants';

var {width, height} = Dimensions.get('window');

const MovieScreen = () => {
  const {params: item} = useRoute();
  const [favourite, setFavourite] = useState(false);
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getMovieDetails(item?.id);
    getMovieCredits(item?.id);
    getSimilarMovies(item?.id);
  }, [item]);

  const getMovieDetails = async id => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);

    setIsLoading(false);
  };

  const getMovieCredits = async id => {
    const data = await fetchMovieCredits(id);
    if (data && data?.cast) setCast(data?.cast);
    setIsLoading(false);
  };

  const getSimilarMovies = async id => {
    const data = await fetchSimilarMovies(id);
    if (data && data?.results) setSimilarMovies(data?.results);
    setIsLoading(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 20}}
      style={styles.movieScreen}>
      <View>
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
            <ImageBackground
              style={{
                width: width,
                height: height * 0.55,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
              source={{
                uri: image500(movie?.poster_path) || fallBackMoviePoster,
              }}>
              <LinearGradient
                colors={['#00000000', '#000000']}
                style={{height: '100%', width: '100%'}}></LinearGradient>
            </ImageBackground>
          </View>
        )}

        {/* Movie Details */}
        <View style={{marginTop: -(height * 0.09)}}>
          <Text style={styles.movieTitle}>{movie?.title}</Text>
          <View style={styles.alignCenter}>
            <Text style={styles.greyText}>{movie?.status} · </Text>
            <Text style={styles.greyText}>
              {movie?.release_date?.split('-')[0]} ·{' '}
            </Text>
            <Text style={styles.greyText}>{movie?.runtime} min </Text>
          </View>
          <View style={styles.alignCenter}>
            {movie?.genres?.map((genre, index) => {
              const showDot = index + 1 !== movie?.genres?.length;
              return (
                <Text key={index} style={styles.greyText}>
                  {genre?.name} {showDot ? '·' : null}{' '}
                </Text>
              );
            })}
          </View>
        </View>
        <Text style={[styles.greyText, {marginTop: 10, marginHorizontal: 10}]}>
          {movie.overview}
        </Text>
      </View>
      {cast?.length ? <Cast cast={cast} navigation={navigation} /> : null}

      {similarMovies?.length ? (
        <MovieList
          title="Similar Movies"
          data={similarMovies}
          hideSeeAll={true}
        />
      ) : null}
    </ScrollView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  movieScreen: {
    flex: 1,
    backgroundColor: '#000',
  },
  backBtnContainer: {
    position: 'absolute',
    top: 10,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    width: width - 8,
  },
  backButton: {
    backgroundColor: '#FFA823',
    padding: 2,
    borderRadius: 5,
  },
  linearGradient: {
    flex: 1,
    zIndex: 999,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  alignCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
  },
  greyText: {
    color: '#999',
    fontSize: 15,
  },
});
