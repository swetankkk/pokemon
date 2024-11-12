import React from 'react';
import PokemonList from './components/PokemonList';
import SearchBar from './components/SearchBar';
import PokemonBrief from './components/PokemonBrief';
import { Button } from './components/ui/button';
import { PokemonProvider, usePokemon } from './context/PokemonContext';

const App = () => {
	return (
		<PokemonProvider>
			<AppContent />
		</PokemonProvider>
	);
};

const AppContent = () => {
	const {
		searchTerm,
		showFav,
		setShowFav,
		favorites,
		filteredPokemons,
		pokemons,
	} = usePokemon();

	return (
		<div className='flex flex-col'>
			<h1 className='bg-black text-white px-4 py-2'>Pokémon Explorer</h1>
			<SearchBar />
			{!searchTerm && (
				<Button
					variant={showFav && !searchTerm ? 'destructive' : 'outline'}
					onClick={() => {
						setShowFav(!showFav);
					}}
					className=' self-end my-2 mx-2 w-24'
				>
					ShowFav
				</Button>
			)}

			{showFav && !searchTerm && <PokemonList pokemons={favorites} />}
			<PokemonList pokemons={filteredPokemons} />

			{!searchTerm && <PokemonBrief pokemons={pokemons} />}
		</div>
	);
};

export default App;
