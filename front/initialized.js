export const clearDatabase = async () => {
    try {
        const req = await fetch('http://localhost:8080/api/db/clear');
        const res = await req.json()
        return res;
    } catch (error) {
        return error
    }
}