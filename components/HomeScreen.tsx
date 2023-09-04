import {NavigationProp} from '@react-navigation/native';
import {Alert, View} from 'react-native';
import * as React from 'react';
import {useStoreActions, useStoreState} from '../store';
import {Text, Button} from 'react-native-paper';
import {useEffect} from 'react';
import axios from 'axios/index';
import {LoginResponse} from '../dto/LoginResponse';
import storage from '../storage';

export default function HomeScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const token = useStoreState(state => state.token);
  const setToken = useStoreActions(state => state.changeToken);
  useEffect(() => {
    storage.load<string>({key: 'token'}).then(setToken).catch();
    if (token !== '') {
      axios
        .get('https://cinema.cinea.com.cn/api/Manager', {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then(() => {
          Alert.alert('登录成功', '欢迎使用本系统');
        })
        .catch(() => {
          setToken('');
        });
    }
  }, []);

  const gotoTicket = () => {
    navigation.navigate('客户取票');
  };

  if (token === '') {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text variant="headlineMedium">您当前未登录</Text>
        <View style={{marginTop: 20}}>
          <Button onPress={() => navigation.navigate('登录')}>前往登录</Button>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text variant="headlineMedium">欢迎回来</Text>
      <View style={{marginTop: 20}}>
        <Text variant={'bodySmall'}>
          本软件是经理端的辅助软件，目前提供少量管理侧功能。
        </Text>
      </View>
      <View style={{marginTop: 40}}>
        <Button onPress={gotoTicket}>客户取票</Button>
      </View>
    </View>
  );
}
