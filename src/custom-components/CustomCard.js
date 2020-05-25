/* eslint-disable object-curly-newline */
import React from "react";
import { Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import CustomVideo from "../custom-components/CustomVideo";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

import { Block, Icon, Text } from "galio-framework";
import { withGalio } from "galio-framework";
import theme from "../theme";
import { Ionicons } from "@expo/vector-icons";


function CustomCard({
  avatar,
  borderless,
  caption,
  captionColor,
  card,
  children,
  footerStyle,
  video,
  imageBlockStyle,
  imageStyle,
  shadow,
  style,
  styles,
  title,
  titleColor,
  theme,
  user,
  time,
  ...props
}) {
  function renderImage() {
    if (!video) return null;
    return (
      <Block style={[styles.image, styles.imageBlock]}>
        <CustomVideo source={video}/>
      </Block>
    );
  }

  function renderAvatar() {
    if (!avatar) return null;
    return <Image source={{ uri: avatar }} style={styles.avatar}/>;
  }


  function renderAuthor() {
    return (
      <Block flex row style={[styles.footer, footerStyle]} space="between">
        <Block flex={0.3}>{renderAvatar()}</Block>
        <Block flex={1.7}>
          <Block style={styles.title}>
            <Text size={theme.SIZES.FONT * 0.875} color={titleColor}>
              {user}
            </Text>
          </Block>
        </Block>
      </Block>
    );
  }

  function renderTitle() {
    return (
      <Block flex row style={[styles.videoTitle, footerStyle]} space="between">
        <Block flex={1.7}>
          <Block center style={styles.title}>
            <Text bold size={theme.SIZES.FONT * 0.875} color={titleColor}>
              {title}
            </Text>
          </Block>
        </Block>
      </Block>
    );
  }

  function renderCaption() {
    return (
      <Block flex row style={[styles.caption, footerStyle]} space="between">
        <Block flex={1.7}>
          <Block row left>
            <Ionicons name="md-heart-empty" size={32} color={theme.COLORS.THEME}/>
            <Block row left style={{marginLeft: theme.SIZES.BASE}}>
              <Ionicons name="md-chatbubbles" size={32} color={theme.COLORS.THEME}/>
            </Block>
          </Block>
          <Block row left style={{marginTop: theme.SIZES.BASE / 2}}>
            <Text italic size={theme.SIZES.FONT * 0.875} color={titleColor}>
              {user}
            </Text>
            <Block row right>
              <Text p size={theme.SIZES.FONT * 0.875} color={captionColor}>
                {"  " + caption}
              </Text>
            </Block>
          </Block>
          <Block row space="between" style={{marginTop: theme.SIZES.BASE * 1.5}}>
            <Text italic size={theme.SIZES.FONT * 0.775} color={titleColor}>
              {timeAgo.format(Date.parse(time), "twitter")}
            </Text>
          </Block>
        </Block>
      </Block>
    );
  }


  const styleCard = [borderless && { borderWidth: 0 }, style];
  // Add locale-specific relative date/time formatting rules.
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  return (
    <Block {...props} card={card} shadow={shadow} style={styleCard}>
      {renderAuthor()}
      {renderTitle()}
      {renderImage()}
      {renderCaption()}
      {children}
    </Block>
  );
}

CustomCard.defaultProps = {
  card: true,
  shadow: true,
  borderless: false,
  styles: {},
  theme: theme,
  title: "",
  titleColor: "",
  caption: "",
  captionColor: "",
  footerStyle: {},
  avatar: ""
};

CustomCard.propTypes = {
  card: PropTypes.bool,
  shadow: PropTypes.bool,
  borderless: PropTypes.bool,
  styles: PropTypes.any,
  theme: PropTypes.any,
  title: PropTypes.string,
  titleColor: PropTypes.string,
  caption: PropTypes.string,
  captionColor: PropTypes.string,
  avatar: PropTypes.string,
  footerStyle: PropTypes.object
};

const styles = theme =>
  StyleSheet.create({
    card: {
      borderWidth: 0,
      backgroundColor: theme.COLORS.GREY,
      width: theme.SIZES.CARD_WIDTH,
      marginVertical: theme.SIZES.CARD_MARGIN_VERTICAL
    },
    footer: {
      justifyContent: "flex-start",
      alignItems: "center",
      paddingHorizontal: theme.SIZES.CARD_FOOTER_HORIZONTAL,
      paddingVertical: theme.SIZES.CARD_FOOTER_VERTICAL,
      backgroundColor: theme.COLORS.GREY,
      zIndex: 1
    },
    caption: {
      justifyContent: "flex-start",
      alignItems: "center",
      paddingHorizontal: theme.SIZES.CARD_FOOTER_HORIZONTAL,
      paddingVertical: theme.SIZES.CARD_FOOTER_VERTICAL,
      backgroundColor: theme.COLORS.GREY,
      zIndex: 1
    },
    videoTitle: {
      justifyContent: "flex-start",
      alignItems: "center",
      paddingHorizontal: theme.SIZES.CARD_FOOTER_HORIZONTAL,
      backgroundColor: theme.COLORS.GREY,
      zIndex: 1
    },
    avatar: {
      width: theme.SIZES.CARD_AVATAR_WIDTH,
      height: theme.SIZES.CARD_AVATAR_HEIGHT,
      borderRadius: theme.SIZES.CARD_AVATAR_RADIUS
    },
    title: {
      justifyContent: "center"
    },
    imageBlock: {
      borderWidth: 0,
      overflow: "hidden"
    },
    image: {
      width: "auto",
      height: theme.SIZES.BASE * 30,
    },
    round: {
      borderRadius: theme.SIZES.CARD_ROUND
    },
    rounded: {
      borderRadius: theme.SIZES.CARD_ROUNDED
    }
  });

export default withGalio(CustomCard, styles);
