import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { Transfer as TransferEvent } from "../generated/Token/Token";
import { Transfer } from "../generated/schema";

export function handleTransfer(event: TransferEvent): void {
  let transactionHash = event.transaction.hash.toHexString();
  let transfer = new Transfer(transactionHash);

  let from = event.params.from;
  let to = event.params.to;

  transfer.from = from;
  transfer.to = to;
  transfer.timestamp = event.block.timestamp;
  transfer.block = event.block.number;

  transfer.amount = event.params.value
    .toBigDecimal()
    .div(BigDecimal.fromString("1000000"));

  transfer.save();
}
