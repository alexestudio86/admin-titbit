export async function getComandasData () {
    try {
        const getPost = await fetch(`https://jsonplaceholder.typicode.com/todos`);
        const response = await getPost.json()
        return { response }
    } catch (error) {
        console.log(error)
    }
}