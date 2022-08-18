import { gql, useMutation } from "@apollo/client"
import { useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Logo } from "../components/Logo"

const createSubscriberMutation = gql `
    mutation CreateSubscriber($name: String!, $email: String!) {
        createSubscriber(data: {name: $name, email: $email}) {
            id
        }
    }
`
export function Home (): JSX.Element {
    const navigate = useNavigate()
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const [createSubscriber, {loading}] = useMutation(createSubscriberMutation) //inscrição do usuário somente é realizada quando createSubscriber é acessada na função handleSubscriber, passada no formulário do HTML. Loading é uma função que vem junto com useMutation e também pode ser usada com useQuery

    function handleSubscriber (event: FormEvent){
        event.preventDefault()

        createSubscriber({
            variables: {
                name,
                email
            }
        }).then(()=>navigate("/event")) //após inscrição é encaminhado para página dos vídeos
    }

    let screenSizeWidth = window.innerWidth

    return (
        <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
            <div className={`w-full max-w-[1200px] flex items-center justify-between mt-20 ${screenSizeWidth < 560 ? "flex flex-col items-center" : ""}`}>
                <div className={`max-w-[640px] ${screenSizeWidth < 560 ? "flex flex-col items-center justify-center text-center" : ""}`}>
                    <Logo />

                    <h1 className="mt-8 text-[40px] leading-tight">
                        Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React</strong>
                    </h1>
                    <p className="mt-4 text-gray-200 leading-relaxed px-2">
                        Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
                    </p>
                </div>

                <div className={`p-8 mt-3 bg-gray-700 border border-gray-500 rounded ${screenSizeWidth < 560 ? "h-[300px] items-center block" : ""}`}>
                    <strong className="text-2xl mb-6 block">Inscreva-se gratuitamente</strong>

                    <form onSubmit={handleSubscriber} className="flex flex-col gap-2 w-full" action="">
                        <input
                            className="bg-gray-900 rounded px-5 h-14"
                            type="text"
                            placeholder="Insira seu nome"
                            onChange={event => setName(event.target.value)} //target é o input do usuário
                        />
                        <input
                            className="bg-gray-900 rounded px-5 h-14"
                            type="email"
                            placeholder="Insira seu email"
                            onChange={event => setEmail(event.target.value)}
                        />

                        <button
                            type="submit"
                            className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                            disabled={loading}
                        >
                            Garantir minha vaga
                        </button>
                    </form>
                </div>
            </div>

            <img src="/src/images/code-mockup.png" className="mt-10" alt=""/>
        </div>
    )
}