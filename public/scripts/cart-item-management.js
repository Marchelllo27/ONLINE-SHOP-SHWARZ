const cartItemUpdateFormElements = document.querySelectorAll(
  ".cart-item-management"
);
const cartTotalPriceElement = document.getElementById("cart-total-price");
const cartBadges = document.querySelectorAll(".nav-items .badge");

const updateCartItem = async event => {
  event.preventDefault();
  const form = event.target;

  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const quantity = form.firstElementChild.value;
  let response;
  try {
    response = await fetch("/cart/items", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Something went wrong, here");
    return;
  }

  if (!response.ok) {
    alert("Something went wrong, from here");
    return;
  }

  const responseData = await response.json();

  if (responseData.updatedCartData.updatedItemPrice === 0) {
    form.parentElement.parentElement.remove();
  } else {
    const cartItemTotalPriceElement =
      form.parentElement.querySelector(".cart-item-price");
    cartItemTotalPriceElement.textContent =
      responseData.updatedCartData.updatedItemPrice.toFixed(2);
  }

  cartTotalPriceElement.textContent =
    responseData.updatedCartData.newTotalPrice.toFixed(2);

  cartBadges.forEach(badge => {
    badge.textContent = responseData.updatedCartData.newTotalQuantity;
  });
};

cartItemUpdateFormElements.forEach(formElement => {
  formElement.addEventListener("submit", updateCartItem);
});