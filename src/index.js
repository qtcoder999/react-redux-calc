import React from 'react'
import ReactDOM from 'react-dom'

import { connect,Provider } from "react-redux";
import { createStore } from "redux";

class App extends React.Component {

  handleChange(event) {
    //event.target.name == 'num1' ? this.props.updateVal({name: 'num1', val: parseInt(event.target.value)})  :  this.props.updateVal({name: 'num2', val: parseInt(event.target.value)});
    
  }
  render() {
    return (
      <div>
          <h1>Hello, {this.props.name}</h1>
          <input type="number" name="num1" value= {this.props.num1} onChange={this.props.updateVal} /> <br/>
          <input type="number" name="num2" value= {this.props.num2} onChange={this.props.updateVal} /> <br/>
		      <br/><br/><div>Answer {this.props.result}</div><br/><br/>
          <button shubham="test" onClick={this.props.add}>Add</button>
          <button onClick={this.props.subtract}>Subtract</button>
          <button onClick={this.props.multiply}>Multiply</button>
          <button onClick={this.props.division}>Division</button>
          <button onClick={this.props.reset}>Reset</button>
          
      </div>
      );
  }
}

const initialState = {
  name: 'Paras',
  num1: 0,
  num2: 0,
  result: 0
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case 'UPDATE_NUM': 
    if(action.value.name === 'num1'){
      return Object.assign({}, state, {name:"Subhakar", num1: action.value.val });
    }
    if(action.value.name === 'num2'){
      return Object.assign({}, state, {name:"Subhakar", num2: action.value.val });
    }
    break;
  
    case 'ADD': 
      return Object.assign({}, state, {name:"Shankar", result: parseInt(state.num1) + parseInt(state.num2)});
      break;
    case 'SUBTRACT': 
      return Object.assign({}, state, {name:"Neeraj", result: parseInt(state.num1) - parseInt(state.num2)});
      break;
    case 'MULTIPLY': 
      return Object.assign({}, state, {name:"Varun", result: parseInt(state.num1) * parseInt(state.num2)});
      break;
    case 'DIVISION': 
      return Object.assign({}, state, {name:"Pritam", result: parseInt(state.num1) / parseInt(state.num2)});
      break;
    case 'RESET': 
      return Object.assign({}, state, initialState);
      break;
    default: 
      return Object.assign({}, state, initialState);
      break;
  }
};

function mapStateToProps(state) {
  return { 
    name: state.name,
    num1: parseInt(state.num1),
    num2: parseInt(state.num2),
    result: parseFloat(state.result)
   }
}

const mapDispatchToProps = (dispatch) => {
   
  return {
     // dispatching plain actions
     updateVal: (event) => dispatch({ type: "UPDATE_NUM", value: {name:event.target.name,val:event.target.value}}),
     add: () => dispatch({ type: "ADD" }),
     subtract: () => dispatch({ type: "SUBTRACT" }),
     multiply: () => dispatch({ type: "MULTIPLY" }),
     division: () => dispatch({ type: "DIVISION" }),
     reset: () => dispatch({ type: "RESET" })
    };
 };


const store = createStore(reducer);

const connectToStore = connect(
  mapStateToProps,
  mapDispatchToProps
);

const ConnectedComponent = connectToStore(App);


const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <ConnectedComponent />
  </Provider>,
  rootElement
);