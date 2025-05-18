const currencyOne = document.getElementById("currency-one");
const amountOne = document.getElementById("amount-one");
const currencyTwo = document.getElementById("currency-two");
const amountTwo = document.getElementById("amount-two");
const rateText = document.getElementById("rate");
const swapButton = document.getElementById("swap");

// Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.rates[currency_two];
      rateText.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountTwo.value = (amountOne.value * rate).toFixed(2);
    })
    .catch((error) => {
      console.error("Error fetching exchange rates:", error);
      rateText.innerText = "خطأ في تحميل الأسعار";
    });
}

// Event Listeners
currencyOne.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
currencyTwo.addEventListener("change", calculate);
swapButton.addEventListener("click", () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
});

// Initial calculation
calculate();
