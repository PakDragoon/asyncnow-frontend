import React, {useState,useEffect} from "react"
import { Helmet } from "react-helmet"

import videosIcon from "../../../assets/images/focus.png"
import DashboardSubTitle from "../title.component"
import DashboardSubText from "../subtext.component"

import "../../../assets/css/normalize.css"
import "../../../assets/css/asyncnow.webflow.css"
import "../../../assets/css/webflow.css"

const axios = require("axios")
const title = "Dashboard | Insights"

function DashboardInsights() {
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
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="div-block-39">
        <DashboardSubTitle subTitle="Insights" />
        <DashboardSubText subText="Gain insights into how your sent videos perform 📈" />
        {data.map((row) => {
          return (
            <div className="div-block-41" key={row.link}>
              <div className="div-block-42">
                <a href="../app/awesome-video.html" target="_blank" className="link-block-2 inline w-inline-block">
                  <img src={videosIcon} loading="lazy" sizes="(max-width: 479px) 100vw, (max-width: 767px) 7vw, 40px" alt="" />
                </a>
                <div className="text-block-10">{row.description}</div>
              </div>
              <div className="div-block-47">
                <p className="link-11i">{row.views} views</p>
                <div className="div-block-48">
                  <div className="text-block-10">|</div>
                </div>
                <p className="link-11i">{row.clicks} clicks</p>
              </div>
            </div>
          )
        })}
      </div>
      <div className="div-block-49"></div>
    </>
  )
}

export default DashboardInsights
