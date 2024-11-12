import React from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
} from '@/components/ui/pagination';
import Pokemon from './Pokemon';

function PokemonBrief({ pokemons }) {
	//console.log('pokemons : ', pokemons);
	const [pagination, setPagination] = React.useState('all');
	const [hanglePagination, setHandlePagination] = React.useState(0);
	const handleSelectChange = (value) => {
		if (value === 'all') {
			setPagination('all');
			return;
		} else {
			setPagination(parseInt(value));
		}
	};
	const handlePaginationClick = (index) => {
		setHandlePagination(index);
	};
	const [hoveredPokemon, setHoveredPokemon] = React.useState(null);

	return (
		<div className='flex flex-col ml-2'>
			<div className='flex self-end '>
				<Pagination>
					<PaginationContent className='flex flex-wrap'>
						{typeof pagination === 'number' &&
							[...Array(Math.ceil(pokemons.length / pagination))].map(
								(_, index) => (
									<PaginationItem
										key={index}
										onClick={() => handlePaginationClick(index)}
									>
										<PaginationLink>{index + 1}</PaginationLink>
									</PaginationItem>
								)
							)}
					</PaginationContent>
				</Pagination>

				<Select className='w-8' onValueChange={handleSelectChange}>
					<SelectTrigger className='w-28'>
						<SelectValue placeholder='Select' />
					</SelectTrigger>
					<SelectContent className=''>
						<SelectItem value='50'>50</SelectItem>
						<SelectItem value='100' className='w-8'>
							100
						</SelectItem>
						<SelectItem value='200'>200</SelectItem>
						<SelectItem value='500'>500</SelectItem>
						<SelectItem value='all'>All</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div>
				{pokemons.map((pokemon, index) =>
					typeof pagination === 'number' ? (
						index >= pagination * hanglePagination &&
						index < pagination * (hanglePagination + 1) && (
							<div
								key={pokemon.name}
								className='flex'
								onMouseEnter={() => setHoveredPokemon(pokemon)}
								onMouseLeave={() => setHoveredPokemon(null)}
							>
								{pokemon.name}
								{hoveredPokemon === pokemon && (
									<div className=' left-full ml-2'>
										<Pokemon pokemon={pokemon} />
									</div>
								)}
							</div>
						)
					) : (
						<div
							key={pokemon.name}
							className='flex'
							onMouseEnter={() => setHoveredPokemon(pokemon)}
							onMouseLeave={() => setHoveredPokemon(null)}
						>
							{pokemon.name}

							{hoveredPokemon === pokemon && (
								<div className='absolute left-full ml-2'>
									<Pokemon pokemon={pokemon} />
								</div>
							)}
						</div>
					)
				)}
			</div>
		</div>
	);
}

export default PokemonBrief;
