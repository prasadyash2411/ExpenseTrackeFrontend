function signup(e) {
    e.preventDefault();
    console.log(e.target.name);
    const form = new FormData(e.target);

    const signupDetails = {
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password")

    }
    console.log(signupDetails)
    axios.post('http://localhost:3000/user/signup',signupDetails)
}