document.getElementById("login").onclick = function(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    document.getElementById("progressError").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("submitting").style.display = "block";


    firebase.auth().signInWithEmailAndPassword(email, password).then((userCred)=>{
        window.location.href="index.html"
    }).catch((error)=>{
        var errorMessage = error.message;

        document.getElementById("progressError").style.display = "block";
        document.getElementById("progressError").innerText = errorMessage;

        document.getElementById("login").style.display = "block";
        document.getElementById("submitting").style.display = "none";
    })
}