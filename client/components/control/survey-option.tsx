import { useLinkProps, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Platform, Pressable, StyleSheet, View } from 'react-native';
import _Text from '../../components/control/text';
import { navProp } from '../../helper';
import { Color, FontSize, Radius, Style } from '../../style';

const _SurveyOption = (props: any) => {
    /* Props
    disabled: Disables the button
    navigate: Navigate to a location in the stack using NavTo
    onPress: Trigger your function
    style: Give the button custom styling or use one of the predefined button styles
    value: Give the button text
    children: If the value is empty, the button will use the nested content
    */
    const navigation = useNavigation<navProp>();
    useEffect(() => {
    }, [props.item.selected]);

    const textStyle = () => {
        var style = [];
        style.push(styles.text);
        if (props.selected)
            style.push(styles.textSelected);
        if (props.textStyle)
            style.push(props.textStyle);

        return style;
    }

    const press = () => {
        if (props.onPress) {
            props.onPress();
        }
    }

    const style = () => {
        var style = [];
        style.push(styles.surveyOption);
        if (!props.selected)
            style.push(styles.surveyOptionDefault);
        else
            style.push(styles.surveyOptionSelected);

        style.push(props.style);
        return style;
    }

    const containerStyle = () => {
        var style = [];
        style.push(styles.container);
        style.push(props.containerStyle);
        return style;
    }

    return (
    <View
    style={containerStyle()}
    >
        <Pressable
        style={style()}
        onPress={() => press()}
        >
            <View
            style={styles.contentContainer}
            >
                <_Text
                style={textStyle()}
                containerStyle={{width: "100%"}}
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
        color: Color.text,
        fontSize: FontSize.default,
    },
    textSelected: {
        color: Color.white,
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    container: {
        width: "100%"
    },
    surveyOption: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: Radius.default,
        marginLeft:3,
        display: 'flex',

    },
    surveyOptionDefault: {
        backgroundColor: Color.holder,
        ...Platform.select({
            web: {
                shadowColor: Color.holderSecondary,
                shadowOffset: {width: -3, height: 3},
                shadowOpacity: 1,
                shadowRadius: 0,
            }
        }),
    },
    surveyOptionSelected: {
        backgroundColor: Color.success,
        ...Platform.select({
            web: {
                shadowColor: Color.successSecondary,
                shadowOffset: {width: -3, height: 3},
                shadowOpacity: 1,
                shadowRadius: 0,
            }
        }),
    }
});

export default _SurveyOption;