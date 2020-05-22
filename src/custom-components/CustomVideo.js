import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import VideoPlayer from 'expo-video-player';
import { Video, Audio } from 'expo-av';
import theme from '../theme';
import InViewPort from '../helpers/InViewPort';
import SIZES from 'galio-framework/src/theme/sizes';

class CustomVideo extends Component {

  state: {
    shouldPlay: boolean,
    isPlaying: boolean,
  };

  constructor(props) {
    super(props);
    this.state = {
      shouldPlay: false,
      isPlaying: false,
    };
  }

  pauseVideo = () => {
      this.setState({ isPlaying: false });
  };

  playVideo = () => {
      this.setState({ isPlaying: true });
  };

  handlePlaying = (isVisible) => {
    isVisible ? this.playVideo() : this.pauseVideo();
  };

  render() {
    const { width } = Dimensions.get('screen');
    this.state.isPlaying ? console.log("Is playing") : null;
    return (
        <InViewPort onChange={this.handlePlaying}>
          <View style={{ alignSelf: 'center', height: theme.SIZES.BASE * 30}}>
          <VideoPlayer
            videoProps={{
              shouldPlay: this.state.isPlaying,
              resizeMode: Video.RESIZE_MODE_CONTAIN,
              source: {
                uri: this.props.source,
              },
              isLooping: true,
            }}
            inFullscreen={false}
            height={theme.SIZES.BASE * 30}
            width={width}
            showFullscreenButton={false}
            sliderColor={theme.COLORS.PRIMARY}
            videoBackground={theme.COLORS.GREY}
          />
          </View>
        </InViewPort>
    );
  }
}

export default CustomVideo;
