import React, { Component } from 'react';
import axios from 'axios';
class AddPost extends Component {


    state = {
        content: '',
        postArray: [],
        gifData: [],
        inputSearch: []
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value,

        })

    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        // this.props.addPost(this.state)
        let { content, postArray } = this.state
        postArray.push(content)
        this.setState({
            content: ''
        })
    }

    handleGif = () => {
        // axios.get('')
        var giphy = require('giphy-api')('CGKhObFLZ041pFZzmP0b5f7718GAcf5f');
        console.log('i/p',this.state.inputSearch)
        var data = [];
        // giphy.search(this.state.inputSearch)
        // giphy.search('pokemon')
        giphy.search({
            q: this.state.inputSearch,
            rating: 'g',
            limit:10
        },
            (err,res) => {
                console.log(res.data)
                data = res.data
                this.setState({
                    gifData:res.data
                })
        })
            // .catch(err => {
            //     console.log(err)
            // })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="container">

                        <textarea id="txtArea" name="content" type="text" rows="30" cols="100" placeholder="Write something here...."
                            onChange={this.handleInput} value={this.state.content} />

                        <button type="submit" >Post</button>

                    </div>
                </form>
                <div>
                    {
                        this.state.postArray.map(dt => {
                            return <div>{dt}</div>
                        })
                    }

                </div>

                {/* GIF */}
                <div>
                    <input type="text" name="inputSearch" value={this.state.inputSearch} onChange={this.handleInput}
                        placeholder="Search"/>


                    <button onClick={this.handleGif} >View GIF</button>
                    <div>
                        {
                            this.state.gifData.map((img, index) => {
                                return <img key={index} src={img.images.fixed_width_small.url} />
                            })
                        }

                    </div>
                </div>

            </div>
        )

    }

}
export default AddPost
