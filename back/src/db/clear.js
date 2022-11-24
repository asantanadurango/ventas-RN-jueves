export const clearDatabase = async () => {
   try {
        const req = await fetch('http://localhost:8080/api/db/clear')
        const res = req.json()
        return res
   } catch (error) {
        return error
   }
}