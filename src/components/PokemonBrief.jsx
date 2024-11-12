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
		<div className='flex flex-col'>
			<div className='flex self-end mr-2'>
				<Pagination>
					<PaginationContent>
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

				<Select className='' onValueChange={handleSelectChange}>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Select' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='50'>50</SelectItem>
						<SelectItem value='100'>100</SelectItem>
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
