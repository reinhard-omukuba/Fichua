//posting a video
document.getElementById("postItem").onclick = function(){

    //storage
    var video = document.getElementById('myVideo').files[0];
    var storageRef = firebase.storage().ref();
    var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
    var caption = document.getElementById("caption").value;
    var theCaption = caption.trim();

    firebase.auth().onAuthStateChanged((user)=>{
        if(user){

            //get the userId
            var userId = user.uid;

            if(theCaption == ""){
                document.getElementById("progressError").style.display = "block";
                document.getElementById("progressError").innerHTML = "Video caption cannot be blank."
        
            }else if(video == null){
                document.getElementById("progressError2").style.display = "block";
                document.getElementById("progressError2").innerHTML = "Please select a video to upload"
            }else{
                var uploadTask = storageRef.child("videos/").child(Math.random() + video.name).put(video);
                uploadTask.on('state_changed', (snapshot) => {    
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;            
                    var wholeUmber = Math.round(progress)
                    document.getElementById("progressText").innerText = wholeUmber + "%. Video uploading...", "Uploading.."; 
                    document.getElementById("alertProgress").style.display = "block";
                    document.getElementById("progressError").style.display = "none";
                    document.getElementById("progressError2").style.display = "none";
            
                    var widthdata = wholeUmber +"%";
                    document.getElementById("progressbar").style.width = widthdata;
            
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    }
                }, 
            
                (error) => {
                    // Handle unsuccessful uploads
                    document.getElementById("progressError").style.display = "block";
                }, 
                () => {
                    // Handle successful uploads on complete
                    document.getElementById("progressSuccess").style.display = "block"
                    document.getElementById("alertProgress").style.display = "none";
            
                    //getdownloadurl
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {   
                    //send to database
                    var addAdvertisement = firebase.firestore().collection("videos").doc();
                    addAdvertisement.set({
                        userId: userId,
                        videoUrl:downloadURL,
                        upoadTime:myTimestamp,
                        videoVerifid: "no",
                        caption:caption
            
                    }).then(()=>{
                        //refresh the page after 2 seconds
                        // function theTimer(){
                            
                        // }
                        // setInterval(theTimer, 2000); 
        
                        //just refresh the page after upoad
                        window.location.reload();
            
                    }).catch((error)=>{
                        var errorMessage = error.message;
                        document.getElementById("progressError").style.display = "block";
                        document.getElementById("progressError").innerHTML = errorMessage;
                    })
            
                });
                })
            }
            

        }else{
            window.location.href = "register.html"
        }
    })

    


}
//end post video

firebase.firestore().collection("users").get().then((userSnapshot)=>{
    userSnapshot.forEach((doc)=>{
        var userName = doc.data().userName;
        var userPhoto = doc.data().userPhoto;
        var userId = doc.data().userId;


        firebase.firestore().collection("videos").get().then((querySnapshot)=>{
            var content = '';
            querySnapshot.forEach((doc)=>{
                var videoUrl = doc.data().videoUrl;
                var caption = doc.data().caption;
                var upoadTime = doc.data().upoadTime;
                var mtuserId = doc.data().userId;

                //splitting time
                var DateAdded = upoadTime.toDate().toDateString();
                var timeAdded = upoadTime.toDate().toTimeString();

                var fullDate = DateAdded + " " + timeAdded

               function timeSince(date) {
                var seconds = Math.floor((new Date() - date) / 1000);
                var interval = seconds / 31536000;
                if (interval > 1) {
                return Math.floor(interval) + " years";
                }
                interval = seconds / 2592000;
                if (interval > 1) {
                return Math.floor(interval) + " months";
                }
                interval = seconds / 86400;
                if (interval > 1) {
                return Math.floor(interval) + " days";
                }
                interval = seconds / 3600;
                if (interval > 1) {
                return Math.floor(interval) + " hours";
                }
                interval = seconds / 60;
                if (interval > 1) {
                return Math.floor(interval) + " minutes";
                }
                return Math.floor(seconds) + " seconds";
              }

              var timedifference = timeSince(new Date( fullDate)) + " ago"


                if(userId == mtuserId){
                    content += '<div class="d-flex postMap" >';
                    content += '<div class="userProfile">';
                    content += '<img src="'+userPhoto+'">';
                    content += '</div>';
                    content += '    <div class="pullPostsCont">';
                    content += '        <div class="d-flex align-items-center">';
                    content += '            <h6>'+userName+'</h6>';
                    content += '            <p style="color: gray; font-size: 13px;">'+timedifference+'</p>';
                    content += '        </div>';
                    content += '        <div>';
                    content += '            <p id="videoCaption" style="color:gray;">'+caption+'</p>';
                    content += '            <video class="theVideo" controls>';
                    content += '                <source src="'+videoUrl+'">';
                    content += '            </video>';
                    content += '        </div>';
                    content += '        <div class="postStats">';
                    content += '            <p class="statItem" style="font-size:14px;">';
                    content += '                <i class="fa fa-commenting-o" aria-hidden="true"></i> 0 Comments ';
                    content += '            </p>';
                    content += '            <p class="statItem" style="font-size:14px;">';
                    content += '                <i class="fa fa-heart-o" aria-hidden="true"></i> 0 Likes';
                    content += '            </p>';
                    content += '        </div>   ';                
                    content += '    </div>   ';               
                    content += '</div>'
                }
        

        
            })
            $("#showAllPosts").append(content);
        })
    })
})

