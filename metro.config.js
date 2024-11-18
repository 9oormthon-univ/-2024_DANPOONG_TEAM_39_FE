const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {
  transformer: {
    // SVG 파일을 변환하기 위해 react-native-svg-transformer 사용
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    // SVG 파일을 asset 대신 컴포넌트로 로드
    assetExts: getDefaultConfig(__dirname).resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...getDefaultConfig(__dirname).resolver.sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
