import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import { DataEdge, SubmitQoSPayloadCall } from "../generated/DataEdge/DataEdge"
import { OracleMessage } from "../generated/schema"

export function handleSubmitQoSPayload(call: SubmitQoSPayloadCall): void {

  let entity = OracleMessage.load(call.transaction.hash.toHexString())

  if (!entity) {
    entity = new OracleMessage(call.transaction.hash.toHexString())
  }

  entity.payload = call.inputs._payload.toString();
  entity.createdAt = call.block.timestamp;

  entity.save()

}
