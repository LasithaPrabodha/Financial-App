import React, {useEffect, useState} from 'react';
import {Control, Controller, UseControllerProps} from 'react-hook-form';
import {Keyboard, LayoutChangeEvent, ScrollView} from 'react-native';
import {Menu, TextInput, TouchableRipple, Text} from 'react-native-paper';
import {styles} from './styles';

interface Props {
  control: Control<any, any>;
  list: any[];
  name: string;
  label: string;
  keyAttr?: string;
  hasError?: boolean;
  rules?: UseControllerProps['rules'];
}

export const MyMenu = ({
  control,
  list,
  name,
  label,
  keyAttr,
  hasError,
  rules,
}: Readonly<Props>) => {
  const [visible, setVisible] = useState(false);
  const [inputLayout, setInputLayout] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const onLayout = (event: LayoutChangeEvent) => {
    setInputLayout(event.nativeEvent.layout);
  };

  useEffect(() => Keyboard.dismiss(), [visible]);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field: {onChange, onBlur, value}}) => (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchorPosition="bottom"
            style={{width: inputLayout.width}}
            anchor={
              <TouchableRipple onLayout={onLayout} onPress={openMenu}>
                <TextInput
                  mode="outlined"
                  label={label}
                  editable={false}
                  value={keyAttr ? value?.name : value}
                  onBlur={onBlur}
                  right={
                    <TextInput.Icon
                      onPress={openMenu}
                      icon={visible ? 'caret-up' : 'caret-down'}
                    />
                  }
                  onChangeText={onChange}
                />
              </TouchableRipple>
            }>
            <ScrollView style={{width: inputLayout.width}} bounces={false}>
              {list.map((_item, _index) => (
                <Menu.Item
                  style={{flex: 1, maxWidth: inputLayout.width}}
                  key={keyAttr ? _item[keyAttr] : _item}
                  onPress={() => {
                    onChange(_item);
                    closeMenu();
                  }}
                  title={keyAttr ? _item.name : _item}
                />
              ))}
            </ScrollView>
          </Menu>
        )}
      />
      {hasError && <Text style={styles.errorMsg}>{label} is required.</Text>}
    </>
  );
};
