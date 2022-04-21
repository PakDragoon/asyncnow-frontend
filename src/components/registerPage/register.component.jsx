import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"
import "../../assets/css/normalize.css"
import "../../assets/css/asyncnow.webflow.css"
import "../../assets/css/webflow.css"
import { set, stubFalse } from "lodash"

const axios = require("axios")
const title = "Register"
const referralCodes = require("referral-codes")

function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [passStatusOne, setPassStatusOne] = useState(true)
  const [passStatusTwo, setPassStatusTwo] = useState(true)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const codeObj = referralCodes.generate({
      count: 1,
      length: 6,
      prefix: `@${name}/`,
    })
    const codeString = JSON.stringify(codeObj)
    const code = codeString.replace('["', "").replace('"]', "").replace(/\s+/g, "")
    setLoading(true)
    axios({
      method: "post",
      url: "/users",
      data: {
        name,
        email,
        company,
        password,
        code,
      },
    })
      .then((res) => {
        console.log(res)
        setName("")
        setEmail("")
        setCompany("")
        setPassword("")
        setLoading(false)
        setFail(false)
        setSuccess(true)
        setPassStatusOne(true)
        setPassStatusTwo(true)
        navigate("/thanks", { replace: true })
      })
      .catch((err) => {
        console.log('error',err.data)
        const emailValid = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)
        if(!emailValid) {
          setIsValidEmail(true)
          setLoading(false)
          setFail(false)
          setSuccess(false)
          setPassStatusOne(true)
          setPassStatusTwo(true)
        }
        else if (password === "password") {
          setIsValidEmail(false)
          setLoading(false)
          setFail(false)
          setSuccess(false)
          setPassStatusOne(true)
          setPassStatusTwo(false)
        } else if (password.length < 7) {
          setIsValidEmail(false)
          setLoading(false)
          setFail(false)
          setSuccess(false)
          setPassStatusOne(false)
          setPassStatusTwo(true)
        } else {
          setIsValidEmail(false)
          setLoading(false)
          setFail(true)
          setSuccess(false)
          setPassStatusOne(true)
          setPassStatusTwo(true)
        }
      })
  }
  function showMsg() {
    if (loading) {
      return <p>Loading . . .</p>
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
              <h1 className="heading-hero">Let&#x27;s get started!</h1>
              <div className="text-block-3">We need some details to set up your FREE account.</div>
              <div className="form-block w-form">
                <form id="registerForm" onSubmit={handleSubmit} name="registerForm" data-name="Email Form" method="get" className="form login app">
                  <label htmlFor="Name" className="field-label">
                    FULL NAME
                  </label>
                  <input onChange={(e) => setName(e.target.value)} type="text" className="text-field w-input" maxLength="256" name="name" data-name="name" placeholder="Ada Lovelace" id="name" required />
                  <label htmlFor="Email-2" className="field-label">
                    WORK EMAIL
                  </label>
                  <input onChange={(e) => setEmail(e.target.value)} type="email" className="text-field w-input" maxLength="256" name="email" data-name="email" placeholder="a.lovelace@google.com" id="email" required />
                  <label htmlFor="Name-2" className="field-label">
                    COMPANY NAME
                  </label>
                  <input onChange={(e) => setCompany(e.target.value)} type="text" className="text-field w-input" maxLength="256" name="company" data-name="name" placeholder="Google Inc." id="company" required />
                  <label htmlFor="Password" className="field-label">
                    PASSWORD
                  </label>
                  <input onChange={(e) => setPassword(e.target.value)} type="password" className="text-field w-input" maxLength="256" name="password" data-name="password" placeholder="***********" id="password" required />
                  <input type="submit" className="button w-button" value="Register Now →" />
                </form>
                {showMsg()}
                <div className={`${success ? "w-form-done" : "w-condition-invisible"}`}>
                  <div>Thank you! Your submission has been received!</div>
                </div>
                <div className={`${fail ? "w-form-fail" : "w-condition-invisible"}`}>
                  <div>This email has already registered.</div>
                </div>
                <div className={`${isValidEmail ? "w-form-fail" : "w-condition-invisible"}`}>
                  <div>This email is not valid.</div>
                </div>
                <div className={`${passStatusOne ? "w-condition-invisible" : "w-form-fail"}`}>
                  <div>Password should not be less then 7 characters.</div>
                </div>
                <div className={`${passStatusTwo ? "w-condition-invisible" : "w-form-fail"}`}>
                  <div>Password can't be 'password'.</div>
                </div>
              </div>
            </div>
            <div className="column-16 w-col w-col-6"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
