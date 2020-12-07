import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { deletComment } from "../../actions/post"
import Moment from "react-moment"

const CommentItem = ({
    postId,
    comment: { _id, text, name, avatar, user, date },
    auth,
    deletComment
}) => {
    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                    <img
                        className="round-img"
                        src={avatar}
                        alt="img"
                    />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">
                    {text}
                </p>
                <p className="post-date">
                    Posted On <Moment format="YYYY/MM/DD">{date}</Moment>
                </p>
                {!auth.loading && user === auth.user._id && (
                    <button onClick={(e) => deletComment(postId, _id)} type="button" className="btn btn-danger">
                        <i className="fas fa-times"></i>  Delete Comment
                    </button>
                )}
            </div>
        </div>
    )
}

CommentItem.propTypes = {
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    // comment: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired,
    deletComment: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.authReducer
})

export default connect(mapStateToProps, { deletComment })(withRouter(CommentItem))
