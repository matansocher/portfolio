import './styles/Employees.scss';
import assets from '../assets';
import config from '../config';
import { BottomNavigation, Chip, Navbar } from '../components';

export default function Employees() {
  const { ICONS_MAP } = config;
  return (
    <>
      <Navbar />
      <div className="employees">
        <section className="employees-top" style={{ backgroundImage: `url('${assets.mycoTopBg}')` }}>
          <div className="container">
            <h1>Employee Onboarding page</h1>
            <p>The task at hand presented a UX challenge: designing an onboarding page for numerous new employees, each with varying job roles and locations around the world, while also collaborating with a team of stakeholders who are working on rethinking HR processes. I had to come up with a solution that is flexible and able to adjust to different needs</p>
          </div>
        </section>

        <section className="employees-takeaways">
          <div className="content">
            <h3>Key Takeaways</h3>
            <ul>
              <li>Templates can be a great way to deliver a solution when the requirements are too general.</li>
              <li>When you have many types of users - focus on the basic common attributes got us to move forward.</li>
              <li>Being attentive to Stakeholders concerns & needs is crucial, and much more meaningful than coming up with the most sophisticated solution.</li>
            </ul>
          </div>
        </section>

        <section className="employees-problem">
          <div className="content">
            <h2>Problem</h2>
            <p>The challenge was to design an <span className="bold">effective onboarding page for hundreds of new employees</span> every year from different parts of the world, and with various job roles. <span className="bold">It was impossible to create a one-size-fits-all</span> approach due to the diversity of employees and offices, so the solution had to be flexible and able to adapt to different situations. The solution had to be approved by a team of stakeholders tasked with rethinking HR processes, making it crucial to align the new page with the overall concept of the onboarding process.</p>
            <div className="content-numbers">
              <div className="content-numbers-item">
                <span>38</span>
                <p>Countries</p>
              </div>
              <div className="content-numbers-item">
                <span>54</span>
                <p>Branches</p>
              </div>
              <div className="content-numbers-item">
                <span>5</span>
                <p>Continents</p>
              </div>
            </div>
            <div className="solution">
              <h2>Solution</h2>
              <p>Using the Design Thinking method, I came up with creating a template for the page - a structured yet flexible onboarding page.</p>
            </div>
            <div className="design">
              <h2>Design Process</h2>
              <p>The process below took ~1.5 months:</p>
              <ul>
                <li>2.5 weeks of interviews (Empathize)</li>
                <li>1 week of processing the Data (Define & Ideate)</li>
                <li>2 weeks of creating the wireframe, including making adjustments according to feedback.</li>
              </ul>
              <p>I worked as the UX designer for the project with another UI designer, and was responsible to propose the solution</p>
            </div>
          </div>
        </section>

        <section className="employees-examples">
          <div className="content">
            <div className="content-item">
              <img alt="screen example" src={assets.employeesExamples1} />
              <p>Empathize</p>
            </div>
            <div className="content-item">
              <img alt="screen example" src={assets.employeesExamples2} />
              <p>Define & Ideate </p>
            </div>
            <div className="content-item">
              <img alt="screen example" src={assets.employeesExamples3} />
              <p>Wireframe</p>
            </div>
          </div>
        </section>

        <section className="employees-interviews">
          <div className="content">
            <Chip text={'Empathize'} backgroundColor={'rgba(78, 95, 255, 0.2)'} icon={ICONS_MAP.LIGHTBULB} />
            <h2>Conduct User Interviews</h2>
            <p>My colleague and I created an interview protocol and proceeded to <span className="bold">conduct interviews with 6 recently hired employees</span> from various global branches. While we maintained a structured approach, we also allowed for unplanned questions on relevant topics that arose during the interviews. One participant, for instance, pointed out a notable difference between their unsatisfactory onboarding experience and their positive experiences in the actual workplace.</p>
            <p>At the end of each interview, <span className="bold">we conducted affinity mapping</span> - we took all the sticky notes where we wrote all the themes that arose during the interview, and divided them into categories of recurring issues, pain points, and insights. We then gathered the most important ones in a new category called 'key points.'</p>
            <img alt="sketch example" src={assets.employeesInterviews} />
          </div>
        </section>

        <section className="employees-team">
          <div className="content">
            <Chip text={'Define & Ideate'} backgroundColor={'rgba(78, 95, 255, 0.2)'} icon={ICONS_MAP.LIGHTBULB} />
            <h2>Team Session, IQI & Insights</h2>
            <p>My colleague and I created an interview protocol and proceeded to <span className="bold">conduct interviews with 6 recently hired employees</span> from various global branches. While we maintained a structured approach, we also allowed for unplanned questions on relevant topics that arose during the interviews. One participant, for instance, pointed out a notable difference between their unsatisfactory onboarding experience and their positive experiences in the actual workplace.</p>
            <p>At the end of each interview, <span className="bold">we conducted affinity mapping</span> - we took all the sticky notes where we wrote all the themes that arose during the interview, and divided them into categories of recurring issues, pain points, and insights. We then gathered the most important ones in a new category called 'key points.'</p>
            <div className="special-grid">
              <div className="special-grid-left">
                <img alt="sketch example" src={assets.employeesTeam1} />
                <img alt="sketch example" src={assets.employeesTeam2} />
              </div>
              <div className="special-grid-right">
                <img alt="sketch example" src={assets.employeesTeam3} />
              </div>              
            </div>
            <p>Following the IQI session, it became clear that the main goal was to develop a <span className="bold">dynamic solution that provided structure while allowing for flexibility</span> in terms of adding links and categories based on individual needs. The employees required guidance but also the ability to adapt to their specific requirements, particularly during the pre-planning stage of the onboarding process.</p>
          </div>
        </section>

        <section className="employees-translate">
          <div className="content">
            <Chip text={'Wireframe'} backgroundColor={'rgba(78, 95, 255, 0.2)'} icon={ICONS_MAP.LIGHTBULB} />
            <h2>Translate insights into a screen</h2>
            <p>After considering various options, <span className="bold">I decided to divide the onboarding page into 6 distinct sections</span>, each with its own structure. Some sections are more structured, but still allow for some flexibility, such as the hero section which can contain an image, video, or just text. Other sections, like the 'Useful Information' section, are highly flexible and can be customized to meet the specific needs of different departments or branches.</p>
            <p>For instance, the 'Useful Information' section is divided into two parts, 'Important Support Topics' and 'IT Support Topics,' based on the research insights. However, it's important to note that this is just a suggestion and each department or branch can decide to reorder the categories or use completely different categories to better suit their needs.</p>
            <p>The solution was presented to the stakeholders, and it was unanimously approved by all of them.</p>
            <img alt="sketch example" src={assets.employeesTranslate} />
          </div>
        </section>

      </div>

      <BottomNavigation pathname="employees" />
    </>
  );
}
