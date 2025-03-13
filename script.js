const API_KEY = "AIzaSyAMjMTPH3TdyGFlqQ5fKmyeGoRk0nNFuzc"; // Replace with your actual Gemini API key
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generate?key=${API_KEY}`;

async function generateIdeas() {
    const topic = document.getElementById("topic").value;
    if (!topic.trim()) {
        alert("Please enter a topic!");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt: `Generate 10 blog post ideas for the topic: ${topic}`
            })
        });

        const data = await response.json();
        const ideas = data.candidates[0].content.parts[0].text.split("\n");

        const ideasList = document.getElementById("ideasList");
        ideasList.innerHTML = "";
        ideas.forEach(idea => {
            const li = document.createElement("li");
            li.textContent = idea;
            ideasList.appendChild(li);
        });

    } catch (error) {
        console.error("Error:", error);
        alert("Failed to generate ideas. Check API key and permissions.");
    }
}

function copyIdeas() {
    const ideasList = document.getElementById("ideasList");
    let text = "";
    ideasList.querySelectorAll("li").forEach(li => text += li.textContent + "\n");
    
    navigator.clipboard.writeText(text).then(() => {
        alert("Ideas copied to clipboard!");
    });
}
