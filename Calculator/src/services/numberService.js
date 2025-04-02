const axios = require("axios");

const THIRD_PARTY_APIS = {
    "p": "http://20.244.56.144/evaluation-service/primes",
    "f": "http://20.244.56.144/evaluation-service/fibo",
    "e": "http://20.244.56.144/evaluation-service/even",
    "r": "http://20.244.56.144/evaluation-service/rand"
};

const WINDOW_SIZE = 10;
let slidingWindow = [];

async function fetchNumbers(url) {
    try {
        const response = await axios.get(url, { timeout: 500 });
        return response.data.numbers || [];
    } catch (error) {
        return [];
    }
}

async function getNumbers(req, res) {
    const { numberid } = req.params;
    if (!THIRD_PARTY_APIS[numberid]) {
        return res.status(400).json({ error: "Invalid number identifier" });
    }
    
    const newNumbers = await fetchNumbers(THIRD_PARTY_APIS[numberid]);
    const windowPrevState = [...slidingWindow];

    newNumbers.forEach(num => {
        if (!slidingWindow.includes(num)) {
            slidingWindow.push(num);
            if (slidingWindow.length > WINDOW_SIZE) {
                slidingWindow.shift();
            }
        }
    });

    const windowCurrState = [...slidingWindow];
    const avg = windowCurrState.length 
        ? (windowCurrState.reduce((a, b) => a + b, 0) / windowCurrState.length).toFixed(2) 
        : "0.00";

    res.json({
        windowPrevState,
        windowCurrState,
        numbers: newNumbers,
        avg
    });
}

module.exports = { getNumbers };
