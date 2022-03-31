/** @format */

import "./Home.scss";

import ProductTile from "../../components/productTile/ProductTile";
import titleBar from "../../assets/icons/3.svg";
import React, { Component } from "react";
// import Route from "react-router-dom";
import axios from "axios";
// import Mens from "../mens/Mens";

// import items from "../../data/Items.json";

// /** @format */
// import React from "react";
// import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
// import VideoDetail from "../../components/videoDetail/VideoDetail";
// import AsideVideo from "../../components/sideVideos/SideVideo";
// import CommentsRender from "../../components/commentsRender/CommentsRender";

// import { Component } from "react";
// import axios from "axios";
// import moment from "moment";
// import CommentInput from "../../components/commentsInput/CommentInput";
// import { toast } from "react-toastify";
// import { uniqueNamesGenerator, starWars } from "unique-names-generator";

// const API_URL = process.env.REACT_APP_BACKEND_URL;
// const API_URL_ID = (id) => `${API_URL}/videos/${id}`;
// const API_URL_ID_LIKES = (id) => `${API_URL}/videos/${id}/likes`;
// const API_URL_ID_COMMENTS = (id) => `${API_URL}/videos/${id}/comments`;
// const API_URL_ID_Comment_Delete = (videoID, commentID) =>
//   `${API_URL}/videos/${videoID}/comments/${commentID}`;

// let newId = "";
// let useId = "";

// export default class Home extends Component {
//   state = {
//     details: {},
//     videos: [],
//     videoID: "",
//   };

//   //******** WORKING API AND MOUNTING START ******** */
//   //******** Loads When Page is Refreshed ******** */
//   componentDidMount() {
//     this.getData();
//   }

//   //******** Loads When State Changes ******** */
//   componentDidUpdate(prevProps, savedVideo) {
//     if (savedVideo !== newId) {
//       newId = this.props.match.params.videoID;
//     }
//     if (newId !== prevProps.match.params.videoID) {
//       if (this.props.match.path === "/") {
//         this.getDefaultVideo();
//         return;
//       }
//       this.getNewData(newId);
//     }
//   }

//   //******** Loads When Logo Is Pressed ******** */
//   //Calls the whole list of vidoes and deletes the first one
//   getDefaultVideo = async () => {
//     const videoResponse = await axios.get(API_URL);
//     this.getNewData(videoResponse.data[0].id);
//   };

//   //******** Validation When The Delete Button Is Pressed ******** */
//   //Checks to see if the button ir the img inside the button is pressed to get the comment tile ID
//   selectComment = (e) => {
//     if (e.target.classList.contains("comment__img")) {
//       let button =
//         e.target.parentElement.parentElement.parentElement.parentElement
//           .parentElement.id;
//       return button;
//     } else if (e.target.classList.contains("comment__button")) {
//       let button =
//         e.target.parentElement.parentElement.parentElement.parentElement.id;
//       return button;
//     }
//   };

//   //******** API Call When The Delete Button Is Pressed ******** */
//   //Takes the ID from the selectComment function and deletes the comment on a video
//   deleteComment = async (e) => {
//     e.preventDefault();
//     let buttonID = this.selectComment(e);
//     const removeComment = await axios.delete(
//       API_URL_ID_Comment_Delete(this.state.videoID, buttonID)
//     );
//     if (removeComment.status === 200) {
//       setTimeout(() => {
//         this.getNewComment();
//       }, 500);
//       toast.success("Comment Deleted");
//     }
//   };

//   //******** API Call To Post A Comment ******** */
//   //Posts A Comment To The Video
//   postComment = async (event) => {
//     const newComment = {
//       name: uniqueNamesGenerator({
//         dictionaries: [starWars],
//       }),
//       comment: event,
//     };

//     await axios
//       .post(API_URL_ID_COMMENTS(this.state.videoID), newComment)
//       .then((response) => {
//         if (response.status === 200) {
//           setTimeout(() => {
//             this.getNewComment();
//           }, 500);
//         }
//       });
//   };

