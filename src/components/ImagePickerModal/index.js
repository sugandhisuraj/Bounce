import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import Modal from 'react-native-modal';
import Styles from './indexCss';
import {Camera, Gallery, Browse} from '@svg';
import {getHp, getWp} from '../../app/utils';

class ImagePickerModal extends Component {
  static type = {
    photoVideo: 'photoVideo',
    photoLibrary: 'photoLibrary',
    browse: 'browse',
  };
 
  static options = [
    // {
    //   type: this.type.photoVideo,
    //   text: 'Take Photo or Video',
    //   icon: <Camera height={getHp(25)} width={getWp(25)} />,
    // },
    {
      type: this.type.photoLibrary,
      text: 'Photo Library',
      icon: <Gallery height={getHp(25)} width={getWp(25)} />,
    },
    // {
    //   type: this.type.browse,
    //   text: 'Browse',
    //   icon: <Browse height={getHp(25)} width={getWp(25)} />,
    // },
  ];
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }
  toggleModal = () => {
    this.setState(prevState => {
      return {
        isModalVisible: !prevState.isModalVisible,
      };
    });
  };
  RenderRow = ({option, seperator}) => {
    const {onSelect} = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          this.toggleModal();
          onSelect(option);
        }}
        style={[Styles.rowStyle, seperator && Styles.seperator]}>
        <Text style={Styles.rowTextStyle}>{option.text}</Text>
        {option.icon}
      </TouchableOpacity>
    );
  };
  CancelButton = () => {
    return (
      <TouchableOpacity
        style={[Styles.cancelButton]}
        onPress={this.toggleModal}>
        <Text style={Styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    );
  };
  render() {
    const {isModalVisible} = this.state;
    return (
      <Modal isVisible={isModalVisible}>
        <View style={Styles.container}>
          {this.CancelButton()}
          <View style={Styles.optionContainer}>
            {ImagePickerModal.options.map((option, index, arr) => {
              return this.RenderRow({
                option,
                seperator: index != arr.length - 1,
              });
            })}
          </View>
        </View>
      </Modal>
    );
  }
}

export default ImagePickerModal;
