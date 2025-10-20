import { MarcaI } from "./marcas"
import { FotoI } from "./fotos"

export interface ItemI {
  id: number
  modelo: string
  preco: number
  foto: string
  acessorios?: string
  tipos: "PC" | "PS1" | "PS2" | "PS3" | "PS4" | "PS5" | "XBOX"
  createdAt: string
  updatedAt: string
  destaque: boolean
  marca: MarcaI
  marcaId: number
  adminId: string
  fotos: FotoI[]
}
