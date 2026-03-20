export const defaultQuizContent = `title: React Fundamentals Quiz
description: Test your knowledge of React hooks and component patterns.

sections:
  - title: 一、选择题
    subtitle: 每题 5 分，共 20 分
    questions:
      - type: mcq
        question: What is the primary purpose of the \`useEffect\` hook in React?
        options:
          - A. To manage component state
          - B. To perform side effects in function components
          - C. To create reusable components
          - D. To optimize rendering performance
        answer: B

      - type: mcq
        question: Which of the following is NOT a valid way to pass data between React components?
        options:
          - A. Props
          - B. Context API
          - C. Direct DOM manipulation
          - D. State management libraries
        answer: C

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
          - A. "[1, 2, 3, 4, 5]"
          - B. "[2, 4]"
          - C. "[4, 8]"
          - D. "[2, 4, 6, 8, 10]"
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
          - A. Missing cleanup function in useEffect
          - B. count is stale due to closure
          - C. Both A and B
          - D. The code is correct
        answer: C

  - title: 三、数学应用题
    subtitle: 每题 15 分，共 30 分
    questions:
      - type: mcq
        question: |
          已知函数 $f(x) = x^2 + 2x + 1$，求 $f'(x)$ 的值：
        options:
          - A. $2x + 2$
          - B. $2x + 1$
          - C. $x^2 + 2$
          - D. $2x$
        answer: A

      - type: mcq
        question: |
          计算以下定积分的值：

          $$\\int_{0}^{1} x^2 \\, dx$$
        options:
          - A. $\\frac{1}{2}$
          - B. $\\frac{1}{3}$
          - C. $\\frac{1}{4}$
          - D. $1$
        answer: B
`;
