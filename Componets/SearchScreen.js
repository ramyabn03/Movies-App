import {useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {XMarkIcon} from 'react-native-heroicons/solid';
import LoadingComponent from './Loading';
import {debounce} from 'lodash';
import {fetchSearchedMovies, image500} from '../Api/movieDb';

var {height, width} = Dimensions.get('window');
const SearchScreen = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const navigation = useNavigation();
  const handleSearch = value => {
    if (value && value?.length > 2) {
      setIsloading(true);
      fetchSearchedMovies({
        query: value,
        include_adult: false,
        language: 'en-US',
        page: 1,
      }).then(data => {
        setIsloading(false);
        setResults(data?.results);
      });
    } else {
      setIsloading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView style={styles.homeContainer}>
      <View style={styles.SearchBox}>
        <TextInput
          onChangeText={handleTextDebounce}
          style={styles.InputText}
          placeholder="Search Movie"
          placeholderTextColor="#C7C8CC"
        />
        <TouchableOpacity
          style={styles.iconBackground}
          onPress={() => navigation.navigate('Home')}>
          <XMarkIcon size={32} strokeWidth={2} color={'#fff'} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <LoadingComponent />
      ) : results?.length ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 10}}
          style={{marginHorizontal: 10}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              marginVertical: 15,
            }}>
            Results ({results?.length})
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              columnGap: 10,
              rowGap: 20,
            }}>
            {results?.map((result, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => navigation.push('Movie', result)}>
                  <Image
                    source={{
                      uri: image500(result?.poster_path),
                    }}
                    style={{
                      width: width * 0.43,
                      height: height * 0.3,
                      borderRadius: 10,
                    }}
                  />
                  <Text style={styles.movieTitle}>
                    {result?.title?.length > 18
                      ? `${result?.title?.slice(0, 18)}...`
                      : result?.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            height,
            width,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: -1,
          }}>
          <Image
            source={{
              uri: 'https://electronicspices.com/uploads/assets/search-result-not-found.webp',
            }}
            style={{
              width: width,
              height: height * 0.3,
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  SearchBox: {
    borderColor: '#C7C8CC',
    borderWidth: 1,
    borderRadius: 50,
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 65,
  },
  InputText: {
    color: '#fff',
    fontSize: 20,
    paddingLeft: 23,
    width: '80%',
    height: 60,
  },
  iconBackground: {
    backgroundColor: 'grey',
    color: '#fff',
    padding: 11,
    borderRadius: 50,
    marginRight: 4,
  },
  movieTitle: {
    fontSize: 16,
    color: '#C7C8CC',
    textAlign: 'center',
    marginTop: 5,
  },
});
