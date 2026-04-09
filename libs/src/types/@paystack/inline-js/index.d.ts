declare module '@paystack/inline-js' {
  export default class PaystackPop {
    newTransaction(options: Record<string, unknown>): void;
    checkout?(options: Record<string, unknown>): Promise<unknown>;
    resumeTransaction?(accessCode: string): void;
  }
}
