import React from 'react';

import BoardItems from './BoardItems';

import { removeByValue } from './utils';

const Board = props => {

	const {
		boardMap,
		finish,
		incrementFailures,
		numBoardItems,
		setAppState,
		setSelectOn,
		timerStart,
		timerStop,
	} = props;

	const onClickItem = event => {

		let clickStack = props.clickStack;
		let numDone = props.numDone;

		const div = event.target.tagName === 'DIV'
			? event.target
			: event.target.parentNode;

		const index = Number(div.getAttribute('data-index'));

		if(boardMap[index].status !== 'done') {
			if(!clickStack.includes(index)) {
				boardMap[index].status = 'opened';
				clickStack.push(index);
				if(clickStack.length%2 === 0) {
					const index1 = clickStack[clickStack.length-2];
					const index2 = index;
					const item1 = boardMap[index1];
					const item2 = boardMap[index2];
					const status = (item1.value === item2.value ? 'done' : '');
					clickStack = removeByValue(clickStack, index1, index2);
					setTimeout(() => {
						boardMap[index1].status = status;
						boardMap[index2].status = status;
						setAppState({boardMap});
					}, 500);
					if(status === 'done') {
						if(++numDone === numBoardItems/2) {
							timerStop();
							setTimeout(() => finish(), 1000);
						}
					} else {
						incrementFailures();
					}
				}
			} else {
				clickStack = removeByValue(clickStack, index);
				boardMap[index].status = '';
			}

			setAppState({boardMap, clickStack, numDone}, setSelectOn);

			if(numDone === 0) {
				timerStart();
			}
		}
	}

	return (
		<BoardItems
			boardMap={boardMap}
			onClickItem={onClickItem}
		/>
	)

};

export default Board;
