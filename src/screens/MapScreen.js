import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MapView, Permissions } from 'expo';
import { Button, FormInput, FormLabel } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from './../actions';

class MapScreen extends Component {
    state={
        region: {
            longitude: 106.625,
            latitude: -6.241207,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
        },
        keyword: '',
        locationGranted: false
    }

    async componentDidMount() {
       const result = await Permissions.askAsync(Permissions.LOCATION);

       if (result.status === 'granted') {
           this.setState({ locationGranted: true });
       }
    }

    onRegionChangeComplete(region) {
        this.setState({ region });
    }

    onChangeText(text) {
        this.setState({ keyword: text });
    }

    buttonPress() {
        this.props.fetchJobs(
            this.state.region, this.state.keyword, () => {
                this.props.navigation.navigate('deck');
            });
    }

    render() {
        if (!this.state.locationGranted) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Permissions not Granted</Text>
                </View>
            );
        }

        return (
        <View style={{ flex: 1 }}>
            <MapView 
                style={{ flex: 1 }}
                region={this.state.region}
                onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
            >

                <MapView.Marker
                    coordinate={this.state.region}
                    title='Your Position'
                    description='your current position'
                />
            </MapView>

            <View style={styles.formInputContainer}>
                <FormLabel>Search Your Job Position</FormLabel>
                <FormInput
                    onChangeText={this.onChangeText.bind(this)}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title='Set My Location'
                    Large
                    backgroundColor='#009688'
                    icon={{ name: 'search' }}
                    onPress={this.buttonPress.bind(this)}
                />
            </View>
        </View>
        );
    }
}

const styles = {
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20
    },
    formInputContainer: {
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,0.8)',
        top: 20,
        left: 40,
        right: 40
    }
};

export default connect(null, actions)(MapScreen);
