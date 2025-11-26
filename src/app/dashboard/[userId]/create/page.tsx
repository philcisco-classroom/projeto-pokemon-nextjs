import { armazenaBD, retornaBD } from "@/app/libs/conexao-bd";
import "@/app/styles/create-pokemon.css";
import { PokemonProps } from "@/app/ui/pokemon-card";
import { redirect } from "next/navigation";
import { UserId } from "../page";
import { revalidatePath } from "next/cache";
import { addPokemon } from "@/app/libs/pokemon-services";

const arquivo = 'pokemon-db.json';


export default async function CreatePokemon({params}: UserId){
    
    const {userId} = await params;


    const addPokemonAction = async (formData: FormData) => {
        'use server';
        const novoPokemon : PokemonProps = {
            id: crypto.randomUUID(),
            nome: formData.get('nome') as string,
            descricao : formData.get('descricao') as string,
            img : formData.get('img') as string,
            userId
        }

        try {
            const pokemonDb = await retornaBD(arquivo);
            pokemonDb.push(novoPokemon);
            await armazenaBD(arquivo,pokemonDb);
        } catch (error) {
            console.log(error);
        }

        redirect(`/dashboard/${userId}`);
        
    }
   


    return(
        <section className="create-pokemon-container">
            <h2>Inserir Novo Pokémon</h2>
            <form action={addPokemonAction} className="create-pokemon-form">
                <section className="pokemon-input">
                    <input type="text"
                        id="nome"
                        name="nome" 
                        placeholder="Nome do Pokémon"
                        aria-label="Nome do Pokémon"
                        />
                </section>
                <section className="pokemon-input">
                    <input type="text"
                        id="descricao"
                        name="descricao" 
                        placeholder="Descrição do Pokémon"
                        aria-label="Descrição do pokémon"
                        />
                </section>
                <section className="pokemon-input">
                    <input type="text"
                        id="img"
                        name="img" 
                        placeholder="Link com Imagem do Pokémon"
                        aria-label="Link com Imagem do pokémon"
                        />
                </section>
                <button>Adicionar</button>
            </form>
        </section>
    );

}