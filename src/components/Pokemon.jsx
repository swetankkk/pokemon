import React from 'react';
import axios from 'axios';
import { usePokemon } from '../context/PokemonContext';

const Pokemon = ({ pokemon }) => {
	const { favorites, toggleFavorite } = usePokemon();
	const [pokemonData, setPokemonData] = React.useState(null);
	const loadPokemonData = async (pokemon) => {
		try {
			const response = await axios.get(pokemon.url);
			//console.log('Pokemon Data :', response.data.sprites.front_default);

			setPokemonData(response.data);
		} catch (error) {
			console.error('Error loading pokemon data:', error);
			return null;
		}
	};
	React.useEffect(() => {
		loadPokemonData(pokemon);
	}, [pokemon]);

	return (
		<div className=''>
			<div className='flex m-1 border-black border-2'>
				<div className='flex flex-col '>
					<div className='bg-black text-center text-white'>name</div>
					<div className='flex flex-row justify-between mx-1 h-32 items-center'>
						<div className='flex w-36'>{pokemon.name}</div>
						<button className='' onClick={() => toggleFavorite(pokemon)}>
							{favorites?.includes(pokemon) ? '❤️' : '♡'}
						</button>
					</div>
					<div className='bg-black text-center text-white'>stats</div>
					<div className='mx-1 '>
						{pokemonData?.stats.map((stat) => (
							<div
								key={stat.stat.name}
								className='flex flex-row justify-between'
							>
								<div className=''>{stat.stat.name}</div>

								<div className=''> : {stat.base_stat}</div>
							</div>
						))}
					</div>
				</div>
				<div className='flex flex-col'>
					<div className='bg-black text-center text-white'>photo</div>
					<div>
						<img
							src={pokemonData?.sprites.front_default}
							alt={pokemon.name}
							height={128}
							width={128}
						/>
					</div>
					<div className='flex flex-col grow justify-between'>
						<div>
							<div className='bg-black text-center text-white'>types</div>
							<div>
								{pokemonData?.types.map((type) => (
									<div key={type.type.name}>{type.type.name}</div>
								))}
							</div>
						</div>
						<div>
							<div className='bg-black text-center text-white'>abilities</div>
							<div>
								{pokemonData?.abilities.map((ability) => (
									<div key={ability.ability.name}>{ability.ability.name}</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Pokemon;
