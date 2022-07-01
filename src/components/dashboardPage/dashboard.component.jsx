import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import Overlay from "react-overlay-component"
import { ReactMediaRecorder } from "react-media-recorder"
import { CountdownCircleTimer } from "react-countdown-circle-timer"

import dashboardIcon from "../../assets/images/menu.png"
import videosIcon from "../../assets/images/focus.png"
import insightsIcon from "../../assets/images/share.png"
import settingsIcon from "../../assets/images/more.png"
import createIcon from "../../assets/images/add.png"
import DashboardVideos from "./dashboardVideos/dashboardVideos.component"
import DashboardMain from "./dashboardMain/dashboardMain.component"
import DashboardInsights from "./dashboardInsights/dashboardInsights.component"
import DashboardSettings from "./dashboardSettings/dashboardSettings.component"
import PageTitle from "../pageTitlesComponent/pageTitles.component"

import "./countdown.style.css"
import "../../assets/css/normalize.css"
import "../../assets/css/asyncnow.webflow.css"
import "../../assets/css/webflow.css"

const axios = require("axios")
const siteUrl = process.env.REACT_APP_SITE_URL

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Starting now</div>
  }
  return (
    <div className="timer">
      <div className="text">{`${remainingTime === 3 ? "Starting in ." : remainingTime === 2 ? "Starting in . ." : remainingTime === 1 ? "Starting in . . ." : ""}`}</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  )
}

const VideoPreview = (props) => {
  const stream = props.stream
  console.log(stream)
  const videoRef = useRef(null)
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])
  if (!stream) {
    return null
  }
  return <video ref={videoRef} className="record-video text-block-10 middle video" width="308" height="300" autoPlay />
}

function liveStream(stream) {
  const previewStream = stream
  if (previewStream != null) {
    return <VideoPreview stream={previewStream} />
  } else {
    return `Click 'Record Now' to start. Rremember you have 60 seconds. And don't forget to smile 😀`
  }
}

