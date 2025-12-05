const toast = new Notyf({
    x: "", y: "top"
});


const login = async (e) => {
    try {
        e.preventDefault();
        const form = e.target
        const elements = form.elements
        
        const payload = {
            email: elements.email.value,
            password: elements.password.value
        }

        const {data} = await axios.post("http://localhost:8080/login", payload)
        toast.success(data.message)
        setTimeout(()=>{
            location.href = "/app/dashboard.html"
        }, 2000)
    } catch (err) {
        toast.error(err.response ? err.response.data.message : err.message)
    }
}