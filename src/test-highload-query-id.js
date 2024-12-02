const TonWeb = require("./index");
const HighloadQueryId = TonWeb.HighloadWallets.HighloadQueryId;

if (HighloadQueryId.fromSeqno(BigInt(0)).toSeqno() !== BigInt(0))
  throw new Error();

const i = HighloadQueryId.fromSeqno(BigInt(1022));
if (i.toSeqno() !== BigInt(1022)) throw new Error();
const i2 = HighloadQueryId.fromSeqno(BigInt(1023));
if (i2.toSeqno() !== BigInt(1023)) throw new Error();
const i3 = HighloadQueryId.fromSeqno(BigInt(1024));
if (i3.toSeqno() !== BigInt(1024)) throw new Error();
const i4 = HighloadQueryId.fromSeqno(BigInt(8380415));
if (i4.toSeqno() !== BigInt(8380415)) throw new Error();

let queryId = new HighloadQueryId();
console.log(queryId.getQueryId(), queryId.hasNext());

const MAX = BigInt(2) ** BigInt(13) * BigInt(1023) - BigInt(2);
for (let i = 0; i < MAX; i++) {
  queryId = queryId.getNext();

  const q = queryId.getQueryId();
  const q2 = HighloadQueryId.fromQueryId(q);

  if (queryId.getShift() !== q2.getShift()) throw new Error();
  if (queryId.getBitNumber() !== q2.getBitNumber()) throw new Error();
  if (q2.getQueryId() !== q) throw new Error();

  const q3 = HighloadQueryId.fromShiftAndBitNumber(
    queryId.getShift(),
    queryId.getBitNumber()
  );
  if (queryId.getShift() !== q3.getShift()) throw new Error();
  if (queryId.getBitNumber() !== q3.getBitNumber()) throw new Error();
  if (q3.getQueryId() !== q) throw new Error();

  if (!queryId.hasNext()) {
    console.log("END");
  }
}
console.log(queryId.shift);
console.log(queryId.bitnumber);

console.log(queryId.getQueryId(), queryId.hasNext());
