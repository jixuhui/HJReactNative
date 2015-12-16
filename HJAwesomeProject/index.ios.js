/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;

var HJAwesomeProject = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },

  renderMovie: function(movie) {
    return (
      <View style={styles.container}>
      	<View style={styles.sonContainer}>
        	<Image
          	source={{uri: movie.posters.thumbnail}}
        	  style={styles.thumbnail}
        	/>
        	<View style={styles.rightSonContainer}>
        	  <Text style={styles.title}>{movie.title}</Text>
        	  <Text style={styles.year}>{movie.year}</Text>
        	</View>
        </View>
        <View 
        	style={styles.lineView}
        />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  sonContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  rightSonContainer: {
    flex: 3,
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    height: 70,
    marginLeft: 15,
    marginRight: 5,
    marginTop: 8,
    textAlign: 'left',
  },
  year: {
    fontSize: 11,
    marginLeft: 15,
    marginRight: 5,
    marginBottom: 8,
    textAlign: 'left',
  },
  thumbnail: {
    width: 53,
    height: 81,
    marginBottom: 8,
    marginTop: 8,
    marginLeft: 5,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  lineView: {
    marginLeft: 5,
    marginRight: 5,
		height: 1,
    backgroundColor: '#999999',
  },
});

AppRegistry.registerComponent('HJAwesomeProject', () => HJAwesomeProject);