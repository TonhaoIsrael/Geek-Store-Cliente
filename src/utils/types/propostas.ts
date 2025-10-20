import { ItemI } from "./items"
import { ClienteI } from "./clientes"

export interface PropostaI {
  id: number
  clienteId: string
  cliente: ClienteI
  ItemId: number
  Item: ItemI
  descricao: string
  resposta?: string
  createdAt: string
  updatedAt: string
  adminId?: string
}

