export type Currency = 'NGN' | 'GHS' | 'USD' | 'ZAR' | 'KES' | 'XOF';

// See: Paystack InlineJS supported channels (v2).
export type PaymentChannels =
  | 'card'
  | 'bank'
  | 'ussd'
  | 'qr'
  | 'eft'
  | 'mobile_money'
  | 'bank_transfer'
  | 'apple_pay';

export type Bearer = 'account' | 'subaccount';

export type Phone = number | string;

export interface PaystackCustomField {
  display_name: string;
  variable_name: string;
  value: unknown;
}

export type PaystackMetadata = Record<string, unknown> & {
  custom_fields?: PaystackCustomField[];
};

export interface PaystackConnectSplit {
  account_id: string;
  share: number;
}

export interface PaystackTransaction {
  reference: string;
  trans?: string;
  transaction?: string;
  trxref?: string;
  status?: string;
  message?: string;
}

export type callback<T = unknown> = (response?: T) => void;

// Public config for this library (maps to InlineJS transaction options).
// Required per InlineJS: key (publicKey), email, amount.
export interface PaystackProps {
  publicKey: string;
  email: string;
  amount: number;

  // Paystack InlineJS v2 uses camelCase, but we keep the older keys too for compatibility.
  firstName?: string;
  lastName?: string;
  firstname?: string;
  lastname?: string;

  phone?: Phone;
  customerCode?: string;
  reference?: string;
  metadata?: PaystackMetadata;
  currency?: Currency | string;
  channels?: PaymentChannels[] | string[];

  label?: string;
  plan?: string;
  quantity?: number;
  subaccount?: string;
  transaction_charge?: number;
  bearer?: Bearer;
  split_code?: string;
  split?: Record<string, unknown>;
  connect_split?: PaystackConnectSplit[];
  connect_account?: string;
  onBankTransferConfirmationPending?: callback;
}

export type InitializePayment = (options: {
  onSuccess?: callback<PaystackTransaction>;
  onClose?: callback;
  config?: Partial<Omit<PaystackProps, 'publicKey'>>;
}) => void;

export type HookConfig = Pick<PaystackProps, 'publicKey' | 'email' | 'amount'> &
  Omit<Partial<PaystackProps>, 'publicKey' | 'email' | 'amount'>;

// Internal type for the InlineJS newTransaction options we pass to @paystack/inline-js.
export type PaystackInlineOptions = {
  key: string;
  email: string;
  amount: number;
  onSuccess: callback<PaystackTransaction>;
  onCancel: callback;

  currency?: Currency | string;
  firstName?: string;
  lastName?: string;
  phone?: Phone;
  customerCode?: string;
  channels?: PaymentChannels[] | string[];
  metadata?: PaystackMetadata;
  reference?: string;

  label?: string;
  plan?: string;
  quantity?: number;
  subaccount?: string;
  transaction_charge?: number;
  bearer?: Bearer;
  split_code?: string;
  split?: Record<string, unknown>;
  connect_split?: PaystackConnectSplit[];
  connect_account?: string;
  onBankTransferConfirmationPending?: callback;
};
