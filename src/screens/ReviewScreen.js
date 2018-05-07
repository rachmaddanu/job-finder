import React, { Component } from 'react';
import { ScrollView, Text, View, Linking } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

import * as actions from './../actions';

class ReviewScreen extends Component {
	//static is the class property, not instance property
	//static is ReviewScreen configurations
   static navigationOptions = ({ navigation }) => {
		return {
			title: 'Review Jobs',
			headerTitleStyle: {
				alignSelf: 'center'
			},
			headerRight: (
				<Button
					title='Setting'
					backgroundColor='rgba(0,0,0,0)'
					color='rgba(0, 122, 255, 1)'
					onPress={() => navigation.navigate('setting')}
				/>
			)
		};
   }

   onButtonPress = (url) => {
      Linking.openURL(url);
      // this.props.navigation.navigate('web', { url });
   }

   renderJobs() {
      return this.props.likedJobs.map((job, index) => {
         return (
            <Card key={index} title={job.jobtitle}>
               <View style={{ height: 300 }}>
                  <MapView
                     scrollEnabled={false}
                     style={{ flex: 1 }}
                     cacheEnabled
                     initialRegion={{
                        latitude: job.latitude,
                        longitude: job.longitude,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.04
                     }}
                  />
               </View>

               <View style={styles.detailContainer}>
                  <Text style={styles.textStyle}>{job.company}</Text>
                  <Text style={styles.textStyle}>{job.formattedRelativeTime}</Text>
               </View>

               <Text>
                  {job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
               </Text>

               <Button
                  buttonStyle={styles.buttonStyle}
                  title='Apply'
                  backgroundColor='rgba(0, 122, 255, 1)'
                  onPress={this.onButtonPress.bind(this, job.url)}
               />
            </Card>
         );
      });
   }

   render() {
      return (
         <ScrollView>
            {this.renderJobs()}
         </ScrollView>
      );
   }
}

const styles = {
   detailContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
      marginTop: 10
   },
   textStyle: {
      fontWeight: 'bold'
   },
   buttonStyle: {
      marginTop: 10
   }
};

const mapStateToProps = (state) => {
   return {
      likedJobs: state.likedJobs
   };
};

export default connect(mapStateToProps, actions)(ReviewScreen);
