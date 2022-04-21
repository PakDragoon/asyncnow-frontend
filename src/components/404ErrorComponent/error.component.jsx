import "../../assets/css/normalize.css"
import "../../assets/css/asyncnow.webflow.css"
import "../../assets/css/webflow.css"
import PageTitle from '../pageTitlesComponent/pageTitles.component'

function Error(props) {
  PageTitle(props.title)
  return (
    <div className="utility-page-wrap">
      <div className="utility-page-content w-form">
        <img src="https://d3e54v103j8qbb.cloudfront.net/static/page-not-found.211a85e40c.svg" alt="" />
        <h2>Page Not Found</h2>
        <div>The page you are looking for doesn&#x27;t exist or has been moved</div>
      </div>
    </div>
  )
}

export default Error
