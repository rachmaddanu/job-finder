import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import * as actions from './../actions';

class AuthScreen extends Component {
    componentDidMount() {
        this.login();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.token) {
            this.props.navigation.navigate('map');
        }
    }

    login() {
        this.props.facebookLogin();
    }

    render() {
        return (
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1
                }}
            >
                <Button
                    title='Login with Facebook'
                    backgroundColor='#03A9F4'
                    color='white'
                    borderRadius={5}
                    onPress={this.login.bind(this)}
                />
            </View>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        token: auth.token
    };
};

export default connect(mapStateToProps, actions)(AuthScreen);
