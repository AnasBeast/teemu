// get video duration


module.exports = {
    
    database: null,
    fileSystem: null,

    isUserFriend: function (user, friendId) {
        let isFriend = false;
        for (let a = 0; a < user.friends.length; a++) {
            if (user.friends[a]._id.toString() == friendId.toString()) {
                isFriend = true;
                break;
            }
        }
        return isFriend;
    },

    addStory: async function (request, user, length, index, success, error) {
        const self = this;
        if (request.files["attachment" + index].size > 0 && (request.files["attachment" + index].type.includes("image") || request.files["attachment" + index].type.includes("video"))) {
            
            const directoryPath = "uploads/stories/" + user.email;
            if (!self.fileSystem.existsSync(directoryPath)) {
                self.fileSystem.mkdirSync(directoryPath);
            }

            const filePath = directoryPath + "/" + new Date().getTime() + "-" + request.files["attachment" + index].name;
            const caption = request.fields["caption" + index];
            self.fileSystem.readFile(request.files["attachment" + index].path, function (err, data) {
                if (err) throw err;
                console.log('File read!');

                // Write the file
                self.fileSystem.writeFile(filePath, data, async function (err) {
                    if (err) throw err;
                    console.log('File written!');

                    if (request.files["attachment" + index].type.includes("video")) {
                        // get video duration
                        
                    } else {
                        await self.database.collection("stories").insertOne({
                            user: {
                                _id: user._id,
                                name: user.name,
                                profileImage: user.profileImage
                            },
                            caption: caption,
                            attachment: filePath,
                            status: "active", // active, passed
                            viewers: [],
                            seconds: 0,
                            createdAt: new Date().getTime()
                        });

                        index++;

                        if (index < length) {
                            self.addStory(request, user, length, index, success, error);
                        } else {
                            success();
                        }
                    }
                });

                // Delete the file
                self.fileSystem.unlink(request.files["attachment" + index].path, function (err) {
                    if (err) throw err;
                    console.log('File deleted!');
                });
            });
        } else {
            await self.database.collection("stories").insertOne({
                user: {
                    _id: user._id,
                    name: user.name,
                    profileImage: user.profileImage
                },
                caption: request.fields["caption" + index],
                attachment: "",
                status: "active",
                viewers: [],
                seconds: 0,
                createdAt: new Date().getTime()
            });

            index++;
            if (index < length) {
                this.addStory(request, user, length, index, success, error);
            } else {
                success();
            }
        }
    },

    updateUser: async function (user, profileImage, name) {
        /* update in profile views collection.
         * 'user' means the person who viewed the profile.
         */
        await this.database.collection("profile_viewers").updateMany({
            "user._id": user._id
        }, {
            $set: {
                "user.name": name,
                "user.profileImage": profileImage
            }
        });

        /* addPost */
        await this.database.collection("posts").updateMany({
            "uploader._id": user._id
        }, {
            $set: {
                "uploader.name": name,
                "uploader.profileImage": profileImage
            }
        });
        await this.database.collection("posts").updateMany({
            "user._id": user._id
        }, {
            $set: {
                "user.name": name,
                "user.profileImage": profileImage
            }
        });

        /* toggleLikePost */
        await this.database.collection("users").updateMany({
            "notifications.profileImage": user.profileImage
        }, {
            $set: {
                "notifications.$.profileImage": profileImage
            }
        });

        /* postComment */
        await this.database.collection("posts").updateMany({
            "comments.user._id": user._id
        }, {
            $set: {
                "comments.$.user.name": name,
                "comments.$.user.profileImage": profileImage
            }
        });

        /* postReply */

        /* sharePost */
        await this.database.collection("posts").updateMany({
            "shares._id": user._id
        }, {
            $set: {
                "shares.$.name": name,
                "shares.$.profileImage": profileImage
            }
        });

        /* sendFriendRequest */
        await this.database.collection("users").updateMany({
            "friends._id": user._id
        }, {
            $set: {
                "friends.$.name": name,
                "friends.$.profileImage": profileImage
            }
        });

        /* acceptFriendRequest */

        /* createPage */
        await this.database.collection("pages").updateMany({
            "user._id": user._id
        }, {
            $set: {
                "user.name": name,
                "user.profileImage": profileImage
            }
        });

        /* toggleLikePage */
        await this.database.collection("pages").updateMany({
            "likers._id": user._id
        }, {
            $set: {
                "likers.$.name": name,
                "likers.$.profileImage": profileImage
            }
        });

        /* createGroup */
        await this.database.collection("groups").updateMany({
            "members._id": user._id
        }, {
            $set: {
                "members.$.name": name,
                "members.$.profileImage": profileImage
            }
        });
        await this.database.collection("groups").updateMany({
            "user._id": user._id
        }, {
            $set: {
                "user.name": name,
                "user.profileImage": profileImage
            }
        });

        /* toggleJoinGroup */
    }
};