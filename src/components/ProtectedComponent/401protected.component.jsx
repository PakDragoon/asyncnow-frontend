import PageTitle from '../pageTitlesComponent/pageTitles.component'
import "../../assets/css/normalize.css"
import "../../assets/css/asyncnow.webflow.css"
import "../../assets/css/webflow.css"

function ProtectedComponent(props) {
  PageTitle(props.title)
  return (
    <div className="utility-page-wrap">
        <div className="utility-page-content w-password-page w-form">
            <form action="/.wf_auth" method="post" id="email-form" name="email-form" data-name="Email Form" className="utility-page-form w-password-page">
                <img src="https://d3e54v103j8qbb.cloudfront.net/static/password-page-lock.832ca8e2c9.svg" alt=""/>
                <h2>Protected Page</h2>
                <label htmlFor="pass">Password</label>
                <input type="password" className="w-password-page w-input" autofocus="true" maxLength="256" name="pass" data-name="field" placeholder="Enter your password" id="pass"/>
                <input type="submit" value="Submit" data-wait="Please wait..." className="w-password-page w-button"/>
                <div className="w-password-page w-form-fail">
                    <div>Incorrect password. Please try again.</div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ProtectedComponent
