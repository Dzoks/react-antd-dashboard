import React from 'react';
import BasicLayout from './layout/BasicLayout';
import Home from './pages/Home';
import Languages from './pages/Languages';
import { ViewState } from './core/enum';
import Translations from './pages/Translations';

function App() {
  const menuItems = [
    {
      key: 'home',
      value: 'Home',
      icon: 'home',
      component: Home,
      rules: {}
    },
    {
      key: 'localization',
      value: 'Localization',
      icon: 'zhihu',
      subItems: [
        {
          key: 'languages',
          icon: 'insurance',
          value: 'Languages',
          component: Languages,
          rules: {
            myButton: ViewState.DISABLED
          }
        },
        {
          key: 'translations',
          icon: 'read',
          value: 'Translations',
          component: Translations,
          componentProps: { mainText: 'This is main text for component' }
        }
      ]
    }
  ];
  const dropdownItems = [
    { key: 'settings', icon: 'setting', value: 'Settings', callback: () => alert('Settings') },
    { key: 'logout', icon: 'logout', value: 'Logout', callback: () => alert('Logout') }
  ];
  const applicationName = "Management Dashboard";
  const user = {
    firstName: 'Djordje',
    lastName: 'Turjacanin'
  };

  return (
    <BasicLayout
      applicationName={applicationName}
      menuItems={menuItems}
      dropdownItems={dropdownItems}
      user={user}
      //footerStyle={{ textAlign: 'center' }}
      //footer={<div>This is footer</div>}
      // forbidden={Forbidden}
      // notFound={NotFound}
    />
  );
}

export default App;
