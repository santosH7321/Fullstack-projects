axios.defaults.baseURL = SERVER

window.onload = ()=>{
    fetchFiles()
}

const toast = new Notyf({
    position: {x: 'center', y: 'top'}
})

const logout = ()=>{
    localStorage.clear()
    location.href = "/login"
}

const toggleDrawer = ()=>{
    const drawer = document.getElementById("drawer")
    const rightValue = drawer.style.right
    
    if(rightValue === "0px")
    {
        drawer.style.right = "-33.33%"
    }
    else {
        drawer.style.right = "0px"
    }
}

const uploadFile = async (e)=>{
    try {
        e.preventDefault()
        const progress = document.getElementById("progress")
        const uploadButton = document.getElementById("upload-btn")
        const form = e.target
        const formdata = new FormData(form)
        const options = {
            onUploadProgress: (e)=>{
                const loaded = e.loaded
                const total = e.total
                const percentageValue = Math.floor((loaded*100)/total)
                progress.style.width = percentageValue+'%'
                progress.innerHTML = percentageValue+'%'
            }
        }
        uploadButton.disabled = true
        const {data} = await axios.post('/api/file', formdata, options)
        toast.success(`${data.filename} has been uploaded !`)
        fetchFiles()
        uploadButton.disabled = false
        progress.style.width = 0
        progress.innerHTML = ''
        form.reset()
        toggleDrawer()
    }
    catch(err)
    {
        toast.error(err.response ? err.response.data.message : err.message)
    }
}
