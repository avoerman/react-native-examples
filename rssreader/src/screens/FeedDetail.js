import React from "react";

import { ActivityIndicator } from "react-native";
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Icon,
  Button
} from "native-base";
import { observer } from "mobx-react/native";
import { fetchFeed, removeFeed, selectEntry } from "../actions";

@observer
export default class FeedDetail extends React.Component {
  state = {
    loading: false,
    entry: null
  };

  static navigationOptions = props => ({
    title: props.screenProps.store.selectedFeed.title,
    headerRight: (
      <Button
        transparent
        onPress={() => {
          removeFeed(props.navigation.state.params.feedUrl);
          props.navigation.goBack();
        }}
      >
        <Icon name="trash" />
      </Button>
    )
  });

  componentWillMount() {
    this.setState({ loading: true });
    fetchFeed(this.props.screenProps.store.selectedFeed.url).then(feed => {
      this.setState({
        loading: false,
        entry: feed.entry
      });
    });
  }

  handleEntryPress = entry => {
    selectEntry(entry);
    this.props.navigation.navigate("EntryDetail");
  };

  render() {
    const { entry } = this.state;

    return (
      <Container>
        <Content>
          {this.state.loading && <ActivityIndicator style={{ margin: 20 }} />}
          <List>
            {entry &&
              entry.map &&
              entry.map((val, i) => (
                <ListItem key={i} onPress={() => this.handleEntryPress(val)}>
                  <Text>{val.title}</Text>
                </ListItem>
              ))}
          </List>
        </Content>
      </Container>
    );
  }
}
