import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Header, Root, BlueCard, BlackCard, Footer,ModalPopup } from '@components'
import {
    StarPerson,
    Girl,
    Message,
    WhiteDownload,
    WhiteParty,
} from '@assets'
const Message_Stack = [{
    icon: Girl,
    name: "David Poura",
    partyType: "Homecoming Party",
    time: "Sat. October 3, 9:00pm",
},
{
    icon: Girl,
    name: "David Poura",
    partyType: "Homecoming Party",
    time: "Sat. October 3, 9:00pm",
},
{
    icon: Girl,
    name: "David Poura",
    partyType: "Homecoming Party",
    time: "Sat. October 3, 9:00pm",
},
{
    icon: Girl,
    name: "David Poura",
    partyType: "Homecoming Party",
    time: "Sat. October 3, 9:00pm",
},
]

const REVIEWSTACK = [{
    icon: Girl,
    name: "David Poura",
    stars: null,
    reviewText: "Sat. October 3, 9:00pm",
},
{
    icon: Girl,
    name: "David Poura",
    partyType: "Homecoming Party",
    time: "Sat. October 3, 9:00pm",
},
]
export default function Notifications() {
    return (
        <Root>
            <View style={styles.container}>
            <Text style={[styles.headingStyle,{color:'#999999'}]}>{"No notification's available."}</Text>
                {/* <ModalPopup 
                customModel
                visible
                /> */}
                {/* <ScrollView>
                    <Header
                        headerTitle={"Notifications"}
                    />
                    <Text style={styles.headingStyle}>Messages</Text>
                    <BlueCard
                        MESSAGESTACK={MESSAGESTACK}

                    />
                    <Text style={styles.headingStyle}>Reviews</Text>
                    <BlackCard
                        REVIEWSTACK={REVIEWSTACK}

                    />


                </ScrollView> */}
                {/* <Footer
                    notification
                /> */}
            </View>
        </Root>
    )
}
const styles = StyleSheet.create({
   
    headingStyle: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 20,
        paddingTop: 8,
        letterSpacing:0.7
    },

    blueNotificationCard: {
        backgroundColor: 'radial - gradient(76.22 % 76.22 % at 50 % 23.78 %, rgba(31, 174, 247, 0.69) 0 %, rgba(31, 174, 247, 0.5) 100 %, rgba(31, 174, 247, 0.42) 100 %)',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15
    },
    eventDate: {
        backgroundColor: '#313131',
        borderRadius: 15,
        padding: 20,
        marginVertical: 10,
    },
    flexDirectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textStyle: {
        color: "#FFFFFF",
        fontSize: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#ECF1F4',
        justifyContent:'center',
        alignItems:'center'
    },
    name: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    commentLineTextStyle: {
        color: "#FFFFFF",
        fontSize: 16,
        opacity: 0.7
    },
})
