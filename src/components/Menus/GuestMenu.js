import React, {useState, Fragment} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Button, Menu, Divider, Provider} from 'react-native-paper';
import {FONTFAMILY, FONTSIZE, getWp} from '../../app/utils';

const GuestMenu = props => {
  const [visible, setVisible] = useState(false);
  const {config, menuAnchor, contentStyle} = props;

  const MenuItem = ({Menu}) => {
    return (
      <View style={[Styles.menuItemContainer]}>
        {Menu.Icon}
        <Text style={[Styles.menuTitleText]}>{Menu.title}</Text>
      </View>
    );
  };

  return (
    <Menu
      contentStyle={[Styles.contentStyle, contentStyle]}
      visible={visible}
      anchor={
        <TouchableOpacity onPress={() => setVisible(true)}>
          {menuAnchor}
        </TouchableOpacity>
      }
      onDismiss={() => setVisible(false)}>
      {config.map((menu, index) => {
        return (
          <Fragment>
            <Menu.Item
              onPress={() => { 
                setVisible(false);
                if (menu.onPress && typeof menu.onPress == 'function') {
                  menu.onPress();
                }
              }}
              title={<MenuItem Menu={menu} />}
            />
            {!(config.length - 1 == index) && <Divider />}
          </Fragment>
        );
      })}
    </Menu>
  );
};

GuestMenu.defaultProps = {
  config: [],
  menuAnchor: null,
  contentStyle: {},
};
const Styles = StyleSheet.create({
  contentStyle: {marginRight: getWp(50)},
  menuItemContainer: {flexDirection: 'row'},
  menuTitleText: {
    marginLeft: getWp(10),
    fontWeight: '500',
    fontSize: FONTSIZE.Text16,
    fontFamily: FONTFAMILY.AvenirNextBold,
    color: '#000',
  },
});
export default GuestMenu;
