import {NavigationProp} from '@react-navigation/native';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import * as React from 'react';

export default function ({navigation}: {navigation: NavigationProp<any>}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text variant="headlineMedium">客户取票</Text>
      <View style={{marginTop: 20}}>
        <Text variant={'bodySmall'}>客户出示取票码，您扫码为客户取票。</Text>
      </View>
    </View>
  );
}
