import React from 'react';
import BasicLayout from './layout/BasicLayout';
import Home from './pages/Home';
import Languages from './pages/Languages';
import { ViewState } from './core/enum';
import Translations from './pages/Translations';
import { message } from 'antd';
import loginLogo from "./assets/logo.png";
const pages = [
  {
    key: 'home',
    component: Home
  },
  {
    key: 'languages',
    component: Languages
  },
  {
    key: 'translations',
    component: Translations,
    componentProps: { mainText: 'This is main text for component' }
  }
];
const menuItems = [
  {
    key: 'home',
    value: 'Home',
    icon: 'home',
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
        rules: {
          myButton: ViewState.DISABLED
        }
      },
      {
        key: 'translations',
        icon: 'read',
        value: 'Translations',
      }
    ]
  }
];
const applicationName = "Management App";
class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      user:null,
      dropdownItems:[],
      authenticated:false
    }
  }


  onLogin=credentials=>{
    console.log(credentials);
    if (credentials.username==='user'&&credentials.password==='user'){
      this.setState({
        user:{
          firstName: 'Djordje',
          lastName: 'Turjacanin'
        },
        dropdownItems:[
          { key: 'logout', icon: 'logout', value: 'Logout', callback: () => this.setState({authenticated:false}) }
        ],
        authenticated:true
      });
      message.success('Login successful.');
    }else{
      message.error('Wrong credentials. Please try again.');
    }
  };

  
  onLogout=()=>{
    this.setState({authenticated:false,dropdownItems:[],user:null});
  }

  render() {
    const {dropdownItems,user,authenticated}=this.state;
    return (
      <BasicLayout
        applicationName={applicationName}
        menuItems={menuItems}
        pages={pages}
        dropdownItems={dropdownItems}
        user={user}
        headerComponents={<span>Hello </span>}
        authenticated={authenticated}
        onLogin={this.onLogin}
        loginLogo={loginLogo}
        //loginLogoStyle={{top:0,right:0}}
        //footerStyle={{ textAlign: 'center' }}
        //footer={<div>This is footer</div>}
        // forbidden={Forbidden}
        // notFound={NotFound}
      />
    );
  }
}

export default App;
