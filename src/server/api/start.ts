
import mammoth from "mammoth"
import { defineEventHandler, readMultipartFormData } from 'h3'
interface Body {
    formData: FormData
    content: string
}

export default defineEventHandler(async (event) => {
    const parts = await readMultipartFormData(event) || [];
    let textContent: string = "";
    let docxContent: string = "";
    for (const part of parts) {
        if (part.name === 'file') {
            const buffer = Buffer.from(part.data);
            ({ value: docxContent, } = await mammoth.convertToHtml({ buffer }));

        }
        if (part.name === 'content') {
            const buffer = Buffer.from(part.data);
            textContent = buffer.toString('utf-8');
        }
    }
    return textContent + "\n" + docxContent;
    // const chatResolve = await linkChat("你好？今天天气怎么样？") 
    // return chatResolve
})