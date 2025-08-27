
//Function that adds the navbar to the corresponding view
export function paintNavbar() {
    fetch('../Pages/components/navbar.html')
    .then(Response =>Response.text())
    .then(html=> {
        document.getElementById("navbar").innerHTML=html;  
    })

}
