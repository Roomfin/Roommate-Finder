import { View, StyleSheet, Pressable, Text, Image } from "react-native";
import _Button from "../control/button";
import Svg, { Path } from "react-native-svg"


const returnIcon = (
  <Svg
    width={17}
    height={16}
    viewBox="0 0 17 16"
    fill="none"
  >
    <Path
      d="M5.173 8L12.85.774a.433.433 0 000-.64.5.5 0 00-.68 0L4.15 7.68a.433.433 0 000 .64l8.02 7.545a.5.5 0 00.338.134.484.484 0 00.338-.134.433.433 0 000-.64L5.173 8z"
      fill="#418DFC"
    />
  </Svg>
)

interface Props {
  chat: any,
  showPanel: any,
  updateShowPanel: any,
}

const MessageTopBar = ({showPanel, updateShowPanel, chat}: Props) => {
  if (!chat?.users || !chat.chatName) return <></>;
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => updateShowPanel(!showPanel)}>
          {returnIcon}
        </Pressable>
      </View>
      <Image style={styles.image} source={{ uri: (chat?.users[0]?.image != null) ? chat?.users[0]?.image : 'https://reactnative.dev/img/tiny_logo.png'}} />
      <Text numberOfLines={1} style={styles.name}>{chat.chatName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    minHeight: 55,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgray',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 30,
    height: 40,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  }
});

export default MessageTopBar;