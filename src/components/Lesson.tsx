import {CheckCircle, Lock} from "phosphor-react"
import {isPast, format} from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import { Link, useParams } from "react-router-dom";

interface LessonProps {
    title: string;
    slug: string;
    availableAt: Date;
    type: "live" | "class"
}

function Lesson(props: LessonProps) {

    const {slug} = useParams<{slug: string}>()

    const isLessonAvailable = isPast(props.availableAt) //disponibilidade da aula é baseada no tempo, assim que chegar o horário da aula marcado no hygraph, o isLessonAvailable será true pois será considerado tempo passado.
    const availableDateFormat = format(props.availableAt, "EEEE ' • 'd' de 'MMMM' • 'k'h'mm", {locale: ptBR})

    const isLessonActive = slug === props.slug

    return (
        <Link to={`/event/lesson/${props.slug}`} className="group">
          <span className="text-gray-300">
            {availableDateFormat}
          </span>  

          <div className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${isLessonActive ? "bg-green-500" : ""}`}>
            <header className="flex items-center justify-between">
                {isLessonAvailable ? (
                    <span className="text-sm text-blue-500 font-medium flex items-center gap-2">
                        <CheckCircle size={20}/>
                        Conteúdo liberado
                    </span>
                ): (
                    <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                        <Lock size={20}/>
                        Em Breve
                    </span>
                )}

                <span className="text-xs rounded py[2px] px-2 text-white border border-green-300 font-bold">
                    {props.type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
                </span>
            </header>
            
            <strong className="text-gray-200 mt-5 block">
                {props.title}
            </strong>
          </div>
        </Link>
    )
}

export default Lesson