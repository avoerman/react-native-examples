import React from "react";

import { StackNavigator } from "react-navigation";
import FeedsList from "./screens/FeedsList";
import FeedDetail from "./screens/FeedDetail";
import EntryDetail from "./screens/EntryDetail";
import AddFeed from "./screens/AddFeed";
import store from "./store";

const Navigator = StackNavigator({
  FeedsList: { screen: FeedsList },
  FeedDetail: { screen: FeedDetail },
  EntryDetail: { screen: EntryDetail },
  AddFeed: { screen: AddFeed }
});

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <Navigator screenProps={{ store }} />;
  }
}
