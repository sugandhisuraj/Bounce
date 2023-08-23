import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {ThreeBlackDots, DeleteBlack} from '@svg';
import {FONTSIZE, getWp, getHp} from '@utils';
import Styles from './indexCss';
import {FONTFAMILY, insertStringAtPos} from '../../app/utils';
import {Menus} from '..';

AntDesign.loadFont();

const CustomTextInput = props => {
  const {placeholder, textInputProps, containerStyle, inputStyle} = props;

  return (
    <View style={[containerStyle]}>
      <Text style={[Styles.inputPlaceholder]}>{placeholder}</Text>
      <TextInput
        {...textInputProps}
        style={[Styles.inputStyle, inputStyle]}></TextInput>
    </View>
  );
};
const TicketComponent = props => {
  const priceInputRef = useRef();
  const {data = {}, onChangeText = () => {}, onTicketDelete = () => {}} = props;
  const [startPrice, setStartPrice] = useState(1);
  const showValue = () => {
    let showData = !data.price ? '0' : data?.price?.toString();
    let returnData = `$ ${showData}`;
    return !data.price ? returnData : showData;
  };
  useEffect(() => {
    console.log('EXECUTe - ', data?.price.length);
    const inputLen = data?.price.length ?? 0;
    setStartPrice(inputLen+1);
    // let objD = {start: 1, end: 1};
    // if (inputLen > 1) {
    //   objD.start = objD.end = inputLen + 1;
    // }
    // priceInputRef.current.setNativeProps({
    //   selection: objD,
    // });
  }, [data?.price]);
  const menuItems = [
    {
      Icon: <DeleteBlack />,
      title: 'Delete',
      onPress: onTicketDelete,
    },
  ];
  return (
    <View style={[Styles.container]}>
      <View style={[Styles.editRowContainer]}>
        <Menus.CommonMenu
          menuTitleTextStyle={[Styles.menuTitleTextStyle]}
          menuItemStyle={[Styles.menuItemStyle]}
          contentStyle={[Styles.menuContentStyle]}
          config={menuItems}
          menuAnchor={<ThreeBlackDots height={getHp(30)} width={getHp(30)} />}
        />
      </View>
      <CustomTextInput
        placeholder={'Ticket Title'}
        inputStyle={[Styles.titleDescStyle]}
        textInputProps={{
          value: data?.title,
          onChangeText: title => {
            onChangeText({title});
          },
        }}
      />
      <CustomTextInput
        containerStyle={{marginTop: getHp(10)}}
        placeholder={'Description'}
        inputStyle={[Styles.titleDescStyle]}
        textInputProps={{
          value: data?.description,
          onChangeText: description => {
            onChangeText({description});
          },
        }}
      />
      <View style={[Styles.priceQuantityRow]}>
        <View style={{width: '48%'}}>
          <Text style={[Styles.inputPlaceholder]}>{'Price'}</Text>
          <TextInput
          keyboardType={'numeric'}
          selection={{start: startPrice, end: startPrice}}
            ref={priceInputRef}
            value={`$` + data?.price?.toString()}
            onChangeText={price => {
              onChangeText({price: price.substring(1)});
            }}
            style={[Styles.inputStyle, Styles.priceInputStyle]}></TextInput>
        </View>
        <CustomTextInput
          inputStyle={[Styles.priceInputStyle]}
          containerStyle={{width: '48%'}}
          placeholder={'Quantity Available'}
          textInputProps={{
            keyboardType: 'numeric',
            value: data?.quantity?.toString(),
            onChangeText: quantity => {
              onChangeText({quantity});
            },
          }}
        />
      </View>
    </View>
  );
  return (
    <View
      style={{
        paddingHorizontal: 10,
        marginTop: getHp(10),
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingVertical: 20,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={[
            styles.headerTitle,
            {
              fontSize: FONTSIZE.Text20,
              marginRight: 5,
              marginBottom: 10,
              color: 'black',
            },
          ]}>
          {'Tickets'}
        </Text>
        <TouchableOpacity onPress={onTicketDelete}>
          <AntDesign color={'black'} size={20} name={'close'} />
        </TouchableOpacity>
      </View>

      <TextInput
        value={data?.title}
        onChangeText={title => {
          onChangeText({title});
        }}
        placeholder="Ticket Title"
        placeholderTextColor={'#999999'}
        style={[styles.textInput, {marginBottom: getHp(20)}]}
      />
      <TextInput
        value={data?.description}
        onChangeText={description => {
          onChangeText({description});
        }}
        placeholderTextColor={'#999999'}
        placeholder="Description"
        style={styles.textInput}
      />

      <View style={[styles.eventContainer, {justifyContent: 'space-between'}]}>
        <Text
          style={[
            styles.headerTitle,
            {fontSize: FONTSIZE.Text18, marginRight: 5},
          ]}>
          {'Price ($)'}
        </Text>
        <TextInput
          keyboardType={'numeric'}
          placeholderTextColor={'#000'}
          placeholder={'$0'}
          onChangeText={price => {
            onChangeText({price: price});
          }}
          value={data?.price?.toString()}
          style={[
            styles.textInput,
            {
              height: getHp(50),
              width: '35%',
              textAlign: 'center',
              fontSize: FONTSIZE.Text18,
              color: 'black',
            },
          ]}
        />
      </View>
      <View style={[styles.eventContainer, {justifyContent: 'space-between'}]}>
        <Text
          style={[
            styles.headerTitle,
            {fontSize: FONTSIZE.Text18, marginRight: 5},
          ]}>
          {'Quantity Available'}
        </Text>
        <TextInput
          keyboardType={'numeric'}
          placeholderTextColor={'#000'}
          placeholder={'0'}
          value={data?.quantity?.toString()}
          onChangeText={quantity => {
            onChangeText({quantity});
          }}
          style={[
            styles.textInput,
            {
              height: getHp(50),
              width: '35%',
              textAlign: 'center',
              fontSize: FONTSIZE.Text18,
              color: 'black',
            },
          ]}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    elevation: 0,
    borderWidth: 0.3,
    borderColor: '#EEEEEE',
    fontSize: FONTSIZE.Text12,
    fontFamily: 'AvenirNext-Medium',
    backgroundColor: 'rgba(238, 238, 238, 0.5)',
    paddingLeft: 10,
    marginVertical: 5,
    borderRadius: 9.5,
    color: '#000',
    height: getHp(45),
  },
  eventContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallButtonStyle: {
    margin: getWp(5),
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 5,
    elevation: 1,
    backgroundColor: '#EEEEEE',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    // alignContent: 'center',
    color: '#000',
    fontSize: FONTSIZE.Text14,
    // fontWeight: 'bold',
    fontFamily: 'AvenirNext-Medium',
  },

  cameraStyle: {
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#F2F5F6',
    flex: 1,
  },
  bottomContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
    backgroundColor: '#000000',
    width: '100%',
  },
  bottomButton: {
    borderRadius: 24,
    backgroundColor: '#333333',
    flexDirection: 'column',
    paddingVertical: 10,
    maxHeight: '100%',
    minWidth: '45%',
    alignItems: 'center',
  },
  ContainerStyle: {
    width: '100%',
    marginVertical: 4,
  },
  ButtonStyle: {
    backgroundColor: '#212121',
    borderRadius: 10,
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  crossButton: {
    elevation: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    position: 'absolute',
    right: -10,
    top: -10,
  },
});

export default TicketComponent;
