'use client'
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type Inputs = {
  nome: string
  email: string
  senha: string
  cidade: string
}

export default function NovoCliente() {
  const { register, handleSubmit, reset } = useForm<Inputs>()
  const router = useRouter()

  async function cadastrarCliente(data: Inputs) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    if (response.status === 201) {
      toast.success("Cadastro realizado com sucesso! Faça login.")
      reset()
      router.push("/login")
    } else {
      toast.error("Erro ao cadastrar cliente. Tente novamente.")
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-24">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-black">
        Criação de Conta
      </h1>

      <form onSubmit={handleSubmit(cadastrarCliente)} className="space-y-4">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-900 dark:text-black">
            Nome completo
          </label>
          <input
            type="text"
            id="nome"
            required
            {...register("nome")}
            className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-black"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-black">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            required
            {...register("email")}
            className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-black"
          />
        </div>

        <div>
          <label htmlFor="senha" className="block text-sm font-medium text-gray-900 dark:text-black">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            required
            {...register("senha")}
            className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-black"
          />
        </div>

        <div>
          <label htmlFor="cidade" className="block text-sm font-medium text-gray-900 dark:text-black">
            Cidade
          </label>
          <input
            type="text"
            id="cidade"
            required
            {...register("cidade")}
            className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 text-black py-2.5 rounded-lg hover:bg-blue-800"
        >
          Criar Conta
        </button>
      </form>
    </div>
  )
}
