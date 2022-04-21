
import starsImage from "../../../assets/images/pointed-star.png"


function HomeComponentSix() {
  return (
    <div class="section-colour wf-section">
    <div class="body-container colour w-container">
      <div class="w-row">
        <div class="column-10 w-col w-col-4">
          <div class="div-block-17">
            <div class="div-block-9">
            {[...Array(5)].map((elementInArray, index) => ( 
                <img src={starsImage} loading="lazy" width="25" height="25" sizes="(max-width: 479px) 100vw, (max-width: 767px) 25px, (max-width: 991px) 3vw, 25px" alt="" class="image-2"/>
                ) 
            )}           
            </div>
            <div class="text-block-3 comment">&quot;It&#x27;s great to instantly convert a cold lead into a warm one!&quot;</div>
            <div class="text-block-4 comment">SARAH K, LONDON</div>
          </div>
        </div>
        <div class="column-11 w-col w-col-4">
          <div>
            <div class="div-block-9">
            {[...Array(5)].map((elementInArray, index) => ( 
                <img src={starsImage} loading="lazy" width="25" height="25" sizes="(max-width: 479px) 100vw, (max-width: 767px) 25px, (max-width: 991px) 3vw, 25px" alt="" class="image-2"/>
                ) 
            )}
            </div>
            <div class="text-block-3 comment">&quot;I know exactly what my leads love about my videos.&quot;</div>
            <div class="text-block-4 comment">JAMES S, BRIGHTON</div>
          </div>
        </div>
        <div class="column-12 w-col w-col-4">
          <div>
            <div class="div-block-9">
            {[...Array(5)].map((elementInArray, index) => ( 
                <img src={starsImage} loading="lazy" width="25" height="25" sizes="(max-width: 479px) 100vw, (max-width: 767px) 25px, (max-width: 991px) 3vw, 25px" alt="" class="image-2"/>
                ) 
            )}
            </div>
            <div class="text-block-3 comment">&quot;My clients engage more with my videos than they do emails.&quot;</div>
            <div class="text-block-4 comment">CLAIRE M, GLASGOW</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default HomeComponentSix
