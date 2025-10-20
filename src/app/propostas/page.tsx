'use client'
import './page.css'
import { useEffect, useState } from "react"
import { useClienteStore } from "@/context/ClienteContext"
import { PropostaI } from "@/utils/types/propostas"

export default function Propostas() {
  const [propostas, setPropostas] = useState<PropostaI[]>([])
  const { cliente } = useClienteStore()

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/propostas/${cliente.id}`)
      const dados = await response.json()
      setPropostas(dados)
    }
    if (cliente?.id) buscaDados()
  }, [cliente])

  function dataDMA(data: string) {
    const ano = data.substring(0, 4)
    const mes = data.substring(5, 7)
    const dia = data.substring(8, 10)
    return `${dia}/${mes}/${ano}`
  }

  const propostasTable = propostas.map(proposta => (
    <tr key={proposta.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <p><b>{proposta.Item.marca.nome} {proposta.Item.modelo}</b></p>
        <p className="mt-3">
          Tipo: {proposta.Item.tipos} — R$:{" "}
          {Number(proposta.Item.preco).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
        </p>
      </th>
      <td className="px-6 py-4">
        <img
          src={proposta.Item.foto}
          alt="Foto do Item"
          className="w-40 h-40 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
        />

      </td>
      <td className="px-6 py-4">
        <p><b>{proposta.descricao}</b></p>
        <p><i>Enviado em: {dataDMA(proposta.createdAt)}</i></p>
      </td>
      <td className="px-6 py-4">
        {proposta.resposta ? (
          <>
            <p><b>{proposta.resposta}</b></p>
            <p><i>Respondido em: {dataDMA(proposta.updatedAt as string)}</i></p>
          </>
        ) : (
          <i>Aguardando resposta...</i>
        )}
      </td>
    </tr>
  ))

  return (
    <section className="max-w-7xl mx-auto">
      <h1 className="mb-6 mt-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        Minhas <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">Propostas</span>
      </h1>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Item</th>
            <th scope="col" className="px-6 py-3">Foto</th>
            <th scope="col" className="px-6 py-3">Proposta</th>
            <th scope="col" className="px-6 py-3">Resposta</th>
          </tr>
        </thead>
        <tbody>{propostasTable}</tbody>
      </table>
    </section>
  )
}