//   //******** API Call To Increment Like on Video ******** */
//   //Posts A Comment To The Video
//   incrementLike = async () => {
//     await axios.put(API_URL_ID_LIKES(this.state.videoID)).then((response) => {
//       if (response.status === 200) {
//         setTimeout(() => {
//           this.getNewComment();
//         }, 500);
//       }
//     });
//   };

//   //******** API Call To Only Respond With New Comment ******** */
//   //This function re-renders the comments section, including the new comment
//   getNewComment = async () => {
//     const response = await axios.get(API_URL_ID(this.state.videoID));
//     this.setState({
//       details: response.data,
//     });
//   };

//   //******** API Call When The Page Is Refreshed ******** */
//   //This function is called when componentDidMount
//   getData = async () => {
//     const videoResponse = await axios.get(API_URL);
//     useId = this.props.match.params.videoID;
//     if (useId === undefined) {
//       useId = videoResponse.data[0].id;
//     }
//     const detailsResponse = await axios.get(API_URL_ID(useId));
//     this.setState({
//       videos: videoResponse.data,
//       details: detailsResponse.data,
//       videoID: useId,
//     });
//   };

//   //******** API Call When An Aside Video Is Clicked Upon ******** */
//   //This function gets the details of the new aside video which the user selects.
//   getNewData = async (newId) => {
//     const videoResponse = await axios.get(API_URL);
//     const response = await axios.get(API_URL_ID(newId));
//     this.setState({
//       details: response.data,
//       videos: videoResponse.data.filter((video) => video.id !== newId),
//       videoID: newId,
//     });
//     window.scrollTo(500, 0);
//   };

//   //******** WORKING API AND MOUNTING END ******** */

//   //******** Function To Humanise Comment Times ******** */
//   newMoment = (commentDate) => {
//     let x = new moment(commentDate);
//     let y = new moment();
//     let duration = moment.duration(-y.diff(x)).humanize(true);
//     return duration;
//   };

//   render() {
//     const { details, videos } = this.state;
//     return (
//       <>
//         {!videos.length > 0 && !details.omments > 0 ? (
//           <p>Loading...</p>
//         ) : (
//           <>
//             <VideoPlayer detailsId={details.id} detailsImage={details.image} />
//             <section className="desktop">
//               <section className="desktop__left">
//                 <VideoDetail
//                   detailsTitle={details.title}
//                   detailsChannel={details.channel}
//                   detailsTimeStamp={details.timestamp}
//                   detailsViews={details.views}
//                   detailsLikes={details.likes}
//                   detailsDescription={details.description}
//                   newMoment={this.newMoment}
//                   incrementLike={this.incrementLike}
//                 />
//                 <CommentInput
//                   postComment={this.postComment}
//                   props={this.props}
//                   // commentValidation={this.commentValidation}
//                 />
//                 <CommentsRender
//                   detailsComment={details.comments}
//                   deleteComment={this.deleteComment}
//                   newMoment={this.newMoment}
//                   props={this.props}
//                 />
//               </section>
//               <section className="desktop__right">
//                 <AsideVideo
//                   videos={videos}
//                   currentVideo={this.state.videoID}
//                   props={this.props}
//                 />
//               </section>
//             </section>
//           </>
//         )}
//       </>
//     );
//   }
// }

export default class Home extends Component {
  // console.log(props);

  // const oneItem = items.filter((item) => item.id == mensId);
  // const { id, name, description, price } = { ...oneItem[0] };
  // const { care, materials } = { ...oneItem[0].additional };
  // const { bleach, iron, tumble, washing } = { ...oneItem[0].instructions };

  render() {
    console.log(this.state.mens);
    return (
      <>
        <div className="home">
          <h1 className="home__title">HOME</h1>
          <img className="home__underline" src={titleBar} />
        </div>
        <ProductTile props={this.props} />
      </>
    );
  }
}
