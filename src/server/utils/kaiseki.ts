import mammoth from "mammoth";
export default async () => {
    const { messages, value } = await mammoth.convertToHtml({ path: 'D:/3d/k.docx' })
    return { value, messages }
}

