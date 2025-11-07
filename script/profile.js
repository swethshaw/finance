function updateLoadCounter() {
        fetch('/profile-data')
        .then(response =>{
            if(!response.ok){
                throw new Error('Network response was not ok');

            }
            return response.json();
        })
        .then(data => {
            document.getElementById('nameInput').value=data.userData.fullname;
            document.getElementById("phoneInput").value=data.userData.contact;
            document.getElementById('addressInput').value=data.userData.address;
            document.getElementById('state').value=data.userData.state;
            document.getElementById('emailInput').value=data.userData.email;
            document.getElementById('genderInput').value=data.userData.gender;

        })
}
window.addEventListener("load", updateLoadCounter);


function editProfile(){
    document.getElementById('nameInput').disabled = false;
        document.getElementById('phoneInput').disabled = false;
        document.getElementById('addressInput').disabled = false;
        document.getElementById('state').disabled = false;
        document.getElementById('emailInput').disabled = false;
        document.getElementById('genderInput').disabled = false;
        document.getElementById('submit').disabled = false;
}


function saveProfile(){
    alert()
}

var modal = document.getElementById('profilePictureModal');
var img = document.getElementById('profile-picture');
var modalImg = document.getElementById('modalImage');
img.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
}
var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
    modal.style.display = "none";
}


// document.getElementById('profile').addEventListener('submit', async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     try {
//       const response = await fetch('/update-profile', {
//         method: 'POST',
//         body: formData
//       });
//       if (response.ok) {
//         alert('Profile updated successfully');
//         console.log(formData);
//       } else {
//         alert('Failed to update profile');
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       alert('An error occurred while updating profile');
//     }
//   });

// function saveProfile() {
//     try {
//         document.getElementById('nameInput').disabled = false;
//         document.getElementById('phoneInput').disabled = false;
//         document.getElementById('addressInput').disabled = false;
//         document.getElementById('state').disabled = false;
//         document.getElementById('emailInput').disabled = false;
//         document.getElementById('genderInput').disabled = false;
//         document.getElementById('submit').disabled = false;
//         document.getElementById('hidden-image-upload').disabled = true;

//         document.getElementById('profile-picture').style.cursor = 'pointer';
//         document.getElementById('profile-picture').onclick = function () {
//             var modal = document.getElementById('profilePictureModal');
//             var modalImg = document.getElementById('modalImage');
//             modal.style.display = "block";
//             modalImg.src = this.src;
//         };
//         var oldInput = document.getElementById('hidden-image-upload');
//         var newInput = oldInput.cloneNode(true);
//         oldInput.parentNode.replaceChild(newInput, oldInput);
//     } catch (e) {
//         if (e instanceof DOMException && e.code === DOMException.QUOTA_EXCEEDED_ERR) {
//             alert('Failed to save profile: Image size exceeded storage limit');
//         } else {
//             console.error('An unexpected error occurred:', e);
//         }
//     }
// }