import './StylePost.css'
import React, { Component } from 'react'
class Post extends Component {

    state = {
        isGIFOpen: false,
        content: '',
        postArray: [],
        gifData: [],
        inputSearch: [],
        selectedGIF: null
    }





    openGIFBox = () => {
        this.setState({
            isGIFOpen: !this.state.isGIFOpen
        })
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value,

        })

    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        // this.props.addPost(this.state)

        var { content, postArray, selectedGIF } = this.state
        console.log('if',content)
            if(content=="" && selectedGIF==null){
                alert('Please write something...')
                   }
            else{
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
     

    handleGif = (vr) => {
        // axios.get('')
        var giphy = require('giphy-api')('CGKhObFLZ041pFZzmP0b5f7718GAcf5f');
        console.log('i/p', this.state.inputSearch)
        var data = [];
        // giphy.search(this.state.inputSearch)
        // giphy.search('pokemon')
        if (vr == 'didMount') {
            giphy.trending({
                q: this.state.inputSearch,
                rating: 'g',
                limit: 10
            },
                (err, res) => {
                    console.log(res.data)
                    data = res.data
                    this.setState({
                        gifData: res.data
                    })
                })
        } else {
            giphy.search({
                q: this.state.inputSearch,
                rating: 'g',
                limit: 10
            },
                (err, res) => {
                    console.log(res.data)
                    data = res.data
                    this.setState({
                        gifData: res.data
                    })
                })
        }

        // .catch(err => {
        //     console.log(err)
        // })
    }

    onGifSelect = (img) => {
        this.setState({
            selectedGIF: img
        })
    }

    componentDidMount = () => {
        this.handleGif('didMount')
    }


    render() {
        return (
            <div>
                <div className="container">
                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModal"
                        aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                {/* <!-- <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div> --> */}
                                <div className="modal-body">
                                    <div className='post_form center' id="post_form_id">
                                        {/* <!-- <i id='close_form_id' className='fa fa-remove top_right'></i> --> */}
                                        <div className='text_container'>
                                            <div className='flex-fill'>
                                                <i className="fa fa-user-circle-o fa-3x" aria-hidden="true"></i>
                                                <div>
                                                    <input className='post_ip' id='content' type="text" name="content"
                                                        placeholder="Write something here..." autoComplete="off" value={this.state.content} onChange={this.handleInput} />
                                                    <div className="gif_input">
                                                        <div id='selectedGIF'>
                                                            {this.state.selectedGIF ? <img src={this.state.selectedGIF
                                                            } /> : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='upload_option_container'>
                                                <button id='gif_btn_id' className='gif_btn' onClick={this.openGIFBox}>GIF</button>
                                                <div id='gif_modal_id' className={this.state.isGIFOpen ? 'show_gif gif_modal' : 'hide_gif noneDisplay gif_modal'}>
                                                    <div className='modal_tip'>
                                                    </div>
                                                    <div className='gif_search'>
                                                        <input type="text" placeholder="Search GIF..."
                                                            name="inputSearch" value={this.state.inputSearch} onChange={this.handleInput} />
                                                        <button type="button" className="gif-search-btn" onClick={this.handleGif}>Search</button>
                                                    </div>
                                                    <div className='gif_list'>
                                                        {
                                                            this.state.gifData.map((img, index) => {
                                                                {/* return <img key={index} src={img.images.fixed_width_small.url} onClick={this.onGifSelect(img.images.fixed_width_small.url)} /> */ }

                                                                return <img key={index} src={img.images.fixed_width_small.url} onClick={e => {
                                                                    this.setState({
                                                                        selectedGIF: img.images.fixed_width_small.url,
                                                                        isGIFOpen: false
                                                                    })
                                                                }} />

                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
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

                        {/* <!-- <input type='text' id='postupdateId' placeholder="What's on your mind, Vrushabh?" /> --> */}
                        <div className="post_list" id='postsListId'>
                            {
                                this.state.postArray.map((dt, i) => {
                                    return (<div className="list" key={i}>
                                        <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
                                        <div className='list_text'>
                                            {dt.msg} <br />
                                            <img src={dt.gif}/><br />
                                            <div className="current-date">{dt.date}</div>
                                        </div>

                                    </div>)
                                })
                            }
                            {/* <!-- <div className="list">
                    <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
                    <div className='list_text'>
                        testing for the checking of list of posts in design.
                    </div>
                </div> --> */}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Post
