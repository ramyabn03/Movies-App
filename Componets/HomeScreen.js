import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/solid';
import TrendingMovies from './TrendingMovies';
import {useEffect, useState} from 'react';
import MovieList from './MovieList';
import {useNavigation} from '@react-navigation/native';
import LoadingComponent from './Loading';
import {fetchTrendingMovies} from '../Api/movieDb';

const HomeScreen = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpComingMovies();
    getTopMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) {
      setTrendingMovies(data.results);
    }
    setIsLoading(false);
  };

  const getUpComingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) {
      setUpcomingMovies(data.results);
    }
    setIsLoading(false);
  };

  const getTopMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) {
      setTopMovies(data.results);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.homeContainer}>
      {/* Search bar and Log */}
      <SafeAreaView>
        <StatusBar style="light" />
        <View style={styles.header}>
          {/* <Bars3CenterLeftIcon
            size={34}
            strokeWidth={2}
            color={'#fff'}
          /> */}
          <Text style={{marginRight: 10}}></Text>
          <Text style={styles.headerText}>
            <Text style={{color: '#FFA823'}}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size={32} strokeWidth={2} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <ScrollView
          style={{marginTop: 20}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10}}>
          {/* Trending Movies Carousel */}
          {trendingMovies?.length > 0 && (
            <TrendingMovies data={trendingMovies} />
          )}

          {/* Upcoming Movie List */}
          <MovieList title="Upcoming" data={upcomingMovies} />

          {/* Top Rated Movies List */}
          <MovieList title="Top Rated" data={topMovies} />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  headerText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
