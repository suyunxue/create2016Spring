import * as types from '../constants/ActionTypes'


export function deleteSingle(index) {
	return {
		type: types.DELETEQUESTION,
		index: index
	}
}


export function deleteSelected(selects){
	return {
		type: types.DELETESELECTEDQUESTION,
		selects: selects
	}
}

export function saveQuestion(data){
	return {
		type: types.SAVEQUESTION,
		data: data
	}
}


export function jump(index){
	return{
		type: types.JUMP,
		index: index
	}
}


