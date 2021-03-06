import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"
import "../../assets/css/normalize.css"
import "../../assets/css/asyncnow.webflow.css"
import "../../assets/css/webflow.css"
import { set, stubFalse } from "lodash"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { failedNotification } from "../../utils/notifications"

const axios = require("axios")
const title = "Register"
const referralCodes = require("referral-codes")
const siteUrl = process.env.REACT_APP_SITE_URL

function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [companyError, setCompanyError] = useState(false)
  const [passStatusOne, setPassStatusOne] = useState(false)
  const [passStatusTwo, setPassStatusTwo] = useState(false)
  const [emptyFields, setEmptyFields] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nameValidation = new RegExp(/^[A-Za-z ]+$/).test(name)
    const emailValidation = new RegExp(/^([a-zA-Z0-9_\.]+)@([a-zA-Z0-9_\.]+)\.([a-zA-Z]{2,5})$/).test(email)
    const companyValidation = new RegExp(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(company)
    if (name && !nameValidation) {
      setNameError(true)
      setTimeout(() => setNameError(false), 4000)
      return
    } else if (email && !emailValidation) {
      setEmailError(true)
      setTimeout(() => setEmailError(false), 4000)
      return
    } else if (company && companyValidation) {
      setCompanyError(true)
      setTimeout(() => setCompanyError(false), 4000)
      return
    } else if (password && password === "password") {
      setPassStatusTwo(true)
      setTimeout(() => setPassStatusTwo(false), 4000)
      return
    } else if (password && password.length < 7) {
      setPassStatusOne(true)
      setTimeout(() => setPassStatusOne(false), 4000)
      return
    } else if ([name, email, company, password].includes("") || [name, email, company, password].includes(null)) {
      setEmptyFields(true)
      setTimeout(() => setEmptyFields(false), 4000)
      return
    }
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
      url: `${siteUrl}/users`,
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
        setLoading(false)
        setSuccess(true)
        navigate("/thanks", { replace: true })
      })
      .catch((err) => {
        console.log("error", err.data)
        setFail(true)
      })
      setName("")
      setEmail("")
      setCompany("")
      setPassword("")
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
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      <div className="section-white wf-section">
        <div className="hero-container fixed w-container">
          <div className="w-row">
            <div className="column-2 login w-col w-col-6">
              <h1 className="heading-hero">Let&#x27;s get started!</h1>
              <div className="text-block-3">We need some details to set up your FREE account.</div>
              <div className="form-block w-form">
                <form id="registerForm" onSubmit={handleSubmit} name="registerForm" data-name="Email Form" method="get" className="form login app">
                  <label htmlFor="Name" className="field-label">
                    FULL??NAME
                  </label>
                  <input onChange={(e) => setName(e.target.value)} type="text" className="text-field w-input" maxLength="256" name="name" data-name="name" placeholder="Ada Lovelace" id="name" />
                  <label htmlFor="Email-2" className="field-label">
                    WORK??EMAIL
                  </label>
                  <input onChange={(e) => setEmail(e.target.value)} type="email" className="text-field w-input" maxLength="256" name="email" data-name="email" placeholder="a.lovelace@google.com" id="email" />
                  <label htmlFor="Name-2" className="field-label">
                    COMPANY??NAME
                  </label>
                  <input onChange={(e) => setCompany(e.target.value)} type="text" className="text-field w-input" maxLength="256" name="company" data-name="name" placeholder="Google Inc." id="company" />
                  <label htmlFor="Password" className="field-label">
                    PASSWORD
                  </label>
                  <input onChange={(e) => setPassword(e.target.value)} type="password" className="text-field w-input" maxLength="256" name="password" data-name="password" placeholder="***********" id="password" />
                  <input type="submit" className="button w-button" value="Register Now ???" />
                </form>
                {showMsg()}
                <div className={`${success ? "w-form-done" : "w-condition-invisible"}`}>
                  <div>Thank you! Your submission has been received!</div>
                </div>
                <div className={`${fail ? "w-form-fail" : "w-condition-invisible"}`}>
                  <div>This email has already registered.</div>
                </div>
                <div className={`${passStatusOne ? "w-form-fail" : "w-condition-invisible"}`}>
                  <div>Password should not be less then 7 characters.</div>
                </div>
                <div className={`${passStatusTwo ? "w-form-fail" : "w-condition-invisible"}`}>
                  <div>Password can't be 'password'.</div>
                </div>
                <div className={`${nameError ? "w-form-fail" : "w-condition-invisible"}`}>
                  <div>Name must be consist of alphabets only.</div>
                </div>
                <div className={`${companyError ? "w-form-fail" : "w-condition-invisible"}`}>
                  <div>Company name should not contain special characters.</div>
                </div>
                <div className={`${emailError ? "w-form-fail" : "w-condition-invisible"}`}>
                  <div>This email is not valid.</div>
                </div>
                <div className={`${emptyFields ? "w-form-fail" : "w-condition-invisible"}`}>
                  <div>Invalid or empty fields.</div>
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
