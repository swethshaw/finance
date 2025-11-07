var database = firebase.database().ref('register form');
        database.once('value', function(snapshot){
            if(snapshot.exists()){
            var content = '';
            snapshot.forEach(function(data){
                var val = data.val();
                document.getElementById('nameInput').value = val.fname;
                document.getElementById('phoneInput').value = val.phone_no;
                document.getElementById('addressInput').value = val.address;
                document.getElementById('state').value = val.state;
                document.getElementById('emailInput').value = val.email;
                document.getElementById('genderInput').value = val.gender;
            });
        };
    });