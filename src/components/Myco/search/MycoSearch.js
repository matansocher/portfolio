import './MycoSearch.scss';
import mycoSearch1 from '../../../assets/myco/myco-search-1.png';
import mycoSearch2 from '../../../assets/myco/myco-search-2.png';
import mycoSearch3 from '../../../assets/myco/myco-search-3.png';
import mycoSearch4 from '../../../assets/myco/myco-search-4.png';

function MunicipalSearch() {
  return (
    <section className="search-container">
      <div className="content search-section">
        <div className="search-section-part">
          <div className="search-section-part-left">
            <h4>Search Events Pages</h4>
            <p>I had to fully understand the existing process and additions calculations & approval process. For that, I conducted several interviews with HR manager, as well as interviewed some of the HR coordinators. I also preformed observations while they we’re working, in order to understand their work flow.</p>
          </div>
          <div className="search-section-part-right">
            <img src={mycoSearch1} alt="screen example" />
            <img src={mycoSearch2} alt="screen example" />
          </div>
        </div>
        <div className="search-section-part">
          <div className="search-section-part-left">
            <h4>Event Page</h4>
            <p>I had to fully understand the existing process and additions calculations & approval process. For that, I conducted several interviews with HR manager, as well as interviewed some of the HR coordinators. I also preformed observations while they we’re working, in order to understand their work flow.</p>
          </div>
          <div className="search-section-part-right">
            <img src={mycoSearch3} alt="screen example" />
            <img src={mycoSearch4} alt="screen example" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MunicipalSearch;
