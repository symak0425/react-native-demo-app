import AppColors from './AppColors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: AppColors.background,
    marginBottom: 40,
  },
  rowContainer: {
    flexDirection: 'row',
    height: 70,
  },
  rowButton: {
    flexGrow: 1,
    flexBasis: 0,
    marginRight: 10,
    height: 50,
  },
  rowTextInput: {
    color: AppColors.darkText,
    backgroundColor: AppColors.background,
    marginVertical: 10,
    height: 50,
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 6,
    textAlign: 'center',
    marginLeft: 10,
    flexGrow: 1,
    flexBasis: 0,
    paddingVertical: 0,
    fontSize: 14,
  },
  rowLargeTextInput: {
    color: AppColors.darkText,
    backgroundColor: AppColors.background,
    marginVertical: 10,
    height: 300,
    borderColor: AppColors.mainBrand,
    borderWidth: 2,
    borderRadius: 6,
    paddingVertical: 0,
    textAlignVertical: 'top',
    fontSize: 14,
  },
  appButton: {
    marginVertical: 10,
    height: 50,
    justifyContent: 'center',
    backgroundColor: AppColors.mainBrand,
    borderRadius: 6,
  },
  appText: {
    color: AppColors.lightText,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 15,
  },
  configTextInput: {
    color: AppColors.darkText,
    backgroundColor: AppColors.background,
    marginStart: 16,
    marginEnd: 16,
    marginTop: 8,
    marginBottom: 8,
    paddingVertical: 0,
    height: 1000,
    fontSize: 14,
  },
  logsTextInput: {
    color: AppColors.darkText,
    backgroundColor: AppColors.background,
    marginStart: 16,
    marginEnd: 16,
    marginTop: 8,
    marginBottom: 8,
    paddingVertical: 0,
    fontSize: 14,
  },
  viewabilityContainer: {
    height: 40,
    backgroundColor: AppColors.secondaryBrand,
    paddingTop: 9,
  },
  elementsContainerView: {
    backgroundColor: AppColors.background,
    aspectRatio: 16 / 9,
  },
  playspaceContainerView: {
    backgroundColor: AppColors.background,
    aspectRatio: 4 / 3,
  },
});

export default styles;