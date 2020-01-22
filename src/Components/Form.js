import React from 'react'
import get_url from '../api_helper.js'
import Context from '../context'


class Form extends React.Component {

constructor(props){
  super(props)
  this.state = {value: '11217', country: 'US', state: 'NY', searchBy: 'zip'}
  this.handleOnChange = this.handleOnChange.bind(this)
  this.handleOnSubmit = this.handleOnSubmit.bind(this)
  this.get_url = get_url
  console.log(this.context);

}
static contextType = Context;

handleOnChange(event){
    if (event.target.type.includes('text')) {
        let name = event.target.name;
        if (name === "location") {
            this.setState({value: event.target.value});
        } else if (name === "country") {
            this.setState({country: event.target.value});
        } else if (name ==="state") {
            this.setState({state: event.target.value});
        }
    } else {
        this.setState({searchBy: event.target.value});
    }
}

 handleOnSubmit(event){
     if (event) {
         event.preventDefault();
     }
    console.log('state', this.state)
    let url =  this.get_url(this.state);
    console.log('url', url);
    fetch(url)
    .then((response) => {
        return response.json();
      })
      .then((myJson) => {
          this.context.getData(myJson.data[0])
      });
}

componentDidMount(){
    this.handleOnSubmit();
}

render(){
    
    let label = this.state.searchBy[0].toUpperCase() + this.state.searchBy.slice(1);
    return (
    <form className="form-toolbar" onSubmit={this.handleOnSubmit}>
        <label>Search By: <select onChange={this.handleOnChange} defaultValue="zip">    
            <option value="city">City Name</option>
            <option value="zip">Zip Code</option>
        </select></label>
        <label> {this.state.searchBy[0].toUpperCase() + this.state.searchBy.slice(1)}: <input onChange={this.handleOnChange} type="text" name="location" defaultValue="11217" /></label>
        {this.state.searchBy === "city" ?
            <label> State:<input onChange={this.handleOnChange} type="text" name="state" defaultValue="NY" /></label> : null 
        }
        {this.state.searchBy === "city" ?
            <label> Country:<input onChange={this.handleOnChange} type="text" name="country" defaultValue="US" /></label> : null 
        }



        <input type="submit" value="Submit" />
    </form>
    )
    }
}


export default Form
