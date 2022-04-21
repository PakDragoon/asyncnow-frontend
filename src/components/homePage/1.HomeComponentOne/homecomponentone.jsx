import { Container, Row, Col } from 'react-bootstrap';

import mainPageImage from '../../../assets/images/laura-adai-enkfbbb9yf8-unsplash-2.jpg'
import mainSmallImage1 from '../../../assets/images/cazoo_brand_logo.svg'
import mainSmallImage2 from '../../../assets/images/deliveroo.svg'
import mainSmallImage3 from '../../../assets/images/glovo-1.svg'
import mainSmallImage4 from '../../../assets/images/gymshark_brand_logo.svg'
import mainSmallImage5 from '../../../assets/images/houzz.svg'
import mainSmallImage6 from '../../../assets/images/revolut_brand_logo.svg'

function HomeComponentOne() {
  const isLogin = sessionStorage.getItem("isAuthenticated")
  return (
    <div className="section-white wf-section">
      <Container className="hero-container w-container">
        <Row className="columns-4 w-row">
          <Col sm={12} className="column-2 w-col w-col-6">
            <h1 className="heading-hero">Get your message across faster.</h1>
            <div className="text-block-2">Simple video messaging made for sales and marketing teams who want to better engage leads and clients.</div>
            <div className="div-block-2 hero">
              <a data-w-id="ace441d6-3eec-823d-c13d-306c9ae6ad33" href="#" className={`${isLogin ? 'w-condition-invisible' : 'button w-button bg-home-color'}`}>Join for FREE →</a>
              <a data-w-id="66fc2f41-5935-02f1-a35d-2bab6367ba82" href="#" className="button transparent w-button">Watch Demo</a>
            </div>
          </Col>
          <Col sm={12} className="column-16 w-col w-col-6 w-col-12">
              <img src={mainPageImage} loading="lazy" height="400" width="400" sizes="(max-width: 479px) 100vw, (max-width: 767px) 34vw, (max-width: 991px) 354px, 400px" alt="" className="image-4" />
          </Col>
        </Row>
        <Row className="columns-5 w-row">
          <Col className="column-23 w-col w-col-2"><img src={mainSmallImage1} loading="lazy" alt="" /></Col>
          <Col className="column-24 w-col w-col-2"><img src={mainSmallImage2} loading="lazy" alt="" /></Col>
          <Col className="column-25 w-col w-col-2"><img src={mainSmallImage3} loading="lazy" alt="" /></Col>
          <Col className="column-26 w-col w-col-2"><img src={mainSmallImage4} loading="lazy" alt="" /></Col>
          <Col className="column-27 w-col w-col-2"><img src={mainSmallImage5} loading="lazy" alt="" /></Col>
          <Col className="column-28 w-col w-col-2"><img src={mainSmallImage6} loading="lazy" alt="" /></Col>
        </Row>
      </Container>
  </div>
    );
}

export default HomeComponentOne;