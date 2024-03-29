import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Color, Radius } from '../../style';
import _Button from './button';
import _ClusterOption from './cluster-option';
import _Text from './text';

const _Dialog = (props: any) => {
    /*
    Props: JA TODO 
    */
    const [amount,setAmount] = useState(0);
    const [selected,setSelected] = useState([]);

    const toggle = (e: any) => {
        var options = [] as never[];
        var hasItem = false;
        for (var i = 0; i < selected.length; i++) {
            if (selected[i] === e)
                hasItem = true;
            else
                options.push(selected[i]);
        }
        
        if (!hasItem) {
            if (selected.length + 1 <= props.minAmount) {
                options.push(e as never);
                setAmount(selected.length + 1);
            }
        }
        else {
            setAmount(selected.length - 1)
        }

        setSelected(options);
        props.selected(options);
    }

    const mappedItems = () => {
        return props.options.map((item: any, key: any) => {
            return <_ClusterOption
            isDarkMode={props.isDarkMode}
            selected={selected}
            onPress={toggle}
            key={key}
            item={item}
            />
        });
    }

    const styles = StyleSheet.create({
        count: {
            color: Color(props.isDarkMode).textSecondary
        },
        header: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 5
        },
        cluster: {
            backgroundColor: Color(props.isDarkMode).holder,
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            borderRadius: Radius.default,
            padding: 7.5,
            shadowColor: Color(props.isDarkMode).holderSecondary,
            shadowOffset: {width: -3, height: 3},
            shadowOpacity: 1,
            shadowRadius: 0,
            marginLeft: 3,
            ...Platform.select({
                web: {
                    width: 'calc(100% - 3px)'
                },
                android: {
                    marginLeft: 0
                }
            })
        },
    });

  return (
    <View
    style={props.containerStyle}
    >
        <View>
            <_Button
            ></_Button>
            <_Button></_Button>
        </View>
    </View>
  );
};

export default _Dialog;