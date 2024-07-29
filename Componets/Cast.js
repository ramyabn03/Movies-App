import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {image185} from '../Api/movieDb';
import { fallBackProfileImage } from '../constants';

const Cast = ({cast, navigation}) => {

  return (
    <View style={styles.castContainer}>
      <Text style={styles.topcastTitle}>Top Cast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cast &&
          cast?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.castView}
                onPress={() => navigation.navigate('Person', item)}>
                <View style={styles.imageStyle}>
                  <Image
                    source={{
                      uri: image185(item?.profile_path) || fallBackProfileImage,
                    }}
                    style={{width: 82, height: 90, borderRadius: 10}}
                  />
                </View>
                <Text style={{color: 'white', textAlign: 'center'}}>
                  {item?.character?.length > 8
                    ? `${item?.character?.slice(0, 8)}...`
                    : item?.character}
                </Text>
                <Text style={{color: '#999', textAlign: 'center'}}>
                  {item?.original_name?.length > 8
                    ? `${item?.original_name?.slice(0, 8)}...`
                    : item?.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;

const styles = StyleSheet.create({
  castContainer: {
    marginHorizontal: 10,
  },
  topcastTitle: {
    fontSize: 17,
    color: '#C7C8CC',
    fontWeight: 'bold',
    paddingVertical: 15,
  },
  castView: {
    marginRight: 10,
  },
  imageStyle: {
    overflow: 'hidden',
    height: 85,
    width: 85,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#999',
  },
});
