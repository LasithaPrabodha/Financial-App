import React, {useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useForm} from 'react-hook-form';
import {Transaction, TransactionWithType} from '../interfaces/Transaction';
import {MyMenu} from '../components/MyMenu';
import {MyInput} from '../components/MyInput';
import {MyDatePicker} from '../components/MyDatePicker';
import {currencies, transactionTypes} from '../core/constants';
import TransactionsService from '../services/TransactionsService';
import {useNavigation} from '@react-navigation/native';
import {generateTransaction} from '../core/utils';

export const AddTransaction = () => {
  const navigation = useNavigation<any>();
  const {
    reset,
    setValue,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<TransactionWithType>({
    defaultValues: {
      company: '',
      amount: '',
      currency: '$',
      date: new Date().toDateString(),
      icon: null,
      location: '',
      product: '',
    },
  });
  const transactionsService = TransactionsService.getInstance();

  const generateFormWithRandomValues = useCallback(() => {
    const form = generateTransaction();
    setValue('amount', form.amount);
    setValue('company', form.company);
    setValue('currency', form.currency);
    setValue('date', form.date);
    setValue('icon', transactionTypes.find(t => t.icon === form.icon)!);
    setValue('location', form.location);
    setValue('product', form.product);
  }, [setValue]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          mode="text"
          onPress={generateFormWithRandomValues}
          style={{marginRight: 16}}>
          Generate
        </Button>
      ),
    });
  }, [navigation, generateFormWithRandomValues]);

  const onSubmit = (data: TransactionWithType) => {
    const transaction: Transaction = {
      ...data,
      icon: data.icon!.icon,
      date: new Date(Date.parse(data.date)).toISOString(),
    };
    transactionsService.saveTransaction(transaction);
    reset();
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <View style={{width: '35%'}}>
          <MyMenu
            control={control}
            label="Currency"
            list={currencies}
            name="currency"
          />
        </View>

        <View style={{marginLeft: 4, flex: 1, flexGrow: 1}}>
          <MyInput
            control={control}
            hasError={errors.amount !== undefined}
            label="Amount"
            name="amount"
            rules={{required: true}}
            keyboardType="number-pad"
          />
        </View>
      </View>

      <MyInput
        control={control}
        hasError={errors.product !== undefined}
        label="Product"
        name="product"
        rules={{required: true}}
      />

      <MyInput
        control={control}
        hasError={errors.company !== undefined}
        label="Company"
        name="company"
        rules={{required: true}}
      />

      <MyMenu
        control={control}
        label="Type"
        list={transactionTypes}
        hasError={errors.icon !== undefined}
        name="icon"
        keyAttr="icon"
        rules={{required: true}}
      />

      <MyInput control={control} label="Location" name="location" />

      <MyDatePicker
        control={control}
        label="Date"
        name="date"
        rules={{required: true}}
        hasError={errors.date !== undefined}
      />
      <Button
        style={styles.button}
        icon="save"
        mode="contained"
        onPress={handleSubmit(onSubmit)}>
        Save Transaction
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    flexDirection: 'column',
  },
  button: {width: 200, marginTop: 16, marginLeft: 'auto'},
});
