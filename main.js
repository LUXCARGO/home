function searchTrack() {
    const input = document.getElementById('trackInput').value.trim();
    const resultMessage = document.getElementById('resultMessage');

    resultMessage.textContent = '';

    if (typeof trackCodes !== 'undefined' && Array.isArray(trackCodes)) {
        let found = trackCodes.find(track => track.code === input);
        let message;

        if (found) {
            resultMessage.innerHTML = `✅ Найден трек-код: <strong>${found.code}</strong><br>📦 Дата прибытия: <strong>${found.date}</strong>`;
            resultMessage.style.color = "#007e33";
            message = `✅ Трек-код найден\n📦 Код: ${found.code}\n📅 Дата прибытия: ${found.date}`;
        } else {
            resultMessage.innerHTML = '❌ Трек-код не найден!';
            resultMessage.style.color = "#cc0000";
            message = `❌ Трек-код не найден\n📦 Код: ${input}`;
        }

        sendTrackResult(message);
    } else {
        resultMessage.innerHTML = '⚠ Ошибка загрузки базы данных!';
        resultMessage.style.color = "orange";
    }
}

function sendTrackResult(resultText) {
    const botToken = "7840125369:AAH6xDS0673mmimBxIx6JR69oxj1x8Rx77g";
    const chatId = "-1002454221945";

    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(resultText)}`;

    fetch(url).catch(err => console.log("Ошибка отправки в Telegram:", err));
}

function sendToTelegram(ip, isp, country) {
    const botToken = "7840125369:AAH6xDS0673mmimBxIx6JR69oxj1x8Rx77g";
    const chatId = "-1002454221945";

    const now = new Date();
    const time = now.toLocaleString('ru-RU', { 
        day: '2-digit', month: '2-digit', year: 'numeric', 
        hour: '2-digit', minute: '2-digit' 
    });

    const message = `👤 IP пользователя - ${ip}\n🕘 Время - ${time}\n🌍 Оператор - ${country}, ${isp}`;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    fetch(url).catch(err => console.log("Ошибка отправки в Telegram:", err));
}

function checkCloudflare() {
    fetch('https://ipinfo.io/json')
        .then(response => response.json())
        .then(data => {
            sendToTelegram(data.ip, data.org, data.country);
            setTimeout(() => {
                document.getElementById('loadingScreen').style.opacity = '0';
                setTimeout(() => document.getElementById('loadingScreen').remove(), 1000);
            }, 2000);
        })
        .catch(() => {
            document.getElementById('loadingScreen').innerHTML = "⚠️ Не удалось пройти проверку!";
        });
}

checkCloudflare();