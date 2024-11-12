import Pokemon from './Pokemon';

const PokemonList = ({ pokemons }) => {
	return (
		<div className='flex flex-row flex-wrap'>
			{pokemons.map((pokemon) => (
				<div key={pokemon.name}>
					<Pokemon pokemon={pokemon} />
				</div>
			))}
		</div>
	);
};

export default PokemonList;
