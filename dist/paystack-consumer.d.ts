import { PaystackProps } from './types';
interface PaystackConsumerProps extends PaystackProps {
    children: (arg: Record<string, any>) => any;
    onSuccess?: () => void;
    onClose?: () => void;
}
declare const PaystackConsumer: import("react").ForwardRefExoticComponent<PaystackConsumerProps & import("react").RefAttributes<unknown>>;
export default PaystackConsumer;
