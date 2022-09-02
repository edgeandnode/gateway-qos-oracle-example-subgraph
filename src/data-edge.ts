import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import { DataEdge, SubmitQoSPayloadCall } from "../generated/DataEdge/DataEdge"
import { OracleMessage } from "../generated/schema"

export function handleSubmitQoSPayload(call: SubmitQoSPayloadCall): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = OracleMessage.load(call.transaction.hash.toHexString())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new OracleMessage(call.transaction.hash.toHexString())
  }

  // Entity fields can be set based on event parameters
  entity.payload = call.inputs._payload.toString();
  entity.createdAt = call.block.timestamp;

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // None
}
