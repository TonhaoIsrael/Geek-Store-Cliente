import { ItemI } from "./items"

export interface MarcaI {
  id: number
  nome: string
  items?: ItemI[]
}
