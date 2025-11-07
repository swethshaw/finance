var database = firebase.database().ref('register form');
        var emailf='';
        var passwordf='';
        function updateValue(Value) {
            var query = database.orderByChild("phone_no").equalTo(Value);
            query.once('value', function (snapshot) {
                if (snapshot.exists()) {
                    document.getElementById('invalid').innerHTML = "";
                    snapshot.forEach(function (data) {
                        var val = data.val();
                        emailf = val.email;
                        passwordf = val.password;
                        console.log(emailf, passwordf);
                    });
                } else {
                    document.getElementById('invalid').innerHTML = "* Enter a valid number";
                }
            });
        }
        function submitForm() {
    var emailIn = document.getElementById('emailin').value;
    var passIn = document.getElementById('Passin').value;
    if (emailf === emailIn && passwordf === passIn) { 
        // window.location.href = "index.html";
        return true;
    } else {
        document.getElementById('invalid').innerHTML = "* Enter a valid credentials";
        return false;
    }
}
