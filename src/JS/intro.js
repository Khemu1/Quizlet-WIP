import React from "react";
import { nanoid } from "nanoid";
import Tests from "./tests";
function Intro() {
	const [startQ, setStartQ] = React.useState(false);
	const [data, setData] = React.useState([]);
	const [checked, setChecked] = React.useState(false);
	const [correct, setCorrect] = React.useState(0);
	const [Count, setCount] = React.useState(0);
	const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5); // shuffling the values inside
	// getting data from the API

	async function getInfo() {
		const data = await fetch("https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple");
		const re = await data.json();
		const Mdata = await re.results;
		let arr = [];
		Mdata.forEach((element) => {
			arr.push({ id: nanoid(), answers: shuffleArray([...element.incorrect_answers, element.correct_answer]), question: element.question, correct: element.correct_answer, selected: null, checked: false });
		});
		setData(arr);
	}
	React.useEffect(() => {
		if (Count !== 0) {
			getInfo();
		}
	}, [Count]);
	//

	// making button fucntion
	function toggleB(event) {
		event.preventDefault();
		setCount((prev) => prev + 1);
		setTimeout(() => {
			setStartQ((prev) => !prev);
		}, 1000);
	}
	function toggleB2(event) {
		event.preventDefault();
		setStartQ((prev) => !prev);
	}
	//
	function handelClick(id, answer) {
		setData((prev) => {
			prev.map((e) => {
				return id === e.id ? { ...e, selected: answer } : e;
			});
		});
	}
	function handelChick() {
		let selected = true;
		data.forEach((e) => {
			if (data.selected === e.selected) {
				selected = false;
				return;
			}
		});
		if (!selected) {
			return;
		}
		setData((prev) => {
			prev.map((e) => {
				return { ...e, checked: true };
			});
		});
		let correct = 0;
		data.forEach((e) => {
			if (data.correct === e.selected) {
				correct = correct + 1;
			}
		});
		setCorrect(correct);
	}
	// console.log(data);
	// seding data to file
	const elements =
		data.length > 0
			? data.map((e) => {
					return <Tests key={e.id} id={e.id} question={e.question} click={handelClick} answers={e.answers} />;
			  })
			: console.log("Awating data");
	//
	return (
		<section className="parent">
			{!startQ && (
				<article>
					<div className="page">
						<div className={startQ ? "container-2" : "container"}>
							<div className="head">
								<h1>Quizzical</h1>
								<div className="start-q">Get ready</div>
							</div>

							<div className="start-b" onClick={toggleB}>
								{" "}
								Start
							</div>
						</div>
					</div>
				</article>
			)}
			{startQ && (
				<article>
					<div className="page">
						<div className={startQ ? "container-2" : "container"}>
							<form>
								<div className="container">
									{/* <Tests /> */}
									{elements}
								</div>
								<button className="start-b" onClick={toggleB2}>
									Reset
								</button>
							</form>
						</div>
					</div>
				</article>
			)}
		</section>
	);
}
export default Intro;
