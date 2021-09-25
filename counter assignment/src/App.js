
import React from 'react';
import './App.css';


class App extends React.Component{
  
  constructor(){
    super();
    this.state = {
      counter: 1,
      inputText: '',
      loading : false,
    }
  }




  componentDidMount(){
    fetch('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json').then(res=>res.json())
    .then(response => {
      console.log(response);
      if(response){
        this.setState({counter:response})
      }
    })
  }

  updateFirebase = (counter) => {
    fetch('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json',{
      method:"PUT",
      body:JSON.stringify({'counter1':counter})
    }).then(res=>res.json())
    .then(response=> {
      console.log(response);
    })
    this.setState({loading : true});
    setTimeout(() =>{
      this.setState({loading : false});
    }, 200)
  }

  onChange = (event) => {
    let inputText = event.target.value;
    this.setState({counter: parseInt(inputText) || 1});  
    this.updateFirebase(inputText);  
  }

  onIncrement = () => { 
    if(this.state.counter < 1000){
      let counter = this.state.counter +1;     
      this.setState({counter})
      this.updateFirebase(counter);
    }
  }

  onDecrement = () => {
    
    if (this.state.counter > 1){
      let counter = this.state.counter -1;
      this.setState({counter})
      this.updateFirebase(counter);
    } 
  }

 

  render() {
    const {loading} = this.state;
    return (

      <><div>  {loading && <> <div className= "anim">
      { <div><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>Saving Counter Value</div>}
      </div> </>}  </div><div className="App">

        <button id="b1" onClick={this.onDecrement}>-</button>

        <input onChange={this.onChange} value={this.state.counter} />

        <button id="b2" onClick={this.onIncrement}>+</button>

        <h2 id='s'>Counter Value {this.state.counter}</h2>
      </div></>
    )
  }
}

export default App;