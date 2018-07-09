import React, { Component } from 'react';

class Board extends Component {

	removeByValue = (array, ...values) => {
		values.forEach(val => {
			const i = array.indexOf(val);
			if (i > -1) {
				array.splice(i, 1);
			}
		});
		return array;
	}

	onClickItem = event => {
		let div;
		let index;
		let clickStack = this.props.clickStack;
		let boardMap = this.props.boardMap;
		let numDone = this.props.numDone;
		if(event.target.tagName === 'DIV') {
			div = event.target;
		} else {
			div = event.target.parentNode;
		}
		index = Number(div.getAttribute('data-index'));
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
					clickStack = this.removeByValue(clickStack, index1, index2);
					setTimeout(() => {
						boardMap[index1].status = status;
						boardMap[index2].status = status;
						this.props.setAppState({
							boardMap: boardMap
						});
					}, 500);
					if(status === 'done') {
						if(++numDone === this.props.numBoardItems/2) {
							this.props.timerStop();
							setTimeout(() => {
								this.props.finish();
							}, 1000);
						}
					} else {
						this.props.incrementFailures();
					}
				}
			} else {
				clickStack = this.removeByValue(clickStack, index);
				boardMap[index].status = '';
			}
			this.props.setAppState({
				boardMap: boardMap,
				clickStack: clickStack,
				numDone: numDone
			}, this.props.setSelectOn);
			if(numDone === 0) {
				this.props.timerStart();
			}
		}
	}

	render() {

		const boardItems = this.props.boardMap.map((el, index) => {
			return (
				<div
					key={el.id}
					data-index={index}
					className={'item '+el.status}
					onClick={this.onClickItem}>
						<b>
							{el.value}
						</b>
				</div>
			);
		});

		return (
	  		<div id="board">
	  			{boardItems}
	  		</div>
		);

	}

}

export default Board;
