import React from 'react';
import { MagnifyIcon } from 'mdi-react';
const FilterSearch = ({onSubmit}) => (
	<form className='form' onSubmit={onSubmit}>
		<div className='form__form-group products-list__search'>
		<input placeholder='Search...' name='search'onChange={onSubmit}/>
		<MagnifyIcon/>
		</div>
	</form>
)
export default FilterSearch;