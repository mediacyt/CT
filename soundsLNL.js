/*!
 **|  Audio File Library for MS/LNL 
 **|  Written by MM
 **|
 **|  
 **|
 **@preserve
 */
var windowChannelIndex = "ncc" + CHANNEL.name;
 
if (!this[windowChannelIndex].audioLibrary) {
    this[windowChannelIndex].audioLibrary = {}
}
this[windowChannelIndex].audioLibrary.sounds = {
    Woosh1: {
        url: "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-dusty-room/dustyroom_cartoon_swipe_med_pitch.mp3",
        emote: true,
        squee: true
    },
    Woosh2: {
        url: "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-one/comedy_swipe_001.mp3",
        emote: true,
        squee: true
    },
    Pop1: {
        url: "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-five/zapsplat_cartoon_pop_small_lid.mp3",
        emote: true,
        squee: true
    },
    Pop2: {
        url: "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-one/comedy_pop_mouth_finger_002.mp3",
        emote: true,
        squee: true
    }
};
this[windowChannelIndex].audioLibrary.squees = function() {
    var keys = Object.keys(this[windowChannelIndex].audioLibrary.sounds);
    var squees = {};
    for (var i = keys.length - 1; i >= 0; i--) {
        var soundObj = this[windowChannelIndex].audioLibrary.sounds[keys[i]];
        if (soundObj.squee) {
            squees[keys[i]] = soundObj.url
        }
    }
    return squees
}();
this[windowChannelIndex].audioLibrary.emotes = function() {
    var keys = Object.keys(this[windowChannelIndex].audioLibrary.sounds);
    var emotes = {};
    for (var i = keys.length - 1; i >= 0; i--) {
        var soundObj = this[windowChannelIndex].audioLibrary.sounds[keys[i]];
        if (soundObj.emote) {
            emotes[keys[i]] = new Audio(soundObj.url)
        }
    }
    return emotes
}();
