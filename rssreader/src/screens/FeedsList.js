import React from "react";
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Button,
  Icon,
  View
} from "native-base";
import { observer } from "mobx-react/native";
import { selectFeed } from "../actions";
import { removeAllFeeds } from "../actions";

@observer
export default class FeedsList extends React.Component {
  static navigationOptions = props => ({
    title: "My Feeds",
    headerRight: (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Button
          transparent
          style={{ flex: 1 }}
          onPress={() => removeAllFeeds()}
        >
          <Icon name="remove" />
        </Button>
        <Button
          transparent
          style={{ flex: 1 }}
          onPress={() => props.navigation.navigate("AddFeed")}
        >
          <Icon name="add" />
        </Button>
      </View>
    )
  });

  handleFeedPress = feed => {
    selectFeed(feed);
    this.props.navigation.navigate("FeedDetail", { feedUrl: feed.url });
  };

  render() {
    const { feeds } = this.props.screenProps.store;

    return (
      <Container>
        <Content>
          {feeds && feeds.length > 0 ? (
            <List>
              {feeds.map((f, i) => (
                <ListItem key={i} onPress={() => this.handleFeedPress(f)}>
                  <Text>{f.title}</Text>
                </ListItem>
              ))}
            </List>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ marginTop: 20 }}>No feeds added yet</Text>
            </View>
          )}
        </Content>
      </Container>
    );
  }
}
