import React from 'react';
import {Control, Controller, UseControllerProps} from 'react-hook-form';
import {KeyboardTypeOptions} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {styles} from './styles';

interface Props {
  control: Control<any, any>;
  hasError?: boolean;
  name: string;
  label: string;
  keyboardType?: KeyboardTypeOptions;
  rules?: UseControllerProps['rules'];
}

export const MyInput = ({
  control,
  name,
  label,
  hasError,
  keyboardType = 'default',
  rules,
}: Readonly<Props>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            mode="outlined"
            label={label}
            onBlur={onBlur}
            keyboardType={keyboardType}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {hasError && <Text style={styles.errorMsg}>{label} is required.</Text>}
    </>
  );
};
