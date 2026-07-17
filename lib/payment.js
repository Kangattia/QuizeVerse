// On-chain payment configuration for Quizverse's "pay to play / pay to
// continue" feature.
//
// !! IMPORTANT !! Replace FEE_RECEIVER below with YOUR OWN Base App wallet
// address before deploying. Copy it directly from your wallet app (don't
// type it by hand) - a wrong address here means fees are sent somewhere
// you can never get them back from.
export const FEE_RECEIVER = "0x02516575c9b4ea63e754254df2e7f1699a5c41b0";

// ~0.000001 ETH, roughly $0.002 at the time this was written. Since this is
// priced in ETH (not a stablecoin), the exact USD value will drift up or
// down over time as ETH's price changes - you accepted that trade-off in
// exchange for simpler, more reliable code. Adjust this number any time.
export const FEE_AMOUNT_WEI = 1000000000000n;

// A level counts as "failed" (triggers the pay-to-continue gate) when the
// score is below this many correct answers out of a normal 10-question round.
export const PASSING_SCORE = 5;
