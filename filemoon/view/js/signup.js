const toast = new Notyf({
    x: "", y: "top"
});


const signup = async (e) => {
    try {
        e.preventDefault();
        const form = e.target
        const elements = form.elements
        
        const payload = {
            fullname: elements.fullname.value,
            mobile: elements.mobile.value,
            email: elements.email.value,
            password: elements.password.value
        }

        const {data} = await axios.post("http://localhost:8080/signup", payload)
        form.reset()
        toast.success(data.message)
        setTimeout(()=>{
            location.href = "index.html"
        }, 2000)
    } catch (err) {
        toast.error(err.response ? err.response.data.message : err.message)
    }
}