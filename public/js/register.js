document.getElementById("register").onclick = function(){
    var userName = document.getElementById("userName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    document.getElementById("progressError").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("submitting").style.display = "block";
    var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());


    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCred)=>{
        //
        var userId = userCred.user.uid;
        firebase.firestore().collection("users").doc(userId).set({
            userId:userId,
            userName:userName,
            email:email,
            signUpDate:myTimestamp,
            userPhoto:"https://firebasestorage.googleapis.com/v0/b/mzalendo-a4b5b.appspot.com/o/avatars%2Favatar1.png?alt=media&token=2222309f-b6b2-4bbe-855c-facf57bdb900"
        }).then(()=>{
            window.location.href="index.html"
        })

    }).catch((error)=>{
        var errorMessage = error.message;

        document.getElementById("progressError").style.display = "block";
        document.getElementById("progressError").innerText = errorMessage;

        document.getElementById("register").style.display = "block";
        document.getElementById("submitting").style.display = "none";
    })
}