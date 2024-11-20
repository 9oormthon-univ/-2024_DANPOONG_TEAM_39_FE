const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// 기본 Metro 설정 가져오기
const defaultConfig = getDefaultConfig(__dirname);

// 사용자 정의 설정
const config = {
  transformer: {
    // SVG 파일 변환을 위해 react-native-svg-transformer 사용
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    // SVG 파일을 asset 대신 컴포넌트로 로드
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
