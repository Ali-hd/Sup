import React, {useEffect} from 'react';
import {YellowBox} from 'react-native';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider as PaperProvider} from 'react-native-paper';
import Navigator, {NavigationService} from './navigation/Navigator';
import {store, persistor} from './store/configureStore';
import ThemeProvider from './contexts/theme/provider';
import ProgressBarProvider from './contexts/progress-bar/provider';
import UploadDialog from './screens/ChatUI/UploadDialog';
import MenuProvider from './contexts/menu/provider';

const App = () => {
  useEffect(() => {
    console.disableYellowBox = true;
    YellowBox.ignoreWarnings(['deprecated', 'Require cycle']);
  }, []);

  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <PaperProvider>
          <ProgressBarProvider>
            <MenuProvider>
              <PersistGate loading={null} persistor={persistor}>
                <Navigator
                  ref={(navigatorRef: any) => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                  }}
                />
                <UploadDialog />
              </PersistGate>
            </MenuProvider>
          </ProgressBarProvider>
        </PaperProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default App;
