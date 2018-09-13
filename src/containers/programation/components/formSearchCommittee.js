import React, {PureComponent} from 'react';
import { Field, reduxForm } from 'redux-form';
import { AddIcon } from 'mdi-react';
import {Table} from 'reactstrap';

class FormSearch extends PureComponent {
	render() {
		const {committees = [],handleAddCommittee} = this.props;
		return(
			<div>
			<form className='form' onSubmit={() => {}}>
				<div className='form__form-group'>
					<div className='form__form-group-field'>
					<Field
						name='name'
						component='input'
						type='text'
						placeholder='Buscar una Zona de distribución...'
					/>
					<button className={`form__form-group-button`} ><AddIcon/></button>
					</div>
				</div>
            </form>
            <div style={{maxHeight: 300, overflow: 'auto'}}>
			<Table striped hover responsive>
				<tbody>
					{committees.map((committee, index) => 
						<tr key={index} onClick={handleAddCommittee(committee)} >
							<td>{committee.name}</td>
						</tr>
					)}
				</tbody>
            </Table>
            </div>
			</div>

		)
	}
}

export default reduxForm({
	form: 'distribution_search'
})(FormSearch);