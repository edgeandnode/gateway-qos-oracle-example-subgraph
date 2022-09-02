import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes } from "@graphprotocol/graph-ts"
import { Message } from "../generated/DataEdge/DataEdge"

export function createMessageEvent(data: Bytes): Message {
  let messageEvent = changetype<Message>(newMockEvent())

  messageEvent.parameters = new Array()

  messageEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )

  return messageEvent
}
