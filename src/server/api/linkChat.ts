import OpenAI from "openai";
import path from "node:path"
import { readFileSync } from "node:fs"; 
 export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const apiKey = getApiKey()
    return linkChat(apiKey,body.ctx )
})

function getApiKey() {
    const apiPath = path.win32.join(process.cwd(), ".api")
    let apiKey = readFileSync(apiPath, "utf-8") as string
    return apiKey;
}
async function linkChat(key: string, content: string) {
    const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: key
    });
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content:"你所有的回复格式都请用HTML格式但是注意不要有<html>和<body>这种大标签，谢谢。\n"+ content }],
        model: "deepseek-chat",
    });
    let res = completion.choices[0].message.content
    return res
}
