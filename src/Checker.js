import "./checker.css";

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Define the questions for each area of interest
const questions = {
  devops: [
    { question: 'What is a CI/CD pipeline?', option1: 'Continuous Integration and Continuous Deployment', option2: 'Continuous Integration and Continuous Development', option3: 'Continuous Improvement and Continuous Deployment', option4: 'Continuous Improvement and Continuous Development', ans: 1 },
    { question: 'Which tool is commonly used for container orchestration?', option1: 'Docker', option2: 'Kubernetes', option3: 'Jenkins', option4: 'Git', ans: 2 },
    { question: 'What does Infrastructure as Code (IaC) allow you to do?', option1: 'Manage infrastructure manually', option2: 'Automate infrastructure provisioning', option3: 'Create applications', option4: 'Perform network diagnostics', ans: 2 },
    { question: 'What is the purpose of a load balancer?', option1: 'Distribute network traffic', option2: 'Monitor system performance', option3: 'Deploy code', option4: 'Manage databases', ans: 1 },
    { question: 'Which of the following is a common version control system?', option1: 'Docker', option2: 'Kubernetes', option3: 'Git', option4: 'Terraform', ans: 3 },
    { question: 'What is the primary purpose of monitoring in DevOps?', option1: 'To deploy applications', option2: 'To manage databases', option3: 'To track system performance and health', option4: 'To create backups', ans: 3 },
    { question: 'What does the term “containerization” refer to?', option1: 'Running applications in isolated environments', option2: 'Managing server hardware', option3: 'Creating virtual machines', option4: 'Provisioning cloud resources', ans: 1 },
  ],
  tester: [
    { question: 'What is the main goal of software testing?', option1: 'Find defects and ensure quality', option2: 'Write code', option3: 'Design interfaces', option4: 'Manage projects', ans: 1 },
    { question: 'What does a test case typically include?', option1: 'Test steps, input data, and expected results', option2: 'Code snippets', option3: 'System architecture', option4: 'User stories', ans: 1 },
    { question: 'Which testing technique involves testing the software without knowledge of the internal workings?', option1: 'Black-box testing', option2: 'White-box testing', option3: 'Integration testing', option4: 'System testing', ans: 1 },
    { question: 'What is regression testing?', option1: 'Testing after bug fixes or changes', option2: 'Testing for security vulnerabilities', option3: 'Testing the performance of the system', option4: 'Testing the usability of the system', ans: 1 },
    { question: 'Which of the following tools is used for automated testing?', option1: 'JIRA', option2: 'Selenium', option3: 'Jenkins', option4: 'Git', ans: 2 },
    { question: 'What does a bug report typically include?', option1: 'Steps to reproduce, expected result, actual result', option2: 'Code changes', option3: 'Test cases', option4: 'Project requirements', ans: 1 },
    { question: 'What is the purpose of performance testing?', option1: 'To evaluate the speed, scalability, and stability of the software', option2: 'To check for security vulnerabilities', option3: 'To verify functionality', option4: 'To assess usability', ans: 1 },
  ],
  frontend: [
    { question: 'What does HTML stand for?', option1: 'HyperText Markup Language', option2: 'HyperText Management Language', option3: 'HyperLink Markup Language', option4: 'HyperText MultiLanguage', ans: 1 },
    { question: 'Which of the following is a CSS preprocessor?', option1: 'SASS', option2: 'HTML', option3: 'JavaScript', option4: 'JSON', ans: 1 },
    { question: 'What is the purpose of the “box model” in CSS?', option1: 'To define the layout and design of HTML elements', option2: 'To handle database operations', option3: 'To manage state in React', option4: 'To control animations', ans: 1 },
    { question: 'Which JavaScript framework is used for building user interfaces?', option1: 'Angular', option2: 'Bootstrap', option3: 'Node.js', option4: 'jQuery', ans: 1 },
    { question: 'What does the “DOM” stand for in web development?', option1: 'Document Object Model', option2: 'Data Object Model', option3: 'Dynamic Object Model', option4: 'Document Oriented Model', ans: 1 },
    { question: 'What is a responsive design?', option1: 'A design that adjusts to different screen sizes', option2: 'A design that is static', option3: 'A design that only works on mobile devices', option4: 'A design that requires user input', ans: 1 },
    { question: 'Which of the following is a JavaScript library?', option1: 'React', option2: 'Bootstrap', option3: 'SASS', option4: 'jQuery', ans: 1 },
  ],
  backend: [
    { question: 'Which of the following is a backend programming language?', option1: 'Python', option2: 'HTML', option3: 'CSS', option4: 'JavaScript', ans: 1 },
    { question: 'What is a RESTful API?', option1: 'A type of web service architecture', option2: 'A database management system', option3: 'A frontend framework', option4: 'A CSS library', ans: 1 },
    { question: 'What does SQL stand for?', option1: 'Structured Query Language', option2: 'Standard Query Language', option3: 'Simple Query Language', option4: 'Structured Query Logic', ans: 1 },
    { question: 'Which of the following is a popular backend framework for JavaScript?', option1: 'Express.js', option2: 'React', option3: 'Angular', option4: 'Bootstrap', ans: 1 },
    { question: 'What is the purpose of middleware in a backend application?', option1: 'To handle requests and responses', option2: 'To manage user interfaces', option3: 'To perform database operations', option4: 'To design web pages', ans: 1 },
    { question: 'Which of the following is a NoSQL database?', option1: 'MongoDB', option2: 'MySQL', option3: 'PostgreSQL', option4: 'SQLite', ans: 1 },
    { question: 'What is the main role of an ORM?', option1: 'To map database tables to objects in code', option2: 'To manage user authentication', option3: 'To handle server-side routing', option4: 'To design frontend components', ans: 1 },
  ],
  'full-stack': [
    { question: 'What is a full-stack developer responsible for?', option1: 'Both frontend and backend development', option2: 'Only frontend development', option3: 'Only backend development', option4: 'Database management', ans: 1 },
    { question: 'Which tool is commonly used for version control?', option1: 'Git', option2: 'JIRA', option3: 'Docker', option4: 'Jenkins', ans: 1 },
    { question: 'What does “MVC” stand for in web development?', option1: 'Model-View-Controller', option2: 'Model-View-Component', option3: 'Main-View-Controller', option4: 'Model-View-Creator', ans: 1 },
    { question: 'Which framework is known for its two-way data binding feature?', option1: 'Angular', option2: 'React', option3: 'Vue', option4: 'Bootstrap', ans: 1 },
    { question: 'What is the purpose of a build tool?', option1: 'To automate the build process', option2: 'To handle user authentication', option3: 'To design UI components', option4: 'To manage database schema', ans: 1 },
    { question: 'Which of the following is a popular JavaScript runtime environment?', option1: 'Node.js', option2: 'Django', option3: 'Ruby on Rails', option4: 'Spring', ans: 1 },
    { question: 'What is the purpose of a RESTful web service?', option1: 'To provide access to resources over HTTP', option2: 'To manage server configurations', option3: 'To handle database queries', option4: 'To design user interfaces', ans: 1 },
  ],
};
function Checker() {
  const [index, setIndex] = useState(0);
  const [qn, setQuestion] = useState({});
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [res, setRes] = useState(false);
  const [timer, setTimer] = useState(5);
  const navigate = useNavigate();

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);
  const timeid = useRef(null);

  useEffect(() => {
    const areaOfInterest = localStorage.getItem('areaOfInterest');
    if (areaOfInterest && questions[areaOfInterest]) {
      if (questions[areaOfInterest].length > 0) {
        setQuestion(questions[areaOfInterest][index]);
      } else {
        console.error(`No questions found for areaOfInterest: ${areaOfInterest}`);
        // Handle case where no questions are available
      }
    } else {
      console.error(`Invalid or missing areaOfInterest: ${areaOfInterest}`);
      // Handle case where areaOfInterest is invalid
    }
  }, [index]);

  const checkAns = (e, ans) => {
    if (!lock && qn) {
      if (qn.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        if (option1.current) option1.current.classList.remove("correct");
        if (option2.current) option2.current.classList.remove("correct");
        if (option3.current) option3.current.classList.remove("correct");
        if (option4.current) option4.current.classList.remove("correct");
        if (option1.current && qn.ans === 1) option1.current.classList.add("correct");
        if (option2.current && qn.ans === 2) option2.current.classList.add("correct");
        if (option3.current && qn.ans === 3) option3.current.classList.add("correct");
        if (option4.current && qn.ans === 4) option4.current.classList.add("correct");
        clearTimeout(timeid.current);
      }
    }
  };

  const next = () => {
    const areaOfInterest = localStorage.getItem('areaOfInterest');
    if (lock) {
      if (questions[areaOfInterest] && index === questions[areaOfInterest].length - 1) {
        determineLevel(score);
        setRes(true);
      } else {
        setIndex((prevIndex) => prevIndex + 1);
        setLock(false);
        if (option1.current) option1.current.classList.remove("wrong");
        if (option2.current) option2.current.classList.remove("wrong");
        if (option3.current) option3.current.classList.remove("wrong");
        if (option4.current) option4.current.classList.remove("wrong");
        if (option1.current) option1.current.classList.remove("correct");
        if (option2.current) option2.current.classList.remove("correct");
        if (option3.current) option3.current.classList.remove("correct");
        if (option4.current) option4.current.classList.remove("correct");
        setTimer(5);
      }
    }
  };

  const determineLevel = (score) => {
    let level = '';
    if (score >= 6) {
      level = 'Professional';
    } else if (score >= 3) {
      level = 'Experienced';
    } else {
      level = 'Beginner';
    }
    localStorage.setItem('level', level);
  };

  useEffect(() => {
    if (res) {
      setTimeout(() => {
        navigate('/');
      }, 5000); // Redirect to home page after 5 seconds
    }
  }, [res, navigate]);

  useEffect(() => {
    if (timer > 0 && !lock) {
      timeid.current = setTimeout(() => {
        setTimer((prevtime) => prevtime - 1);
        if (timer === 1) {
          next();
        }
      }, 1000);
    }
    return () => clearTimeout(timeid.current);
  }, [timer, lock]);

  const areaOfInterest = localStorage.getItem('areaOfInterest');
  const questionCount = (questions[areaOfInterest] || []).length;
  
  return (
    <div className="container">
      <h1>Check your knowledge by taking the test</h1>
      <hr />
      {res ? (
        <>
          <h2>You scored {score} out of {questionCount}</h2>
          <h3>Your level is: {localStorage.getItem('level')}</h3>
        </>
      ) : (
        <>
          {qn.question ? (
            <>
              <h2>{index + 1}. {qn.question}</h2>
              <ul>
                <li ref={option1} onClick={(e) => checkAns(e, 1)}>{qn.option1}</li>
                <li ref={option2} onClick={(e) => checkAns(e, 2)}>{qn.option2}</li>
                <li ref={option3} onClick={(e) => checkAns(e, 3)}>{qn.option3}</li>
                <li ref={option4} onClick={(e) => checkAns(e, 4)}>{qn.option4}</li>
              </ul>
              <p>Time Remaining: {timer < 10 ? `0${timer}` : timer}</p>
              <button onClick={next}>Next</button>
              <div className="out-of">
                {index + 1} out of {questionCount} questions
              </div>
            </>
          ) : (
            <p>Loading questions...</p>
          )}
        </>
      )}
    </div>
  );
}

export default Checker;