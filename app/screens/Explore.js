import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import * as Icon from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { Button} from "../../components/Button";
import {Input} from "../../components/Input";
import {Block} from "../../components/Block";
import { Text } from "../../components/Text";

import { theme } from "../../constants/theme";
import { mocks } from "../../constants/mocks";
const { width, height } = Dimensions.get("window");

class Explore extends Component {
  state = {
    searchFocus: new Animated.Value(0.6),
    searchString: null
  };

  handleSearchFocus(status) {
    Animated.timing(this.state.searchFocus, {
      toValue: status ? 0.8 : 0.6, // status === true, increase flex size
      duration: 150 // ms
    }).start();
  }

  renderSearch() {
    const { searchString, searchFocus } = this.state;
    const isEditing = searchFocus && searchString;

    return (
      <Block animated middle flex={searchFocus} style={styles.search}>
        <Input
          placeholder="Search"
          placeholderTextColor={"#C5CCD6"}
          style={styles.searchInput}
          onFocus={() => this.handleSearchFocus(true)}
          onBlur={() => this.handleSearchFocus(false)}
          onChangeText={text => this.setState({ searchString: text })}
          value={searchString}
          onRightPress={() =>
            isEditing ? this.setState({ searchString: null }) : null
          }
          rightStyle={styles.searchRight}
          rightLabel={
            <Icon.FontAwesome
              name={isEditing ? "close" : "search"}
              size={16 / 1.6}
              color={"#C5CCD6"}
              style={styles.searchIcon}
            />
          }
        />
      </Block>
    );
  }

  renderImage(img, index) {
    const { navigation } = this.props;
    const sizes = Image.resolveAssetSource(img);
    const fullWidth = width - 25 * 2.5;
    const resize = (sizes.width * 100) / fullWidth;
    const imgWidth = resize > 75 ? fullWidth : sizes.width * 1;

    return (
      <TouchableOpacity
        key={`img-${index}`}
        onPress={() => navigation.navigate("Product")}
      >
        <Image
          source={img}
          style={[styles.image, { minWidth: imgWidth, maxWidth: imgWidth }]}
        />
      </TouchableOpacity>
    );
  }

  renderExplore() {
    const { images, navigation } = this.props;
    const mainImage = images[0];

    return (
      <Block style={{ marginBottom: height / 3 }}>
        <TouchableOpacity
          style={[styles.image, styles.mainImage]}
          onPress={() => navigation.navigate("Product")}
        >
          <Image source={mainImage} style={[styles.image, styles.mainImage]} />
        </TouchableOpacity>
        <Block row space="between" wrap>
          {images.slice(1).map((img, index) => this.renderImage(img, index))}
        </Block>
      </Block>
    );
  }

  renderFooter() {
    return (
      <LinearGradient
        locations={[0.5, 1]}
        style={styles.footer}
        colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.6)"]}
      >
        <Button gradient style={{ width: width / 2.678 }}>
          <Text bold white center>
            Filter
          </Text>
        </Button>
      </LinearGradient>
    );
  }

  render() {
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Explore
          </Text>
          {this.renderSearch()}
        </Block>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.explore}>
          {this.renderExplore()}
        </ScrollView>

        {this.renderFooter()}
      </Block>
    );
  }
}

Explore.defaultProps = {
  images: {
    images:[
      require("../../assets/images/explore_1.png"),
    require("../../assets/images/explore_2.png"),
    require("../../assets/images/explore_3.png"),
    require("../../assets/images/explore_4.png"),
    require("../../assets/images/explore_5.png"),
    require("../../assets/images/explore_6.png")
    ]
  }
};

export default Explore;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16 * 2,
    paddingBottom: 16 * 2
  },
  search: {
    height: 16 * 2,
    width: width - 16 * 2
  },
  searchInput: {
    fontSize: 12,
    height: 16 * 2,
    backgroundColor: "rgba(142, 142, 147, 0.06)",
    borderColor: "rgba(142, 142, 147, 0.06)",
    paddingLeft: 16 / 1.333,
    paddingRight: 16 * 1.5
  },
  searchRight: {
    top: 0,
    marginVertical: 0,
    backgroundColor: "transparent"
  },
  searchIcon: {
    position: "absolute",
    right: 16 / 1.333,
    top: 16 / 1.6
  },
  explore: {
    marginHorizontal: 25 * 1.25
  },
  image: {
    minHeight: 100,
    maxHeight: 130,
    maxWidth: width - 25 * 2.5,
    marginBottom: 16,
    borderRadius: 4
  },
  mainImage: {
    minWidth: width - 25 * 2.5,
    minHeight: width - 25 * 2.5
  },
  footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    overflow: "visible",
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.1,
    width,
    paddingBottom: 16 * 4
  }
});