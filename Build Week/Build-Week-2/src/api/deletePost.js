const deletePost = async (postId) => {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/posts/${ postId }`, {
            headers: {
                "Authorization": `Bearer ${ process.env.REACT_APP_TOKEN }`
            },
            method: "DELETE",
        })
        console.log(response)
        if (response.ok) {
            const deletedPost = await response.json()
            return deletedPost
        } else {
            throw new Error("Fetch error!")
        }
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export default deletePost