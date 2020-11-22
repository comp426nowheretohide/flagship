const signUpForm = document.querySelector('#signup-form');

signUpForm.addEventListener('submit', (e) => {
    //prevent auto-refreshing
    e.preventDefault();
    //get user info
    const email = signUpForm['signUpUser'].value;
    const password = signUpForm['signUpPass'].value;
    
    //signup the user

    //.then will fire when the sign up is complete
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        //clear out the form fields
        signUpForm.reset();
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
        });
    })
})

/*
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("user is signed in!");
        console.log(auth.currentUser);
    } else {
        console.log("no user signed in");
    }
  });

*/

