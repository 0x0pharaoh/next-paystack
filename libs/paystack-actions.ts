import type {PaystackInlineOptions} from './types';

type PaystackPopType = (typeof import('@paystack/inline-js'))['default'];

let paystackPopPromise: Promise<PaystackPopType> | null = null;

export const callPaystackPop = (paystackArgs: PaystackInlineOptions): void => {
  if (typeof window === 'undefined') {
    throw new Error(
      'react-paystack: Paystack can only be initialized in the browser. In Next.js, call this from a Client Component.',
    );
  }

  if (!paystackPopPromise) {
    paystackPopPromise = import('@paystack/inline-js').then((m) => m.default);
  }

  paystackPopPromise.then((PaystackPop) => {
    const paystack = new PaystackPop();
    paystack.newTransaction(paystackArgs);
  });
};
