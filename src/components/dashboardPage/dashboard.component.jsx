import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Overlay from "react-overlay-component";
import { useReactMediaRecorder } from "react-media-recorder";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import dashboardIcon from '../../assets/images/menu.png'
import videosIcon from '../../assets/images/focus.png'
import insightsIcon from '../../assets/images/share.png'
import settingsIcon from '../../assets/images/more.png'
import createIcon from  '../../assets/images/add.png'
import DashboardVideos from './dashboardVideos/dashboardVideos.component';
import DashboardMain from './dashboardMain/dashboardMain.component';
import DashboardInsights from './dashboardInsights/dashboardInsights.component';
import DashboardSettings from './dashboardSettings/dashboardSettings.component';
import PageTitle from '../pageTitlesComponent/pageTitles.component'

import "./countdown.style.css";
import '../../assets/css/normalize.css'
import '../../assets/css/asyncnow.webflow.css'
import '../../assets/css/webflow.css'

const axios = require("axios")

const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Starting now</div>;
    }
  
    return (
      <div className="timer">
        <div className="text">
            {`${remainingTime === 3 ? 'Starting in .' : 
            remainingTime === 2 ? 'Starting in . .' : 
            remainingTime === 1 ? 'Starting in . . .' : ''}`}
        </div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

function Dashboard(props) {
    PageTitle(props.title)
    const videoRef = useRef(null);
    const location = useLocation();
    const token = sessionStorage.getItem("token")
    const [isOpen, setOverlay] = useState(false);
    const [description, setDescription] = useState('');
    const [cta, setCTA] = useState("");
    const [fileData, setFileData] = useState();
    const [firstClick, setFirstClick] = useState(false)
    const [countdownStart, setCountdownStart] = useState(false)
    const {status,previewStream,startRecording,stopRecording,mediaBlobUrl,} = useReactMediaRecorder({ video: true });

    const configs = {
        animate: true,
        clickDismiss: true,
        escapeDismiss: true,
    };
    const OverlayOne = useRef(null);
    const OverlayTwo = useRef(null);
    const OverlayThree = useRef(null);

    useEffect(() => {
        if (videoRef.current && previewStream) {
            videoRef.current.srcObject = previewStream;
        }
    }, [previewStream]);

    function recorderStart () {
        startRecording()
        setFirstClick(true)
        setTimeout( function() { stopRecording(); }, 60000);
    }

    function blobToFile(theBlob, fileName){       
        return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
    }

    async function handleClickOne() {
        if(firstClick) {
            OverlayOne.current.style.display = 'none';
            OverlayTwo.current.style.display = 'block';
            OverlayThree.current.style.display = 'none';
            stopRecording()
            setFirstClick(false)
            const videoBlob = await fetch(mediaBlobUrl).then(e => e.blob());
            const newFile = blobToFile(videoBlob, 'new-file.mp4')
            setFileData(newFile)
            console.log('videoBlob',videoBlob)
            const a = document.createElement("a")
            document.body.appendChild(a)
            a.style = "display: none"
            a.href = mediaBlobUrl
            a.download = 'test.mp4'
            a.click()
        }
        if(!firstClick){
            setCountdownStart(true)
            renderTime()
        }
    }

    function handleClickTwo() {
      OverlayThree.current.style.display = 'block';
      OverlayTwo.current.style.display = 'none';
      OverlayOne.current.style.display = 'none';
    }

    function handleClickThree() {
      OverlayThree.current.style.display = 'none';
      OverlayTwo.current.style.display = 'none';
      OverlayOne.current.style.display = 'block';
    }

    const handleSubmitVideo = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        console.log('newFile fileData:',fileData)
        formData.append("video", fileData);
        formData.append("description", description);
        formData.append("cta", cta);
        var configFile = {
            method: 'post',
            url: '/upload/video',
            headers: { 
              'Authorization': `Bearer ${token}`
            },
            data: formData
        }; 
        axios(configFile)
          .then((res) => {
              console.log(res)
          })
          .catch((err) => {
            console.log(err.res.data)
          })  
        handleClickThree()
        setOverlay(false)
        setDescription("")
        setCTA("")
      }
  return (
    <>
    <div data-animation="default" data-collapse="medium" data-duration={400} data-easing="ease" data-easing2="ease" role="banner" className="navbar-4 w-nav">
        <div className="container-8 w-container">
            <div className="div-block-59">
                <div className="div-block-63">
                    <Link to='main' aria-current="page" className="link-block-2 inline mobile app w-inline-block w--current">
                        <img src={dashboardIcon} loading="lazy" sizes="(max-width: 479px) 45px, 100vw" alt="" /></Link>
                </div>
                <div className="div-block-60" />
                <div className="div-block-63">
                    <Link to='videos' className="link-block-2 inline mobile app w-inline-block">
                        <img src={videosIcon} loading="lazy" sizes="(max-width: 479px) 45px, 100vw" alt="" /></Link>
                </div>
                <div className="div-block-60" />
                <div className="div-block-63">
                    <a data-w-id="1dcf8c3a-263a-bca4-53ba-8783240c6109" href='#' onClick={() => {setOverlay(true);}} className="link-block-2 inline mobile app main w-inline-block">
                        <img src={createIcon} loading="lazy" sizes="(max-width: 479px) 55px, 100vw" alt="" /></a>
                    <div className="text-block-25">NEW&nbsp;VIDEO</div>
                </div>
                <div className="div-block-60" />
                <div className="div-block-63">
                    <Link to='insights' className="link-block-2 inline mobile app w-inline-block">
                        <img src={insightsIcon} loading="lazy" sizes="(max-width: 479px) 45px, 100vw" alt="" /></Link>
                </div>
                <div className="div-block-60" />
                <div className="div-block-63">
                    <Link to='settings' className="link-block-2 inline mobile app w-inline-block">
                        <img src={settingsIcon} loading="lazy" sizes="(max-width: 479px) 45px, 100vw" alt="" /></Link>
                </div>
            </div>
        </div>
    </div>
    <div className="container-3 w-container">
        <div className="div-block-36">
            <div className="div-block-37">
                <div className="div-block-38">
                    <Link to='main' aria-current="page" className="link-block-2 w-inline-block w--current">
                        <img src={dashboardIcon} loading="lazy" sizes="(max-width: 479px) 100vw, 40px" alt=""/></Link>
                    <Link to='videos' className="link-block-2 w-inline-block">
                        <img src={videosIcon} loading="lazy" sizes="(max-width: 479px) 100vw, 40px" alt=""/></Link>
                    <Link to='insights' className="link-block-2 w-inline-block">
                        <img src={insightsIcon} loading="lazy" sizes="(max-width: 479px) 100vw, 40px" alt=""/></Link>
                    <Link to='settings' className="link-block-2 end w-inline-block">
                        <img src={settingsIcon} loading="lazy" sizes="(max-width: 479px) 100vw, 40px" alt=""/></Link>
                </div>
                <div className="div-block-40">
                    <div className="text-block-10">Create a new video</div>
                    <a data-w-id="83de8771-2499-14e9-2e83-580013f06173" href='#' onClick={() => {setOverlay(true);}} className="link-block-2 video w-inline-block">
                        <img src={createIcon} loading="lazy" sizes="(max-width: 479px) 100vw, 40px" alt=""/></a>
                </div>
            </div>
                {location.pathname === '/dashboarduser/main' ? <DashboardMain /> 
                : location.pathname === '/dashboarduser/videos' ? <DashboardVideos />
                : location.pathname === '/dashboarduser/insights' ? <DashboardInsights /> 
                : location.pathname === '/dashboarduser/settings' ? <DashboardSettings /> 
                : <DashboardMain />}
        </div>
    </div>
        <div>
        <Overlay configs={configs} isOpen={isOpen}>
        <div style={{opacity: '1'}} className="pup-up-modal">
            {/* //1st */}
            <div style={{}} ref={OverlayOne} className="pop-up-modal-content video step-one">
                <div className="div-block-52">
                    <h1 className="heading-4 video">Start recording<span className="text-span-13" /><br /></h1>
                    <div className="text-block-14">(1/3)</div>
                </div>
                <div className="div-block-50">
                    <div className="text-block-10 middle video">
                        {firstClick ? (
                            <video ref={videoRef} className='record-video text-block-10 middle video' width="308" height="300" src={mediaBlobUrl} autoPlay />
                        ) : countdownStart ? (
                            <div className="timer-wrapper">
                                <CountdownCircleTimer
                                isPlaying
                                duration={3}
                                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                                colorsTime={[3, 2, 1, 0]}
                                onComplete={() => { recorderStart();setCountdownStart(false) }}
                                >
                                {renderTime}
                                </CountdownCircleTimer>
                            </div>
                        ) : (
                            `Click 'Record Now' to start. Remember you have 60 seconds. And don't forget to smile 😀`
                        )}
                    </div>
                </div>
                <div className="div-block-2 hero video">
                    <a id="start" data-w-id="a2e8d7ad-6795-c789-6128-48db5d5332d8" href="#" className="button w-button" onClick={handleClickOne}>{`${firstClick ? "Stop Recording" : "Record Now"}`}</a>
                    <a data-w-id="a2e8d7ad-6795-c789-6128-48db5d5332da" href="#" className="link-7" onClick={() => {setOverlay(false);handleClickThree();stopRecording();setFirstClick(false)}}>Cancel</a>
                </div>
                <p>{status}</p>
            </div>
            {/* //2nd */}
            <div style={{display: 'none'}} ref={OverlayTwo} className="pop-up-modal-content video step-one">
                <div className="div-block-52">
                    <h1 className="heading-4 video">Review video<span className="text-span-13" /><br /></h1>
                    <div className="text-block-14">(2/3)</div>
                </div>
                <div className="div-block-50 image">
                    <div className="text-block-10 middle video">
                        <video ref={videoRef} className='text-block-10 middle video' width="308" height="300" src={mediaBlobUrl} controls />
                    </div>
                </div>
                <div className="div-block-2 hero video">
                    <a id='stop' data-w-id="a2e8d7ad-6795-c789-6128-48db5d5332e9" href="#" className="button w-button" onClick={handleClickTwo}>Save Video</a>
                    <a data-w-id="a2e8d7ad-6795-c789-6128-48db5d5332eb" href="#" className="link-7" onClick={() => {setOverlay(false);handleClickThree();setFirstClick(false)}}>Cancel</a>
                </div>
                <p>{status}</p>
            </div>
            {/* //3rd */}
            <div style={{display: 'none'}} ref={OverlayThree} className="pop-up-modal-content video step-one">
                <div className="div-block-52">
                    <h1 className="heading-4 video">Confirm details<span className="text-span-13" /><br /></h1>
                    <div className="text-block-14">(3/3)</div>
                </div>
                <div className="form-block w-form">
                    <form id="wf-form-Email-Form" name="wf-form-Email-Form" data-name="Email Form" encType="multipart/form-data" className="form join">
                        <label htmlFor="Title" className="field-label">VIDEO&nbsp;TITLE</label>
                        <input type="text" className="text-field w-input" onChange={(e) => setDescription(e.target.value)} maxLength={256} name="Title" data-name="Title" placeholder="Awesome video title!" id="Title" required />
                        <label htmlFor="CTA" className="field-label">CTA (OPTIONAL)</label>
                        <input type="text" className="text-field w-input" onChange={(e) => setCTA(e.target.value)} maxLength={256} name="CTA" data-name="CTA" placeholder="/@alovelace/save-10%" id="CTA" />
                        {/* <label htmlFor="CTA" className="field-label">File</label>
                        <input type="file" className="text-field w-input" onChange={(e) => setFileData(e.target.files[0])} name="video" data-name="video" placeholder="Choose File" id="video" /> */}
                        {/* <label htmlFor="Title" className="field-label">VIDEO&nbsp;LINK</label> */}
                    {/* <div className="div-block-51">
                        <a href="#" className="link-block-2 small w-inline-block" onClick={() =>  navigator.clipboard.writeText(`${videoLink}`)}>
                        <img src={linkIcon} loading="lazy" sizes="100vw" alt="" /></a>
                        <div className="text-block-12"></div>
                    </div> */}
                    <div className="div-block-12 low">
                        <button type="submit" data-wait="Please wait..." className="submit-button w-button" onClick={handleSubmitVideo}>Save & Copy</button>
                        <a data-w-id="a2e8d7ad-6795-c789-6128-48db5d533307" href="#" className="link-7" onClick={() => {setOverlay(false);handleClickThree();setFirstClick(false);setDescription("");setCTA("");setFileData()}}>Cancel</a>
                    </div>
                    </form>
                </div>
                <p>{status}</p>
            </div>
        </div>
        </Overlay>
    </div>
    </>
  )
}

export default Dashboard