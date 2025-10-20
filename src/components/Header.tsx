"use client"
import Link from "next/link"
import { useClienteStore } from "@/context/ClienteContext"
import { useRouter } from "next/navigation"

export function Header() {
  const { cliente, deslogaCliente } = useClienteStore()
  const router = useRouter()

  function clienteSair() {
    if (confirm("Confirma saída do sistema?")) {
      deslogaCliente()
      localStorage.removeItem("clienteKey")
      router.push("/login")
    }
  }

  return (
    <nav className="border-blue-500 bg-blue-400 dark:bg-blue-800 dark:border-blue-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="./logo.png" className="h-12" alt="Logo Geek Store" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Geek Store
          </span>
        </Link>

        <div className="hidden w-full md:block md:w-auto">
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent">
            <li>
              {cliente.id ? (
                <>
                  <span className="text-black dark:text-white font-bold">
                    {cliente.nome}
                  </span>
                  &nbsp;&nbsp;
                  <Link
                    href="/propostas"
                    className="text-white font-bold bg-gray-600 hover:bg-gray-700 focus:ring-2 focus:outline-none focus:ring-gray-400 rounded-lg text-sm w-full sm:w-auto px-3 py-2 text-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                  >
                    Minhas Propostas
                  </Link>
                  &nbsp;&nbsp;
                  <span
                    className="cursor-pointer font-bold text-gray-600 dark:text-gray-300"
                    onClick={clienteSair}
                  >
                    Sair
                  </span>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Entrar
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
