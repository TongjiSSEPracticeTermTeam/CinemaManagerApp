import QRCodeScanner from "react-native-qrcode-scanner";
import {Linking} from "react-native";
import {RNCamera} from "react-native-camera";
import {Button, Text} from "react-native-paper";
import {NavigationProp} from "@react-navigation/native";

export default function ({navigation}: {navigation: NavigationProp<any>}){
    // @ts-ignore
    const onSuccess = e => {
        navigation.navigate("验票界面", {
            content:e.data
        })
    };

    const goBack = () => {
        navigation.goBack()
    }

    return (
        <QRCodeScanner onRead={onSuccess}
                       flashMode={RNCamera.Constants.FlashMode.off}
                       topContent={
                            <Text variant="headlineMedium">扫描客户的取票码</Text>
                       }
                       bottomContent={
                            <Button onPress={goBack}>返回</Button>
                       }
                       />
    )
}
