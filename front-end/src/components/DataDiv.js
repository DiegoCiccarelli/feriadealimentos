import React, { Component } from 'react';

class DataDiv extends Component{
	constructor(props){
		super(props);
		this.state = {
			counter: 0
		}
	}

	apiCall(url, consecuencia){
		
		fetch(url)
		.then(response => response.json())
		.then(data => consecuencia(data))
		.catch(error => console.log(error));

		
	}

	actualizarCantidad = (data) =>{
		
			this.setState ({
			counter: data.data.quantity
		});
	}

	
	componentDidMount(){
		
		if(this.props.api=="usersQuantity"){
		
			this.apiCall("http://localhost:3500/api/usersQuantity", this.actualizarCantidad);
		
		}else if(this.props.api=="productsQuantity"){
		
			this.apiCall("http://localhost:3500/api/productsQuantity", this.actualizarCantidad);
		
		}else if(this.props.api=="salesQuantity"){
		
			this.apiCall("http://localhost:3500/api/salesQuantity", this.actualizarCantidad);
		}
	}

	componentDidUpdate(){

	}

	render(){
		
		

		return (
			<div className="col-md-4 mb-4">
		    <div className="card border-left-primary shadow h-100 py-2">
				<div className="card-body">
					<div className="row no-gutters align-items-center">
						<div className="col mr-2">
							<div className="text-xs font-weight-bold text-primary text-uppercase mb-1"> {this.props.name}</div>
							<div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.counter}</div>
						</div>
						<div className="col-auto">
						    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
					    </div>
				    </div>
			    </div>
		    </div>
	    </div>
		)
	}
}


export default DataDiv;

				