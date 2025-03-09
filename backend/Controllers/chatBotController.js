import chatBot from "./chatBot.js"; // Import the chatbot function


export const chatBotController = async(req,res)=>{
    try {
      const { message } = req.body;
      console.log("Received a chat request:", message);
      
      const aiResponse = await chatBot(message);
      console.log("aires",aiResponse.text)
      res.json({ response: aiResponse });
    } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({ error: "Failed to get response." });
    }

}
