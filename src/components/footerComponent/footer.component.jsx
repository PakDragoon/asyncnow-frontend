import { useLocation } from 'react-router-dom';

import '../../assets/css/normalize.css'
import '../../assets/css/asyncnow.webflow.css'
import '../../assets/css/webflow.css'

function Footer() {
    const location = useLocation();
  return (
    
    <div className={`${location.pathname === '/' ? 'section-white wf-section' : 'none'} `}>
    <div className="body-container w-container">
      <div className="columns-3 w-row">
        <div className="column-15 w-col w-col-8">
          <a href="index.html" aria-current="page" className="brand w-nav-brand w--current">
            <div className="brand-logo small">async<span className="text-span">.</span></div>
          </a>
          <div className="text-block-6">async is the 60 second video messaging tool, which enables any sales team to increase customer engagement rates. Why not try using async today to increase your team&#x27;s sales?</div>
          <div className="div-block-13">
            <div className="text-block-4 company">© asyncnow 2021 | Brand of JAFT Holdings Ltd | Built in Europe<span className="text-span-3"></span></div>
            <div className="text-block-4 company flag"><span className="text-span-3">🇪🇺</span></div>
          </div>
        </div>
        <div className="column-14 footer-col w-col w-col-2">
          <div className="text-block-4 footer">Company</div>
          <div className="text-block-4 footer link">
            <a href="https://www.linkedin.com/company/asyncnowcom" target="_blank" className="link-2">About async</a>
          </div>
          <div className="text-block-4 footer link">
            <a href="mailto:hey@asyncnow.com" className="link-2">Contact us</a>
          </div>
          <div className="text-block-4 footer link">
            <a href="https://twitter.com/asyncnow" target="_blank" className="link-2">Follow us</a>
          </div>
          <div className="text-block-4 footer link">
            <a href="#" data-w-id="a69282f1-dbe0-ae05-62ec-43226488c37b" target="_blank" className="link-2">Join for FREE</a>
          </div>
          <div className="text-block-4 footer link">
            <a href="https://medium.com/@asyncnow" target="_blank" className="link-2">Read about us</a>
          </div>
          <div className="text-block-4 footer link">
            <a href="#" data-w-id="b66ba10a-7828-6819-8f9d-61cd02383172" className="link-2">Watch the demo</a>
          </div>
          <div className="text-block-4 footer link">
            <a href="https://join.com/companies/asyncnow" target="_blank" className="link-2">Work with us</a>
          </div>
        </div>
        <div className="column-13 footer-col w-col w-col-2">
          <div className="text-block-4 footer">Other Stuff</div>
          <div className="text-block-4 footer link">
            <a href="documents/async_privacy_policy.pdf" target="_blank" className="link-2">Privacy policy</a>
          </div>
          <div className="text-block-4 footer link">
            <a href="documents/async_terms_of_use.pdf" target="_blank" className="link-2">Terms of use</a>
          </div>
        </div>
        
      </div>
    </div>
  </div>
    );
}

export default Footer;


