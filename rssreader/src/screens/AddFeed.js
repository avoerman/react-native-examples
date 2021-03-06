import React from "react";

import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text
} from "native-base";
import { Alert, ActivityIndicator } from "react-native";
import { addFeed, fetchFeed } from "../actions";

export default class AddFeed extends React.Component {
  static navigationOptions = {
    title: "Add feed"
  };

  state = {
    url: "",
    loading: false
  };

  handleAddPress = () => {
    if (this.state.url.length > 0) {
      this.setState({ loading: true });
      fetchFeed(this.state.url)
        .then(feed => {
          addFeed(this.state.url, feed);
          this.setState({ loading: false });
          this.props.navigation.goBack();
        })
        .catch(() => {
          Alert.alert("No ress feeds found with that url");
          this.setState({ loading: false });
        });
    }
  };

  render() {
    return (
      <Container style={{ padding: 10 }}>
        <Content>
          <Form>
            <Item>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="feed url"
                onChangeText={url => this.setState({ url })}
              />
            </Item>
            <Button
              block
              style={{ marginTop: 20 }}
              onPress={this.handleAddPress}
            >
              {this.state.loading && (
                <ActivityIndicator color="white" style={{ margin: 10 }} />
              )}
              <Text>Add</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
