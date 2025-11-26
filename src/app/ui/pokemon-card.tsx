import Image from "next/image";
import "@/app/styles/pokemon-card.css";
import Link from "next/link";
import {retornaBD,armazenaBD} from "../libs/conexao-bd";
import { redirect } from "next/navigation";

const bd : string = 'pokemon-db.json';

export interface PokemonProps{
    id: string,
    nome: string,
    img: string,
    descricao: string,
    userId: string
}

export default function Pokemon(props: PokemonProps)
{

    const deletePokemon = async () => {
        'use server';
        const pokemon = await retornaBD(bd);
        const pokemonToRemove =  pokemon.findIndex((p) => {
            return (p.id === props.id && props.userId === p.userId)
        });

        pokemon.splice(pokemonToRemove,1);

        await armazenaBD(bd, pokemon);
        
        redirect(`/dashboard/${props.userId}`);
        
        
    }

    return(
        <div className="pokemonCard">
            <h2>{props.nome}</h2>
            <Image
                src={props.img}
                width={200}
                height={200}
                alt={`Imagem do pokémon ${props.nome}`}
            />
            <p>{props.descricao}</p>
            <div className="pokemon-buttons-container">
                <Link href={`/dashboard/${props.userId}/edit/${props.id}`} id="btn-edit">Editar</Link>
                <form action={deletePokemon}>
                    <button id="btn-delete">Deletar</button>
                </form>
            </div>
            
        </div>
    )

}