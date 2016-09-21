import React from "react"
import AppNavigator from "./AppNavigator";
import { Provider } from "react-redux"
import { Text, AppState, AsyncStorage, View } from "react-native"
import { applyMiddleware, createStore } from "redux"
import logger from "redux-logger"

const middleware = applyMiddleware(logger())
import reducers from "./reducers"

let store = createStore(reducers, middleware)}

function setup(){
  
  class Root extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        isStoreLoading: false,
        store: store
      }
    }

    componentWillMount() {
      var self = this;
      AppState.addEventListener('change', this._handleAppStateChange.bind(this));
      this.setState({isStoreLoading: true});
      AsyncStorage.getItem('completeStore').then((value)=>{
        if(value && value.length){
          let initialStore = JSON.parse(value)
          self.setState({store: createStore(reducers, initialStore, middleware)});
        }else{
          self.setState({store: store});
        }
        self.setState({isStoreLoading: false});
      }).catch((error)=>{
        self.setState({store: store});
        self.setState({isStoreLoading: false});
      })
    }
    componentWillUnmount() {
      AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
    }
    _handleAppStateChange(currentAppState) {
      let storingValue = JSON.stringify(this.state.store.getState())
      AsyncStorage.setItem('completeStore', storingValue);
    }

    render(){
      if(this.state.isStoreLoading){
        return <Text>Loading Store ...</Text>
      }else{
        return (
          <Provider store={this.state.store}>
            <AppNavigator />
          </Provider>
        )
      }
    }
  }
  return Root;
}

module.exports = setup;