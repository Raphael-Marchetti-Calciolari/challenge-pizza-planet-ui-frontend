function deleteBeverage(_id) {
    fetch(`http://127.0.0.1:5000/beverage/id/${_id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    })
    .then (() => {
        window.location.href = '/app/beverage/beverages.html';
    });
}