import React, { Component } from 'react';
import shuffle from 'shuffle-array';
import Easytimer from 'easytimer.js';

import Board from './Board';
import Result from './Result';

class App extends Component {

	generateBoardMap = (num) => {
		return shuffle(Array.from(Array(num).keys()).map((val, i) => {
			return {
				id: i+1,
				value: Math.floor(i/2) + 1,
				status: '' // ['', 'opened', 'done']
			}
		}));
	}

	numBoardItems = 6;

	initialState = {
		selectOn: true,
		numBoardItems: this.numBoardItems,
		boardMap: this.generateBoardMap(this.numBoardItems),
		clickStack: [],
		failures: 0,
	  	numDone: 0,
	  	time: '00:00:00',
	  	finished: false
	}

	timer = new Easytimer();

	timerStart = () => this.timer.start();

	timerStop = () => this.timer.stop();

	incrementFailures = () => this.setState({failures: this.state.failures+1});

	setSelectOn = () => this.setState({selectOn: (this.state.numDone === 0 && !this.state.clickStack.length) || this.state.finished});

	finish = () => this.setState({finished: true}, this.setSelectOn);

	setAppState = (state, callback = null) => this.setState(state, callback);

	gameReset = () => {
		const state = this.initialState;
		state.numBoardItems = this.numBoardItems;
		state.boardMap = this.generateBoardMap(this.numBoardItems);
		this.setState(state);
	};

	setNumBoardItems = event => {
		if((this.state.numDone === 0 && !this.state.clickStack.length) || this.state.finished) {
			const value = Number(event.target.value);
			this.numBoardItems = value;
			this.gameReset();
		}
	};

	constructor() {
		super();
		this.state = this.initialState;
		this.timer.addEventListener('secondsUpdated', e => {
			this.setState({
			   	time: this.timer.getTimeValues().toString()
			});
		});
	};

	render() {

		return (
			<div>
				<h1>ReactJS Memory Game demo</h1>
				<div id="select">
					Number of elements: <select onChange={this.setNumBoardItems} disabled={!this.state.selectOn}>
						<option value="6">06</option>
						<option value="12">12</option>
						<option value="18">18</option>
						<option value="24">24</option>
						<option value="30">30</option>
						<option value="36">36</option>
					</select>
				</div>
	  			<Board
	  				numBoardItems={this.state.numBoardItems}
	  				boardMap={this.state.boardMap}
	  				clickStack={this.state.clickStack}
	  				setSelectOn={this.setSelectOn}
	  				timerStart={this.timerStart}
	  				timerStop={this.timerStop}
	  				failures={this.state.failures}
	  				incrementFailures={this.incrementFailures}
	  				numDone={this.state.numDone}
	  				finish={this.finish}
	  				setAppState={this.setAppState}
	  			/>
	  			<Result
	  				failures={this.state.failures}
	  				time={this.state.time}
	  				finished={this.state.finished}
	  				gameReset={this.gameReset}
	  			/>
	  		</div>
		);
	};

}

export default App;
