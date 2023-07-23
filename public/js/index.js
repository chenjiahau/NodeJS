fetch("  http://localhost:3000/product")
    .then((response) => {
    return response.json();
})
    .then((data) => {
    console.log(data);
});
export {};
