function updateLoadCounter() {
    fetch('/profile-data')
    .then(response =>{
        if(!response.ok){
            throw new Error('Network response was not ok');

        }
        return response.json();
    })
    .then(data => {
        document.getElementById('nameInput').innerText=data.userData.fullname;
        document.getElementById("phoneInput").innerHTML=data.userData.contact;
        document.getElementById('emailInput').innerHTML=data.userData.email;
        
    })
}
window.addEventListener("load", updateLoadCounter);


$(document).ready(function() {
    $('#customdate').hide();
    $('#selectdate').change(function() {
        var selectedValue = $(this).val();
        console.log(selectedValue);
        if (selectedValue === 'custom') {
            $('#customdate').show();
        } else {
            $('#customdate').hide();
        }
    });
    $("#search").on("click",function(){
        fetch('/get-transactions')
        .then(response =>{
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
            })
            .then(data => {
                if (typeof data.userData === 'object' && data.userData !== null) {
                    for (let key in data.userData) {
                        console.log(key + ':', data.userData[key]);
                    }
                } else {
                    console.error('userData is not an object');
                }
                });
            })
});
