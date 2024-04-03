import React, {useCallback, useEffect, useState} from 'react';
import {Control, Controller, UseControllerProps} from 'react-hook-form';
import {Text, TextInput, TouchableRipple} from 'react-native-paper';
import {styles} from './styles';
import DatePicker from 'react-native-date-picker';
import {Keyboard} from 'react-native';

interface Props {
  control: Control<any, any>;
  hasError?: boolean;
  name: string;
  label: string;
  rules?: UseControllerProps['rules'];
}

export const MyDatePicker = ({
  control,
  name,
  label,
  hasError,
  rules,
}: Readonly<Props>) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => Keyboard.dismiss(), [open]);

  const openPicker = useCallback(() => setOpen(true), []);
  const closePicker = useCallback(() => setOpen(false), []);

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field: {onChange, value}}) => (
          <>
            <TouchableRipple onPress={openPicker}>
              <TextInput
                mode="outlined"
                label={label}
                editable={false}
                value={value}
              />
            </TouchableRipple>
            <DatePicker
              modal
              maximumDate={new Date()}
              mode="date"
              open={open}
              date={date}
              onConfirm={_date => {
                closePicker();
                setDate(_date);
                onChange(_date.toDateString());
              }}
              onCancel={closePicker}
            />
          </>
        )}
      />

      {hasError && <Text style={styles.errorMsg}>{label} is required.</Text>}
    </>
  );
};
