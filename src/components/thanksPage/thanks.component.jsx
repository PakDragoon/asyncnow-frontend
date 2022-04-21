import socialLinkedin from '../../assets/images/linkedin-6.png'
import socialTwitter from '../../assets/images/twitter-3.png'
import socialAsync from '../../assets/images/medium.png'
import PageTitle from '../pageTitlesComponent/pageTitles.component'

import '../../assets/css/normalize.css'
import '../../assets/css/asyncnow.webflow.css'
import '../../assets/css/webflow.css'

function Thanks(props) {
    PageTitle(props.title)
    const linkedinUrl = () => window.open("https://www.linkedin.com/company/asyncnowcom");
    const twitterUrl = () => window.open("https://twitter.com/asyncnow");
    const asyncUrl = () => window.open("https://medium.com/@asyncnow");
  return (
    <div className="section-white wf-section">
        <div className="hero-container fixed w-container">
            <div className="w-row">
                <div className="column-2 w-col w-col-6">
                    <h1 className="heading-hero">Thanks! We will be in touch shortly.</h1>
                    <div className="text-block-2">
                        We just sent a personal async invite to your inbox. Make sure to check your spam folder!<br/><br/>
                        Get ready to start selling more 🙌
                    </div>
                </div>
                <div className="column-16 w-col w-col-6">
                    <div className="div-block-15">
                        <button onClick={linkedinUrl} target="_blank" className="link-block w-inline-block">
                            <img src={socialLinkedin} loading="lazy" width="25" height="25" sizes="(max-width: 479px) 100vw, (max-width: 767px) 25px, (max-width: 991px) 3vw, 25px" alt="" />
                        </button>
                        <button onClick={twitterUrl} target="_blank" className="link-block w-inline-block">
                            <img src={socialTwitter} loading="lazy" width="25" height="25" sizes="(max-width: 479px) 100vw, (max-width: 767px) 25px, (max-width: 991px) 3vw, 25px" alt="" />
                        </button>
                        <button onClick={asyncUrl} target="_blank" className="link-block end w-inline-block">
                            <img src={socialAsync} loading="lazy" width="25" height="25" sizes="(max-width: 479px) 100vw, (max-width: 767px) 25px, (max-width: 991px) 3vw, 25px" alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Thanks