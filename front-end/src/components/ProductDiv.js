import React, { Component } from 'react';

class ProductDiv extends Component{
	constructor(props){
		super(props);
		this.state = {
			name: ""
		}
	}

	apiCall(url, consecuencia){
		
		fetch(url)
		.then(response => response.json())
		.then(data => consecuencia(data))
		.catch(error => console.log(error));

		
	}

	actualizarComponente = (data) =>{
		console.log(data)
		this.setState ({
			name: data.nombre_producto,
			image: "http://localhost:3500/images/productsimages/" + data.imagen,
			urlDetail: "http://localhost:3500/productos/detalleProducto/" + data.id
			
		});
	}

	
	componentDidMount(){
		
				
		this.apiCall("http://localhost:3500/api/lastProduct", this.actualizarComponente);
		
	}

	componentDidUpdate(){

	}

	render(){
		
		

		return (
			
						  <div className="col-lg-6 mb-4">
							  <div className="card shadow mb-4">
							    <div className="card-header py-3">
							      <h6 className="m-0 font-weight-bold text-primary">Ultimo producto cargado</h6>
							    </div>
								        <div className="card-body">
									        <div className="text-center">
										        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" src={this.state.image} alt="image dummy"></img>
									        </div>
									        <p>{this.state.name}</p>
    						          <a target="_blank" rel="nofollow" href={this.state.urlDetail}>Ver detalle Producto</a>
		  				          </div>
			            		</div>
						    </div>
            
		)
	}
}


export default ProductDiv;

				