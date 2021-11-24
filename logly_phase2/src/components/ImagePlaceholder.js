/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import React, {Component} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export default class ImagePlaceholder extends Component {
  static defaultProps = {
    duration: 750,
    showActivityIndicator: true,
    resizeMode: 'cover',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      fadeAnim: new Animated.Value(1),
      isError: false,
    };
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this._renderPlaceholder.bind(this)()}
        <Image
          resizeMode={this.props.resizeMode}
          onProgress={this._onProgress.bind(this)}
          style={[styles.image, this.props.imgStyle]}
          source={{uri: this.props.src}}
          onError={() => {
            this.setState({isLoading: false, isError: true});
          }}
        />
      </View>
    );
  }

  _onProgress(event) {
    const progress = event.nativeEvent.loaded / event.nativeEvent.total;
    this.setState({isLoading: progress < 1});
  }

  _renderPlaceholder() {
    return !this.state.isError ? (
      <Animated.View style={this._getPlaceholderStyles()}>
        <Image
          resizeMode={this.props.resizeMode}
          style={[styles.placeholder, this.props.placeholderStyle]}
          source={this.props.placeholder}
        />
        {this._renderActivityIndicator()}
      </Animated.View>
    ) : (
      <Image
        resizeMode={this.props.resizeMode}
        style={[styles.placeholder, this.props.placeholderStyle]}
        source={this.props.placeholder}
      />
    );
  }

  _getPlaceholderStyles() {
    let container = [styles.placeholderContainer];
    if (!this.state.isLoading) {
      Animated.timing(this.state.fadeAnim, {
        toValue: 0,
        duration: this.props.duration,
      }).start();
      container.push({opacity: this.state.fadeAnim});
    }
    container.push(this.props.placeholderContainerStyle);
    return container;
  }

  _renderActivityIndicator() {
    if (this.props.showActivityIndicator) {
      if (this.props.ActivityIndicator) {
        return this.props.ActivityIndicator;
      } else {
        return (
          <ActivityIndicator
            {...this.props.activityIndicatorProps}
            animating={this.state.isLoading}
          />
        );
      }
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  placeholderContainer: {
    flex: 1,
    alignSelf: 'stretch',
    zIndex: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    flex: 1,
    alignSelf: 'stretch',
    zIndex: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  image: {
    flex: 1,
  },
});
