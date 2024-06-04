import React, { Component } from "react";
import {
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import * as Icon from "@expo/vector-icons";

import { Button} from "../../components/Button";
import { Divider } from "../../components/Divider";
import { Input} from "../../components/Input"
import { Block } from "../../components/Block";
import {Text } from "../../components/Text";

import { theme } from "../../constants/theme";
import { mocks } from "../../constants/mocks";

const { width, height } = Dimensions.get("window");

class Product extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Button onPress={() => {}}>
          <Icon.Entypo name="dots-three-horizontal" color={theme.colors.gray} />
        </Button>
      )
    };
  };

  renderGallery() {
    const { product } = this.props;
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        data={product.images}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => (
          <Image
            source={item}
            resizeMode="contain"
            style={{ width, height: height / 2.8 }}
          />
        )}
      />
    );
  }

  render() {
    const { product } = this.props;

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {this.renderGallery()}

        <Block style={styles.product}>
          <Text h2 bold>
            {product.name}
          </Text>
          <Block flex={false} row margin={[16, 0]}>
            {product.tags.map(tag => (
              <Text key={`tag-${tag}`} caption gray style={styles.tag}>
                {tag}
              </Text>
            ))}
          </Block>
          <Text gray light height={22}>
            {product.description}
          </Text>

          <Divider margin={[25 * 0.9, 0]} />

          <Block>
            <Text semibold>Gallery</Text>
            <Block row margin={[25 * 0.9, 0]}>
              {product.images.slice(1, 3).map((image, index) => (
                <Image
                  key={`gallery-${index}`}
                  source={image}
                  style={styles.image}
                />
              ))}
              <Block
                flex={false}
                card
                center
                middle
                color="rgba(197,204,214,0.20)"
                style={styles.more}
              >
                <Text gray>+{product.images.slice(3).length}</Text>
              </Block>
            </Block>
          </Block>
        </Block>
      </ScrollView>
    );
  }
}

Product.defaultProps = {
  product: {
    id: 1,
      name: "16 Best Plants That Thrive In Your Bedroom",
      description:
        "Bedrooms deserve to be decorated with lush greenery just like every other room in the house – but it can be tricky to find a plant that thrives here. Low light, high humidity and warm temperatures mean only certain houseplants will flourish.",
      tags: ["Interior", "27 m²", "Ideas"],
      images: [
        require("../../assets/images/plants_1.png"),
        require("../../assets/images/plants_2.png"),
        require("../../assets/images/plants_3.png"),
        // showing only 3 images, show +6 for the rest
        require("../../assets/images/plants_1.png"),
        require("../../assets/images/plants_2.png"),
        require("../../assets/images/plants_3.png"),
        require("../../assets/images/plants_1.png"),
        require("../../assets/images/plants_2.png"),
        require("../../assets/images/plants_3.png")
      ]
  }
};

export default Product;

const styles = StyleSheet.create({
  product: {
    paddingHorizontal: 16 * 2,
    paddingVertical: 25
  },
  tag: {
    borderColor:  "#9DA3B4",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16 / 2.5,
    marginRight: 16 * 0.625
  },
  image: {
    width: width / 3.26,
    height: width / 3.26,
    marginRight: 16
  },
  more: {
    width: 55,
    height: 55
  }
});