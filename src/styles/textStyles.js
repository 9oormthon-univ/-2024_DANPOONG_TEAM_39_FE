import { StyleSheet } from 'react-native';
import fonts from './fonts';

export default StyleSheet.create({
  // Title
  title18Bold: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 22,
  },
  title18SemiBold: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    lineHeight: 22,
  },
  title16SemiBold: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    lineHeight: 19,
  },
  title14Bold: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 21,
  },

  // Subtitle
  subtitle14SemiBold24: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    lineHeight: 24,
  },
  subtitle14SemiBold16: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    lineHeight: 16,
  },
  subtitle12Medium14: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 14,
  },
  subtitle12Bold14: {
    fontFamily: fonts.bold,
    fontSize: 12,
    lineHeight: 14,
  },

  // Body
  body12Medium: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 14,
  },

  // Caption
  caption11Medium: {
    fontFamily: fonts.medium,
    fontSize: 11,
    lineHeight: 13,
  },
});
