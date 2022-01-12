const deleteProductButtonEl = document.querySelectorAll(
  ".product-item .delete-product-button"
);

const deleteProduct = async e => {
  const buttonElement = e.target;
  const productId = buttonElement.dataset.productid;
  const csrfToken = buttonElement.dataset.csrf;

  const response = await fetch(
    `/admin/products/${productId}?_csrf=${csrfToken}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    alert("Something went wrong");
    return;
  }

  buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
};

deleteProductButtonEl.forEach(button => {
  button.addEventListener("click", deleteProduct);
});
