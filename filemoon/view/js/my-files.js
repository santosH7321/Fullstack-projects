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