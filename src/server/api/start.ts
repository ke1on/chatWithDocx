import kaiseki from "../utils/kaiseki"
export default defineEventHandler(() => {
    const data= kaiseki()
    return data
})