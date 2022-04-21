
import starsImage from "../../../assets/images/pointed-star.png"

function HomeComponentFive() {
  return (
    <div className="section-colour wf-section">
    <div className="body-container colour w-container">
      <div className="w-row">
        <div className="column-10 w-col w-col-4">
          <div className="div-block-17">
            <div className="div-block-9">
            {[...Array(5)].map((elementInArray, index) => ( 
                <img key={index.uniqueId} src={starsImage} loading="lazy" width="25" height="25" sizes="(max-width: 479px) 100vw, (max-width: 767px) 25px, (max-width: 991px) 3vw, 25px" alt="" className="image-2"/>
                ) 
            )}           
            </div>
            <div className="text-block-3 comment">&quot;It&#x27;s great to instantly convert a cold lead into a warm one!&quot;</div>
            <div className="text-block-4 comment">SARAH K, LONDON</div>
          </div>
        </div>
        <div className="column-11 w-col w-col-4">
          <div>
            <div className="div-block-9">
            {[...Array(5)].map((elementInArray, index) => ( 
                <img key={index.uniqueId} src={starsImage} loading="lazy" width="25" height="25" sizes="(max-width: 479px) 100vw, (max-width: 767px) 25px, (max-width: 991px) 3vw, 25px" alt="" className="image-2"/>
                ) 
            )}
            </div>
            <div className="text-block-3 comment">&quot;I know exactly what my leads love about my videos.&quot;</div>
            <div className="text-block-4 comment">JAMES S, BRIGHTON</div>
          </div>
        </div>
        <div className="column-12 w-col w-col-4">
          <div>
            <div className="div-block-9">
            {[...Array(5)].map((elementInArray, index) => ( 
                <img key={index.uniqueId} src={starsImage} loading="lazy" width="25" height="25" sizes="(max-width: 479px) 100vw, (max-width: 767px) 25px, (max-width: 991px) 3vw, 25px" alt="" className="image-2"/>
                ) 
            )}
            </div>
            <div className="text-block-3 comment">&quot;My clients engage more with my videos than they do emails.&quot;</div>
            <div className="text-block-4 comment">CLAIRE M, GLASGOW</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default HomeComponentFive
