
import slideImage1 from "../../../assets/images/laura-adai-BFmhzQNLyaA-unsplash-2.jpg"
import slideImage2 from "../../../assets/images/laura-adai-AF50O2MtgOU-unsplash-2.jpg"
import slideImage3 from "../../../assets/images/laura-adai-O0bNT7gH1xg-unsplash-3.jpg"

function HomeComponentThree() {
  return (
    <div className="section-white wf-section">
    <div className="body-container w-container">
      <h2 className="heading">How best to use async.</h2>
      <div className="w-row">
        <div className="column-5 w-col w-col-4">
          <div>
            <img src={slideImage1} loading="lazy" width="250" height="250" sizes="(max-width: 479px) 100vw, (max-width: 767px) 250px, (max-width: 991px) 199.328125px, 250px" alt="" className="image-3" />
            <img src={slideImage1} loading="lazy" sizes="100vw" alt="" className="image-7" />
            <div className="text-block-4">SALES OUTREACH</div>
            <div className="text-block-3">Engage new clients by sending them a personalised introduction using async.</div>
          </div>
        </div>
        <div className="column-5 column-6 w-col w-col-4">
          <div>
            <img src={slideImage2} loading="lazy" width="250" height="250" sizes="(max-width: 479px) 100vw, (max-width: 767px) 250px, (max-width: 991px) 199.328125px, 250px" alt="" className="image-3" />
            <img src={slideImage2} loading="lazy" sizes="100vw" alt="" className="image-8" />
            <div className="text-block-4">OFFERS AND NEWS</div>
            <div className="text-block-3">Convert more clients by adding CTAs to your personalised video messages.</div>
          </div>
        </div>
        <div className="column-5 column-7 w-col w-col-4">
          <div className="div-block-18">
            <img src={slideImage3} loading="lazy" width="250" height="250" sizes="(max-width: 479px) 100vw, (max-width: 767px) 250px, (max-width: 991px) 199.328125px, 250px" alt="" className="image-3" />
            <img src={slideImage3} loading="lazy" sizes="100vw" alt="" className="image-9" />
            <div className="text-block-4">CLIENT CHECK-INS</div>
            <div className="text-block-3">Make sure clients don&#x27;t forget about you by sending a friendly check-in.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default HomeComponentThree
