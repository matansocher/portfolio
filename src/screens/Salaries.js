import './styles/Salaries.scss';
import assets from '../assets';
import { BottomNavigation, PercentageCircle, Chip, CircleIcon, Navbar } from '../components';
import config from '../config';

export default function Salaries() {
  const { ICONS_MAP } = config;

  return (
    <>
      <Navbar isWhiteText={true} />
      <div className="salaries">
        
        <section className="salaries-top" style={{ backgroundImage: `url('${assets.salariesTopBg}')` }}>
          <div className="container">
            <h1>Salary Additions</h1>
            <p>The Sanitation HR department was responsible for manually calculating and approving salary additions for employees, including attendance for absences and extra hours compensations. This web system offers an automated solution to streamline and automate this process for them.</p>
          </div>
        </section>

        <section className="salaries-pas">
          <div className="content">
            <h2>Problem</h2>
            <p>The HR coordinators were tasked with a labor-intensive process of reviewing manually the monthly attendance cards for most Sanitation employees. They had to meticulously check for instances of overtime and then calculate the compensation for those extra hours worked, based on a complex set of salary agreements. This was a tiring, time consuming & ineffective process, prone to mistakes.</p>
            <h2>Solution</h2>
            <p>A user - centered web application that will allow:</p>
            <div className="content-solutions">
              <div className="content-solutions-item">
                <div className="content-solutions-item-left">
                  <CircleIcon backgroundColor={'rgba(20, 136, 204, 0.1)'} icon={ICONS_MAP.CALCULATOR} iconColor={'#1488CC'} />
                </div>
                <div className="content-solutions-item-right">
                  <p>Report employees attendance in the system</p>
                </div>
              </div>
              <div className="content-solutions-item">
                <div className="content-solutions-item-left">
                  <CircleIcon backgroundColor={'rgba(20, 136, 204, 0.1)'} icon={ICONS_MAP.MONITOR} iconColor={'#1488CC'} />
                </div>
                <div className="content-solutions-item-right">
                  <p>Calculate salary additions, to be manually approved by HR</p>
                </div>
              </div>
            </div>
            <div className="content-role">
              <h3>My role</h3>
              <p>The entire process of designing the system, including:</p>
              <ul>
                <li>Deep understanding of the existing process </li>
                <li>User research - Observations, interviews with stakeholders & users</li>
                <li>Ideation</li>
                <li>User flows</li>
                <li>Wireframing</li>
                <li>Testing</li>
                <li>Visual design*</li>
              </ul>
              <p>*Due to budget & time limitations, extensive compromises had to be done. The visual design is focused on a usable level with focus on functionality.</p>
            </div>
          </div>
        </section>

        <section className="salaries-tldr">
          <div className="content">
            <div className="content-left">
              <h5>TL; DR</h5>
              <h3>Key points leading to project success</h3>
              <ul>
                <li>Users like <span>flexibility</span> in the system</li>
                <li><span>Ongoing communication</span> with stakeholders & users led to high engagement</li>
                <li>Displaying only <span>relevant information</span></li>
              </ul>
            </div>
            <div className="content-right">
              <PercentageCircle percent={98.5} text={'Success rates in calculations'} circleColor={'#D9F8FF'} innerCircleColor={'transparent'} textColor={'#D9F8FF'} />
            </div>
          </div>
        </section>

        <section className="salaries-design-process">
          <div className="content">
            <h2>Design Process</h2>
            <div className="content-content">
              <CircleIcon backgroundColor={'rgba(20, 136, 204, 0.3)'} text={'Research'} icon={ICONS_MAP.SEARCH} />
              <CircleIcon backgroundColor={'rgba(20, 136, 204, 0.3)'} text={'Define & Ideate'} icon={ICONS_MAP.LIGHTBULB} />
              <CircleIcon backgroundColor={'rgba(20, 136, 204, 0.3)'} text={'Design & Develop'} icon={ICONS_MAP.FILE} />
              <CircleIcon backgroundColor={'rgba(20, 136, 204, 0.3)'} text={'Research'} icon={ICONS_MAP.BRACKETS} />
              <CircleIcon backgroundColor={'rgba(20, 136, 204, 0.3)'} text={'Iterate & Test'} icon={ICONS_MAP.CHART} />
            </div>
          </div>
        </section>

        <section className="salaries-user-interviews">
          <div className="content">
            <Chip text={'Research'} backgroundColor={'rgba(20, 136, 204, 0.3)'} icon={ICONS_MAP.SEARCH} />
            <h2>Observations & interviews</h2>
            <p>The research phase consisted of observations and interviews with stakeholders & users.</p>
            <div className="content-content">
              <div className="content-content-left">
                <h4>Interviews</h4>
                <p>I conducted interview to gather qualitative feedback on the existing process, and get insights from users.<br />I conducted 5-7 interviews with the main stakeholder, HR manager, in order to understand their work process and learn their calculation tables.<br />I also conducted interviews with 2-3 users from each type of user group:  Station Managers and HR Coordinators.</p>
              </div>
              <div className="content-content-right">
                <div className="content-content-right-row">
                  <CircleIcon backgroundColor={'#0C202E'} text={'HR Manager'} icon={ICONS_MAP.USER} iconColor={'#ffffff'} />
                </div>
                <div className="content-content-right-row multiple">
                  <CircleIcon backgroundColor={'#1488CC'} text={'Station Managers'} icon={ICONS_MAP.USERS} iconColor={'#ffffff'} />
                  <CircleIcon backgroundColor={'#CC5714'} text={'HR Coordinators'} icon={ICONS_MAP.USERS} iconColor={'#ffffff'} />
                </div>     
              </div>
            </div>
          </div>
        </section>

        <section className="salaries-observations">
          <div className="content">
            <h3>Observations</h3>
            <p>I had to fully understand the existing process and additions calculations & approval process.<br />For that, I conducted several interviews with HR manager, as well as interviewed some of the HR coordinators.<br />I also preformed observations while they we’re working, in order to understand their work flow.</p>
            <div className="content-content">
              <img alt="observations example" src={assets.salariesObservations1} />
              <img alt="observations example" src={assets.salariesObservations2} />
            </div>
          </div>
        </section>

        <section className="salaries-flows">
          <div className="content">
            <Chip text={'Define & Ideate'} backgroundColor={'rgba(20, 136, 204, 0.3)'} icon={ICONS_MAP.LIGHTBULB} />
            <h2>Main user flows & business logic</h2>
            <p>The solution was composed of two main processes, designed to address the specific challenges of the project:</p>
            <div className="content-part side-by-side">
              <div className="side-by-side-left">
                <h4>1. Reporting attendance</h4>
                <p>The best solution was to report hours through the existing Sanitation tasks management system. Employees preforms 1-3 tasks each day, which are already managed in this system by work manager. We added fields to the screen, allowing to report, enabling to report start & end time for each task.</p>
              </div>
              <div className="side-by-side-right">
                <img alt="flow example" src={assets.salariesFlows1} />
              </div>
            </div>
            <div className="content-part">
              <h4>2. Calculate salary additions</h4>
              <img alt="flow example" src={assets.salariesFlows2} />
            </div>
            <div className="content-part side-by-side">
              <div className="side-by-side-left">
                <h3>Business logic & Calculations</h3>
                <p>The business logic & salary additions calculations were documented in over 30 flowcharts I created and delivered to the developer, and later on tested before moving to production.</p>
                <p>In the screenshots here, you can see the list of flow charts assembling together the calculation algorithm</p>
                <p>You can also see two examples of these flow charts - the root flow charts for basic calculations.</p>
              </div>
              <div className="side-by-side-right">
                <img alt="flow example" src={assets.salariesFlows3} />
              </div>
            </div>
            <div className="content-part">
              <img alt="flow example" src={assets.salariesFlows4} />
            </div>
            <div className="content-part">
              <img alt="flow example" src={assets.salariesFlows5} />
            </div>
          </div>
        </section>

        <section className="salaries-test">
          <div className="content">
            <Chip text={'Test'} backgroundColor={'rgba(20, 136, 204, 0.3)'} icon={ICONS_MAP.FILE} />
            <h2>Initial testing</h2>
            <p>We aimed for the manual approval process to be as fluent as possible, in order to improve the existing process and shorten the overall time of approval.</p>
            <div className="content-part">
              <h4>Wireframes</h4>
              <img alt="app screen example" src={assets.salariesTest1} />
              <img alt="app screen example" src={assets.salariesTest2} />
              <img alt="app screen example" src={assets.salariesTest3} />
            </div>
            <div className="content-part">
              <h4>First stage testing</h4>
                <div className="side-by-side">
                <div className="side-by-side-left">
                  <div className="side-by-side-left-top">
                    <CircleIcon width={35} size={40} iconSize={20} backgroundColor={'#1488CC'} icon={ICONS_MAP.USERS} iconColor={'#ffffff'} />
                    <p className="text-by-the-icon">Station Managers</p>
                  </div>
                  <div className="side-by-side-left-middle">
                    <p>After assembling the solution, we had to test with some users that the process could run smoothly, and check for any unexpected problems.</p>
                    <p>First, we thought our first group of users how to report attendance to the systems, keeping it simple and making sure to let them feel like it won’t add to their workload. </p>
                    <p>We provided incentives to encourage them:</p>
                    <ul>
                      <li><span>Extra hours report</span> allowing them to see aggregated data on attendance and absences, an overall look on their entire station state.</li>
                      <li><span>Validation</span> we defined a set of rules to the system, so that the system could automatically alert them  if there is important data missing. This way they don’t have to worry they missed something, ultimately saving time in filling gaps at the end of each month. </li>
                    </ul>
                  </div>
                </div>
                <div className="side-by-side-right">
                  <div className="side-by-side-right-top">
                    <CircleIcon width={35} size={40} iconSize={20} backgroundColor={'#CC5714'} icon={ICONS_MAP.USERS} iconColor={'#ffffff'} />
                    <p className="text-by-the-icon">HR Coordinators</p>
                  </div>
                  <div className="side-by-side-right-middle">
                    <p>For the POC, we had to make sure:</p>
                    <ul>
                      <li>Data inserted by the managers runs smoothly to the virtual attendance cards.</li>
                      <li>Only the relevant data (absences, extra hours) is displayed on the main screen</li>
                    </ul>
                    <p>The 1st stage algorithms we implemented, for the basic calculations, work well in proving the extra compensation required for each employee.<br />This was an important stage in the process, with the users & I meticulously manually reviewing the output for 3 months, working alongside the developers to fix incorrections.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="salaries-screens">
          <div className="content">
            <Chip text={'Design & Develop'} backgroundColor={'rgba(20, 136, 204, 0.3)'} icon={ICONS_MAP.BRACKETS} />
            <h2>Screens and UI</h2>
            <p>We improved the design and development of the project by customizing the screens and enhancing the algorithms while constantly testing and making adjustments, despite any limitations we faced</p>
            <p>My main tasks were:</p>
            <ul>
              <li>Work with the backend developers on improving calculation algorithm and data flow to the payroll system.</li>
              <li>Work with the Frontend developer on developing of the screens.</li>
              <li>Monitoring and tracking task progress in the Kanban board.</li>
            </ul>
          </div>
        </section>

        <section className="salaries-general-flow">
          <div className="content">
            <h2>General Flow</h2>
            <div className="content-part side-by-side">
              <div className="side-by-side-left">
                <h3>DASHBOARD</h3>
                <p>Each HR Coordinator ia is charge of 3-4 Sanitation stations, and has to check & approve their additions.<br />Here, each of them can see how many cards she has to attend, click on the column in order to see the entire unit’s attendace cards.<br />She can also use the search section to find a specific employee’s card.</p>
                <p>The Coordinators, as well as HR Manager, can track their progress in a glance, since as they progress the graph turns slowly from blue (status ‘unchecked’) to green (‘approved’).</p>
              </div>
              <div className="side-by-side-right">
                <img alt="flow example" src={assets.salariesGeneralFlow1} />
              </div>
            </div>
            <div className="content-part">
              <h4>DIGITAL ATTENDANCE CARD</h4>
              <p>Based on the research (User interviews & Observations) I decide on the following layout:</p>
              <img alt="app screen example" src={assets.salariesGeneralFlow2} />
            </div>
          </div>
        </section>

        <section className="salaries-graphic-elements">
          <div className="content">
            <h3>Graphic elements & Color visualization</h3>
            <p>Due to lack of time & resources, we decided to go on a minimalistic design, using mostly on ready components and free icons with minimal customization. This approach also corresponded with the large amount of data displayed in many attendance cards.</p>
            <p>Color was almost exclusively used to draw attention & emphasize information, such as: card status, type of absence, shortage of counters (such as sick leave, vacation days etc.)</p>
            <img alt="app screen example" src={assets.salariesGraphicElements1} />
          </div>
        </section>

        <section className="salaries-results">
          <div className="content">
            <div className="content-part side-by-side">
              <div className="side-by-side-left">
                <Chip text={'Iterate & Test'} backgroundColor={'rgba(20, 136, 204, 0.3)'} icon={ICONS_MAP.CHART} />
                <h2>Final results</h2>
                <p>The project took around one year to complete, during which we expanded the algorithm to cater to all types of employees and special events that required unique calculations. I collaborated closely with the HR department to handle any arising issues, fix bugs, and add new features.</p>
                <p>We also tracked the usage of the system via the system dashboard, and asked the developer to create a report on the automation usage in the system.</p>
              </div>
              <div className="side-by-side-right">
                <div className="side-by-side-right-row">
                  <div className="side-by-side-right-row-item">
                    <PercentageCircle percent={98.5} text={'Success rates in calculations'} circleColor={'#1488CC'} textColor={'#151B21'} />
                  </div>
                </div>
                <div className="side-by-side-right-row multiple">
                  <div className="side-by-side-right-row-item">
                    <PercentageCircle percent={95} text={'Cards approved (on average) by the 10th day of each month'} circleColor={'#1488CC'} textColor={'#151B21'} />
                  </div>
                  <div className="side-by-side-right-row-item">
                    <PercentageCircle percent={50} text={'Cards approved (on average) by the 10th day of each month'} circleColor={'#1488CC'} textColor={'#151B21'} />
                  </div>    
                </div>
              </div>
            </div>
          </div>
        </section>

        <BottomNavigation pathname="salaries" />
      </div>
    </>
  );
}
