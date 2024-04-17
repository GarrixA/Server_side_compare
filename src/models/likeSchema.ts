import mongoose from "mongoose";

const schema = mongoose.Schema;

const LikeSchema = new schema(
	{
		blogId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Blogs",
		},
		userID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Users",
		},
	},
	{ timestamps: true },
);

export default mongoose.model("Likes", LikeSchema);
