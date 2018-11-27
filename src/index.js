import React from 'react'
import ReactDOM from 'react-dom'

import { connect, Provider } from "react-redux";
import { createStore } from "redux";
import './App.css';

// const initialState = {
//   todo : 
//  [{itemName: "Attedance", status: 0, key: 1543310901862},
//  {itemName: "Timesheet", status: 0, key: 1543310910009},
//  {itemName: "Catch-Up", status: 0, key: 1543310913529},
//  {itemName: "Tickets", status: 0, key: 1543310916681},
//  {itemName: "Learning", status: 0, key: 1543310918409},
//  {itemName: "Fun", status: 0, key: 1543310920224}],
//   currentFilterType: 'All',
//   initVal : ''
// }

const initialState = {
  todo : [],
  currentFilterType: 'All',
  initVal : ''
}

const reducer = (state = initialState, action) => {

  let newState = state;

  switch (action.type) {
      case 'UPDATE_INIT_VAL': {
          return Object.assign({}, state, { initVal: action.val });
      }
      case 'ADD': {
          return Object.assign({}, state, { todo: [...state.todo, { itemName: state.initVal, status: 0, key: action.key }], initVal: '' });
      }

      case 'REMOVE': {
          console.log('Key received: ', action.key);
          var newArr = Object.assign([], state.todo);
          console.log(...newArr);
          const result = newArr.filter(item => item.key !== action.key);

          //newArr.splice(action.key, 1);
          newState.todo = result;
          
          console.log('result array', ...result);
        
          newState = Object.assign({}, state, { todo: newState.todo });

          return newState;
          
      }
      case 'TOGGLE_COMPLETION_STATUS': {
          
          
          var newArr1 = Object.assign([], newState.todo);
          
          console.log('Key received: ' + action.key);
          console.log(newArr1);
        
          let index = newArr1.findIndex(x => x.key === action.key);
          
          // pos = newArr1.map(function(e) { console.log('inside map: ' + e.key); 
          //                                return e.key; }).indexOf(action.key);

          console.log('postion found ' + index);
        
          newArr1[index].status ? newArr1[index].status = 0 : newArr1[index].status = 1;
        
          newState.todo = newArr1;

          newState = Object.assign({}, state, { todo: newState.todo });

          return newState;
          
      }
      case 'APPLY_FILTERS': {
          return Object.assign({}, state, { currentFilterType : action.filterType });
      }
      default: {
          return newState;
          
      }
  }
}

const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  function mapStateToProps(state) {
    
    console.log('Current Filter type in store: ', state.currentFilterType);
    console.log(state);
  
    return {
        ...state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        add: (key) => { dispatch({ type: 'ADD', key })},
        remove: (event) =>  { dispatch({ type: 'REMOVE', key: event.target.id })},
        toggle: (event) => dispatch({ type: 'TOGGLE_COMPLETION_STATUS', val: event.target.checked, key: event.target.id }),
        onchange: (event) => dispatch({ type: 'UPDATE_INIT_VAL', val: event.target.value }),
        visibility: (event) => dispatch({ type: 'APPLY_FILTERS', filterType: event.target.value })
    }
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {timeStamp: Date.now()};
    this.state.newArr = []
  }
  componentWillMount() {
    this.state.newArr = Object.assign(this.props.todo);
  }
  componentDidUpdate(){
    this.state.newArr = Object.assign(this.props.todo);
  }
  handleAdd(e){
    this.props.add(this.state.timeStamp);
    //Update TimeStamp
    this.state.timeStamp = Date.now();
    
  }
  handleFiltering(e){
        this.props.visibility(e)
        //mapStateToProps()
        console.log('Current Filter type in view:', this.props.currentFilterType);
        this.updateArray()
  }
  //
  updateArray(){
    this.state.newArr = Object.assign([],this.props.todo);
    
      if(this.props.currentFilterType === 'All'){
          this.state.newArr = this.state.newArr.filter(item => item.status !== 'undefined' );
      }  
      else if(this.props.currentFilterType === 'Completed'){
          this.state.newArr = this.state.newArr.filter(item => item.status === 1);
      }
      else if(this.props.currentFilterType === 'Not_completed'){
          this.state.newArr = this.state.newArr.filter(item => item.status === 0);
      }
    
    this.render()
  }
    
  render()
  {
      return(
          <div>
            <h1>Paras To Do App</h1>
            <input type='text' name='item' value={this.props.initVal} onChange={this.props.onchange}/>
            <input type='button' value='ADD' onClick={(e) => this.handleAdd(e)}/>
        
              <ul>
              
            {
              //console.log(...this.props.todo)
              //console.log(this.props)
              //console.log(store.getState())
            }
                {
                
                    
                  //this.props
                  
                  this.state.newArr.map( (obj, i) => {
                    //console.log('Status:' + obj.status);
                   return (

                        <li className={ obj.status === 1 ? 'strikeout' : 'none' }>{obj.itemName} 
                            <input id={obj.key} type="checkbox" 
                              onChange={this.props.toggle} 
                              defaultChecked={obj.status === 1}/>
                                
                            <button id={obj.key} 
                                  onClick={this.props.remove}>Delete</button>
                        </li>
                    )
                })  
              }

              
              </ul>

          <input type="radio" name="visibility" onChange={(e) => this.handleFiltering(e)} value="All"/> All 
          <input type="radio" name="visibility" onChange={(e) => this.handleFiltering(e)} value="Completed"/> Completed
          <input type="radio" name="visibility" onChange={(e) => this.handleFiltering(e)} value="Not_completed"/> Not Completed
 </div>
      )    
  }
}

const AppContainer = connect(
    mapStateToProps, mapDispatchToProps
)(App)

const app = document.getElementById('root');

ReactDOM.render(
    <Provider>
      <AppContainer store={store} />
    </Provider>,
    app
)