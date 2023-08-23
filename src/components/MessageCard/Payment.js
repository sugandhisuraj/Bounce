import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, FlatList } from 'react-native'
import {
    StarPerson,
    Peoples,
    Message,
    Download,
    Party,
    WhiteRightArrow
} from '@assets'
import { TextIconButton } from '@components'
import { BlackArrowDown, BlueArrowDown } from '@svg'
import { Avatar } from 'react-native-elements'
import { FONTSIZE, getHp, getWp } from '../../app/utils'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button } from 'native-base';
import { styles } from './indexCss'

AntDesign.loadFont();
export default function Payment(props) {
    const {
        Message_Stack,
        heading='',
    } = props
    const [showMore, setShowMore] = useState(false);

    const renderItem = ({ item }) => {

        const { name, price, time, icon } = item
        return (
            <View style={[styles.renderContainer]}>
                <View style={styles.flexDirectionStyle}>

                    <Avatar source={icon} size={40} containerStyle={{ width: '10%' }} rounded />
                    <Text style={[styles.textStyle, { width: '60%', marginHorizontal: getWp(10), marginLeft: 15 }]}>{name}</Text>
                   
                        <Text style={[styles.textStyle,{fontWeight:'bold'}]}>{price}</Text>
                   
                </View>

                <TouchableOpacity style={[styles.makePaymentButton,styles.shadowStyle]}>
                    <Text style={styles.makePaymentTextStyle}>{'Make Payment'}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.headingStyle}>{heading}</Text>

            {Message_Stack.length > 1 ?
                <>
                    <FlatList
                        initialNumToRender={2}
                        data={!showMore ? Message_Stack.slice(0, 1) : Message_Stack}
                        renderItem={renderItem}
                        keyExtractor={(index) => index}
                        onEndReachedThreshold={0.5}
                    />

                    <View style={{ backgroundColor: '#FBFBFB', paddingBottom: 10 }}>
                        <Button
                            onPress={() => {
                                setShowMore(i => !i);
                            }}
                            full
                            light
                            style={[styles.showMoreButtonContainer,{
                                marginTop: getHp(0),
                            }]}>
                            <Text style={[styles.showMoreTextStyle, { fontFamily: 'AvenirNext-Medium', letterSpacing: 0.2 }]}>
                                {!showMore ? `${Message_Stack.length - 1} More` : `Hide`}
                            </Text>
                            <View style={{ marginStart: getHp(10) }}>
                                <AntDesign
                                    color={'black'}
                                    size={getHp(16)}
                                    name={!showMore ? 'down' : 'up'}
                                />
                            </View>
                        </Button>
                    </View>
                </>
                :
                null
            }
        </View>
    )
}

