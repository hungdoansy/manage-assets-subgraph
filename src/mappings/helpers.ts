import { Address, BigInt, BigDecimal } from "@graphprotocol/graph-ts"
import { ERC20 } from "../types/ManageAssets/ERC20"
import { ERC20SymbolBytes } from "../types/ManageAssets/ERC20SymbolBytes"
import { ERC20NameBytes } from "../types/ManageAssets/ERC20NameBytes"

export function isNullEthValue(value: string): boolean {
    return value == "0x0000000000000000000000000000000000000000000000000000000000000001"
}

export function fetchTokenSymbol(tokenAddress: Address): string {
    const contract = ERC20.bind(tokenAddress)
    const contractSymbolBytes = ERC20SymbolBytes.bind(tokenAddress)

    // try types string and bytes32 for symbol
    let symbolValue = "unknown"
    const symbolResult = contract.try_symbol()
    if (symbolResult.reverted) {
        const symbolResultBytes = contractSymbolBytes.try_symbol()
        if (!symbolResultBytes.reverted) {
            // for broken pairs that have no symbol function exposed
            if (!isNullEthValue(symbolResultBytes.value.toHexString())) {
                symbolValue = symbolResultBytes.value.toString()
            }
        }
    } else {
        symbolValue = symbolResult.value
    }

    return symbolValue
}

export function fetchTokenName(tokenAddress: Address): string {
    const contract = ERC20.bind(tokenAddress)
    const contractNameBytes = ERC20NameBytes.bind(tokenAddress)

    // try types string and bytes32 for name
    let nameValue = "unknown"
    const nameResult = contract.try_name()
    if (nameResult.reverted) {
        const nameResultBytes = contractNameBytes.try_name()
        if (!nameResultBytes.reverted) {
            // for broken exchanges that have no name function exposed
            if (!isNullEthValue(nameResultBytes.value.toHexString())) {
                nameValue = nameResultBytes.value.toString()
            }
        }
    } else {
        nameValue = nameResult.value
    }

    return nameValue
}

export function fetchTokenDecimals(tokenAddress: Address): BigInt {
    const contract = ERC20.bind(tokenAddress)
    // try types uint8 for decimals
    let decimalValue = null
    const decimalResult = contract.try_decimals()
    if (!decimalResult.reverted) {
        decimalValue = decimalResult.value
    }
    return BigInt.fromI32(decimalValue as i32)
}
