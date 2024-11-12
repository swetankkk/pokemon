import React, { createContext, useState, useContext, useEffect } from 'react';

const PokemonContext = createContext();

export function PokemonProvider({ children }) {
	const [pokemons, setPokemons] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [favorites, setFavorites] = useState([]);
	const [showFav, setShowFav] = useState(false);

	useEffect(() => {
		const fetchPokemons = async () => {
			const response = await fetch(
				'https://pokeapi.co/api/v2/pokemon?limit=1400'
			);
			const data = await response.json();
			setPokemons(data.results);
		};
		fetchPokemons();
	}, []);

	const toggleFavorite = (pokemon) => {
		if (favorites.includes(pokemon)) {
			setFavorites(favorites.filter((fav) => fav !== pokemon));
		} else {
			setFavorites([...favorites, pokemon]);
		}
	};

	function extractPokemonId(url) {
		const regex = /\/pokemon\/(\d+)\//;
		const match = url.match(regex);
		return match ? parseInt(match[1], 10) : null;
	}

	const filteredPokemons = pokemons.filter((pokemon) => {
		if (isNaN(searchTerm)) {
			return pokemon.name.includes(searchTerm.toLowerCase());
		} else {
			return extractPokemonId(pokemon.url) === parseInt(searchTerm);
		}
	});

	return (
		<PokemonContext.Provider
			value={{
				pokemons,
				searchTerm,
				setSearchTerm,
				favorites,
				toggleFavorite,
				showFav,
				setShowFav,
				filteredPokemons,
			}}
		>
			{children}
		</PokemonContext.Provider>
	);
}

export function usePokemon() {
	return useContext(PokemonContext);
}
