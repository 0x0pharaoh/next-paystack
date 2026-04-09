import type { ReactElement } from 'react';
import { callback, PaystackProps } from './types';
interface PaystackProviderProps extends PaystackProps {
    children: ReactElement;
    onSuccess: callback;
    onClose: callback;
}
declare const PaystackProvider: ({ children, onSuccess, onClose, ...config }: PaystackProviderProps) => ReactElement;
export default PaystackProvider;
