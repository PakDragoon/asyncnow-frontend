import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import PageTitle from "../pageTitlesComponent/pageTitles.component"

import "../../assets/css/normalize.css"
import "../../assets/css/asyncnow.webflow.css"
import "../../assets/css/webflow.css"

const axios = require("axios")
const siteUrl = process.env.REACT_APP_SITE_URL

function AwesomeVideos(props) {
  let { linkv } = useParams()
  const [link, setLink] = useState("")
  const [videoTitle, setVideoTitle] = useState("")
  const isAuthenticated = sessionStorage.getItem("isAuthenticated")

  useEffect(() => {
    function GetVideoData() {
      setLink(linkv)
      let config = {
        method: "get",
        url: `${siteUrl}/others/tasks/${link}`
      }
      axios(config)
        .then((res) => {
          setVideoTitle(res.data.description)
          if(!isAuthenticated){
            UpdateVideoViews(res.data._id, res.data.views, res.data.clicks)
            console.log('function ran')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
    GetVideoData()
  }, [link])

  function UpdateVideoViews(videoI, videoV, videoC) {
    const updateData = {
      views: videoV + 1,
      clicks: videoC + 1,
    }
    let configPatch = {
      method: "patch",
      url: `${siteUrl}/others/tasks/${videoI}`,
      data: updateData,
    }
    axios(configPatch)
      .then((res) => {console.log('function response')})
      .catch((error) => {
        console.log(error)
      })
  }

  PageTitle(props.title)
  return (
    <div className="container-3 w-container">
      <div className="div-block-36 video">
        <h2 className="heading-8 contacts video">{videoTitle}</h2>
        <div className="text-block-10 middle short">Hey, Ada Lovelace from Google Inc. sent you a video 🍿</div>
        <div className="div-block-53v">
          <video src={`${siteUrl}/play/video/${link}`} width="100%" height="100%" controls autoPlay></video>
        </div>
        <div className="div-block-41 short">
          <div className="div-block-42">
            <div className="text-block-10 short">Learn more, visit:</div>
          </div>
          <div className="div-block-47">
            <Link to="/" data-w-id="6c1ab2ed-325a-4759-0792-678146ef4f12" className="link-11">
              www.asyncnow.com/learn-more
            </Link>
          </div>
        </div>
      </div>
      <div className="div-block-49"></div>
    </div>
  )
}

export default AwesomeVideos
