import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import { confirmAlert } from "react-confirm-alert"

import videosIcon from '../../../assets/images/focus.png'
import DashboardSubTitle from '../title.component'
import DashboardSubText from '../subtext.component'

import '../../../assets/css/normalize.css'
import '../../../assets/css/asyncnow.webflow.css'
import '../../../assets/css/webflow.css'

const axios = require("axios")
const title = 'Dashbaord | Videos'

function DashboardVideos () {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const token = sessionStorage.getItem("token")
    useEffect(() => {
        var config = {
            method: 'get',
            url: '/tasks',
            headers: { 
              'Authorization': `Bearer ${token}`
            }
        };
        axios(config)
          .then((res) => {
            setData(res.data)
          })
          .catch((error) => {
            console.log(error)
          })
      }, [data])
      
    function handleDeleteVideo (taskId, taskLink) {
        var configS3 = {
            method: 'delete',
            url: `/delete/s3obj/${taskLink}`,
            headers: { 
              'Authorization': `Bearer ${token}`
            }
        };
        var config = {
            method: 'delete',
            url: `/delete/tasks/${taskId}`,
            headers: { 
              'Authorization': `Bearer ${token}`
            }
        };
        confirmAlert({
            title: "Confirm to proceed",
            message: "Are you sure to delete this video?",
            buttons: [
            {
                label: "Yes",
                onClick: () => {
                axios(config)
                    .then((res) => {
                    console.log("Result:", res)
                    })
                    .catch((error) => {
                    console.log(error)
                    })
                axios(configS3)
                    .then((res) => {
                    console.log("Result:", res)
                    })
                    .catch((error) => {
                    console.log(error)
                    })
                },
            },
            {
                label: "No",
            },
            ],
        })
    }
    function UpdateVideoViews (videoId, videoViews, videoClicks) {
        const updateData = {
            views: videoViews + 1,
            clicks: videoClicks + 1
            }
        let configPatch = {
            method: 'patch',
            url: `/tasks/${videoId}`,
            headers: { 
              'Authorization': `Bearer ${token}`
            },
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
            <title>{ title }</title>
        </Helmet>
        <div className="div-block-39">
            <DashboardSubTitle subTitle='Videos' />
            <DashboardSubText subText='Manage sent videos, record and send new ones 🎬' />
            {data.map((row) => {
                return (
                <div className="div-block-41" key={row.link}>
                    <div className="div-block-42">
                        <a href="../app/awesome-video.html" target="_blank" className="link-block-2 inline w-inline-block">
                        <img src={videosIcon} loading="lazy" sizes="(max-width: 479px) 100vw, (max-width: 767px) 7vw, 40px" alt=""/></a>
                        <div className="text-block-10">{row.description} | Created {row.createdAt} | 
                            <a href="#" data-w-id="cdf8e958-4979-1242-fa13-88ab444c05f7" className="link-13" onClick={() => {handleDeleteVideo(row._id, row.link)}}>Delete</a>
                        </div>
                    </div>
                    <div className="div-block-47">
                        <a href='#' onClick={() => {sessionStorage.setItem("videoId", row._id);UpdateVideoViews(row._id, row.views, row.clicks)}} className="link-11">Watch</a>
                        <div className="div-block-48">
                            <div className="text-block-10">|</div>
                        </div>
                        <Link to="insights" className="link-11">Insights</Link>
                        <div className="div-block-48">
                            <div className="text-block-10">|</div>
                        </div>
                        <a href="#" data-w-id="d171a671-d3c3-ae8d-71c8-7575c94780d8" className="link-11" onClick={() =>  navigator.clipboard.writeText(`${row.link}`)}>Copy Link</a>
                    </div>
                </div>
                )
            })}
        </div>
        </>
    )
}

export default DashboardVideos

