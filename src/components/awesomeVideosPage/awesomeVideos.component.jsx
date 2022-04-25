import { useEffect, useState } from "react"
import { styled } from '@mui/material/styles';
import { Box,OutlinedInput,InputAdornment } from '@mui/material';
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import PageTitle from "../pageTitlesComponent/pageTitles.component"

import "../../assets/css/normalize.css"
import "../../assets/css/asyncnow.webflow.css"
import "../../assets/css/webflow.css"

const axios = require("axios")
const siteUrl = process.env.REACT_APP_SITE_URL

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  height: 37.5,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}))

function AwesomeVideos(props) {
  const [link, setLink] = useState("")
  const [linkToSend, setLinkToSend] = useState("")
  const [videoTitle, setVideoTitle] = useState("")
  const videoId = sessionStorage.getItem("videoId")
  const token = sessionStorage.getItem("token")

  useEffect(() => {
    function GetVideoData() {
      let config = {
        method: "get",
        url: `${siteUrl}/tasks/${videoId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
  }, [videoId])

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
      .then((res) => {console.log("views increased")})
      .catch((error) => {
        console.log(error)
      })
  }

  const handleSearch = async (event) => {
    event.preventDefault()
    setLink(linkToSend)
    let config = {
      method: "get",
      url: `${siteUrl}/others/tasks/${linkToSend}`,
    }
    axios(config)
      .then((res) => {
        setVideoTitle(res.data.description)
        UpdateVideoViews(res.data._id, res.data.views, res.data.clicks)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  PageTitle(props.title)
  return (
    <div className="container-3 w-container">
      <div style={{marginBottom: '1rem',paddingBottom:'1.5rem',borderBottom: '1px solid black'}} className="div-block-37 search-container search-margin">
        <div className="div-block-38 search-subitems">
          <h2 className="heading-8 contacts">WATCH OTHER PEOPLE VIDEOS</h2>
        </div>
        <form className="div-block-40 search-subitems" onSubmit={handleSearch}>
          <SearchStyle
            placeholder="Search link..."
            className="sub-item"
            onChange={(e) => setLinkToSend(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
          />
          <Button className="search-btn-main sub-item" type="button" onClick={handleSearch} variant="outlined">Search</Button>
        </form>
      </div>
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
            <a to="/" data-w-id="6c1ab2ed-325a-4759-0792-678146ef4f12" className="link-11">
              www.asyncnow.com/learn-more
            </a>
          </div>
        </div>
      </div>
      <div className="div-block-49"></div>
    </div>
  )
}

export default AwesomeVideos
