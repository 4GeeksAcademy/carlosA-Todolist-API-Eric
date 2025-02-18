import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	// https://playground.4geeks.com/todo/todos/pruebas_carlos <- POST de tareas
	// https://playground.4geeks.com/todo/users/pruebas_carlos <- GET de tareas de un usuario
	// https://playground.4geeks.com/todo/users/pruebas_carlos <- POST de un usuario


	/*
		{
		"label": "string",
		"is_done": false
		}
	*/
	const [users, setUser] = useState("ehiber");
	const [tareas, setTareas] = useState([]);
	const [inputText, setInputText] = useState("");


	async function getTareas() {
		const response = await fetch("https://playground.4geeks.com/todo/users/"+users);
		const data = await response.json();
		setTareas(data.todos);
	}

	async function addNewTask(e) {
		e.preventDefault();

		const tarea = {
			label: inputText,
			is_done: false
		}

		const response = await fetch("https://playground.4geeks.com/todo/todos/"+users, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(tarea)
		})

		
		setInputText("");
		getTareas();
	}

	async function generateUser() {
		const responseGet = await fetch("https://playground.4geeks.com/todo/users/"+users);
		if (!responseGet.ok) {
			const response = await fetch("https://playground.4geeks.com/todo/users/"+users, {
				method: "POST"
			});
			const data = await response.json()
			console.log(data);
        }
	}

	useEffect(() => {
		getTareas();
		generateUser();
	}, []);

	return (
		<>
			<form onSubmit={(e) => addNewTask(e)}>
				<input value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Regar las plantas" />
			</form>
			<ul>
				{tareas.map((tarea, index) => (
					<li key={index}>{tarea.label}</li>
				))}
			</ul>
		</>
	);
};

export default Home;