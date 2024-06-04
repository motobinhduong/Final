import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";

import { Card } from "../../components/Card";
import {Badge } from "../../components/Badge";
import {  Button } from "../../components/Button";
import { Block } from "../../components/Block";
import { Text } from "../../components/Text";

import { theme } from "../../constants/theme";
import { profile, mocks } from "../../constants/mocks";
const { width } = Dimensions.get("window");

class Browse extends Component {
  state = {
    active: "Products",
    categories: []
  };

  componentDidMount() {
    this.setState({ categories: this.props.categories });
  }

  handleTab = tab => {
    const { categories } = this.props;
    const filtered = categories.filter(category =>
      category.tags.includes(tab.toLowerCase())
    );

    this.setState({ active: tab, categories: filtered });
  };

  renderTab(tab) {
    const { active } = this.state;
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => this.handleTab(tab)}
        style={[styles.tab, isActive ? styles.active : null]}
      >
        <Text size={16} medium gray={!isActive} secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { profile, navigation } = this.props;
    
    const { categories } = this.state;
    const tabs = ["Products", "Inspirations", "Shop"];

    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Browse
          </Text>
          <Button onPress={() => navigation.navigate("Settings")}>
            <Image source={profile.avatar} style={styles.avatar} />
          </Button>
        </Block>

        <Block flex={false} row style={styles.tabs}>
          {tabs.map(tab => this.renderTab(tab))}
        </Block>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: 16 * 2 }}
        >
          <Block flex={false} row space="between" style={styles.categories}>
            {categories.map(category => (
              <TouchableOpacity
                key={category.name}
                onPress={() => navigation.navigate("Explore", { category })}
              >
                <Card center middle shadow style={styles.category}>
                  <Badge
                    margin={[0, 0, 15]}
                    size={50}
                    color="rgba(41,216,143,0.20)"
                  >
                    <Image source={category.image} />
                  </Badge>
                  <Text medium height={20}>
                    {category.name}
                  </Text>
                  <Text gray caption>
                    {category.count} products
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

Browse.defaultProps = {
  profile: {username: "react-ui-kit",
  location: "Europe",
  email: "contact@react-ui-kit.com",
  avatar: require("../../assets/images/avatar.png"),
  budget: 1000,
  monthly_cap: 5000,
  notifications: true,
  newsletter: false},
  categories: {

      id: "plants",
      name: "Plants",
      tags: ["products", "inspirations"],
      count: 147,
      image: require("../../assets/icons/plants.png"),
    
      id: "seeds",
      name: "Seeds",
      tags: ["products", "shop"],
      count: 16,
      image: require("..//../assets/icons/seeds.png"),

      id: "flowers",
      name: "Flowers",
      tags: ["products", "inspirations"],
      count: 68,
      image: require("../../assets/icons/flowers.png"),

      id: "sprayers",
      name: "Sprayers",
      tags: ["products", "shop"],
      count: 17,
      image: require("../../assets/icons/sprayers.png"),

      id: "pots",
      name: "Pots",
      tags: ["products", "shop"],
      count: 47,
      image: require("../../assets/icons/pots.png"),

      id: "fertilizers",
      name: "fertilizers",
      tags: ["products", "shop"],
      count: 47,
      image: require("../../assets/icons/fertilizers.png")
  }
};

export default Browse;


const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16 * 2
  },
  avatar: {
    height: 16 * 2.2,
    width: 16 * 2.2
  },
  tabs: {
    borderBottomColor: "#C5CCD6",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 16,
    marginHorizontal: 16 * 2
  },
  tab: {
    marginRight: 16 * 2,
    paddingBottom: 16
  },
  active: {
    borderBottomColor: "#2BDA8E",
    borderBottomWidth: 3
  },
  categories: {
    flexWrap: "wrap",
    paddingHorizontal: 16 * 2,
    marginBottom: 16 * 3.5
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - 25 * 2.4 - 16) / 2,
    maxWidth: (width - 25 * 2.4 - 16) / 2,
    maxHeight: (width - 25 * 2.4 - 16) / 2
  }
});