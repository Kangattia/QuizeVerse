"use client";

import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusLabel,
  TransactionStatusAction,
} from "@coinbase/onchainkit/transaction";
import { base } from "viem/chains";
import { FEE_RECEIVER, FEE_AMOUNT_WEI } from "@/lib/payment";

// A small reusable "pay a tiny ETH fee" button. Used both for the
// once-per-session start fee and the repeatable pay-to-continue fee.
export default function PayToPlay({ label, message, onPaid }) {
  const calls = [
    {
      to: FEE_RECEIVER,
      value: FEE_AMOUNT_WEI,
      data: "0x",
    },
  ];

  return (
    <div className="payGate">
      {message && <p className="walletGateText">{message}</p>}
      <Transaction
        chainId={base.id}
        calls={calls}
        onSuccess={() => onPaid()}
        onError={(e) => console.warn("Payment failed or was rejected:", e)}
      >
        <TransactionButton text={label} />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
    </div>
  );
}
