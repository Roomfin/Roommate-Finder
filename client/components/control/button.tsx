import { useLinkProps, useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import _Text from '../../components/control/text';
import { navProp } from '../../helper';
import { Color, FontSize, Style } from '../../style';

const _Button = (props: any) => {
    /* Props
    disabled: Disables the button
    navigate: Navigate to a location in the stack using NavTo
    onPress: Trigger your function
    style: Give the button custom styling or use one of the predefined button styles
    value: Give the button text
    children: If the value is empty, the button will use the nested content
    */
    const navigation = useNavigation<navProp>();

    const textStyle = () => {
        var style = [];
        if (props.disabled || props.loading)
            style.push(styles.textDisabled)
        else
            style.push(styles.text);

        if (props.textStyle)
            style.push(props.textStyle);

        return style;
    }

    const press = () => {
        if (props.navigate) {
            navigation.navigate(props.navigate);
        }
        else if (props.onPress) {
            props.onPress();
        }
    }

    const style = () => {
        var style = [];
        style.push(Style.button);
        if (!props.style) {
            style.push(Style.buttonDefault);
         }
         else {
            style.push(props.style);
         }

         if (props.disabled || props.loading) {
            style.push(Style.buttonDisabled);
         }

         return style;
      }

    return (
    <View
    style={props.containerStyle}
    >
        <Pressable
        disabled={props.disabled || props.loading}
        style={style()}
        onPress={() => press()}
        >
            <View
            style={styles.contentContainer}
            >
                {props.loading ?
                <ActivityIndicator
                    size="small"
                    color={Color.textDisabled}
                    style={styles.loading}
                />
                : null}
                <_Text
                style={textStyle()}
                onPress={() => press()}
                >
                    {props.value ? props.value : props.children}
                </_Text>
            </View>
        </Pressable>
    </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: Color.white,
        fontSize: FontSize.default,
        margin: 'auto'
    },
    textDisabled: {
        color: Color.textDisabled,
        fontSize: FontSize.default,
        margin: 'auto'
    },
    contentContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    loading: {
        marginRight: 5
    }
});

export default _Button;