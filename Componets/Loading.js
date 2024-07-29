import {Dimensions, View} from 'react-native';
import * as Progress from 'react-native-progress';

const {width, height} = Dimensions.get('window');
const LoadingComponent = () => {
  return (
    <View
      style={{
        height,
        width,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1,
      }}>
      <Progress.CircleSnail
        thickness={12}
        size={90}
        indeterminate={true}
        color={'#FFA823'}
      />
    </View>
  );
};

export default LoadingComponent;
