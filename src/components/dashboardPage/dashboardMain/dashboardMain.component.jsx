import React, {useState} from "react"
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet"
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil"
import { userDataRecoil } from "../../data/atom"
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import { styled } from '@mui/material/styles';
import { Box,OutlinedInput,InputAdornment } from '@mui/material';

import DashboardSubTitle from "../title.component"
import videosIcon from "../../../assets/images/focus.png"
import insightsIcon from "../../../assets/images/share.png"
import settingsIcon from "../../../assets/images/more.png"

import "../../../assets/css/normalize.css"
import "../../../assets/css/asyncnow.webflow.css"
import "../../../assets/css/webflow.css"

const axios = require('axios')
const title = "Dashboard | Main"

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  height: 37.5,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

function DashboardMain() {
  // const { userId, userName, userCompany, userRole, userEmail } = useRecoilValue(userDataRecoil)
  const userName = sessionStorage.getItem("name")
  const navigate = useNavigate()
  const [linkToSend, setLinkToSend] = useState('')
  const [description, setDescription] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [videoId, setVideoId] = useState('')
  const [videoViews, setVideoViews] = useState('')
  const [videoClicks, setVideoClicks] = useState('')
  const [isData, setIsData] = useState(false)

  const handleSearch = async (event) => {
    event.preventDefault()
    let config = {
      method: 'get',
      url: `/others/tasks/${linkToSend}`
    };
    axios(config)
      .then((res) => {
        setDescription(res.data.description)
        setCreatedAt(res.data.createdAt)
        setVideoId(res.data._id)
        setVideoViews(res.data.views)
        setVideoClicks(res.data.clicks)
        setIsData(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function UpdateVideoViews (videoI, videoV, videoC) {
    const updateData = {
      views: videoV + 1,
      clicks: videoC + 1
      }
  let configPatch = {
      method: 'patch',
      url: `/others/tasks/${videoI}`,
      data: updateData
    };
    axios(configPatch)
      .then((res) => {
      })
      .catch((error) => {
        console.log(error)
      })
    navigate("/awesome")
}

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="div-block-39">
        <DashboardSubTitle subTitle="Dashboard" />
        <div className="text-block-10 middle">Hey {userName}, welcome to async. Let&#x27;s get started 🚀</div>
        <div className="div-block-41">
          <div className="div-block-42">
            <Link to="videos" className="link-block-2 inline w-inline-block">
              <img src={videosIcon} loading="lazy" sizes="(max-width: 479px) 100vw, 40px" alt="" />
            </Link>
            <div className="text-block-10">Manage your personal videos</div>
          </div>
          <div className="div-block-47">
            <Link to="videos" className="link-11">
              Manage videos
            </Link>
          </div>
        </div>
        <div className="div-block-41">
          <div className="div-block-42">
            <Link to="insights" className="link-block-2 inline w-inline-block">
              <img src={insightsIcon} loading="lazy" sizes="(max-width: 479px) 100vw, 40px" alt="" />
            </Link>
            <div className="text-block-10">Gain more insights and data</div>
          </div>
          <div className="div-block-47">
            <Link to="insights" className="link-11">
              View insights
            </Link>
          </div>
        </div>
        <div className="div-block-41 end">
          <div className="div-block-42">
            <Link to="settings" className="link-block-2 inline w-inline-block">
              <img src={settingsIcon} loading="lazy" sizes="(max-width: 479px) 100vw, 40px" alt="" />
            </Link>
            <div className="text-block-10">Update your personal settings</div>
          </div>
          <div className="div-block-47">
            <Link to="settings" className="link-11">
              Update settings
            </Link>
          </div>
        </div>
      </div>
      {/* <div className="div-block-37 search-container search-margin">
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
      <div className="div-block-39 search-result-margin">
                {isData ? (<div className="div-block-41">
                    <div className="div-block-42">
                        <a href="../app/awesome-video.html" target="_blank" className="link-block-2 inline w-inline-block">
                        <img src={videosIcon} loading="lazy" sizes="(max-width: 479px) 100vw, (max-width: 767px) 7vw, 40px" alt=""/></a>
                        <div className="text-block-10">{description} | Created {createdAt}</div>
                    </div>
                    <div className="div-block-47">
                        <a href='#' onClick={() => {sessionStorage.setItem("videoId", videoId);UpdateVideoViews(videoId, videoViews, videoClicks)}} className="link-11">Watch</a>
                        <div className="div-block-48">
                            <div className="text-block-10"></div>
                        </div>
                    </div>
                </div>) : (
                  <div className="center-text-main">
                    -- Enter video link in the search bar --
                  </div>
                )}
        </div> */}
    </>
  )
  // }
}

export default DashboardMain
