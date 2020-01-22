import React from 'react';
import './App.css';
import Form from './Components/Form.js'
import Image from './Components/Image.js'
// import ThemeContext from './context.js'
import Context from './context';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.getData = (newData) => {
      this.setState(state => ({
        data: newData
      }));
    };

    // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = {
      data: {},
      getData: this.getData,
    };
  }


  render() {
    // The entire state is passed to the provider
    let image = this.state.data.weather ? <Image /> : null;

    return (
      <Context.Provider value={this.state}>
        <Form />
        {image}
      </Context.Provider>
    );
  }
}

export default App;
