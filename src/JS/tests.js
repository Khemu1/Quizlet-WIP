import React from "react";
import { nanoid } from "nanoid";
function Tests(props) {
	console.log();
	let answers = props.answers;
	const elements = answers.map((e) => {
		return (
			<label>
				<input type="radio" value={e} name="answer" onChange={chooseMe} key={nanoid()} />
				{e}
			</label>
		);
	});
	const [choose, setChoosn] = React.useState("");
	function chooseMe(event) {
		const selectedValue = event.currentTarget.value;
		setChoosn(selectedValue);
	}
	return (
		<div className="test-cont">
			<div className="container">
				<div className="test-q">
					<div className="title">
						{" "}
						<h3>{props.question}</h3>
					</div>
					<div className="answers">
						{elements}
						{/* <label>
							<input type="radio" value={props.answers[0]} name="answer" onChange={chooseMe} onClick={props.toggle} />
							{props.answers[0]}
						</label>
						<label>
							<input type="radio" value={props.answers[1]} name="answer" onChange={chooseMe} onClick={props.toggle} />
							{props.answers[1]}
						</label>
						<label>
							<input type="radio" value={props.answers[2]} name="answer" onChange={chooseMe} onClick={props.toggle} />
							{props.answers[2]}
						</label>
						<label>
							<input type="radio" value={props.answers[3]} name="answer" onChange={chooseMe} onClick={props.toggle} />
							{props.answers[3]}
						</label> */}
					</div>
				</div>
				<div className="line-holder">
					<div className="line"></div>
				</div>
			</div>
		</div>
	);
}
export default Tests;
