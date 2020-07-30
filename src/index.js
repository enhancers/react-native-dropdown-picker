import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import PropTypes from "prop-types";

class DropDownPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: props.isVisible,
      props: {
        isVisible: props.isVisible,
      },
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isVisible !== state.props.isVisible) {
      return {
        isVisible: props.isVisible,
        props: {
          ...state.props,
          isVisible: props.isVisible,
        },
      };
    }

    if (props.disabled !== state.props.disabled) {
      return {
        props: {
          ...state.props,
          disabled: props.disabled,
        },
      };
    }

    return null;
  }

  toggle() {
    this.setState(
      {
        isVisible: !this.state.isVisible,
      },
      () => {
        const isVisible = this.state.isVisible;

        if (isVisible) {
          this.props.onOpen();
        } else {
          this.props.onClose();
        }
      }
    );
  }

  getLayout(layout) {
    this.setState({
      top: layout.height - 2,
    });
  }

  render() {
    const { disabled } = this.state.props;
    const { customPlaceHolder, customChildrenLower } = this.props;
    const opacity = disabled ? 0.5 : 1;
    // const items = this.getItems();
    return (
      <View
        style={[
          this.props.containerStyle,
          {
            ...(Platform.OS !== "android" && {
              zIndex: this.props.zIndex,
            }),
          },
        ]}
      >
        <TouchableOpacity
          onLayout={(event) => this.getLayout(event.nativeEvent.layout)}
          disabled={disabled}
          onPress={() => this.props.handlePress()}
          activeOpacity={1}
          style={[
            styles.dropDown,
            this.props.style,
            this.state.isVisible && {
              elevation: 2,
            },
          ]}
        >
          <View>{customPlaceHolder()}</View>
        </TouchableOpacity>
        <View
          style={[
            styles.dropDown,
            styles.dropDownBox,
            this.props.dropDownStyle,
            !this.state.isVisible && styles.hidden,
            {
              top: this.state.top,
              maxHeight: this.props.dropDownMaxHeight,
              zIndex: this.props.zIndex,
            },
          ]}
        >
          <ScrollView style={{ width: "100%" }} nestedScrollEnabled={true}>
            {customChildrenLower()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

DropDownPicker.defaultProps = {
  handlePress: () => {},
  customChildrenLower: () => {},
  customPlaceHolder: () => {},
  showCustomPlaceHolder: true,
  dropDownMaxHeight: 150,
  style: {},
  dropDownStyle: {},
  containerStyle: {},
  itemStyle: {},
  labelStyle: {},
  selectedLabelStyle: {},
  placeholderStyle: {},
  activeItemStyle: {},
  activeLabelStyle: {},
  arrowStyle: {},
  showArrow: true,
  arrowSize: 15,
  zIndex: 5000,
  disabled: false,
  searchable: false,
  searchablePlaceholder: "Search for an item",
  searchableError: () => <Text>Not Found</Text>,
  searchableStyle: {},
  searchablePlaceholderTextColor: "gray",
  isVisible: false,
  multiple: false,
  multipleText: "%d items have been selected",
  min: 0,
  max: 10000000,
  onOpen: () => {},
  onClose: () => {},
  onChangeItem: () => {},
};

DropDownPicker.propTypes = {
  handlePress: PropTypes.func,
  customChildrenLower: PropTypes.any,
  showCustomPlaceHolder: PropTypes.bool,
  customPlaceHolder: PropTypes.any,
  defaultValue: PropTypes.any,
  dropDownMaxHeight: PropTypes.number,
  style: PropTypes.object,
  dropDownStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  itemStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  selectedLabelStyle: PropTypes.object,
  placeholderStyle: PropTypes.object,
  activeItemStyle: PropTypes.object,
  activeLabelStyle: PropTypes.object,
  showArrow: PropTypes.bool,
  arrowStyle: PropTypes.object,
  arrowSize: PropTypes.number,
  customArrowUp: PropTypes.func,
  customArrowDown: PropTypes.func,
  customTickIcon: PropTypes.func,
  zIndex: PropTypes.number,
  disabled: PropTypes.bool,
  searchable: PropTypes.bool,
  searchablePlaceholder: PropTypes.string,
  searchableError: PropTypes.func,
  searchableStyle: PropTypes.object,
  searchablePlaceholderTextColor: PropTypes.string,
  isVisible: PropTypes.bool,
  multiple: PropTypes.bool,
  multipleText: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onChangeItem: PropTypes.func,
};

const styles = StyleSheet.create({
  arrow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingVertical: 8,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  dropDown: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: "#dfdfdf",
  },
  dropDownDisplay: {
    flexDirection: "row",
    alignItems: "center",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    flexGrow: 1,
  },
  dropDownBox: {
    height: "auto",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "absolute",
    width: "100%",
    borderColor: "#6b6b6b",
    borderTopWidth: 0,
  },
  dropDownItem: {
    paddingVertical: 8,
    width: "100%",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    borderColor: "#dfdfdf",
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    paddingVertical: 8,
    marginBottom: 10,
  },
  hidden: {
    position: "relative",
    display: "none",
    borderWidth: 0,
  },
  noBottomRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  notFound: {
    marginVertical: 10,
    marginBottom: 15,
    alignItems: "center",
  },
});

export default DropDownPicker;
