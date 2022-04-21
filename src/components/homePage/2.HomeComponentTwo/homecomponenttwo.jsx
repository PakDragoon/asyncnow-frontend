
import playVideo from "../../../assets/images/play-button.png"

function HomeComponentTwo() {
  return (
    <div className="section-colour wf-section">
      <div className="body-container colour w-container">
        <div className="columns-2 w-row">
          <div className="column-4 w-col w-col-6">
            <h2 className="heading">Better engage your leads and clients.</h2>
            <div className="text-block-3">Deliver personalised sales messages via a 60 second video. Be personal, positive and precise to better convert new leads and keep existing clients happy.</div>
            <a href="#pricing" className="page-link w-inline-block">
              <div className="text-block-3">
                Our pricing <span className="marginLeft2rem"> →</span>
              </div>
            </a>
          </div>
          <div className="column-3 w-col w-col-6">
            <div className="div-block-6">
              <a data-w-id="bf2ad817-547b-334b-d302-45e0fe0e2ec9" href="#" className="play-button w-inline-block">
                <img src={playVideo} loading="lazy" width="50" height="50" alt="" className="image-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeComponentTwo
