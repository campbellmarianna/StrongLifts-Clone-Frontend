import React from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      base_url: 'https://workout-clone-mc.herokuapp.com/',
    };
  }

  componentDidMount() {
    this.fetchDataFromApi();
  }

  fetchDataFromApi = () => {
    const url = 'https://workout-clone-mc.herokuapp.com/api/rep.json';

    this.setState({ loading: true });

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          data: res,
          error: null,
          loading: false,
          refreshing: false,
        });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this.fetchDataFromApi();
      },
    );
  };

  renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: '86%',
        backgroundColor: '#CED0CE',
        marginLeft: '14%',
        marginTop: '3%',
      }}
    />
  );

  //     keyExtractor = (item, index) => index.toString()

  //     renderItem = ({ item }) => (
  //         here
  //         <ListItem
  //             title={item.name}
  //             subtitle={item.subtitle}
  //             leftAvatar={{ source: { uri: item.avatar_url } }}
  //             bottomDivider
  //             chevron
  //         />
  // )

  renderHeader = () => <SearchBar placeholder="Type Here..." lightTheme round />;

  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={({ item }) => (
          <ListItem
            onPress={() => this.props.navigation.navigate('Detail', {
              id: `Workout ${item.id}`,
              exercise_name: `${item.exercise_name}`,
              weight: `${item.weight}`,
            })}
            title={`Workout ${item.id}`}
            titleStyle={{ fontSize: 16 }}
            titleContainerStyle={{ marginLeft: 120 }}
            subtitle={(
              <View style={styles.subtitleView}>
                <Text style={styles.exerciseText}>{item.exercise_name}</Text>
                <Text style={styles.weightText}>{item.weight}</Text>
              </View>
            )}
            containerStyle={{ borderBottomWidth: 0, marginBottom: 20 }}
          />
        )}
        keyExtractor={(item) => item.toString()}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitleView: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingTop: 5,
    marginLeft: 110,
  },
  exerciseText: {
    paddingLeft: 10,
    color: 'grey',
  },
  weightText: {
    paddingLeft: 10,
    color: 'grey',
    marginTop: 6,
    fontSize: 12,
  },
  titleText: {
    fontWeight: 'bold',
  },
  restaurantImage: {
    width: 600,
    height: 800,
  },
});
