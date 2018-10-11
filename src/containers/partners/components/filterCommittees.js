import React from 'react';
import { MagnifyIcon } from 'mdi-react';
const FilterCommittees = ({onSubmit}) => (
	<div className='form' onSubmit={onSubmit}>
		<div className='form__form-group products-list__search'>
		<input placeholder='Search...' name='search'onChange={onSubmit}/>
		<MagnifyIcon/>
		</div>
	</div>
)
export default FilterCommittees;