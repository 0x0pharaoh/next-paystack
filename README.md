# Next Paystack (React + Next.js)

Minimal Paystack Inline payments for React apps, compatible with modern Next.js and TypeScript/JavaScript projects.

## Requirements

- `next@^16`
- `react@^18 || ^19`
- `react-dom@^18 || ^19`

Paystack opens a checkout UI in the browser, so this package must be used from a **Client Component** in Next.js.

## Install

```sh
npm i @0x0pharaoh/next-paystack
```

## Minimal example (Next.js App Router)

```tsx
'use client';

import {PaystackButton} from '@0x0pharaoh/next-paystack';

export default function Page() {
  return (
    <PaystackButton
      publicKey="pk_test_xxx"
      email="user@example.com"
      amount={20000}
      text="Pay now"
      onSuccess={(tx) => console.log(tx?.reference)}
      onClose={() => console.log('closed')}
    />
  );
}
```

## Required props (per Paystack Inline)

- `publicKey` (maps to InlineJS `key`)
- `email`
- `amount` (lowest currency unit, e.g. kobo)

## Hook (minimal)

```tsx
'use client';

import {usePaystackPayment} from '@0x0pharaoh/next-paystack';

export default function Donate() {
  const initializePayment = usePaystackPayment({
    publicKey: 'pk_test_xxx',
    email: 'user@example.com',
    amount: 20000,
  });

  return <button onClick={() => initializePayment({})}>Pay</button>;
}
```

## Types

```ts
import type {PaystackProps, PaystackTransaction} from '@0x0pharaoh/next-paystack';
```

## Paystack docs

- https://paystack.com/docs/payments/accept-payments/

## Attribution / lineage

- `https://github.com/iamraphson/react-paystack` is derived from `https://github.com/0x0pharaoh/next-paystack`.
- GitHub username and repo name match the URL (e.g. `0x0pharaoh/next-paystack`).

## License

MIT (see `LICENSE`).
