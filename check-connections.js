import dotenv from "dotenv";
dotenv.config();

const requiredKeys = ['MISTRAL_API_KEY', 'GROQ_API_KEY', 'HF_API_KEY'];

for (const key of requiredKeys) {
    if (!process.env[key]) console.warn(`⚠️  ${key} manquante dans .env`);
    else console.log(`${key}: présente`);
}

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const HF_API_KEY = process.env.HF_API_KEY;

const providersConfig = [
    {
        name: 'Mistral',
        url: 'https://api.mistral.ai/v1/chat/completions',
        key: MISTRAL_API_KEY,
        model: 'mistral-small-latest'
    },
    {
        name: 'Groq',
        url: 'https://api.groq.com/openai/v1/chat/completions',
        key: GROQ_API_KEY,
        model: 'llama-3.3-70b-versatile'
    },
    {
        name: 'HuggingFace',
        url: 'https://router.huggingface.co/v1/chat/completions',
        key: HF_API_KEY,
        model: 'meta-llama/Llama-3.1-8B-Instruct'
    }
];

async function callProvider(provider, prompt, maxTokens) {
    const start = Date.now(); 
    
    const response = await fetch(provider.url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${provider.key}`
        },
        body: JSON.stringify({
            model: provider.model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: maxTokens
        })
    });

    const data = await response.json();
    const latency = Date.now() - start;

    return {
        provider: provider.name,
        latency,
        content: data.choices[0].message.content,
        tokens: data.usage?.total_tokens
    };
}

async function checkProvider(provider){
    const PROMPT_INIT = "Réponds uniquement par 'OK'.";
    try {
        return await callProvider(provider, PROMPT_INIT, 5);
    } catch (err) {
        return {
            provider: provider.name,
            latency: null,
            content: null,
            error: err.message
        };
    }
    // console.log(results);
    return(results);
}

function displayResult(results){
    console.log("🔍 Vérification des connexions API...\n");
    let connectionActive = 0;

    for (const res of results){
        if (res.error) {    
            const isNetwork = res.error.includes('fetch');
            const icon = isNetwork ? "🌐" : "❌";
            const content = isNetwork ? "ERREUR RÉSEAU" : "ERREUR AUTHENTIFICATION";
            console.log(`${icon} ${res.provider.padEnd(15)}${content}`)
        } else {
            connectionActive++;
            console.log(`✅ ${res.provider.padEnd(15)}${res.latency}ms`);
        } 
    }

    console.log(`\n ${connectionActive}/${res.length} connexions actives\n`);
    (connectionActive===res.length) 
        ? console.log("Tout est vert. Vous êtes prêts pour la suite !") 
        : console.log("Erreur, vérifiez la configuration des llms !")

}

const res = await Promise.all(
    providersConfig.map(p => checkProvider(p))
);
// console.log(res);
displayResult(res);
