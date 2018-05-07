import React, { Component } from 'react';
import { Text, ScrollView, View, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
    renderButton(index) {
        if (index === this.props.data.length - 1) {
            return (
                <View style={{ marginTop: 5 }}>
                    <Button
                        title='Go !'
                        backgroundColor='white'
                        color='rgba(0,122,255,1)'  
                        textStyle={{ fontSize: 20, fontWeight: '600' }} 
                        onPress={this.props.buttonPressed}                         
                    />
                </View>
            );
        }
    }
    renderSlides() {
        return this.props.data.map((slide, index) => {       
            return (
                <View style={{ ...styles.viewStyles, backgroundColor: slide.color }}>
                    <Text style={styles.textStyles}>{slide.text}</Text>
                    {this.renderButton(index)}
                </View>
            );
        });
    }

    render() {
        return (
            <ScrollView 
                // horizontal
                pagingEnabled
                style={{
                    flex: 1,
                }}
            >
                {this.renderSlides()}
            </ScrollView>
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

export default Slides;