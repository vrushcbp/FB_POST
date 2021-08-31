import './StylePost.css'
import React, { Component } from 'react'
import GifComp from './GifComp'
class AddPost extends Component {
    constructor(props) {
        super(props)

        this.myref = React.createRef()
    }

    state = {
        isGIFOpen: false,
        content: '',
        postArray: [],
        gifData: [],
        inputSearch: [],
        selectedGIF: null
    }


    onSubmitHandler = (event) => {
        event.preventDefault();

        var { content, postArray, selectedGIF } = this.state
        console.log('if', content)
        if (content == "" && selectedGIF == null) {
            alert('Please write something...')
        }
        else {
            postArray.push({
                msg: content,
                gif: selectedGIF,
                date: new Date().toDateString()
            })
            this.setState({
                content: '',
                selectedGIF: null
            })
        }
    }
    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value,

        })
    }

    handleCallback = (data) => {
        this.setState({
            selectedGIF: data

        })
        console.log('callback', this.state.selectedGIF, this.state.data)
    }


    render() {
        return (
            <div>
                <div className="container">
                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModal"
                        aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title text-center">Create Post</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className='post_form center' id="post_form_id">
                                        <div className='text_container'>
                                            <div className='flex-fill'>
                                                <i className="fa fa-user-circle-o fa-3x" aria-hidden="true"></i>
                                                <div>
                                                    <input className='post_ip' id='content' type="text" name="content"
                                                        placeholder="Write something here..." autoComplete="off" value={this.state.content} onChange={this.handleInput} ref={this.myref} />
                                                    <div className="gif_input">
                                                        <div id='selectedGIF'>
                                                            {this.state.selectedGIF ? <img src={this.state.selectedGIF
                                                            } /> : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <GifComp handleCallback={this.handleCallback} />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                        onClick={this.modalHandler = () => {
                                            this.setState({
                                                content: '',
                                                selectedGIF: null
                                            })
                                        }}>Close</button>
                                    <button className='float-right btn btn-primary' onClick={this.onSubmitHandler} data-dismiss="modal">
                                        Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='post_update'>
                        <div className='flex-fill'>
                            <i className="fa fa-user-circle-o fa-3x" aria-hidden="true"></i>
                            <div className='post_input' data-toggle="modal" data-target="#exampleModal">What's on your mind, Vrushabh?
                            </div>
                            <div className="gif_input">
                            </div>
                        </div>
                        <div className="post_list" id='postsListId'>
                            {
                                this.state.postArray.map((dt, i) => {
                                    return (<div className="list" key={i}>
                                        <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
                                        <div className='list_text'>
                                            {dt.msg} <br />
                                            <img src={dt.gif} /><br />
                                            <div className="current-date">{dt.date}</div>
                                        </div>

                                    </div>)
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default AddPost
