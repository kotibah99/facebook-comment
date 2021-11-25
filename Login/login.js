
function logInUser() {
    let e=document.getElementById("email").value;
    let p=document.getElementById("password").value;
    fetch('http://localhost:3000/users').then(response => response.json()).then(async data => {

    console.log(data);

        for(let i =0 ; i < data.length; ++i)
        {
            if(data[i].email==e && data[i].pass==p){
                const res = await axios.put('http://localhost:3000/active/1' , {

                    passowrd:data[i].password,

                    name :data[i].name,

                    image:data[i].image,

                    email: data[i].email
                }).then(() => {

                    window.location.assign('file:///D:/web%20abd%20alsalam/personal%20work/json/Login/home.html');
            })
        }
        }
        let err= document.getElementById("password_error").innerText = "ERROR IN PASSWORD";
        
    })

}