import React from 'react';

const Result = ({ numFailures, finished, resetGame, time }) => (
	<div id="result">
		<p>
			Failures: {numFailures}<br />
			Time: {time}
		</p>
		{finished && (
			<>
				<p>Congratulations!</p>
				<button onClick={resetGame}>
					Play again
				</button>
			</>
		)}
	</div>
);

export default Result;
