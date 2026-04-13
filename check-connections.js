import dotenv from "dotenv";
dotenv.config();

const requiredKeys = ['MISTRAL_API_KEY', 'GROQ_API_KEY', 'HF_API_KEY'];

for (const key of requiredKeys) {
    if (!process.env[key]) throw new Error(`${key} manquante dans .env`);
    console.log(`${key}: présente`);
}

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const HF_API_KEY = process.env.HF_API_KEY;

// const PROMPT = "Explique le concept de récursion à un lycéen, en 3 phrases maximum.";

// const providers = [
//     {
//         name: 'Mistral',
//         url: 'https://api.mistral.ai/v1/chat/completions',
//         key: MISTRAL_API_KEY,
//         model: 'mistral-small-latest'
//     },
//     {
//         name: 'Groq',
//         url: 'https://api.groq.com/openai/v1/chat/completions',
//         key: GROQ_API_KEY,
//         model: 'llama-3.3-70b-versatile'
//     }
// ];

// async function callProvider(provider, prompt) {
//     const start = Date.now(); // on démarre le chrono
    
//     const response = await fetch(provider.url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${provider.key}`
//         },
//         body: JSON.stringify({
//             model: provider.model,
//             messages: [{ role: 'user', content: prompt }],
//             temperature: 0.7
//         })
//     });

//     const data = await response.json();
//     const latency = Date.now() - start; // temps total en ms

//     return {
//         provider: provider.name,
//         latency,
//         content: data.choices[0].message.content,
//         tokens: data.usage?.total_tokens
//     };
// }

// // On lance les deux en parallèle avec Promise.all
// const results = await Promise.all(
//     providers.map(p => callProvider(p, PROMPT))
// );

// // Affichage des résultats
// console.log(`\nPrompt : "${PROMPT}"\n`);
// console.log('─'.repeat(60));

// for (const r of results) {
//     console.log(`\n📍 ${r.provider} | ${r.latency}ms | ${r.tokens} tokens`);
//     console.log(r.content);
// }

// console.log('\n' + '─'.repeat(60));
// console.log('\nRésumé :');
// for (const r of results) {
//     console.log(` ${r.provider.padEnd(12)} ${r.latency}ms`.padEnd(30));
// }