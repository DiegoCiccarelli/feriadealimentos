import React, { Component } from 'react';

class Category extends Component{
	constructor(props){
		super(props);
		this.state = {
			array: []
		}
	}

	apiCall(url, consecuencia){
		
		fetch(url)
		.then(response => response.json())
		.then(data => consecuencia(data))
		.catch(error => console.log(error));

		
	}

	agregarItems = (data) =>{
		console.log(data)
		let arrayCategory=[];
		for (const category of data) {
			arrayCategory.push(category.nombre_categoria);
		}
		console.log(arrayCategory)
		this.setState({
			array: arrayCategory
		}
		
		)
		console.log(this.state.array)
	}

	
	componentDidMount(){
		
				
		this.apiCall("http://localhost:3500/api/categories", this.agregarItems);
		
	}

	componentDidUpdate(){

	}

	render(){
		
		let hola = this.state.array[0];

		return (

			
			<div className="row">
						{this.state.array.map((item, key) =>{
								
								return(
									<div key={key} className="col-lg-6 mb-4">
									<div className="card bg-info text-white shadow">
										<div className ="card-body">
											{item}
										</div>
									</div>
								</div>)
						})}
				
			</div>
			
			
		)

		

		
	}
}


export default Category;

				