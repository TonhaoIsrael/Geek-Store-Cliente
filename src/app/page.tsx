/* eslint-disable @next/next/no-img-element */
"use client"
import { useEffect, useState } from "react"
import { CardItem } from "@/components/CardItem"
import { InputPesquisa } from "@/components/InputPesquisa"
import { ItemI } from "@/utils/types/items"
import { useClienteStore } from "@/context/ClienteContext"

export default function Home() {
  const [items, setItems] = useState<ItemI[]>([])
  const [mostrarDestaques, setMostrarDestaques] = useState(false)
  const { logaCliente } = useClienteStore()

  useEffect(() => {
    async function carregarItens() {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/items`)
      const dados: ItemI[] = await resp.json()
      // Ordena: destaques primeiro
      setItems(dados.sort((a, b) => Number(b.destaque) - Number(a.destaque)))
    }

    carregarItens()

    const idCliente = localStorage.getItem("clienteKey")
    if (idCliente) {
      fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/${idCliente}`)
        .then(r => r.json())
        .then(logaCliente)
    }
  }, [])

  const itensExibidos = mostrarDestaques ? items.filter(i => i.destaque) : items

  return (
    <div className="max-w-7xl mx-auto mt-6">
      <InputPesquisa
        setItems={setItems}
        mostrarDestaques={mostrarDestaques}
        setMostrarDestaques={setMostrarDestaques}
      />

      <h1 className="mt-6 mb-4 text-4xl font-extrabold text-gray-900 dark:text-white text-center">
        Catálogo de{" "}
        <span className="underline underline-offset-4 decoration-orange-500">
          Produtos
        </span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {itensExibidos.map(item => (
          <CardItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  )
}
