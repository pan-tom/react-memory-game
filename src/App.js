import React, { Component } from 'react';
import Easytimer from 'easytimer.js';

import Board from './Board';
import RestartButton from './RestartButton';
import Layout from './Layout';
import NumItemsSelection from './NumItemsSelection';
import Result from './Result';

import { generateBoardMap } from './utils';

const timer = new Easytimer();
const timerStart = () => timer.start();
const timerStop = () => timer.stop();

const NUM_BOARD_ITEMS = 6;
const initialState = {
	boardMap: generateBoardMap(NUM_BOARD_ITEMS),
	clickStack: [],
	finished: false,
	isSelectOn: true,
	numBoardItems: NUM_BOARD_ITEMS,
	numDone: 0,
	numFailures: 0,
	time: '00:00:00',
};

class App extends Component {

	constructor() {
		super();
		this.state = initialState;
	};

	timeInterval = () => this.setState({
		time: timer.getTimeValues().toString(),
	});

	componentDidMount() {
		timer.addEventListener('secondsUpdated', this.timeInterval);
	};

	componentWillUnmount() {
		timer.removeEventListener('secondsUpdated', this.timeInterval);
	};

	setAppState = (state, callback) => this.setState(state, callback);

	resetGame = () => {
		this.setState(prevState => ({
			...initialState,
			numBoardItems: prevState.numBoardItems,
			boardMap: generateBoardMap(prevState.numBoardItems),
		}));
		timerStop();
	};

	setNumBoardItems = event => {
		const { numDone, clickStack, finished } = this.state;
		if((numDone === 0 && !clickStack.length) || finished) {
			this.setState({
				numBoardItems: Number(event.target.value)
			}, () => {
				this.resetGame();
			});
			timerStop();
		}
	};

	incrementFailures = () => this.setState(prevState => ({
		numFailures: prevState.numFailures + 1
	}));

	setSelectOn = () => this.setState({
		isSelectOn: (this.state.numDone === 0 && !this.state.clickStack.length)
			|| this.state.finished,
	});

	finish = () => this.setState({finished: true}, this.setSelectOn);

	render() {
		const {
			boardMap,
			clickStack,
			finished,
			numBoardItems,
			numDone,
			numFailures,
			isSelectOn,
			time,
		} = this.state;
		
		return (
			<Layout>

				<NumItemsSelection
					onChange={this.setNumBoardItems}
					disabled={!isSelectOn}
				/>

	  			<Board
	  				numBoardItems={numBoardItems}
	  				boardMap={boardMap}
	  				clickStack={clickStack}
	  				setSelectOn={this.setSelectOn}
	  				timerStart={timerStart}
	  				timerStop={timerStop}
	  				incrementFailures={this.incrementFailures}
	  				numDone={numDone}
	  				finish={this.finish}
	  				setAppState={this.setAppState}
	  			/>

	  			<Result
	  				numFailures={numFailures}
	  				time={time}
	  				finished={finished}
	  				resetGame={this.resetGame}
	  			/>

				{!finished && <RestartButton
					disabled={!numFailures && !numDone}
					onClick={this.resetGame}
				/>}

	  		</Layout>
		);
	};

};

export default App;
