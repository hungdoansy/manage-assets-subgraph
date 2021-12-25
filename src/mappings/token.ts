import { BigDecimal, BigInt } from "@graphprotocol/graph-ts"
import { Transfer as TransferEvent } from "../types/templates/Token/Token"
import { Transfer } from "../types/schema"

export function handleTransfer(event: TransferEvent): void {
    const transactionHash = event.transaction.hash.toHexString()
    const transfer = new Transfer(transactionHash)

    const from = event.params.from
    const to = event.params.to

    transfer.from = from
    transfer.to = to
    transfer.timestamp = event.block.timestamp
    transfer.block = event.block.number

    transfer.amount = event.params.value.toBigDecimal().div(BigDecimal.fromString("1000000"))

    transfer.save()
}
