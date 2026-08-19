import './styles/Marketer.scss';
import assets from '../assets';
import { BottomNavigation, SiteNav } from '../components';

export default function Marketer() {
  return (
    <>
      <SiteNav transparent={true} />
      <div className="marketer">
        <section className="marketer-top" style={{ backgroundImage: `url('${assets.marketerTopBg}')` }}>
          <div className="container">
            <h1>Marketer</h1>
            <p>
              Marketer is a SaaS platform designed to manage internal marketing operations. It allows to keep track,
              organize and efficiently cooperate with different departments and functions within the organization. This
              is a web app for a startup at the early stages, so at this stage it was decided to focus on desktop and
              postpone the design for mobile resolution.
            </p>
          </div>
        </section>

        <section className="marketer-design-system">
          <div className="content">
            <div className="top">
              <img alt="design system example" src={assets.marketerDesignSystem1} fetchPriority="high" />
              <img alt="design system example" src={assets.marketerDesignSystem2} loading="lazy" />
            </div>
            <div className="middle">
              <h2>Design System</h2>
              <p>
                The UI was planned to be clean & minimalistic and support the concept of an all-in-one place to manage &
                track the organization’s marketing operations.
              </p>
              <img alt="design system example" src={assets.marketerDesignSystem3} loading="lazy" />
              <img alt="design system example" src={assets.marketerDesignSystem4} loading="lazy" />
            </div>
          </div>
        </section>

        <section className="marketer-examples">
          <div className="content">
            <img alt="marketer app screen example" src={assets.marketerExamples1} loading="lazy" />
          </div>
        </section>

        <section className="marketer-graphs">
          <div className="content">
            <h2>Graphs</h2>
            <img alt="graphs example" src={assets.marketerGraphs1} loading="lazy" />
            <img alt="graphs example" src={assets.marketerGraphs2} loading="lazy" />
            <img alt="graphs example" src={assets.marketerGraphs3} loading="lazy" />
          </div>
        </section>

        <section className="marketer-bottom">
          <img alt="app screens examples" src={assets.marketerBottom1} loading="lazy" />
        </section>
      </div>

      <BottomNavigation pathname="marketer" />
    </>
  );
}
