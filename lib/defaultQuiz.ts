export const defaultQuizContent = `title: React Fundamentals Quiz
description: Test your knowledge of React hooks and component patterns.

sections:
  - title: 一、选择题
    subtitle: 每题 5 分，共 20 分
    questions:
      - type: mcq
        question: What is the primary purpose of the \`useEffect\` hook in React?
        options:
          - To manage component state
          - To perform side effects in function components
          - To create reusable components
          - To optimize rendering performance
        answer: B

      - type: mcq
        question: Which of the following is NOT a valid way to pass data between React components?
        options:
          - Props
          - Context API
          - Direct DOM manipulation
          - State management libraries
        answer: C

      - type: mcq
        question: Which statement best describes the difference between controlled and uncontrolled components in React?
        options:
          - |
            Controlled components store their state in the DOM, while uncontrolled components use React state to manage form data
            \`\`\`javascript
            const arr = [1, 2, 3, 4, 5];
            const result = arr.filter(x => x % 2 === 0)
                              .map(x => x * 2);
            console.log(result);
            \`\`\`
          - Controlled components use React state to manage form data and update via onChange handlers, while uncontrolled components store their state in the DOM and are accessed via refs
          - There is no difference between controlled and uncontrolled components; they are just different naming conventions
          - Controlled components are only used for input elements, while uncontrolled components can be used for any type of form element
        answer: B

  - title: 二、代码分析题
    subtitle: 每题 10 分，共 20 分
    questions:
      - type: mcq
        question: |
          What will be logged to the console when this code runs?

          \`\`\`javascript
          const arr = [1, 2, 3, 4, 5];
          const result = arr.filter(x => x % 2 === 0)
                            .map(x => x * 2);
          console.log(result);
          \`\`\`
        options:
          - "[1, 2, 3, 4, 5]"
          - "[2, 4]"
          - "[4, 8]"
          - "[2, 4, 6, 8, 10]"
        answer: C

      - type: mcq
        question: |
          Consider the following React component. What is the issue with this code?

          \`\`\`jsx
          function Counter() {
            const [count, setCount] = useState(0);

            useEffect(() => {
              const timer = setInterval(() => {
                setCount(count + 1);
              }, 1000);
            }, []);

            return <div>{count}</div>;
          }
          \`\`\`
        options:
          - Missing cleanup function in useEffect
          - count is stale due to closure
          - Both A and B
          - The code is correct
        answer: C

  - title: 三、数学应用题
    subtitle: 每题 15 分，共 30 分
    questions:
      - type: mcq
        question: |
          已知函数 $f(x) = x^2 + 2x + 1$，求 $f'(x)$ 的值：
        options:
          - $2x + 2$
          - $2x + 1$
          - $x^2 + 2$
          - $2x$
        answer: A

      - type: mcq
        question: |
          计算以下定积分的值：

          $$\\int_{0}^{1} x^2 \\, dx$$
        options:
          - $\\frac{1}{2}$
          - $\\frac{1}{3}$
          - $\\frac{1}{4}$
          - $1$
        answer: B
`;