function Dashboard(props) {
  PageTitle(props.title)
  const location = useLocation()
  const token = sessionStorage.getItem("token")
  const [isOpen, setOverlay] = useState(false)
  const [isOpenUpload, setOverlayUpload] = useState(false)
  const [isOpenRecord, setOverlayRecord] = useState(false)
  const [description, setDescription] = useState("")
  const [cta, setCTA] = useState("")
  const [fileData, setFileData] = useState()
  const [countdownStart, setCountdownStart] = useState(false)
  const [record, setRecord] = useState(false)
  const [previewV, setPreviewV] = useState(false)
  const [saveV, setSaveV] = useState(false)
  const configs = {
    animate: true,
    clickDismiss: true,
    escapeDismiss: true,
  }

  const handleUploadVideo = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    console.log("newFile fileData:", fileData)
    formData.append("video", fileData)
    formData.append("description", description)
    formData.append("cta", cta)
    var configFile = {
      method: "post",
      url: `${siteUrl}/upload/video`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    }
    axios(configFile)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    setOverlayUpload(false)
    setDescription("")
    setCTA("")
  }
  const handleSubmitVideo = async (url, event) => {
    event.preventDefault()
    console.log("mediaurl:", url)
    const videoBlob = await fetch(url).then((e) => e.blob())
    console.log("videoblob:", videoBlob)
    const newFile = blobToFile(videoBlob, "new-file.mp4")
    console.log("newFile:", newFile)
    setFileData(newFile)
    const formData = new FormData()
    console.log("newFile fileData:", fileData)
    formData.append("video", newFile)
    formData.append("description", description)
    formData.append("cta", cta)
    var configFile = {
      method: "post",
      url: `${siteUrl}/upload/video`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    }
    axios(configFile)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err.res.data)
      })
    setOverlayRecord(false)
    setDescription("")
    setCTA("")
    setSaveV(false)
    setPreviewV(false)
    setRecord(false)
  }

  function blobToFile(theBlob, fileName) {
    return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
  }

  return (
    <>
      <div data-animation="default" data-collapse="medium" data-duration={400} data-easing="ease" data-easing2="ease" role="banner" className="navbar-4 w-nav">
        <div className="container-8 w-container">
          <div className="div-block-59">
            <div className="div-block-63">
              <Link to="main" aria-current="page" className="link-block-2 inline mobile app w-inline-block w--current">
                <img src={dashboardIcon} loading="lazy" sizes="(max-width: 479px) 45px, 100vw" alt="" />
              </Link>
            </div>
            <div className="div-block-60" />
            <div className="div-block-63">
              <Link to="videos" className="link-block-2 inline mobile app w-inline-block">
                <img src={videosIcon} loading="lazy" sizes="(max-width: 479px) 45px, 100vw" alt="" />
              </Link>
            </div>
            <div className="div-block-60" />
            <div className="div-block-63">
              <a
                data-w-id="1dcf8c3a-263a-bca4-53ba-8783240c6109"
                href="#"
                onClick={() => {
                  setOverlay(true)
                }}
                className="link-block-2 inline mobile app main w-inline-block"
              >
                <img src={createIcon} loading="lazy" sizes="(max-width: 479px) 55px, 100vw" alt="" />
              </a>
              <div className="text-block-25">NEW&nbsp;VIDEO</div>
            </div>
            <div className="div-block-60" />
            <div className="div-block-63">
              <Link to="insights" className="link-block-2 inline mobile app w-inline-block">
                <img src={insightsIcon} loading="lazy" sizes="(max-width: 479px) 45px, 100vw" alt="" />
              </Link>
            </div>
            <div className="div-block-60" />
            <div className="div-block-63">
              <Link to="settings" className="link-block-2 inline mobile app w-inline-block">
                <img src={settingsIcon} loading="lazy" sizes="(max-width: 479px) 45px, 100vw" alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container-3 w-container">
        <div className="div-block-36">
          <div className="div-block-37">
            <div className="div-block-38">
              <Link to="main" aria-current="page" className="link-block-2 w-inline-block w--current">
                <img src={dashboardIcon} loading="lazy" sizes="(max-width: 479px) 100vw, 40px" alt="" />
              </Link>
              <Link to="videos" className="link-block-2 w-inline-block">
                <img src={videosIcon} loading="lazy" sizes="(max-width: 479px) 100vw, 40px" alt="" />
              </Link>
              <Link to="insights" className="link-block-2 w-inline-block">
                <img src={insightsIcon} loading="lazy" sizes="(max-width: 479px) 100vw, 40px" alt="" />
              </Link>
              <Link to="settings" className="link-block-2 end w-inline-block">
                <img src={settingsIcon} loading="lazy" sizes="(max-width: 479px) 100vw, 40px" alt="" />
              </Link>
            </div>
            <div className="div-block-40">
              <div className="text-block-10">Create a new video</div>
              <a
                data-w-id="83de8771-2499-14e9-2e83-580013f06173"
                href="#"
                onClick={() => {
                  setOverlay(true)
                }}
                className="link-block-2 video w-inline-block"
              >
                <img src={createIcon} loading="lazy" sizes="(max-width: 479px) 100vw, 40px" alt="" />
              </a>
            </div>
          </div>
          {location.pathname === "/dashboarduser/main" ? <DashboardMain /> : location.pathname === "/dashboarduser/videos" ? <DashboardVideos /> : location.pathname === "/dashboarduser/insights" ? <DashboardInsights /> : location.pathname === "/dashboarduser/settings" ? <DashboardSettings /> : <DashboardMain />}
        </div>
      </div>
      <div>
        <Overlay configs={configs} isOpen={isOpen}>
          <div style={{ opacity: "1" }} className="pup-up-modal">
            <div className="pop-up-modal-content video step-one">
              <div className="div-block-52">
                <h1 className="heading-4 video">
                  Start recording
                  <span className="text-span-13" />
                  <br />
                </h1>
                <div className="text-block-14">(1/3)</div>
              </div>
              <div className="div-block-50">
                <div className="text-block-10 middle video">
                  <div style={{ marginBottom: "1.25rem" }}>
                    <a
                      href="#"
                      className="button w-button"
                      onClick={() => {
                        setOverlay(false)
                        setOverlayUpload(true)
                      }}
                    >
                      Upload
                    </a>
                  </div>
                  ---------- OR ----------
                  <div style={{ marginTop: "1.25rem" }}>
                    <a
                      href="#"
                      className="button w-button"
                      onClick={() => {
                        setOverlay(false)
                        setOverlayRecord(true)
                      }}
                    >
                      Record
                    </a>
                  </div>
                </div>
              </div>
              <div className="div-block-2 hero video">
                <a style={{ visibility: "hidden" }} href="#" className="button w-button"></a>
                <a
                  data-w-id="a2e8d7ad-6795-c789-6128-48db5d5332da"
                  href="#"
                  className="link-7"
                  onClick={() => {
                    setOverlay(false)
                  }}
                >
                  Cancel
                </a>
              </div>
            </div>
          </div>
        </Overlay>
        <Overlay configs={configs} isOpen={isOpenUpload}>
          <div style={{ opacity: "1" }} className="pup-up-modal">
            <div className="pop-up-modal-content video step-one">
              <div className="div-block-52">
                <h1 className="heading-4 video">
                  Confirm details
                  <span className="text-span-13" />
                  <br />
                </h1>
                <div className="text-block-14">(3/3)</div>
              </div>
              <div className="form-block w-form">
                <form id="wf-form-Email-Form" name="wf-form-Email-Form" data-name="Email Form" encType="multipart/form-data" className="form join">
                  <label htmlFor="Title" className="field-label">
                    VIDEO&nbsp;TITLE
                  </label>
                  <input type="text" className="text-field w-input" onChange={(e) => setDescription(e.target.value)} maxLength={256} name="Title" data-name="Title" placeholder="Awesome video title!" id="Title" required />
                  <label htmlFor="CTA" className="field-label">
                    CTA (OPTIONAL)
                  </label>
                  <input type="text" className="text-field w-input" onChange={(e) => setCTA(e.target.value)} maxLength={256} name="CTA" data-name="CTA" placeholder="/@alovelace/save-10%" id="CTA" />
                  <label htmlFor="CTA" className="field-label">
                    Upload File
                  </label>
                  <input type="file" className="text-field w-input" onChange={(e) => setFileData(e.target.files[0])} name="video" data-name="video" placeholder="Choose File" id="video" />
                  <div className="div-block-12 low">
                    <button type="submit" data-wait="Please wait..." className="submit-button w-button" onClick={handleUploadVideo}>
                      Save & Copy
                    </button>
                    <a
                      data-w-id="a2e8d7ad-6795-c789-6128-48db5d533307"
                      href="#"
                      className="link-7"
                      onClick={() => {
                        setOverlayUpload(false)
                        setDescription("")
                        setCTA("")
                        setFileData()
                      }}
                    >
                      Cancel
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Overlay>
        <Overlay configs={configs} isOpen={isOpenRecord}>
          <ReactMediaRecorder
            video
            audio={true}
            render={({ status, startRecording, stopRecording, mediaBlobUrl, previewStream }) => (
              <div>
                <div style={{ opacity: "1" }} className="pup-up-modal">
                  {!saveV ? (
                    <div className="pop-up-modal-content video step-one">
                      <div className="div-block-52">
                        <h1 className="heading-4 video">
                          {!previewV ? "Start recording" : "Review Video"}
                          <span className="text-span-13" />
                          <br />
                        </h1>
                        <div className="text-block-14">{!previewV ? "(1/3)" : "(2/3)"}</div>
                      </div>
                      <div className="div-block-50">{!previewV ? <div className="text-block-10 middle video">{liveStream(previewStream)}</div> : <video className="text-block-10 middle video" width="308" height="300" src={mediaBlobUrl} controls></video>}</div>
                      <div className="div-block-2 hero video">
                        {!record ? (
                          <a
                            href="#"
                            className="button w-button"
                            onClick={() => {
                              startRecording()
                              setRecord(true)
                            }}
                          >
                            Record
                          </a>
                        ) : record && !previewV ? (
                          <a
                            href="#"
                            className="button w-button"
                            onClick={() => {
                              stopRecording()
                              setPreviewV(true)
                            }}
                          >
                            Stop
                          </a>
                        ) : (
                          <a
                            href="#"
                            className="button w-button"
                            onClick={() => {
                              setSaveV(true)
                            }}
                          >
                            Save
                          </a>
                        )}
                        <a
                          data-w-id="a2e8d7ad-6795-c789-6128-48db5d5332da"
                          href="#"
                          className="link-7"
                          onClick={() => {
                            setOverlayRecord(false)
                            stopRecording()
                          }}
                        >
                          Cancel
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div style={{ opacity: "1" }} className="pop-up-modal-content video step-one">
                      <div className="div-block-52">
                        <h1 className="heading-4 video">
                          Confirm details
                          <span className="text-span-13" />
                          <br />
                        </h1>
                        <div className="text-block-14">(3/3)</div>
                      </div>
                      <div className="form-block w-form">
                        <form id="wf-form-Email-Form" name="wf-form-Email-Form" data-name="Email Form" encType="multipart/form-data" className="form join">
                          <label htmlFor="Title" className="field-label">
                            VIDEO&nbsp;TITLE
                          </label>
                          <input type="text" className="text-field w-input" onChange={(e) => setDescription(e.target.value)} maxLength={256} name="Title" data-name="Title" placeholder="Awesome video title!" id="Title" required />
                          <label htmlFor="CTA" className="field-label">
                            CTA (OPTIONAL)
                          </label>
                          <input type="text" className="text-field w-input" onChange={(e) => setCTA(e.target.value)} maxLength={256} name="CTA" data-name="CTA" placeholder="/@alovelace/save-10%" id="CTA" />
                          <div className="div-block-12 low">
                            <button type="submit" data-wait="Please wait..." className="submit-button w-button" onClick={(event) => handleSubmitVideo(mediaBlobUrl, event)}>
                              Save & Copy
                            </button>
                            <a
                              data-w-id="a2e8d7ad-6795-c789-6128-48db5d533307"
                              href="#"
                              className="link-7"
                              onClick={() => {
                                setOverlayRecord(false)
                              }}
                            >
                              Cancel
                            </a>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
                <p>Status : {status}</p>
              </div>
            )}
          />
        </Overlay>
      </div>
    </>
  )
}

export default Dashboard
