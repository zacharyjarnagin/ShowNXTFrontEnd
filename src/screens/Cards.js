import React from "react";
import {
  ScrollView, StyleSheet, Dimensions, Platform, TouchableOpacity, RefreshControl
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Galio components
import {
  Block, NavBar, Icon, Card
} from "galio-framework";
import theme from "../theme";
import CustomCard from "../custom-components/CustomCard";
import GetAllVideos from "../api-functions/GetAllVideos";

const { width } = Dimensions.get("screen");

export default class Cards extends React.Component {

  state: {
    cards: [],
    refreshing: boolean,
  };

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      refreshing: false
    };
  }

  async componentDidMount() {
    let result = [];
    await GetAllVideos()
      .then((data) => {
        result = data;
        this.setState({ cards: result });
      });
  }

  async onRefresh() {
    this.setState({ refreshing: true });
    let result = [];
    await GetAllVideos.then((data) => {
      result = data;
      this.setState({ cards: result });
      this.setState({ refreshing: false });
    });
  }

  render() {
    const { navigation } = this.props;
    return (
      <Block safe flex style={{ backgroundColor: theme.COLORS.GREY }}>
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
          style={{ marginTop: theme.SIZES.BASE, backgroundColor: theme.COLORS.GREY}}

        />
        <ScrollView
                    contentContainerStyle={styles.cards}>
          <Block flex space="between">
            {this.state.cards && this.state.cards.map((card, id) => (
              <CustomCard
                key={`card-${card.videoId}`}
                flex
                borderless
                // shadowColor={theme.COLORS.BLACK}
                titleColor={theme.COLORS.BLACK}
                style={styles.card}
                title={card.title}
                caption={card.description}
                avatar={card.userImage}
                video={card.video}
                imageBlockStyle={styles.cardNoRadius}
                user={card.user}
                time={card.time}
                theme={theme}
              >
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
    backgroundColor: theme.COLORS.GREY,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  card: {
    backgroundColor: theme.COLORS.GREY,
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
