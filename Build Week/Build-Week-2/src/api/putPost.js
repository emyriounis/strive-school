const putPost = async (postId, postData) => {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/posts/${ postId }`, {
            headers: {
                "Authorization": `Bearer ${ process.env.REACT_APP_TOKEN }`
            },
            method: "PUT",
            body: JSON.stringify(postData)
        })
        console.log(response)
        if (response.ok) {
            const editedPost = await response.json()
            return editedPost
        } else {
            throw new Error("Fetch error!")
        }
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export default putPost