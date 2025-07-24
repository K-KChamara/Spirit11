import mongoose from "mongoose";
const teamSchema = new mongoose.Schema({
  userId :{type:String , required:true ,unique:true},
  teamName: { type: String, required: true ,unique:true },
  totalValue: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
});

const Team = mongoose.model("Team", teamSchema);
export default Team;
