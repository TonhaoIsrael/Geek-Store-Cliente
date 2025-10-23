import { create } from "zustand"
import { persist } from "zustand/middleware"
import { ClienteI } from "@/utils/types/clientes"

type ClienteStore = {
  cliente: ClienteI
  logaCliente: (clienteLogado: ClienteI) => void
  deslogaCliente: () => void
}

export const useClienteStore = create<ClienteStore>()(
  persist(
    (set) => ({
      cliente: {} as ClienteI,
      logaCliente: (clienteLogado) => set({ cliente: clienteLogado }),
      deslogaCliente: () => set({ cliente: {} as ClienteI })
    }),
    {
      name: "clienteKey" // chave usada no localStorage
    }
  )
)
