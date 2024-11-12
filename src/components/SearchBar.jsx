import { usePokemon } from '../context/PokemonContext';

const SearchBar = () => {
	const { searchTerm, setSearchTerm } = usePokemon();
	return (
		<input
			type='text'
			placeholder='Search Pokémon by Name or id'
			value={searchTerm}
			onChange={(e) => setSearchTerm(e.target.value)}
			className='w-full px-4 py-2'
		/>
	);
};

export default SearchBar;
