# Salary Additions

The Sanitation HR department was responsible for manually calculating and approving salary additions for employees, including attendance for absences and extra hours compensations. This web system offers an automated solution to streamline and automate this process for them.

## Problem

The HR coordinators were tasked with a labor-intensive process of reviewing manually the monthly attendance cards for most Sanitation employees. They had to meticulously check for instances of overtime and then calculate the compensation for those extra hours worked, based on a complex set of salary agreements. This was a tiring, time consuming & ineffective process, prone to mistakes.

## Solution

A user-centered web application that will allow:

- Report employees attendance in the system
- Calculate salary additions, to be manually approved by HR

### My role

The entire process of designing the system, including:

- Deep understanding of the existing process
- User research - Observations, interviews with stakeholders & users
- Ideation
- User flows
- Wireframing
- Testing
- Visual design\*

\*Due to budget & time limitations, extensive compromises had to be done. The visual design is focused on a usable level with focus on functionality.

## TL;DR — Key points leading to project success

- Users like **flexibility** in the system
- **Ongoing communication** with stakeholders & users led to high engagement
- Displaying only **relevant information**

98.5% success rates in calculations.

## Design Process

Research → Define & Ideate → Design & Develop → Research → Iterate & Test

## Observations & interviews

_Research_

The research phase consisted of observations and interviews with stakeholders & users.

### Interviews

I conducted interview to gather qualitative feedback on the existing process, and get insights from users.

I conducted 5-7 interviews with the main stakeholder, HR manager, in order to understand their work process and learn their calculation tables.

I also conducted interviews with 2-3 users from each type of user group: Station Managers and HR Coordinators.

User groups: HR Manager, Station Managers, HR Coordinators.

### Observations

I had to fully understand the existing process and additions calculations & approval process.

For that, I conducted several interviews with HR manager, as well as interviewed some of the HR coordinators.

I also preformed observations while they we're working, in order to understand their work flow.

## Main user flows & business logic

_Define & Ideate_

The solution was composed of two main processes, designed to address the specific challenges of the project:

### 1. Reporting attendance

The best solution was to report hours through the existing Sanitation tasks management system. Employees preforms 1-3 tasks each day, which are already managed in this system by work manager. We added fields to the screen, allowing to report, enabling to report start & end time for each task.

### 2. Calculate salary additions

### Business logic & Calculations

The business logic & salary additions calculations were documented in over 30 flowcharts I created and delivered to the developer, and later on tested before moving to production.

In the screenshots here, you can see the list of flow charts assembling together the calculation algorithm.

You can also see two examples of these flow charts - the root flow charts for basic calculations.

## Initial testing

_Test_

We aimed for the manual approval process to be as fluent as possible, in order to improve the existing process and shorten the overall time of approval.

### Wireframes

### First stage testing

**Station Managers**

After assembling the solution, we had to test with some users that the process could run smoothly, and check for any unexpected problems.

First, we thought our first group of users how to report attendance to the systems, keeping it simple and making sure to let them feel like it won't add to their workload.

We provided incentives to encourage them:

- **Extra hours report** allowing them to see aggregated data on attendance and absences, an overall look on their entire station state.
- **Validation** we defined a set of rules to the system, so that the system could automatically alert them if there is important data missing. This way they don't have to worry they missed something, ultimately saving time in filling gaps at the end of each month.

**HR Coordinators**

For the POC, we had to make sure:

- Data inserted by the managers runs smoothly to the virtual attendance cards.
- Only the relevant data (absences, extra hours) is displayed on the main screen

The 1st stage algorithms we implemented, for the basic calculations, work well in proving the extra compensation required for each employee.

This was an important stage in the process, with the users & I meticulously manually reviewing the output for 3 months, working alongside the developers to fix incorrections.

## Main Screens and UI

_Design & Develop_

We improved the design and development of the project by customizing the screens and enhancing the algorithms while constantly testing and making adjustments, despite any limitations we faced.

My main tasks were:

- Work with the backend developers on improving calculation algorithm and data flow to the payroll system.
- Work with the Frontend developer on developing of the screens.
- Monitoring and tracking task progress in the Kanban board.

Screens: Dashboard, Digital Attendance Card.

## Final results

_Iterate & Test_

The project took around one year to complete, during which we expanded the algorithm to cater to all types of employees and special events that required unique calculations. I collaborated closely with the HR department to handle any arising issues, fix bugs, and add new features.

We also tracked the usage of the system via the system dashboard, and asked the developer to create a report on the automation usage in the system.

- 98.5% success rates in calculations
- 95% cards approved (on average) by the 10th day of each month
- 50% cards approved (on average) by the 10th day of each month
