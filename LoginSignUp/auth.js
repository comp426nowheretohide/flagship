const signUpForm = document.querySelector('#signup-form');

joinForm.addEventListener('submit', (e) => {
    //prevent auto-refreshing
    e.preventDefault();
    //get user info
    const email = joinForm['signUpUser'].value;
    const password = joinForm['signUpPass'].value;
    
    //signup the user

    //.then will fire when the sign up is complete
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        //clear out the form fields
<<<<<<< HEAD
        joinForm.reset();
        location.replace('../SpaceshipRooms/index.html')
=======
        signUpForm.reset();
        location.replace('../Lobby/index.html')
>>>>>>> 028fa90f22fea821f28a4421bdebef862bbed000
    });
})

const logInForm = document.querySelector('#login-form');

logInForm.addEventListener('submit', (e) => {
    //prevent page from refreshing
    e.preventDefault();

    //get user info
    const email = logInForm['loginUser'].value;
    const password = logInForm['loginPass'].value;

    auth.setPersistence((firebase.auth.Auth.Persistence.SESSION)).then(_ => {
        auth.signInWithEmailAndPassword(email, password).then(cred => {
            logInForm.reset();
            location.replace('../Lobby/index.html')
        });
    })
})


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("user is signed in!");
        console.log(auth.currentUser);
        location.replace('../Lobby/index.html')
    } else {
        console.log("no user signed in");
    }
  });

