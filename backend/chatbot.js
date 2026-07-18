import 'dotenv/config';
import Groq from "groq-sdk";
import { tavily } from '@tavily/core'
import NodeCache from 'node-cache'

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });//for tool calling
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY }); //for LLM

const cache = new NodeCache({ stdTTL: 60 * 60 * 24 }) //24hr storage of data for save history temporary 


export async function generate(userMessage, threadId) {

  const baseMessages =
    [
      {
        role: 'system',
        content: `
You are Learnexa AI, the official AI assistant of Learnexa LMS.

Your primary job is to help users understand and use the Learnexa platform.

About Learnexa:

- Learnexa is an AI-powered Learning Management System.
- Users can register and log in.
- Students can enroll in courses.
- Students can watch video lectures.
- Students can take quizzes.
- Students can track their progress.
- Students can download certificates after course completion.
- Instructors can create and manage courses.
- Users can edit their profile.

Rules:

1. If the question is related to Learnexa, answer using the information above.
2. If the question is not related to Learnexa, answer normally.
3. If the answer requires current information, use the webSearch tool.
4. Never tell users about internal implementation details.

Examples:

Q: How do I enroll in a course?

A: Open the Courses section, select your course, and click the Enroll button.

Q: Where can I see my certificates?

A: You can find your certificates in your dashboard after completing the course.

Q: What is React?

A: React is a JavaScript library for building user interfaces.

Current Date and Time:
${new Date().toUTCString()}
`
      },
      // {
      //   role: 'user',
      //   content: `What is my name ?`
      // }
    ]

  const messages = cache.get(threadId) ?? baseMessages


  messages.push({
    role: 'user',
    content: userMessage
  })

  const MAX_RETRIES = 10;
  let count = 0


  while (true) {

    if (count > MAX_RETRIES) {
      return "I could not Find Result, please try again."
    }
    count++

    const completion = await groq.chat.completions.create({  // 


      model: 'llama-3.3-70b-versatile',
      temperature: 0,
      messages: messages,

      "tools": [
        {
          "type": "function",
          "function": {
            "name": "webSearch",
            "description": "Search the latest informtion and real time data on the internet",
            "parameters": {
              "type": "object",
              "properties": {
                "query": {
                  "type": "string",
                  "description": "The Search querry to perform search on"
                },

              },
              "required": ["query"]
            }
          }
        }
      ],
      tool_choice: 'auto' //if needed then use otherwise use your own knowledge

    });

    messages.push(completion.choices[0].message)  // this is assistant message 

    //this is happens exaclty after LLM says that run this tool for this query -> from here u understand that response LLM not generate
    //  response using toolCalls it only say that u can use this tool for the perticular question we have manually write code(logic) for that things
    const toolCalls = completion.choices[0].message.tool_calls
    if (!toolCalls) {
      cache.set(threadId, messages)
      // console.log(cache)
      return completion.choices[0].message.content
    }

    for (const tool of toolCalls) {
      // console.log("tool:", tool)
      const functionName = tool.function.name
      const functionParams = tool.function.arguments

      if (functionName == 'webSearch') {
        const toolResult = await webSearch(JSON.parse(functionParams))
        // console.log("Tool Result: ", toolResult)
        messages.push({
          tool_call_id: tool.id,
          role: 'tool',
          name: functionName,
          content: toolResult
        })
      }
    }

    // console.log(JSON.stringify(completion.choices[0].message, null, 2));
  }
}




// tool
async function webSearch({ query }) {
  //here we call tavily api
  console.log("Calling web Search...")
  const response = await tvly.search(query);
  const finalResult = response.results.map(result => result.content).join("\n\n")

  // console.log('FinalResult: ', finalResult)
  return finalResult;
}
