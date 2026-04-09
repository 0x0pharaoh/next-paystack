import {HookConfig, InitializePayment, PaystackInlineOptions} from './types';
import {callPaystackPop} from './paystack-actions';

export default function usePaystackPayment(hookConfig: HookConfig): InitializePayment {
  function initializePayment({config, onSuccess, onClose}: Parameters<InitializePayment>[0]): void {
    const args = {...hookConfig, ...config};

    const {
      publicKey,
      firstName,
      lastName,
      firstname,
      lastname,
      phone,
      email,
      amount,
      reference,
      customerCode,
      metadata,
      currency = 'NGN',
      channels,
      label,
      plan,
      quantity,
      subaccount,
      transaction_charge,
      bearer,
      split,
      split_code,
      connect_account,
      connect_split,
      onBankTransferConfirmationPending,
    } = args;

    const resolvedFirstName = firstName ?? firstname;
    const resolvedLastName = lastName ?? lastname;

    const paystackArgs: PaystackInlineOptions = {
      onSuccess: onSuccess ? onSuccess : () => null,
      onCancel: onClose ? onClose : () => null,
      key: publicKey,
      email,
      amount,
      ...(resolvedFirstName && {firstName: resolvedFirstName}),
      ...(resolvedLastName && {lastName: resolvedLastName}),
      ...(phone && {phone}),
      ...(customerCode && {customerCode}),
      ...(reference && {reference}),
      ...(currency && {currency}),
      ...(channels && {channels}),
      ...(metadata && {metadata}),
      ...(label && {label}),
      ...(onBankTransferConfirmationPending && {onBankTransferConfirmationPending}),
      ...(subaccount && {subaccount}),
      ...(transaction_charge && {transaction_charge}),
      ...(bearer && {bearer}),
      ...(split && {split}),
      ...(split_code && {split_code}),
      ...(plan && {plan}),
      ...(quantity && {quantity}),
      ...(connect_split && {connect_split}),
      ...(connect_account && {connect_account}),
    };

    callPaystackPop(paystackArgs);
  }

  return initializePayment;
}
