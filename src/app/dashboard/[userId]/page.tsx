import Link from "next/link";
import {retornaBD} from "../../libs/conexao-bd";
import Pokemon, { PokemonProps } from "../../ui/pokemon-card";
import "@/app/styles/dashboard.css";

const bd : string = 'pokemon-db.json';

export interface UserId {
    params: Promise<{userId: string}>;
}

async function readPokemon(userId: string){

    const dados = await retornaBD(bd);
    return dados;
}

export default async function DisplayPokemons({params}: UserId){

    const {userId} = await params;
    const pokemon = await readPokemon(userId);
    const pokemonCard = pokemon.map((pokemon: PokemonProps) => {
        if(pokemon.userId === userId)
            return <Pokemon {...pokemon} key={pokemon.id}/>
    });
   
    return(
        <div className="dashboard-container">
            <Link href={ `/dashboard/${userId}/create`} className="add-pokemon">Adicionar</Link>
            <div className="cardContainer">
                {pokemonCard}
            </div>
        </div>
    )

}