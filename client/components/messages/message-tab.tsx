import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { getLocalStorage } from '../../helper';
import { Color } from '../../style';

interface Props {
  chat: any,
  setCurrentChat: any,
  showPanel: boolean,
  updateShowPanel: Dispatch<SetStateAction<boolean>>,
}

const MessageTab = ({chat, setCurrentChat, showPanel, updateShowPanel}: Props) => {
  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    getUserInfo();
  }, [])

  const getUserInfo = async () => {
    setUserInfo(await getLocalStorage().then((res) => {return res.user}));
  }
  
  const getPrefix = (id: string) => {
    if (!userInfo) return '';
    if (id === userInfo.id) {
      return 'You: ';
    }
    for (let i = 0; i < chat.users.length; i++) {
      if (chat.users[i].id === id) {
        return chat.users[i].first_name + ': ';
      }
    }
    return '';
  }

  const getContent = (content: string) => {
    if (!content) return '';
    return content;
  }

  const displayNotification = (count: number) => {
    if (count === 0) return <></>
    if (count > 9) return <Text style={styles.notification}>{'9+'}</Text>
    return <Text style={styles.notification}>{count}</Text>
  };

  return (
    <TouchableHighlight
      style={styles.touchable}
      underlayColor="gainsboro"
      onPress={() => {
        updateShowPanel(!showPanel);
        setCurrentChat(chat);
      }}
    >
      <View style={styles.content}>
        <Image style={styles.image} source={{ uri: (chat?.users[0]?.image != null) ? chat?.users[0]?.image : 'https://reactnative.dev/img/tiny_logo.png'}} />
        <View style={styles.text}>
            <Text numberOfLines={1} style={styles.name}>{chat?.users[0]?.first_name + ' ' + chat?.users[0]?.last_name}</Text>
            <Text numberOfLines={2}>{getPrefix(chat.latestMessage?.userId) + getContent(chat.latestMessage?.content)}</Text>
        </View>
        <View style={styles.notificationContainer}>
          {displayNotification(chat.notifCount)}
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 70,
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    flex: 1,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  text: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  notification: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
    backgroundColor: Color(false).default,
    borderRadius: 15,
    color: 'white',
  },
});

export default MessageTab;