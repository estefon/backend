import User from "../models/user.model.js";

export const getUserprofile = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username}).select("-password");
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getUserProfile:", error.message);
        res.status(500).json({error:error.message});
    }
}; 

export const followUnfollowUser = async (req, res) => {

    try {
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if(id === req.user._id.toString()) {
            return res.status(400).json({ error: "You cant follow/unfollow yourself"});
        }

        if(!userToModify || !currentUser) return res.status(400).json({ error: "User not found"});

        const isFollowing = currentUser.following.includes(id);

        if(isFollowing){
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id}});
            await User.findOneAndUpdate(req.user._id, {$push: {following: id}});
            res.status(200).json({message: "User unfollowed successfuly"});
        }else{
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id}});
            await User.findOneAndUpdate(req.user._id, {$push: {following: id}});
            
            const newNotification = new Notification({
                type: "follow",
                from: req.user._id,
                to: userToModify._id,
            });

            await newNotification.save();

           res.status(200).json({message: "User unfollowed successfuly"});

        }
    } catch (error) {
        console.log("Error in followUnfollowUser:", error.message);
        res.status(500).json({error:error.message});
    }
};                                
