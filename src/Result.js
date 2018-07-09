import React, { Component } from 'react';

class Result extends Component {

	onPlayAgain = () => this.props.gameReset();
	
	render() {
		
		return (
			<div id="result">
				<p>
					Failures: {this.props.failures}<br />
					Time: {this.props.time}
				</p>
				{this.props.finished ? <p>Congratulations!<br /><a onClick={this.onPlayAgain}>Play again</a></p> : ''}
			</div>
		)

	}

}

export default Result;
