import {NavigationProp, RouteProp, useRoute} from "@react-navigation/native";
import {ActivityIndicator, Button, Text} from "react-native-paper";
import {Alert, Image, View} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import {useStoreState} from "../store";
import {LoginResponse} from "../dto/LoginResponse";
import storage from "../storage";

export default function ({navigation}: {navigation: NavigationProp<any>}) {
    const route = useRoute<RouteProp<{
        VT:{
            content: string
        }
    }, 'VT'>>();

    const {content} = route.params

    const [loading,setLoading] = useState(true)
    const token = useStoreState(state => state.token);

    useEffect(()=>{
        let form = new FormData()
        form.append("code", content)

        axios
            .post('https://cinema.cinea.com.cn/api/Ticket/getTicket', form, {
                headers: {Authorization: `Bearer ${token}`},
            })
            .then(res => {
                if (res.data && res.data.status && res.data.status === '10000') {
                    setLoading(false);
                } else {
                    Alert.alert('取票失败', `${res.data.message}`,undefined,{
                        onDismiss: () => {
                            navigation.goBack()
                        }
                    });
                }
            })
            .catch((err) => {
                Alert.alert('取票失败', err.toString(),undefined,{
                    onDismiss: () => {
                        navigation.goBack()
                    }
                });
            });
    },[])

    return (
        loading?(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size="large"/>
                <View style={{marginTop:25}}>
                    <Text variant="titleLarge">正在验票……</Text>
                </View>
            </View>
        ):(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('../assets/check.png')} style={{width:128,height:128}}/>
                <View style={{marginTop:25}}>
                    <Text variant="titleLarge">取票成功！</Text>
                </View>
                <View style={{marginTop:25}}>
                    <Button onPress={()=>navigation.goBack()}>返回</Button>
                </View>
            </View>
        )
    )
}
