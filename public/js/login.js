var login = document.getElementById("login")
var btnStart = document.getElementById("startGame")
var user = localStorage.getItem("user")

if( user){
  console.log(login)
  login.remove()
}else{
  btnStart.remove()
}

function loginForm() {
  let nameUser = document.getElementById("nameUser").value
  let emailUser = document.getElementById("emailUser").value
  let passUser = document.getElementById("passUser").value

  var data = {
    "username":nameUser,
    "email":emailUser,
    "password":passUser,
    "score":0
  }
  axios.post("/signup",data).then(function(res){
    console.log(res.data)
    localStorage.setItem("user", res.data.name)
    document.location.href = '/game';
  })
}
