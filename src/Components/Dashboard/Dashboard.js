import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../../redux/actions/action.post'

import './Dashboard.css'

class Dashboard extends Component {

    state = {
        filter: 'all'
    }

    handleFilter = (e) => {
        this.setState({
            filter: e.target.id
        })
    }

    handleTask = (e, taskId) => {
        let actionName = e.target.id

        switch (actionName) {
            case "subscribe":
                break;
            case "delete":
                break;
            default:
                break;
        }
    }

    render() {
        const { posts } = this.props
        const { filter } = this.state

        return (
            <div className={"container"}>
                <div className={'row'}>
                    <table className={"data"}>
                        <thead>
                            <tr>
                                <th> State </th>
                                <th> Title </th>
                                <th> Subscribe/Delete </th>
                                <th> <button className={"create_button"}>New</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts.map((post) => (
                                    post &&
                                    (filter === 'all' ||
                                        (filter === 'active' && !post.finish) ||
                                        (filter === 'finished' && post.finish)) &&
                                    <tr key={post.id}>
                                        <td><input type="checkbox" disabled defaultChecked={post.finish} /></td>
                                        <td><a href={"/edit/" + post.id} >{post.title}</a></td>
                                        <td>
                                            <button id={"subscribe"}
                                                className={"subscribe_button"}
                                                onClick={(e) => this.handleTask(e, post.id)} > subscribe
                                            </button>

                                            <button id={"delete"}
                                                className={"del_button"}
                                                onClick={(e) => this.handleTask(e, post.id)}> delete
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);