import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
    state = {
        selectedFile: null,
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    submitClickHandler = () => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile)
        console.log(fd)
        fetch('http://localhost:5000/api/profile/image', {
            method: 'POST',
            body: fd,
            headers: {
                'Accept': 'multipart/form-data'
            }
        }).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
        console.log(this.state.selectedFile)
    }

    render () {
        return(
            <div>
                <input type="file" onChange={this.fileSelectedHandler}/>
                <button type="submit" onClick={this.submitClickHandler}>submit</button>
            </div>
        )
    }
}

export default App;