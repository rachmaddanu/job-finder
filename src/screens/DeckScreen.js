import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card } from 'react-native-elements';
import { MapView } from 'expo';

import * as actions from './../actions';

class DeckScreen extends Component {
   onButtonPress(job) {
      this.props.likeJob(job);
   }

   renderJobs() {
      // console.log(this.props.jobs);
      return this.props.jobs.map((job, index) => {
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
                  title='Like This Job'
                  backgroundColor='rgba(0, 122, 255, 1)'
                  onPress={this.onButtonPress.bind(this, job)}
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
      jobs: state.jobs.results
   };
};


export default connect(mapStateToProps, actions)(DeckScreen);