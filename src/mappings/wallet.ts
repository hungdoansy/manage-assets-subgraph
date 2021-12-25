import { NewToken as NewTokenEvent, NewWallet as NewWalletEvent } from "../types/ManageAssets/ManageAssets"
import { Token as TokenTemplate } from "../types/templates"
import { Token, Wallet } from "../types/schema"

import { fetchTokenSymbol, fetchTokenName, fetchTokenDecimals } from "./helpers"

export function handleNewToken(event: NewTokenEvent): void {
    let token = Token.load(event.params._address.toHexString())

    if (token === null) {
        token = new Token(event.params._address.toHexString())

        token.symbol = fetchTokenSymbol(event.params._address)
        token.name = fetchTokenName(event.params._address)
        token.decimals = fetchTokenDecimals(event.params._address)
    }

    TokenTemplate.create(event.params._address)

    token.save()
}

export function handleNewWallet(event: NewWalletEvent): void {
    let wallet = Wallet.load(event.params._address.toHexString())

    if (wallet === null) {
        wallet = new Wallet(event.params._address.toHexString())
    }

    wallet.save()
}
