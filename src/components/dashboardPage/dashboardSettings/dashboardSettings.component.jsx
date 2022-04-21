import React, {useState, useEffect} from "react"
import { Helmet } from "react-helmet"
import { userDataRecoil } from "../../data/atom"
import { useRecoilValue } from "recoil"
import Overlay from "react-overlay-component";

import DashboardSubTitle from "../title.component"
import DashboardSubText from "../subtext.component"
import userIcon from "../../../assets/images/user.png"
import emailIcon from "../../../assets/images/email-3.png"
import eyeIcon from "../../../assets/images/eyeglasses.png"
import linkIcon from "../../../assets/images/link.png"

import "../../../assets/css/normalize.css"
import "../../../assets/css/asyncnow.webflow.css"
import "../../../assets/css/webflow.css"

const axios = require("axios")
const title = "Dashboard | Settings"

function DashboardSettings() {
  const [name, setName] = useState(sessionStorage.getItem("name"))
  const [email, setEmail] = useState(sessionStorage.getItem("email"))
  const [company, setCompany] = useState(sessionStorage.getItem("company"))
  const [nameChange, setNameChange] = useState("")
  const [emailChange, setEmailChange] = useState("")
  const [companyChange, setCompanyChange] = useState("")
  const [isOpen, setOverlay] = useState(false);
  const configs = { animate: true, clickDismiss: true, escapeDismiss: true };
  const { userToken } = useRecoilValue(userDataRecoil)
  const token = sessionStorage.getItem("token")
  const userCode = sessionStorage.getItem("code")

  useEffect(() => {
    var data = ''
    var config = {
      method: 'get',
      url: '/users/me',
      headers: { 
        'Authorization': `Bearer ${token}`
      },
      data: data
    };
    axios(config)
    .then(function (res) {
      setName(res.data.name);
        setEmail(res.data.email);
        setCompany(res.data.company);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault()
    setName(nameChange)
    setEmail(emailChange)
    setCompany(companyChange)
    const data = {
      name: nameChange,
      email: emailChange,
      company: companyChange
    }
    axios({
      method: "patch",
      url: "/users/me",
      headers: { 
        'Authorization': `Bearer ${token}`
      },
      data
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err.res.data)
      })
  }
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="div-block-39">
        <DashboardSubTitle subTitle="Setting" />
        <DashboardSubText subText="Update your personal details and account settings ⚙️" />
        <div className="div-block-41">
          <div className="div-block-42">
            <a data-w-id="6c1ab2ed-325a-4759-0792-678146ef4f08" href="#" className="link-block-2 inline w-inline-block">
              <img src={userIcon} loading="lazy" sizes="(max-width: 479px) 100vw, 40px" alt="" />
            </a>
            <div className="text-block-10">{name}</div>
          </div>
          <div className="div-block-47">
            <a href="#" data-w-id="6c1ab2ed-325a-4759-0792-678146ef4f12" className="link-11" onClick={() => {setOverlay(true);}}>
              Update
            </a>
          </div>
        </div>
        <div className="div-block-41">
          <div className="div-block-42">
            <a data-w-id="509bebb8-7a5d-25a8-c0ea-51b4855e51cd" href="#" className="link-block-2 inline w-inline-block">
              <img src={emailIcon} loading="lazy" sizes="(max-width: 479px) 100vw, 40px" alt="" />
            </a>
            <div className="text-block-10">{email}</div>
          </div>
          <div className="div-block-47">
            <a href="#" data-w-id="509bebb8-7a5d-25a8-c0ea-51b4855e51d2" className="link-11" onClick={() => {setOverlay(true);}}>
              Update
            </a>
          </div>
        </div>
        <div className="div-block-41">
          <div className="div-block-42">
            <a data-w-id="1d238b13-8207-3da3-6897-9ddf61c52676" href="#" className="link-block-2 inline w-inline-block">
              <img src={eyeIcon} loading="lazy" sizes="(max-width: 479px) 100vw, 40px" alt="" />
            </a>
            <div className="text-block-10">{company}</div>
          </div>
          <div className="div-block-47">
            <a href="#" data-w-id="1d238b13-8207-3da3-6897-9ddf61c5267b" className="link-11" onClick={() => {setOverlay(true);}}>
              Update
            </a>
          </div>
        </div>
        <div className="div-block-41 end">
          <div className="div-block-42">
            <a data-w-id="70d5e562-7fa1-d234-68f8-7b7e440688d3" href="#" className="link-block-2 inline w-inline-block">
              <img src={linkIcon} loading="lazy" sizes="(max-width: 479px) 100vw, 40px" alt="" />
            </a>
            <div className="text-block-10">{userCode}</div>
          </div>
          <div className="div-block-47">
            <a href="#" data-w-id="70d5e562-7fa1-d234-68f8-7b7e440688d8" className="link-11" onClick={() => {setOverlay(true);}}>
              Update
            </a>
          </div>
        </div>
      </div>
      <>
        <Overlay configs={configs} isOpen={isOpen}>
          <div style={{opacity: '1'}} className="pup-up-modal">
            <div style={{}} className="pop-up-modal-content video step-one">
              <form id="loginForm" onSubmit={handleUpdate} name="loginForm" data-name="Email Form" method="get" className="form login">
                <label htmlFor="name" className="field-label">Name</label>
                <input type="name" onChange={(e) => setNameChange(e.target.value)} className="text-field w-input" maxLength="256" name="name" data-name="name" placeholder="New Name" id="email" required="" />
                <label htmlFor="email" className="field-label">Email</label>
                <input type="email" onChange={(e) => setEmailChange(e.target.value)} className="text-field w-input" maxLength="256" name="email" data-name="email" placeholder="New Email" id="password" required="" />
                <label htmlFor="company" className="field-label">Company</label>
                <input type="company" onChange={(e) => setCompanyChange(e.target.value)} className="text-field w-input" maxLength="256" name="company" data-name="company" placeholder="New Company" id="password" required="" />
                <div className="div-block-2 hero video">
                  <input type="submit" className="button w-button" value="Save Changes" onClick={() => {setOverlay(false);}} />
                  <a data-w-id="a2e8d7ad-6795-c789-6128-48db5d5332da" href="#" className="link-7" onClick={() => {setOverlay(false);}}>Cancel</a>
                </div>
              </form>
            </div>
          </div>
        </Overlay>
      </>
    </>
  )
}

export default DashboardSettings
