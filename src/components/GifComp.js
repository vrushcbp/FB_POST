import React, { Component } from 'react'
export class GifComp extends Component {
    state = {
        isGIFOpen: false,
        inputSearch: '',
        gifData: [],
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


    handleGif = (vr) => {
        var giphy = require('giphy-api')('CGKhObFLZ041pFZzmP0b5f7718GAcf5f');
        console.log('i/p', this.state.inputSearch)
        var data = [];
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
                    if (err) {
                        alert(err)
                    }
                    else {
                        console.log(res.data)
                        data = res.data
                        this.setState({
                            gifData: res.data
                        })
                    }
                })
        }

    }
    componentDidMount = () => {
        this.handleGif('didMount')
    }

    passData = (props) => {
        console.log('GIFCOMP', this.state.selectedGIF, this.state.isGIFOpen)
        this.props.handleCallback(this.state.selectedGIF)
    }

    render() {
        return (
            <div>
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
                                    return <img key={index} src={img.images.fixed_width_small.url} onClick={e => {
                                        this.setState({
                                            selectedGIF: img.images.fixed_width_small.url,
                                            isGIFOpen: false,

                                        }, () => {
                                            this.passData()
                                        })

                                    }} />

                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GifComp
