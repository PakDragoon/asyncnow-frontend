import { useEffect, useState } from 'react'

import PageTitle from '../pageTitlesComponent/pageTitles.component'

import '../../assets/css/normalize.css'
import '../../assets/css/asyncnow.webflow.css'
import '../../assets/css/webflow.css'

const axios = require("axios")
const siteUrl = process.env.REACT_APP_SITE_URL
const serverPort = process.env.REACT_APP_SERVER_PORT

function AwesomeVideos(props) {
  const [link, setLink] = useState('')
  const [videoTitle, setVideoTitle] = useState('')
  const videoId = sessionStorage.getItem("videoId")
  const token = sessionStorage.getItem("token")

  useEffect(() => {
    function GetVideoData () {
      console.log('site',siteUrl)
      console.log('server',serverPort)
      let config = {
        method: 'get',
        url: `/tasks/${videoId}`,
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      };
      axios(config)
        .then((res) => {
          setVideoTitle(res.data.description)
          setLink(res.data.link)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    GetVideoData()
  }, [link])

  PageTitle(props.title)
  return (
  <div className="container-3 w-container">
    <div className="div-block-36 video">
      <h2 className="heading-8 contacts video">{videoTitle}</h2>
      <div className="text-block-10 middle short">Hey, Ada Lovelace from Google Inc. sent you a video 🍿</div>
      <div className="div-block-53v">
            <video src={`${siteUrl}:${serverPort}/play/video/${link}`} width='100%' height='100%' controls autoPlay></video>
      </div>
      <div className="div-block-41 short">
        <div className="div-block-42">
          <div className="text-block-10 short">Learn more, visit:</div>
        </div>
        <div className="div-block-47">
          <a to='/' data-w-id="6c1ab2ed-325a-4759-0792-678146ef4f12" className="link-11">www.asyncnow.com/learn-more</a>
        </div>
      </div>
    </div>
    <div className="div-block-49"></div>
  </div>
    );
}

export default AwesomeVideos;
