import React, { Component } from 'react';
import { AsyncStorage, View, ActivityIndicator, FlatList, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

import Slides from './../components/Slides';


const SCREEN_WIDTH = Dimensions.get('window').width;

const SLIDE_DATA = [
    { id: 1, text: 'Welcome to Jobs App', color: '#03A9F4' }
    // { id: 2, text: 'set your position on the map, and ...', color: '#009688' },
    // { id: 3, text: 'catch your dream', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
    state = {
        token: null
    };

    async componentWillMount() {
       const token = await AsyncStorage.getItem('fb_token');
        
       if (token) {
            this.props.navigation.navigate('map');
       } else {
           this.setState({ token: false });
       }
    }

    onButtonPressed() {
        this.props.navigation.navigate('auth');
    }

    renderButton(index) {
        if (index === SLIDE_DATA.length) {
            return (
                <View style={{ marginTop: 5, width: SCREEN_WIDTH }}>
                    <Button
                        borderRadius={5}
                        title='Go !'
                        backgroundColor='white'
                        color='rgba(0,122,255,1)'  
                        textStyle={{ fontSize: 20, fontWeight: '600' }} 
                        onPress={this.onButtonPressed.bind(this)}                         
                    />
                </View>
            );
        }
    }

    render() {
        if (this.state.token === null) { //jalan ketika awal sekali, belom ada token yang masuk
            return ( 
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size='large' />
                </View>
            );
        }
        return (        
                <FlatList
                    horizontal
                    pagingEnabled
                    data={SLIDE_DATA}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ ...styles.viewStyles, backgroundColor: item.color }}>
                                <Text style={styles.textStyles}>{item.text}</Text>
                                {this.renderButton(item.id)}
                            </View>
                        );
                    }}
                    keyExtractor={item => item.id}
                />
            // <Slides data={SLIDE_DATA} buttonPressed={this.onButtonPressed.bind(this)} />       
        );
    }
}

const styles = {
    textStyles: {
        fontSize: 25,
        textAlign: 'center',
        color: 'white'
    },
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH
    }
};

export default WelcomeScreen;
