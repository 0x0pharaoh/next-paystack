"use client";
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var paystackPopPromise = null;
var callPaystackPop = function (paystackArgs) {
    if (typeof window === 'undefined') {
        throw new Error('react-paystack: Paystack can only be initialized in the browser. In Next.js, call this from a Client Component.');
    }
    if (!paystackPopPromise) {
        paystackPopPromise = import('@paystack/inline-js').then(function (m) { return m.default; });
    }
    paystackPopPromise.then(function (PaystackPop) {
        var paystack = new PaystackPop();
        paystack.newTransaction(paystackArgs);
    });
};

function usePaystackPayment(hookConfig) {
    function initializePayment(_a) {
        var config = _a.config, onSuccess = _a.onSuccess, onClose = _a.onClose;
        var args = __assign(__assign({}, hookConfig), config);
        var publicKey = args.publicKey, firstName = args.firstName, lastName = args.lastName, firstname = args.firstname, lastname = args.lastname, phone = args.phone, email = args.email, amount = args.amount, reference = args.reference, customerCode = args.customerCode, metadata = args.metadata, _b = args.currency, currency = _b === void 0 ? 'NGN' : _b, channels = args.channels, label = args.label, plan = args.plan, quantity = args.quantity, subaccount = args.subaccount, transaction_charge = args.transaction_charge, bearer = args.bearer, split = args.split, split_code = args.split_code, connect_account = args.connect_account, connect_split = args.connect_split, onBankTransferConfirmationPending = args.onBankTransferConfirmationPending;
        var resolvedFirstName = firstName !== null && firstName !== void 0 ? firstName : firstname;
        var resolvedLastName = lastName !== null && lastName !== void 0 ? lastName : lastname;
        var paystackArgs = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({ onSuccess: onSuccess ? onSuccess : function () { return null; }, onCancel: onClose ? onClose : function () { return null; }, key: publicKey, email: email, amount: amount }, (resolvedFirstName && { firstName: resolvedFirstName })), (resolvedLastName && { lastName: resolvedLastName })), (phone && { phone: phone })), (customerCode && { customerCode: customerCode })), (reference && { reference: reference })), (currency && { currency: currency })), (channels && { channels: channels })), (metadata && { metadata: metadata })), (label && { label: label })), (onBankTransferConfirmationPending && { onBankTransferConfirmationPending: onBankTransferConfirmationPending })), (subaccount && { subaccount: subaccount })), (transaction_charge && { transaction_charge: transaction_charge })), (bearer && { bearer: bearer })), (split && { split: split })), (split_code && { split_code: split_code })), (plan && { plan: plan })), (quantity && { quantity: quantity })), (connect_split && { connect_split: connect_split })), (connect_account && { connect_account: connect_account }));
        callPaystackPop(paystackArgs);
    }
    return initializePayment;
}

var PaystackButton = function (_a) {
    var text = _a.text, className = _a.className, children = _a.children, onSuccess = _a.onSuccess, onClose = _a.onClose, disabled = _a.disabled, config = __rest(_a, ["text", "className", "children", "onSuccess", "onClose", "disabled"]);
    var initializePayment = usePaystackPayment(config);
    return (jsxRuntime.jsx("button", { className: className, onClick: function () { return initializePayment({ config: config, onSuccess: onSuccess, onClose: onClose }); }, disabled: disabled, children: text || children }));
};

var PaystackContext = react.createContext({
    config: {},
    initializePayment: function () { return null; },
    onSuccess: function () { return null; },
    onClose: function () { return null; },
});

var PaystackProvider = function (_a) {
    var children = _a.children, onSuccess = _a.onSuccess, onClose = _a.onClose, config = __rest(_a, ["children", "onSuccess", "onClose"]);
    var initializePayment = usePaystackPayment(config);
    return (jsxRuntime.jsx(PaystackContext.Provider, { value: { config: config, initializePayment: initializePayment, onSuccess: onSuccess, onClose: onClose }, children: children }));
};

var PaystackConsumerChild = function (_a) {
    var children = _a.children, ref = _a.ref;
    var _b = react.useContext(PaystackContext), config = _b.config, initializePayment = _b.initializePayment, onSuccess = _b.onSuccess, onClose = _b.onClose;
    var completeInitializePayment = function () { return initializePayment({ config: config, onSuccess: onSuccess, onClose: onClose }); };
    return children({ initializePayment: completeInitializePayment, ref: ref });
};
// eslint-disable-next-line react/display-name
var PaystackConsumer = react.forwardRef(function (_a, ref) {
    var children = _a.children, paraSuccess = _a.onSuccess, paraClose = _a.onClose, others = __rest(_a, ["children", "onSuccess", "onClose"]);
    var onSuccess = paraSuccess ? paraSuccess : function () { return null; };
    var onClose = paraClose ? paraClose : function () { return null; };
    return (jsxRuntime.jsx(PaystackProvider, __assign({}, others, { onSuccess: onSuccess, onClose: onClose, children: jsxRuntime.jsx(PaystackConsumerChild, { ref: ref, children: children }) })));
});

exports.PaystackButton = PaystackButton;
exports.PaystackConsumer = PaystackConsumer;
exports.usePaystackPayment = usePaystackPayment;
//# sourceMappingURL=index.js.map
