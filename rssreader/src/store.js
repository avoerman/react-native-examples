import { observable } from "mobx";

import { AsyncStorage } from "react-native";

class Store {
  @observable
  feeds;

  @observable
  selectedFeed;

  @observable
  selectedEntry;

  constructor() {
    AsyncStorage.getItem("@feeds").then(sFeeds => {
      this.feeds = JSON.parse(sFeeds) || [];
    });
  }

  persistFeeds() {
    AsyncStorage.setItem("@feeds", JSON.stringify(this.feeds));
  }

  addFeed(url, feed) {
    this.feeds.push({
      url,
      entry: feed.entry,
      title: feed.title,
      updated: feed.updated
    });
    this.persistFeeds();
  }

  removeFeed(url) {
    this.feeds = this.feeds.filter(feed => feed.url !== url);
    this.persistFeeds();
  }

  removeAllFeeds() {
    this.feeds = [];
    this.persistFeeds();
  }

  selectFeed(feed) {
    this.selectedFeed = feed;
  }

  selectEntry(entry) {
    this.selectedEntry = entry;
  }
}

const store = new Store();

export default store;
