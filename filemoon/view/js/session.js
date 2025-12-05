const getSession = async () => {
    try {
        const session = localStorage.getItem("authToken");
        if(!session)
        {
            location.href = "../index.html"
            return;
        }
        const payload = {
            token: session
        }
        await axios.post("http://localhost:8080/token/verify", payload);
    } catch (err) {
        localStorage.clear();
        location.href = "../index.html"
    }
}
getSession()