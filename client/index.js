import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Details from '../client/details.js'

class Main extends Component {
  constructor () {
    super()
    this.state = {
      friends: []
    }
    this.deleteUser = this.deleteUser.bind(this)
    this.updateRanking = this.updateRanking.bind(this)
  }

  async deleteUser(id) {
    await axios.delete(`api/friends/${id}`)
    const response = await axios.get('api/friends')
    const data = response.data
    this.setState({
      friends: data
    })
  }

  async updateRanking(id, newRanking) {
    await axios.put(`api/friends/${id}`,{ranking: newRanking}) // that second argument that has to be passed in as an object will be the req.body for the server
    const response = await axios.get('api/friends')
    const data = response.data
    this.setState({
      friends: data
    })
  }

  async componentDidMount () {
    //console.log('before')
    const response = await axios.get('api/friends')
    //console.log('after')
    const data = response.data // json data is actually stored on the data property w/axios
    this.setState({
      friends: data
    })
  }

  render() {
    if (this.state.friends.length === 0) {
      return (<div>Loading</div>)
    }
    else {
    return (
      <div>
        {this.state.friends.map(friend => {return (
          <Details key={friend.id} name={friend.name} ranking={friend.ranking} id={friend.id} deleteUser={this.deleteUser} updateRanking={this.updateRanking}
          />
        )})}
      </div>
    )
    // return (
    //   {this.state.friends.map(friend => {
    //     return (
    //       <li>{friend.name}</li>
    //   )})}
    // );
  }
}
}

class Search extends Component {
  constructor () {
    super()
    this.state = {
      friends: []
    }
    this.createFriend = this.createFriend.bind(this)
  }

  async createFriend() {
    const newFriend = document.getElementById("firstname").value
    //console.log(typeof name)
    await axios.post(`api/friends`,{name: newFriend})
    const response = await axios.get('api/friends')
    const data = response.data
    this.setState({
      friends: data
    })
  }

  async componentDidMount () {
    //console.log('before')
    const response = await axios.get('api/friends')
    //console.log('after')
    const data = response.data // json data is actually stored on the data property w/axios
    this.setState({
      friends: data
    })
  }

  render() {
    if (this.state.friends.length === 0) {
      return (<div>Loading</div>)
    }
    else {
    return (
      <div>
        <button onClick = {() => this.createFriend()}>Add a Friend</button>
      </div>
    )
  }
}
}


ReactDOM.render(
  <Main />,
  document.getElementById('friends_list')
);

ReactDOM.render(
  <Search />,
  document.getElementById('search_button')
);


// async function appendData () {
//   try{
//     //let friendsList = await axios.get('/api/friends')
//     //friendsList = friendsList.data
//     let friendsList = await fetch('/api/friends'); // what comes after the localhost, to communicate with the backend using fetch
//     for (let i = 0; i < friendsList.length; i++) {
//       friendsList[i].forEach(friend => {
//         const li = document.createElement("li");
//         //li.label = friend.name;
//         li.append(friend.name); // label that shows up on the page
//         //li.value = `${friend.name}`; // value
//         document.getElementById(`friends_list`).append(li);
//       });
//     }
//   }
//   catch(err) {
//     console.error(err);
//   }
// }
// appendData();
