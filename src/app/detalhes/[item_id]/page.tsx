/* eslint-disable @next/next/no-img-element */
"use client"
import { ItemI } from "@/utils/types/items"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useClienteStore } from "@/context/ClienteContext"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Inputs = {
  descricao: string
}

export default function Detalhes() {
  const params = useParams()
  const [item, setItem] = useState<ItemI>()
  const { cliente } = useClienteStore()
  const { register, handleSubmit, reset } = useForm<Inputs>()

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`https://geek-store-delta.vercel.app/items/${params.item_id}`)
      const dados = await response.json()
      setItem(dados)
    }
    buscaDados()
  }, [params.item_id])

  const listaFotos = item?.fotos?.map(foto => (
    <div key={foto.id}>
      <img
        src={foto.url} // ← corrigido (no schema é url, não codigoFoto)
        alt={foto.descricao}
        title={foto.descricao}
        className="h-52 max-w-80 rounded-lg"
      />
    </div>
  ))

  async function enviaProposta(data: Inputs) {
    const response = await fetch(`https://geek-store-delta.vercel.app/propostas`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",

      body: JSON.stringify({
        clienteId: cliente.id,
        ItemId: Number(params.item_id), // ← com I maiúsculo
        descricao: data.descricao
      })
    })

    if (response.status === 201) {
      toast.success("Obrigado! Sua proposta foi enviada. Aguarde o retorno.")
      reset()
    } else {
      toast.error("Erro... Não foi possível enviar sua proposta.")
    }
  }

  return (
    <>
      <section className="flex mt-6 mx-auto flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        {item?.foto && (
          <>
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg"
              src={item.foto}
              alt="Foto do Produto"
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.marca?.nome} {item.modelo}
              </h5>
              <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
                Tipo: {item.tipos}
              </h5>
              <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
                Preço R$:{" "}
                {Number(item.preco).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2
                })}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {item.acessorios}
              </p>

              {cliente.id ? (
                <>
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    🙂 Você pode fazer uma Proposta para este produto!
                  </h3>
                  <form onSubmit={handleSubmit(enviaProposta)}>
                    <input
                      type="text"
                      className="mb-2 mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={`${cliente.nome} (${cliente.email})`}
                      disabled
                      readOnly
                    />
                    <textarea
                      id="descricao"
                      className="mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Descreva a sua proposta"
                      required
                      {...register("descricao")}
                    ></textarea>
                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Enviar Proposta
                    </button>
                  </form>
                </>
              ) : (
                <h2 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
                  😎 Gostou? Identifique-se e faça uma Proposta!
                </h2>
              )}
            </div>
          </>
        )}
      </section>

      <div className="mt-4 md:max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {listaFotos}
      </div>
    </>
  )
}
