const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyAlTbJK3rXBYASilQaAUQuOncBcG4RwAhg");

exports.geminiPrompt = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            const prompt = req.body.prompt;s
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(prompt);
            
            // Correctly extract response
            const responseText = result.response ? result.response.candidates[0]?.content?.parts[0]?.text : "No response";
            
            res.json({ response: responseText });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
});
