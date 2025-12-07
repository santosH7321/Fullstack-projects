const logout = ()=>{
    localStorage.clear()
    location.href = "/login"
}

window.onload = ()=>{
    showUserDetails()
}

const showUserDetails = async ()=>{
    const session = await getSession()
    const fullname = document.getElementById("fullname")
    const email = document.getElementById("email")
    fullname.innerHTML = session.fullname
    email.innerHTML = session.email
}
