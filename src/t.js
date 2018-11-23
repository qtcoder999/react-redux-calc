const {createStore} = Redux;
const initialState ={count :0 };
const {Provider, connect} = ReactRedux
function reducer(state = initialState, action) {
 const newState = {...state};
 if(action.type==="INCREMENT")
   {
     newState.count++;
   }
 if(action.type==="DECREMENT")
   {
     newState.count--;
   }
 return newState;
}
const store = createStore(reducer);
class App extends React.Component
{

 render()
 {
   return( <div className="div1">
       <div>Count:<span>{this.props.count}</span></div>
       <button onClick={this.props.Add}>+1</button>
       <button onClick={this.props.Del}>-1</button>
     </div>);
 }
}

const mapStateToProps =(state) => {
 return {
   count: state.count
 }
}
const mapDispatchToProps =(dispatch) =>
({
   Add: () => dispatch({ type: 'INCREMENT'}),
   Del: () => dispatch({ type: 'DECREMENT'})

});
const Container = connect(mapStateToProps, mapDispatchToProps)(App);
class AppWrapper extends React.Component {
 render() {
   return (
     <Provider store={store}>
       <Container />
     </Provider>
   );
 }
};
ReactDOM.render(<AppWrapper />, document.getElementById("root"));