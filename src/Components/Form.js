import React from 'react'
import get_url from '../api_helper.js'
import Context from '../context'


class Form extends React.Component {

constructor(props){
  super(props)
  this.state = {value: '', country: '', state: '', searchBy: 'zip'}
  this.handleOnChange = this.handleOnChange.bind(this)
  this.handleOnSubmit = this.handleOnSubmit.bind(this)
  this.get_url = get_url
  console.log(this.context);

}
static contextType = Context;

handleOnChange(event){
    debugger
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
     let state; 
     if (event) {
         event.preventDefault();
         state = this.state;
     } else {
         state = {value: 11217, searchBy: 'zip'}
     }
    let url =  this.get_url(state);
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
    <form className="form" onSubmit={this.handleOnSubmit} onChange={this.handleOnChange}>
        <label className="subForm"> <span className="searchBy searchSpan">Search By:</span> &nbsp; 
            <span className="searchBy"><input type="radio" name="searchBy" value="city" /><label htmlFor="city">City </label>&nbsp;  </span>
            <span className="searchBy"><input type="radio" name="searchBy" value="zip" defaultChecked />  <label htmlFor="zip">&nbsp; Zip Code </label></span>
        </label>

        <label> {this.state.searchBy[0].toUpperCase() + this.state.searchBy.slice(1)}: <input onChange={this.handleOnChange} type="text" name="location" /></label>
        {this.state.searchBy === "city" ?
            <label> State:<input onChange={this.handleOnChange} type="text" name="state" /></label> : null 
        }
        {this.state.searchBy === "city" ?
            <label> Country:<input onChange={this.handleOnChange} type="text" name="country" /></label> : null 
        }



        <input type="submit" value="Submit" className="myButton" />
    </form>
    )
    }
}


export default Form
