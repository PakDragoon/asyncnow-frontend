import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import { userDataRecoil } from "../data/atom"

import "../../assets/css/normalize.css"
import "../../assets/css/asyncnow.webflow.css"
import "../../assets/css/webflow.css"

const axios = require("axios")
const title = "Login"

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)
  const [banned, setBanned] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useRecoilState(userDataRecoil)
  const { userRole } = useRecoilValue(userDataRecoil)

  const handleSubmit = async (event) => {
    setBanned(false)
    setFail(false)
    event.preventDefault()
    const data = {
      email: email,
      password: password,
    }
    // setLoading(true)
    axios({
      method: "post",
      url: "/users/login",
      data,
    })
      .then((res) => {
        setLoading(true)
        setUserData((obj) => ({
          userRole: res.data.user.role,
          userName: res.data.user.name,
          userEmail: res.data.user.email,
          userCompany: res.data.user.company,
          userCode: res.data.user.code,
        }))
        const userR = res.data.user.role
        sessionStorage.setItem("isAuthenticated", "true")
        sessionStorage.setItem("isRole", res.data.user.role)
        sessionStorage.setItem("token", res.data.token)
        sessionStorage.setItem("name", res.data.user.name)
        sessionStorage.setItem("email", res.data.user.email)
        sessionStorage.setItem("company", res.data.user.company)
        sessionStorage.setItem("code", res.data.user.code)
        setSuccess(true)
        // setLoading(false)
        if (userR === "Admin" || userR === "Super Admin") {
          navigate("/dashboardadmin/user")
        } else if (userR === "User" && res.data.user.status ) {
          navigate("/dashboarduser/main")
        } else if (res.data.user.status === false) {
          navigate("/login")
          sessionStorage.clear()
          setFail(false)
          setSuccess(false)
          setBanned(true)
        } else {
          navigate("/login")
          setFail(true)
          setSuccess(false)
          setBanned(false)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setSuccess(false)
        setFail(true)
        // setLoading(false)
      })
      if(banned){
        sessionStorage.clear()
      } else {
        setTimeout(() => setFail(false), 3000)
        // setLoading(false)
      }    
  }
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="section-white wf-section">
        <div className="hero-container fixed w-container">
          <div className="w-row">
            <div className="column-2 login w-col w-col-6">
              <h1 className="heading-hero">Welcome back!</h1>
              <div className="text-block-3">Start by logging into your async account.</div>
              <div className="form-block w-form">
                <form id="loginForm" onSubmit={handleSubmit} name="loginForm" data-name="Email Form" method="get" className="form login">
                  <label htmlFor="Email" className="field-label">
                    EMAIL
                  </label>
                  <input type="email" onChange={(e) => setEmail(e.target.value)} className="text-field w-input" maxLength="256" name="email" data-name="email" placeholder="a.lovelace@email.com" id="email" required="" />
                  <label htmlFor="Password" className="field-label">
                    PASSWORD
                  </label>
                  <input type="password" onChange={(e) => setPassword(e.target.value)} className="text-field w-input" maxLength="256" name="password" data-name="password" placeholder="***********" id="password" required="" />
                  <input type="submit" value="Login Now →" data-wait="Please wait..." className="submit-button login w-button" />
                </form>
                <div className={`${success ? "w-form-done" : "w-condition-invisible"}`}>
                  <div className="login-success-color">Login Successful!</div>
                </div>
                <div className={`${fail ? "w-form-fail" : "w-condition-invisible"}`}>
                  <div>Wrong email or password!</div>
                </div>
                <div className={`${banned ? "w-form-fail" : "w-condition-invisible"}`}>
                  <div>Account is suspended! Contact Admin.</div>
                </div>
              </div>
              <div className="text-block-3">
                Not already a user? Then you can{" "}
                <Link to="/register" data-w-id="b5d7910a-0004-209b-d9a1-19fb8e8fe03c" className="link-3">
                  Join for FREE
                </Link>
                .
              </div>
            </div>
            <div className="column-16 w-col w-col-6"></div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Login
