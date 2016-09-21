import React from "react"
import { Text, View, Navigator, TouchableHighlight } from 'react-native'
import { connect } from "react-redux"

import LoginScreen from "./containers/LoginScreen"
import AppScene from "./containers/AppScene"

import routeNames from "./constants/routes"

class AppNavigatore extends React.Component{
  renderSceneWithRoute(route, navigator){
    if(route.name === "APP_SCENE"){
      return <AppScene navigator={navigator} {...this.props} />
    }else if(route.name === "LOGIN"){
      return <LoginScreen navigator={navigator} {...this.props} />
    }else{
      console.log("None of the route matched!")
    }
  }


  render() {
    return (
      <Navigator
        initialRoute={ {name: "LOGIN"} }
        renderScene={this.renderSceneWithRoute.bind(this)}
      />
    );
  }
}

export default AppNavigatore
