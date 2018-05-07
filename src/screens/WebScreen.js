import React, { Component } from 'react';
import { View, WebView, ActivityIndicator } from 'react-native';

class WebScreen extends Component {
   state = {
      isLoading: true
   }

   renderLoading() {
      return (
         <ActivityIndicator
         size='large'
         style={{ position: 'absolute', top: 10, left: 10, right: 10 }}
         />
      );
   }

   render() {
      return (
         <View style={{ flex: 1 }}>
            <WebView
               source={{ uri: this.props.navigation.state.params.url }}
               // renderLoading={this.renderLoading.bind(this)}
               // startInLoadingState
            />
         </View>
      );
   }
}

export default WebScreen;