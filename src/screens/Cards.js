import React from "react";
import {
  ScrollView, StyleSheet, Dimensions, Platform, TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Galio components
import {
  Block, NavBar, Icon
} from "galio-framework";
import theme from "../theme";
import CustomCard from "../custom-components/CustomCard";
import GetAllVideos from "../api-functions/GetAllVideos";

const { width } = Dimensions.get("screen");

export default class Cards extends React.Component {

  state: {
    cards: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    };
  }

  async componentDidMount() {
    let result = [];
    await GetAllVideos()
      .then((data) => result = data);
    (this.setState({ cards: result }));
  }

  render() {
    const { navigation } = this.props;
    return (
      <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
        <NavBar
          title="Cards"
          left={(
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Icon
                name="menu"
                family="feather"
                size={theme.SIZES.BASE}
                color={theme.COLORS.ICON}
              />
            </TouchableOpacity>
          )}
          style={Platform.OS === "android" ? { marginTop: theme.SIZES.BASE } : null}
        />
        <ScrollView contentContainerStyle={styles.cards}>
          <Block flex space="between">
            {this.state.cards && this.state.cards.map((card, id) => (
              <CustomCard
                key={`card-${card.videoId}`}
                flex
                borderless
                shadowColor={theme.COLORS.BLACK}
                // titleColor={card.full ? theme.COLORS.WHITE : null}
                titleColor={theme.COLORS.WHITE}
                style={styles.card}
                title={card.title}
                caption={card.description}
                // location={card.location}
                avatar={`${card.userImage}?${id}`}
                video={card.video}
                // imageStyle={[card.padded ? styles.rounded : null]}
                imageStyle={styles.rounded}
                imageBlockStyle={[
                  // card.padded ? { padding: theme.SIZES.BASE / 2 } : null,
                  { padding: theme.SIZES.BASE / 2 },
                  // card.full ? null : styles.noRadius,
                  null
                ]}
                // footerStyle={card.full ? styles.full : null}
                footerStyle={styles.full}
              >
                {/*{card.full ? <LinearGradient colors={['transparent', 'rgba(0,0,0, 0.8)']} style={styles.gradient} /> : null}*/}
                <LinearGradient colors={["transparent", "rgba(0,0,0, 0.8)"]}
                                style={styles.gradient}/>
              </CustomCard>
            ))}
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  cards: {
    width,
    backgroundColor: theme.COLORS.WHITE,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    width,
    marginVertical: theme.SIZES.BASE * 0.875,
    elevation: theme.SIZES.BASE / 2
  },
  full: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0
  },
  noRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  rounded: {
    borderRadius: theme.SIZES.BASE * 0.1875
  },
  gradient: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    position: "absolute",
    overflow: "hidden",
    borderBottomRightRadius: theme.SIZES.BASE * 0.5,
    borderBottomLeftRadius: theme.SIZES.BASE * 0.5
  }
});
