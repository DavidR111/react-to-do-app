import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../../redux/actions/action.post'
import { withRouter, Link } from "react-router-dom"
import ModalDialog from '../ModalDialog/ModalDialog'

import './Dashboard.css'

class Dashboard extends Component {

    state = {
        filter: 'all',
        currentPost: null
    }

    modalEvent = (e) => {
        const { currentPost } = this.state
        const { actions } = this.props

        switch (e.target.id) {
            case "close": case "Cancel":
                this.setState({
                    currentPost: null
                })
                break;
            case "OK":
                actions.postDelete(currentPost.id)
                this.setState({
                    currentPost: null
                })
                break;
            default:
                break;
        }
    }

    handleFilter = (e) => {
        this.setState({
            filter: e.target.id
        })
    }

    handleTask = (e, taskId) => {
        let actionName = e.target.id
        const { actions } = this.props

        switch (actionName) {
            case "subscribe":
                actions.postActive(taskId)
                break;
            case "delete":
                this.setState({
                    currentPost: taskId
                })
                break;
            default:
                break;
        }
    }

    handleNew = (e) => {
        this.props.history.push("/new")
    }

    render() {
        const { posts } = this.props
        const { filter, currentPost } = this.state

        return (
            <div className={"container"}>
                <div className={'row'}>
                    <table className={"data"}>
                        <thead>
                            <tr>
                                <th> State </th>
                                <th> Title </th>
                                <th> Subscribe/Delete </th>
                                <th>
                                    <button className={"create_button"} onClick={this.handleNew} >
                                        New
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts && posts.map((post) => (
                                    post &&
                                    (filter === 'all' ||
                                        (filter === 'active' && !post.finish) ||
                                        (filter === 'finished' && post.finish)) &&
                                    <tr key={post.id}>
                                        <td>
                                            <label className="checkContainer">
                                                <input type="checkbox" disabled checked={post.finish} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td><Link to={"/update/" + post.id} >{post.title}</Link></td>
                                        <td>
                                            <button id={"subscribe"}
                                                className={"subscribe_button"}
                                                onClick={(e) => this.handleTask(e, post.id)} > {!post.finish ? "subscribe" : "unsubscribe"}
                                            </button>

                                            <button id={"delete"}
                                                className={"del_button"}
                                                onClick={(e) => this.handleTask(e, post)}> delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <div className={'row'}>
                    <div className={"filter"}>
                        <button id={'all'} onClick={this.handleFilter} className={filter === 'all' ? "active" : ""} > All </button>
                        <button id={'active'} onClick={this.handleFilter} className={filter === 'active' ? "active" : ""}> Active </button>
                        <button id={'finished'} onClick={this.handleFilter} className={filter === 'finished' ? "active" : ""}> Finished </button>
                    </div>
                </div>

                <ModalDialog currentPost={currentPost} modalEvent={this.modalEvent} />

            </div>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(postActions, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));