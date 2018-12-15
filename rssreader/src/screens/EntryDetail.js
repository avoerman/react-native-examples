import React from "react";

import { WebView } from "react-native";

export default class EntryDetail extends React.Component {
  render() {
    const entry = this.props.screenProps.store.selectedEntry;
    return <WebView source={{ uri: entry.link.href || entry.link }} />;
  }
}
