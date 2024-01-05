import "./StartButton.css"

const StartPage = ({setName, name, onClick}) => {

	const handleInputChange = (event) => {
		setName(event.target.value);
	};

	return(
		<>
			<div>
				<p>Hello, {name ? `${name}!` : 'stranger!'} Welcome to the quiz.</p>
				<input
					className="styled-input"
					type="text"
					id="name"
					value={name}
					onChange={handleInputChange}
					placeholder="Type your name here"
				/>
			</div>
			<button className="start-button" onClick={()=>onClick(true)}>Start Game</button>
		</>
	);
}

export default StartPage;