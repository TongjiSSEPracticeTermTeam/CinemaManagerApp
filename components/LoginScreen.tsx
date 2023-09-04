import {Alert, View} from 'react-native';
import * as React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {Text, Button, TextInput, ActivityIndicator} from 'react-native-paper';
import axios from 'axios';
import {LoginResponse} from '../dto/LoginResponse';
import {useStoreActions} from '../store';
import storage from '../storage';

export default function LoginScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const setToken = useStoreActions(state => state.changeToken);

  const login = () => {
    setLoading(true);
    axios
      .post('https://cinema.cinea.com.cn/api/Manager/login', {
        username: userName,
        password: password,
      })
      .then(res => {
        setLoading(false);
        if (res.data && res.data.status && res.data.status === '10000') {
          let response: LoginResponse = res.data;
          setToken(response.token);
          storage.save({key: 'token', data: response.token}).then();
          Alert.alert(
            '登录成功',
            `欢迎使用本系统，用户${response.userdata.name}`,
          );
        } else {
          Alert.alert('登录失败', `${res.data.message}`);
        }
      })
      .catch(() => {
        setLoading(false);
        Alert.alert('登录失败', '网络连接错误');
      });
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text variant={'headlineSmall'}>登录到同济院线</Text>
      <View style={{marginTop: 20}}>
        <Text variant={'bodySmall'}>提示：请您使用经理账户登录</Text>
      </View>
      <View style={{marginTop: 40}}>
        <TextInput
          style={{width: 200}}
          mode="outlined"
          label="用户名"
          value={userName}
          onChangeText={setUserName}
        />
      </View>
      <View style={{marginTop: 10}}>
        <TextInput
          style={{width: 200}}
          mode="outlined"
          label="密码"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={{marginTop: 40, flexDirection: 'row'}}>
        <Button onPress={() => login()}>登录</Button>
        {loading ? <ActivityIndicator /> : <></>}
      </View>
    </View>
  );
}
