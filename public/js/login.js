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
  axios.post("https://databreaker-92ee6.firebaseio.com/users.json",data).then(function(res){
    console.log(res.data)
    localStorage.setItem("user", res.data.name)
    document.location.href = '/game';
  })
}
