var messagesRef = firebase.database().ref('register form');
document.getElementById('register').addEventListener('submit', function (e) {
    if (validateform()) {
        e.preventDefault();
        submitForm();
    }
});
function submitForm(e) {
    var fname = getInputVal('fname');
    var gender = document.querySelector('input[name="a"]:checked').value;
    var contact = getInputVal('con');
    var address = getInputVal('address');
    var state = selectElement.value;
    var email = getInputVal('email');
    var password = getInputVal('pass');
    console.log(fname, gender, contact, address, state, email, password);
    saveMessage(fname, gender, contact, address, state, email, password);
}
function getInputVal(id) {
    return document.getElementById(id).value;
}
function saveMessage(fname, gender, contact, address, state, email, password) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        fname: fname,
        gender: gender,
        phone_no: contact,
        address: address,
        state: state,
        email: email,
        password: password,
    });
    // window.location.href = "register";
}