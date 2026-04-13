const PROMPT_TEST_TOKEN = "Bonjour, je suis un étudiant en informatique et je veux apprendre à coder des applications avec des LLMs.";

const PROVIDER_COST = [
    {
        name: 'Mistral small',
        pricePerMillion: 0.20
    },
    {
        name: 'Groq Llama 3',
        pricePerMillion: 0.05
    },
    {
        name: 'HG Llama 3',
        pricePerMillion: 0.05
    },
]

function estimateTokens(text) {
    return text.length/4;
}
function estimateCost(text, label) {
    console.log(`${"provider".padEnd(20)} ${"Coût estimé (input)".padEnd(20)} ${"Pour 1000 requêtes"}`);
    console.log(`${"─".repeat("provider".length).padEnd(20)} ${"─".repeat("Coût estimé (input)".length).padEnd(20)} ${"─".repeat("Pour 1000 requêtes".length)}`)
    for (const provider of PROVIDER_COST) {
        const tokens = estimateTokens(text);
        const cost = (tokens * provider.pricePerMillion / 1e6).toFixed(8) + "€" ;
        const cost1000 = (tokens * provider.pricePerMillion / 1e6 * 1000).toFixed(5) + "€";
        
        console.log(`${provider.name.padEnd(20)} ${cost.padEnd(20)} ${cost1000}`);
    }
}

estimateCost(PROMPT_TEST_TOKEN);