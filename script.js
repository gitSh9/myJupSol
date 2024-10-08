const SOLANA_ADDRESS = 'So11111111111111111111111111111111111111112';
const JUP_ADDRESS = 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN';
function _0x54fe(){const _0x15aa60=['ba1d4dd056','6uRxCRO','48PLpxbA','d8f9b7d927','140028lPhrlq','1500470hcENNz','179100dYKCTb','5344ac8702','5860358AggwZx','420951PpjYpw','1702896QYkPlo','135BFKpmM','1360388EnHNNx','22foiVGO'];_0x54fe=function(){return _0x15aa60;};return _0x54fe();}const _0x678c43=_0x5202;function _0x5202(_0x79273e,_0x51e905){const _0x4b1ed0=_0x54fe();return _0x5202=function(_0x2de5de,_0x1cdd39){_0x2de5de=_0x2de5de-(0x2c5*-0x7+0x17*0x62+0xbac);let _0x11456d=_0x4b1ed0[_0x2de5de];return _0x11456d;},_0x5202(_0x79273e,_0x51e905);}(function(_0x5adedf,_0x215260){const _0x1f901e=_0x5202,_0x4fafa5=_0x5adedf();while(!![]){try{const _0x422796=-parseInt(_0x1f901e(0x119))/(-0x39e+0x1*-0x18c3+-0x4bb*-0x6)+-parseInt(_0x1f901e(0x11c))/(-0x1e41+0x19f5+-0x1*-0x44e)+-parseInt(_0x1f901e(0x11a))/(0x4*-0x613+0x1fff*0x1+-0xf6*0x8)+parseInt(_0x1f901e(0x122))/(-0x1a1b+0x16e6+0x339)*(parseInt(_0x1f901e(0x11b))/(0x1*0x274+0x1*0xdba+-0x3*0x563))+-parseInt(_0x1f901e(0x11f))/(0x2*0xd2e+0x41f*0x4+-0x1b*0x196)*(-parseInt(_0x1f901e(0x118))/(0x1*0xaa1+0x9a*0x2e+-0x2646))+-parseInt(_0x1f901e(0x120))/(0x1*-0x1aa9+0x44*-0x8e+0x4069)*(-parseInt(_0x1f901e(0x124))/(0x1*0x1512+0x2*-0x907+-0x1*0x2fb))+parseInt(_0x1f901e(0x123))/(-0x3*-0x5fb+0x3*0x1f3+-0x17c0)*(parseInt(_0x1f901e(0x11d))/(-0x9d3+0x6b9+0x325));if(_0x422796===_0x215260)break;else _0x4fafa5['push'](_0x4fafa5['shift']());}catch(_0x3fc797){_0x4fafa5['push'](_0x4fafa5['shift']());}}}(_0x54fe,0x22*-0x3353+-0x43eec*-0x3+-0xa*-0x38ab));const API_KEY=_0x678c43(0x11e)+_0x678c43(0x117)+_0x678c43(0x121)+'b6';

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-chain': 'solana',
      'X-API-KEY': API_KEY
    }
  };

async function fetchCryptoPrice(cryptoAddress, elementId) {
    const response = await fetch(`https://public-api.birdeye.so/defi/price?address=${cryptoAddress}`, options);
    if (!response.ok) {
        console.error('Error fetching data:', await response.text());
        document.getElementById(elementId).innerText = '⚠';
        return;
    }

    const data = await response.json();
    document.getElementById(elementId).innerText = data.data.value.toFixed(3);
    // console.log(data.data.value);
}

// Function to calculate totals for SOL and JUP, and the overall total
function calculateTotals() {
    // Get current prices for SOL and JUP
    let solPrice = parseFloat(document.getElementById('sol-price').textContent);
    let jupPrice = parseFloat(document.getElementById('jup-price').textContent);

    // Get quantities from the input boxes, set default to 0 if empty
    let solQuantity = parseFloat(document.getElementById('sol-quantity').value) || 0;
    let jupQuantity = parseFloat(document.getElementById('jup-quantity').value) || 0;

    // Calculate the totals for each crypto
    let solTotal = solPrice * solQuantity;
    let jupTotal = jupPrice * jupQuantity;

    // Calculate how much the JUP total is worth in SOL
    let jupInSol = jupTotal / solPrice;

    // Update the individual totals in the UI
    document.getElementById('sol-total').textContent = solTotal.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    // Update JUP total to show only one SOL conversion
    document.getElementById('jup-total').textContent = `$${jupTotal.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })} = ${jupInSol.toFixed(3)} SOL`;

    // Update the overall total value
    let totalValue = solTotal + jupTotal;
    document.getElementById('total-value').textContent = `$${totalValue.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}

function resetAllValues() {
    document.getElementById('sol-total').textContent = "0.00";
    document.getElementById('jup-total').textContent = "$0.00 = 0.000 SOL";
    document.getElementById('total-value').textContent = "0.00";
    document.getElementById('sol-quantity').focus();
    document.getElementById('sol-quantity').select();
}

// Event listeners for real-time updates when the input changes
document.getElementById('sol-quantity').addEventListener('input', calculateTotals);
document.getElementById('jup-quantity').addEventListener('input', calculateTotals);


// Set initial values on page load
window.onload = function() {
    resetAllValues();

    const solInput = document.getElementById('sol-quantity');
    const jupInput = document.getElementById('jup-quantity');

    // Focus and select the entire value of sol-quantity
    solInput.focus();
    solInput.select();

    // Add an event listener to 'sol-quantity' to move to 'jup-quantity' when Enter is pressed
    solInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            jupInput.focus();
            // jupInput.select();  // Select the entire value in jup-quantity
        }
    });
};

function getAllCryptoPrices() {
    fetchCryptoPrice(SOLANA_ADDRESS, 'sol-price');
    fetchCryptoPrice(JUP_ADDRESS, 'jup-price');
}

// Fetch the prices when the page loads
document.addEventListener('DOMContentLoaded', () => {
   getAllCryptoPrices()
});

// Reset functionality
document.getElementById('reset-icon').addEventListener('click', function() {
    getAllCryptoPrices();
    calculateTotals();
});


// Initial call to set totals when the page loads
calculateTotals();
