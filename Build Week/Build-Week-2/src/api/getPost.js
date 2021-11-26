const getPost = async (postId) => {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/posts/${ postId }`, {
            headers: {
                "Authorization": `Bearer ${ process.env.REACT_APP_TOKEN }`
            }
        })
        console.log(response)
        if (response.ok) {
            const post = await response.json()
            return post
        } else {
            throw new Error("Fetch error!")
        }
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export default getPost