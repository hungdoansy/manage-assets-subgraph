# Manage Assets Subgraph

This is an example of mine trying to learn TheGraph by implementing a simple SubGraph. It handles Transfer events on TetherUSDT contract ([Ropsten](https://ropsten.etherscan.io/address/0x110a13fc3efe6a245b50102d2d79b3e76125ae83)).

### Development

1. Clone this repo
2. `yarn codegen` to generate SubGraph codes
3. `yarn build`
4. `yarn deploy`

### Deployment

SubGraph is available [here](https://thegraph.com/hosted-service/subgraph/hungdoansy/manage-assets-subgraph).

Try with this sample query:

```gql
{
    transfers(first: 10, orderBy: timestamp, where: { to: "0xa9e2a9cb0b391b569fca2926441c4d8995d26e40" }) {
        id
        from
        to
        amount
        timestamp
    }
}
```
