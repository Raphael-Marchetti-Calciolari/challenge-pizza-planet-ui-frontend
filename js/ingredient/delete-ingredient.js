function deleteIngredient(_id) {
    fetch(`http://127.0.0.1:5000/ingredient/id/${_id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    })
    .then (() => {
        showNotification();
    })
    .then(() => {
        window.location.href = '/app/ingredient/ingredients.html';
    });
}

/**
 * Shows a notification when the ingredient is deleted
 */
function showNotification() {
    let ingredientAlert = $("#ingredient-alert");
    ingredientAlert.toggle();
    setTimeout(() => ingredientAlert.toggle(), 5000);
}